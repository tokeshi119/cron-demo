import { useQuery } from '@tanstack/react-query';
import {
  articlesApi,
  type GetArticlesParams,
} from '@/src/lib/api';

export function useArticles(params?: GetArticlesParams) {
  return useQuery({
    queryKey: ['articles', params],
    queryFn: () => articlesApi.getAll(params),
  });
}
