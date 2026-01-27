import { useQuery } from '@tanstack/react-query';
import { articlesApi, type Article } from '@/src/lib/api';

export function useArticles() {
  return useQuery({
    queryKey: ['articles'],
    queryFn: articlesApi.getAll,
  });
}
