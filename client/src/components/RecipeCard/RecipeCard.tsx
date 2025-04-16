import { useEffect, useState } from 'react';
import { IRecipeCard } from '../../interfaces';
import './style.css';

interface Category {
    id: number;
    createdAt: string;
    title: string;
}


interface Props extends IRecipeCard {
    onDelete?: () => void;
    onModifySuccess?: (updated: IRecipeCard) => void;
    categories: Category[];
}

const RecipeCard = ({ id, name, ingredients, category, onDelete, onModifySuccess, categories }: Props) => {
    const [showModal, setShowModal] = useState(false);
    const [newName, setNewName] = useState(name);
    const [newCategory, setNewCategory] = useState(category);
    const [newIngredients, setNewIngredients] = useState(ingredients);

    const [categoryName, SetCategoryName] = useState('')

    const handleModify = () => {
        setShowModal(true);
    };

    const handleSave = async () => {
        const res = await fetch(`http://localhost:3000/recipe/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: newName,
                category: newCategory,
                ingredients: newIngredients
            })
        });

        if (res.ok) {
            const data = await res.json();
            onModifySuccess?.({ id, name: newName, category: newCategory, ingredients: newIngredients });
            setShowModal(false);
        }
    };


    useEffect(() => {
        const fetchCategory = async () => {
            const res = await fetch(`http://localhost:3000/category/${category}`);

            if (res.ok) {
                const data = await res.json();
                SetCategoryName(data.title);
            }
        };

        fetchCategory();
    }, []);

    return (
        <>
            <div className="recipe-card">
                <div className="card-header">
                    <h2>{name}</h2>
                    <div className="card-actions">
                        <button className="btn edit" onClick={handleModify}>Modify</button>
                        <button className="btn delete" onClick={onDelete}>Remove</button>
                    </div>
                </div>
                <div className="card-body">

                    <span className="category-tag">{categoryName}</span>

                    <p className="ingredients">{ingredients}</p>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Edit Recipe</h3>
                        <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Name" />
                        <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.title}</option>
                            ))}
                        </select>
                        <textarea value={newIngredients} onChange={(e) => setNewIngredients(e.target.value)} placeholder="Ingredients" />
                        <div className="modal-actions">
                            <button className="btn save" onClick={handleSave}>Save</button>
                            <button className="btn cancel" onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RecipeCard;
