import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { outboxApi, type OutboxTask } from '@/src/lib/api';

export function useOutbox(status?: string) {
  return useQuery({
    queryKey: ['outbox', status],
    queryFn: () => outboxApi.getAll(status),
  });
}

export function useOutboxTask(id: string) {
  return useQuery({
    queryKey: ['outbox', id],
    queryFn: () => outboxApi.getOne(id),
    enabled: !!id,
  });
}

export function useRetryOutboxTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => outboxApi.retry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['outbox'] });
    },
  });
}
