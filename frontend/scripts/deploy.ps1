# フロントエンドをS3 + CloudFrontに手動デプロイするスクリプト
# 使用方法: .\scripts\deploy.ps1

# UTF-8エンコーディングを設定
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

param(
    [string]$ApiUrl = "",
    [string]$S3BucketName = "",
    [string]$CloudFrontDistributionId = "",
    [string]$AwsRegion = "ap-northeast-1"
)

# エラー時に停止
$ErrorActionPreference = "Stop"

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "フロントエンド S3 + CloudFront デプロイ" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# 環境変数の確認と設定
if ([string]::IsNullOrEmpty($ApiUrl)) {
    $ApiUrl = $env:NEXT_PUBLIC_API_URL
    if ([string]::IsNullOrEmpty($ApiUrl)) {
        Write-Host "エラー: NEXT_PUBLIC_API_URLが設定されていません" -ForegroundColor Red
        Write-Host "環境変数として設定するか、-ApiUrlパラメータで指定してください" -ForegroundColor Yellow
        Write-Host "例: `$env:NEXT_PUBLIC_API_URL='https://your-api.up.railway.app'; .\scripts\deploy.ps1" -ForegroundColor Yellow
        exit 1
    }
}

if ([string]::IsNullOrEmpty($S3BucketName)) {
    $S3BucketName = $env:AWS_S3_BUCKET_NAME
    if ([string]::IsNullOrEmpty($S3BucketName)) {
        Write-Host "エラー: AWS_S3_BUCKET_NAMEが設定されていません" -ForegroundColor Red
        Write-Host "環境変数として設定するか、-S3BucketNameパラメータで指定してください" -ForegroundColor Yellow
        exit 1
    }
}

if ([string]::IsNullOrEmpty($CloudFrontDistributionId)) {
    $CloudFrontDistributionId = $env:AWS_CLOUDFRONT_DISTRIBUTION_ID
    if ([string]::IsNullOrEmpty($CloudFrontDistributionId)) {
        Write-Host "エラー: AWS_CLOUDFRONT_DISTRIBUTION_IDが設定されていません" -ForegroundColor Red
        Write-Host "環境変数として設定するか、-CloudFrontDistributionIdパラメータで指定してください" -ForegroundColor Yellow
        exit 1
    }
}

# AWS CLIの確認
try {
    $awsVersion = aws --version 2>&1
    Write-Host "AWS CLI確認: $awsVersion" -ForegroundColor Green
} catch {
    Write-Host "エラー: AWS CLIがインストールされていません" -ForegroundColor Red
    Write-Host "https://aws.amazon.com/cli/ からインストールしてください" -ForegroundColor Yellow
    exit 1
}

# AWS認証情報の確認
try {
    $awsIdentity = aws sts get-caller-identity 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "エラー: AWS認証情報が設定されていません" -ForegroundColor Red
        Write-Host "aws configure を実行して認証情報を設定してください" -ForegroundColor Yellow
        exit 1
    }
    Write-Host "AWS認証情報確認: OK" -ForegroundColor Green
} catch {
    Write-Host "エラー: AWS認証情報の確認に失敗しました" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "デプロイ設定:" -ForegroundColor Cyan
Write-Host "  API URL: $ApiUrl" -ForegroundColor White
Write-Host "  S3 Bucket: $S3BucketName" -ForegroundColor White
Write-Host "  CloudFront Distribution ID: $CloudFrontDistributionId" -ForegroundColor White
Write-Host "  AWS Region: $AwsRegion" -ForegroundColor White
Write-Host ""

# 確認プロンプト
$confirm = Read-Host "デプロイを続行しますか? (y/N)"
if ($confirm -ne "y" -and $confirm -ne "Y") {
    Write-Host "デプロイをキャンセルしました" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "ステップ 1: 依存関係のインストール" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
npm ci
if ($LASTEXITCODE -ne 0) {
    Write-Host "エラー: 依存関係のインストールに失敗しました" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "ステップ 2: 静的エクスポートビルド" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
$env:NEXT_PUBLIC_API_URL = $ApiUrl
npm run build:export
if ($LASTEXITCODE -ne 0) {
    Write-Host "エラー: ビルドに失敗しました" -ForegroundColor Red
    exit 1
}

# outディレクトリの確認
if (-not (Test-Path "out")) {
    Write-Host "エラー: outディレクトリが生成されていません" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "ステップ 3: S3へのアップロード" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
aws s3 sync ./out "s3://$S3BucketName" --delete --region $AwsRegion
if ($LASTEXITCODE -ne 0) {
    Write-Host "エラー: S3へのアップロードに失敗しました" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "ステップ 4: CloudFrontキャッシュ無効化" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
$invalidationResult = aws cloudfront create-invalidation --distribution-id $CloudFrontDistributionId --paths "/*" --region $AwsRegion 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "エラー: CloudFrontキャッシュ無効化に失敗しました" -ForegroundColor Red
    Write-Host $invalidationResult -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Green
Write-Host "デプロイ完了！" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""
Write-Host "CloudFrontのキャッシュ無効化には数分かかる場合があります" -ForegroundColor Yellow
Write-Host "CloudFrontのURLでアクセスして確認してください" -ForegroundColor Yellow
