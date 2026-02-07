export const Task = ({ task, onDelete, onUpdate, categoryName }) => {
  const done = task.is_completed === true

  const handleDone = async () => {
    try {
      await onUpdate(task.id, { is_completed: !task.is_completed })
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  }

  const handleDelete = async () => {
    try {
      await onDelete(task.id)
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  }

  return (
    <div className="category">
      <input
        type="checkbox"
        checked={done}
        onChange={handleDone}
      />
      <p
        style={{
          textDecoration: done ? "line-through" : "none",
          color: done ? "gray" : "black"
        }}
      >
        {task.description} ({categoryName})
      </p>
      <button onClick={handleDelete}>Supprimer</button>
    </div>
  )
}
