import { useState, useEffect } from 'react';
import './App.css';
import { Filter } from './components/Filter';
import { AddCategory } from './components/AddCategory';
import { AddTask } from './components/AddTask';
import { TaskDisplay } from './components/TaskDisplay';
import { ErrorMessage, SuccessMessage } from './components/ErrorMessage';
import { useCategories, useTasks } from './api.js'

function App() {
  const [filter, setFilter] = useState("all");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { data: categories, isLoading: isLoadingCategory, error: errorCategory, create: createCategory } = useCategories();
  const { data: taskList, error: errorTask, create: createTask, remove: deleteTask, update: updateTask } = useTasks()

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleAddCategory = async (categoryInput) => {
    if (!categoryInput.trim()) {
      setErrorMessage("Le nom de la catégorie ne peut pas être vide");
      return;
    }

    if (categories?.some(cat => cat.name === categoryInput)) {
      setErrorMessage("Cette catégorie existe déjà");
      return;
    }

    try {
      await createCategory({ name: categoryInput });
      setSuccessMessage(`Catégorie "${categoryInput}" créée avec succès`);
      setErrorMessage("");
    } catch (error) {
      console.error('Erreur création:', error);
      setErrorMessage("Erreur lors de la création de la catégorie");
    }
  };

  const handleFilter = (value) => {
    setFilter(value);
  };

  const handleTaskSubmit = async (task) => {
    if (!task.name.trim()) {
      setErrorMessage("Le nom de la tâche ne peut pas être vide");
      return;
    }

    if (taskList?.some((existingTask) => existingTask.description === task.name)) {
      setErrorMessage("Cette tâche existe déjà");
      return;
    }

    const category = categories.find((cat) => cat.name === task.category)
    if (!category) {
      setErrorMessage("Catégorie introuvable");
      return;
    }

    try {
      await createTask({ description: task.name, category: category.id })
      setSuccessMessage(`Tâche "${task.name}" ajoutée avec succès`);
      setErrorMessage("");
    } catch (error) {
      console.error('Erreur création tâche:', error);
      setErrorMessage("Erreur lors de la création de la tâche");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setSuccessMessage("Tâche supprimée avec succès");
      setErrorMessage("");
    } catch (error) {
      console.error('Erreur suppression:', error);
      setErrorMessage("Erreur lors de la suppression de la tâche");
    }
  };

  if (isLoadingCategory && !categories) {
    return (
      <div className="App">
        <h1>Ma To-Do List par Catégories</h1>
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Ma To-Do List par Catégories</h1>

      <SuccessMessage
        message={successMessage}
        onClose={() => setSuccessMessage("")}
      />

      <ErrorMessage
        message={errorMessage}
        onClose={() => setErrorMessage("")}
      />

      {errorCategory && (
        <ErrorMessage
          message={`Erreur de chargement: ${JSON.stringify(errorCategory)}`}
        />
      )}

      {errorTask && (
        <ErrorMessage
          message={`Erreur tâches: ${JSON.stringify(errorTask)}`}
        />
      )}

      <AddCategory handleAddCategory={handleAddCategory} />

      <Filter
        handleFilter={handleFilter}
        categoryList={categories?.map(cat => cat.name) || []}
      />

      <AddTask
        handleTaskSubmit={handleTaskSubmit}
        categoryList={categories?.map(cat => cat.name) || []}
      />

      <TaskDisplay
        taskList={taskList || []}
        filter={filter}
        deleteTask={handleDeleteTask}
        updateTask={updateTask}
        categories={categories || []}
      />
    </div>
  );
}

export default App;
