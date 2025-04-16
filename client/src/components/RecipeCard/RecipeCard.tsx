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
    const [newCategory, setNewCategory] = useState<string>(category); // Changed to string
    const [newIngredients, setNewIngredients] = useState(ingredients);
    const [categoryName, setCategoryName] = useState('');

    const handleModify = () => {
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/recipe/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newName,
                    category: newCategory,
                    ingredients: newIngredients
                })
            });

            if (res.ok) {
                const updatedRecipe = await res.json();
                onModifySuccess?.(updatedRecipe);
                setShowModal(false);
            }
        } catch (error) {
            console.error("Error updating recipe:", error);
        }
    };

    useEffect(() => {
        const selectedCategory = categories.find(cat => cat.id.toString() === newCategory);
        if (selectedCategory) {
            setCategoryName(selectedCategory.title);
        }
    }, [newCategory, categories]);

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

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Edit Recipe</h3>
                        <input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="Name"
                        />
                        <select
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                        >
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id.toString()}>
                                    {cat.title}
                                </option>
                            ))}
                        </select>
                        <textarea
                            value={newIngredients}
                            onChange={(e) => setNewIngredients(e.target.value)}
                            placeholder="Ingredients"
                        />
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