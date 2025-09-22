import { LoaderIcon, Tasks2Icon, TasksIcon } from "../assets/icons"
import { useGetTasks } from "../hooks/data/use-get-tasks"
import DashboardCard from "./DashboardCard"

const DashboardCards = () => {
  const { data: tasks } = useGetTasks()

  const inProgressTasks = tasks?.filter(
    (task) => task.status === "in_progress",
  ).length
  const completedTasks = tasks?.filter((task) => task.status === "done").length
  const notStartedTasks = tasks?.filter(
    (task) => task.status === "not_started",
  ).length

  return (
    <div className="grid grid-cols-4 gap-9">
      <DashboardCard
        icon={<Tasks2Icon />}
        mainText={tasks?.length}
        secondaryText={"Total de tarefas"}
      />
      <DashboardCard
        icon={<LoaderIcon />}
        mainText={notStartedTasks}
        secondaryText={"Tarefas não iniciadas"}
      />
      <DashboardCard
        icon={<LoaderIcon className="animate-spin" />}
        mainText={inProgressTasks}
        secondaryText={"Tarefas em andamento"}
      />
      <DashboardCard
        icon={<TasksIcon />}
        mainText={completedTasks}
        secondaryText={"Tarefas concluídas"}
      />
    </div>
  )
}

export default DashboardCards
