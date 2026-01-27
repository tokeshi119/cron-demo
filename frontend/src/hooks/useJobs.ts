import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobsApi, type GetJobsParams } from '@/src/lib/api';

/**
 * ジョブ履歴一覧を取得するフック
 */
export function useJobs(params?: GetJobsParams) {
  return useQuery({
    queryKey: ['jobs', params],
    queryFn: () => jobsApi.getAll(params),
  });
}

/**
 * ジョブ詳細を取得するフック
 */
export function useJob(id: string) {
  return useQuery({
    queryKey: ['jobs', id],
    queryFn: () => jobsApi.getOne(id),
    enabled: !!id,
  });
}

/**
 * 失敗ジョブのリトライフック
 */
export function useRetryJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobId: string) => jobsApi.retry(jobId),
    onSuccess: () => {
      // ジョブ一覧を再取得
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });
}
