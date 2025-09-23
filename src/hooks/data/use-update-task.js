import { useMutation, useQueryClient } from "@tanstack/react-query"

import { taskMutationKeys } from "../../keys/mutations"
import { taskQueryKeys } from "../../keys/queries"
import { api } from "../../lib/axios"

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: taskMutationKeys.update(taskId),
    mutationFn: async (data) => {
      const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, {
        title: data?.title?.trim(),
        description: data?.description?.trim(),
        time: data?.time,
        status: data?.status,
      })

      // Atualiza a lista de tarefas
      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks = []) => {
        // Valor padrão como array vazio
        return oldTasks.map((task) => {
          if (task.id === taskId) {
            return updatedTask
          }
          return task
        })
      })

      // Atualiza a tarefa específica
      queryClient.setQueryData(taskQueryKeys.getOne(taskId), updatedTask)
    },
    onError: (error) => {
      console.error("Erro ao atualizar a tarefa:", error)
      // Aqui você pode adicionar qualquer lógica adicional em caso de erro
    },
  })
}
