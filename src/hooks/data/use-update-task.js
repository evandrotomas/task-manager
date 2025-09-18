import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (newTask) => {
      const { data: updatedtask } = await axios.patch(
        `http://localhost:3000/tasks/${taskId}`,
        {
          title: newTask.title.trim(),
          description: newTask.description.trim(),
          time: newTask.time.trim(),
        },
      )
      queryClient.setQueryData("tasks", (oldTasks) => {
        return oldTasks.map((oldTask) => {
          if (oldTask.id === taskId) {
            return updatedtask
          }
          return oldTask
        })
      })
    },
  })
}
