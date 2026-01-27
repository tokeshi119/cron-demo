import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  sourcesApi,
  fetchApi,
  type Source,
  type CreateSourceDto,
  type UpdateSourceDto,
  type FetchResult,
} from '@/src/lib/api';

export function useSources() {
  return useQuery({
    queryKey: ['sources'],
    queryFn: sourcesApi.getAll,
  });
}

export function useSource(id: string) {
  return useQuery({
    queryKey: ['sources', id],
    queryFn: () => sourcesApi.getOne(id),
    enabled: !!id,
  });
}

export function useCreateSource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSourceDto) => sourcesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sources'] });
    },
  });
}

export function useUpdateSource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSourceDto }) =>
      sourcesApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['sources'] });
      queryClient.invalidateQueries({ queryKey: ['sources', variables.id] });
    },
  });
}

export function useDeleteSource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => sourcesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sources'] });
    },
  });
}

export function useFetchSource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sourceId: string) => fetchApi.fetchSource(sourceId),
    onSuccess: () => {
      // 記事一覧も更新する
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
}
