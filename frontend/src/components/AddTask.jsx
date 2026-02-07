import { useState, useEffect } from "react"

export const AddTask = ({ handleTaskSubmit, categoryList }) => {
  const [task, setTask] = useState({
    name: "",
    category: categoryList.length > 0 ? categoryList[0] : ""
  })
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (categoryList.length > 0 && !task.category) {
      setTask(prev => ({ ...prev, category: categoryList[0] }))
    }
  }, [categoryList, task.category])

  const handleTaskChange = (taskName) => {
    setTask(prev => ({ category: prev.category, name: taskName }))
    if (localError) setLocalError("");
  }

  const handleTaskCategoryChange = (category) => {
    setTask(prev => ({ name: prev.name, category: category }))
  }

  const handleTaskAdd = () => {
    if (!task.category) {
      setLocalError("Veuillez sélectionner une catégorie ou en créer une d'abord");
      return;
    }
    setLocalError("");
    handleTaskSubmit(task)
    setTask({ name: "", category: categoryList.length > 0 ? categoryList[0] : "" })
  }

  return (
    <div>
      <div id="add-task">
        <input
          placeholder='Nouvelle tâche'
          type="text"
          value={task.name}
          onChange={e => handleTaskChange(e.target.value)}
        />
        <select
          id="category"
          name="category"
          onChange={e => handleTaskCategoryChange(e.target.value)}
          value={task.category}
          disabled={categoryList.length === 0}
        >
          {categoryList.length === 0 && (
            <option value="">Créer une catégorie d'abord</option>
          )}
          {categoryList.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit" onClick={handleTaskAdd}>Ajouter</button>
      </div>
      {localError && (
        <div style={{
          padding: '8px',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: '4px',
          color: '#856404',
          fontSize: '14px',
          marginTop: '5px'
        }}>
          {localError}
        </div>
      )}
    </div>
  )
}
