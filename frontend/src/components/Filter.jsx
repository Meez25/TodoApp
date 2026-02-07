export const Filter = ({ categoryList, handleFilter }) => {
    return (
        <select id="filter-category" name="filter-category" onChange={e => handleFilter(e.target.value)}>
            <option value="all">Toutes les catégories</option>
            {categoryList.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
            ))
            }
        </select>
    )
}
