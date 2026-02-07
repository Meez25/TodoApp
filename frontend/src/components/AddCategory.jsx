import { useState } from "react"

export const AddCategory = ({ handleAddCategory }) => {
  const [categoryInput, setCategoryInput] = useState("")

  const handleAdd = () => {
    handleAddCategory(categoryInput)
    setCategoryInput("")
  }

  return (
    <div id="category-input">
      <input placeholder='Nouvelle catégorie' type="text" value={categoryInput} onChange={e => setCategoryInput(e.target.value)} />
      <button id="categoryAddButton" onClick={handleAdd} >Ajouter catégorie</button>
    </div>
  )
}
