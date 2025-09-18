import { useMutation, useQueryClient } from "@tanstack/react-query"

import { taskMutationKeys } from "../../keys/mutations"
import { taskQueryKeys } from "../../keys/queries"
import { api } from "../../lib/axios"

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: taskMutationKeys.update(taskId),
    mutationFn: async (data) => {
      const { data: updatedtask } = await api.patch(`/tasks/${taskId}`, {
        title: data.title.trim(),
        description: data.description.trim(),
        time: data.time,
      })
      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) => {
        return oldTasks.map((task) => {
          if (task.id === taskId) {
            return updatedtask
          }
          return task
        })
      })
      queryClient.setQueriesData(taskQueryKeys.getOne(taskId), updatedtask)
    },
  })
}
