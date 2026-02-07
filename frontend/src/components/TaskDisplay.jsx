import { Task } from "./Task"

export const TaskDisplay = ({ taskList, filter, deleteTask, updateTask, categories }) => {
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Sans catégorie';
  };

  const filteredTasks = taskList.filter(task => {
    if (filter === "all") return true;
    return getCategoryName(task.category) === filter;
  });

  return (
    <>
      {filteredTasks.length > 0 &&
        filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onUpdate={updateTask}
            categoryName={getCategoryName(task.category)}
          />
        ))
      }
      {filteredTasks.length === 0 && taskList.length > 0 && (
        <p>Aucune tâche dans cette catégorie.</p>
      )}
      {taskList.length === 0 && <p>Aucune tâche à afficher.</p>}
    </>
  )
}
