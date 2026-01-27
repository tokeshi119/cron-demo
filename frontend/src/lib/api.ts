import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// レスポンスインターセプターでエラーハンドリング
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // サーバーからのエラーレスポンス
      console.error('API Error:', error.response.status, error.response.data);
      
      // バックエンドから返される分かりやすいエラーメッセージを抽出
      const errorData = error.response.data;
      let errorMessage = 'リクエストに失敗しました';
      
      if (errorData?.error) {
        // NestJSのHttpExceptionFilterから返される形式
        errorMessage = errorData.error;
      } else if (errorData?.message) {
        // 一般的なエラーレスポンス形式
        errorMessage = Array.isArray(errorData.message)
          ? errorData.message.join(', ')
          : errorData.message;
      } else if (typeof errorData === 'string') {
        errorMessage = errorData;
      }
      
      // エラーメッセージを含むErrorオブジェクトを作成
      const friendlyError = new Error(errorMessage);
      // 元のエラー情報も保持（デバッグ用）
      (friendlyError as any).status = error.response.status;
      (friendlyError as any).originalError = error;
      
      return Promise.reject(friendlyError);
    } else if (error.request) {
      // リクエストは送信されたが、レスポンスが受信されなかった
      // これはバックエンドサーバーが起動していない、または接続できないことを示します
      const errorMessage = new Error(
        `バックエンドサーバーに接続できません。サーバーが起動しているか確認してください。 (${API_BASE_URL})`,
      );
      console.error('Network Error:', errorMessage.message);
      return Promise.reject(errorMessage);
    } else {
      // リクエストの設定中にエラーが発生
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  },
);

// ソース関連の型定義
export interface Source {
  id: string;
  url: string;
  name: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSourceDto {
  url: string;
  name: string;
  enabled?: boolean;
}

export interface UpdateSourceDto {
  name?: string;
  enabled?: boolean;
}

// 記事関連の型定義
export interface Article {
  id: string;
  sourceId: string;
  url: string;
  title: string;
  description: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  source?: {
    id: string;
    name: string;
    url: string;
  };
}

// API関数
export const sourcesApi = {
  // ソース一覧取得
  getAll: async (): Promise<Source[]> => {
    const response = await apiClient.get<Source[]>('/sources');
    return response.data;
  },

  // ソース取得
  getOne: async (id: string): Promise<Source> => {
    const response = await apiClient.get<Source>(`/sources/${id}`);
    return response.data;
  },

  // ソース作成
  create: async (data: CreateSourceDto): Promise<Source> => {
    const response = await apiClient.post<Source>('/sources', data);
    return response.data;
  },

  // ソース更新
  update: async (id: string, data: UpdateSourceDto): Promise<Source> => {
    const response = await apiClient.patch<Source>(`/sources/${id}`, data);
    return response.data;
  },

  // ソース削除
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/sources/${id}`);
  },
};

// 記事一覧取得用のクエリパラメータ
export interface GetArticlesParams {
  query?: string;
  sourceId?: string;
  sort?: 'createdAt' | 'publishedAt' | 'title';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// ページネーション情報
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// 記事一覧レスポンス
export interface ArticlesResponse {
  articles: Article[];
  pagination: Pagination;
}

export const articlesApi = {
  // 記事一覧取得（フィルタ、検索、ソート、ページネーション対応）
  getAll: async (params?: GetArticlesParams): Promise<ArticlesResponse> => {
    const response = await apiClient.get<ArticlesResponse>('/articles', {
      params,
    });
    return response.data;
  },
};

// Fetch関連の型定義
export interface FetchResult {
  success: boolean;
  articleCount: number;
  duration: number;
  message: string;
}

// Fetch API関数
export const fetchApi = {
  // RSSフィードの手動取得
  fetchSource: async (sourceId: string): Promise<FetchResult> => {
    const response = await apiClient.post<FetchResult>(
      `/sources/${sourceId}/fetch`,
    );
    return response.data;
  },
};

// Outbox関連の型定義
export interface OutboxTask {
  id: string;
  type: string;
  payload: {
    articleId?: string;
    title?: string;
    url?: string;
    [key: string]: any;
  };
  status: 'pending' | 'processing' | 'done' | 'failed';
  retryCount: number;
  error: string | null;
  processedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// Outbox API関数
export const outboxApi = {
  // Outbox一覧取得
  getAll: async (status?: string): Promise<OutboxTask[]> => {
    const response = await apiClient.get<OutboxTask[]>('/outbox', {
      params: status ? { status } : undefined,
    });
    return response.data;
  },

  // Outboxタスク取得
  getOne: async (id: string): Promise<OutboxTask> => {
    const response = await apiClient.get<OutboxTask>(`/outbox/${id}`);
    return response.data;
  },

  // 失敗タスクのリトライ
  retry: async (id: string): Promise<OutboxTask> => {
    const response = await apiClient.post<OutboxTask>(`/outbox/${id}/retry`);
    return response.data;
  },
};

// Jobs関連の型定義
export interface FetchJob {
  id: string;
  sourceId: string;
  source: {
    id: string;
    name: string;
    url: string;
  };
  status: 'success' | 'failed';
  error: string | null;
  duration: number | null;
  articleCount: number | null;
  createdAt: string;
}

export interface GetJobsParams {
  sourceId?: string;
  status?: 'success' | 'failed';
  page?: number;
  limit?: number;
}

export interface JobsResponse {
  jobs: FetchJob[];
  pagination: Pagination;
  statistics: {
    totalJobs: number;
    successCount: number;
    failedCount: number;
    averageDuration: number | null;
  };
}

// Jobs API関数
export const jobsApi = {
  // ジョブ履歴一覧取得
  getAll: async (params?: GetJobsParams): Promise<JobsResponse> => {
    const response = await apiClient.get<JobsResponse>('/jobs', {
      params,
    });
    return response.data;
  },

  // ジョブ詳細取得
  getOne: async (id: string): Promise<FetchJob> => {
    const response = await apiClient.get<FetchJob>(`/jobs/${id}`);
    return response.data;
  },

  // 失敗ジョブのリトライ
  retry: async (id: string): Promise<FetchResult> => {
    const response = await apiClient.post<FetchResult>(`/jobs/${id}/retry`);
    return response.data;
  },
};

export default apiClient;
