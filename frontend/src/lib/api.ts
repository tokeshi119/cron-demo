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

export const articlesApi = {
  // 記事一覧取得
  getAll: async (): Promise<Article[]> => {
    const response = await apiClient.get<Article[]>('/articles');
    return response.data;
  },
};

export default apiClient;
