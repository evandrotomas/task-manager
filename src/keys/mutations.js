export const taskMutationKeys = {
  add: () => ["add-tasks"],
  update: (taskId) => ["update-task", taskId],
  delete: (taskId) => ["delete-task", taskId],
}
