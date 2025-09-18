import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["deleteTask", taskId],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      })
      const deleteTask = await response.json()
      return deleteTask
    },
    onSuccess: (deleteTask) => {
      queryClient.setQueryData("tasks", (currentTasks) => {
        return currentTasks.filter((oldTask) => oldTask.id != deleteTask.id)
      })
    },
  })
}
