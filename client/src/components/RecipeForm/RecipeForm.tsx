import { useState } from 'react';
import './style.css';

interface IRecipeForm {
    categories: Category[];
}

interface Category {
    id: number;
    createdAt: string;
    title: string;
}

const RecipeForm = ({ categories }: IRecipeForm) => {
    const url = "http://localhost:3000";

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        ingredients: ''
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await addRecipe();
    };

    const addRecipe = async () => {
        try {
            const res = await fetch(`${url}/recipe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                const data = await res.json();
                console.log("Recipe added:", data);
                // Optionally reset form or update state here
            } else {
                console.error("Failed to add recipe");
            }
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <form className='formContainer' onSubmit={handleSubmit}>
            <h2 className='formTitle'>Create a New Recipe</h2>

            <div className='formGroup'>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Recipe name"
                />
            </div>

            <div className='formGroup'>
                <label htmlFor="category">Category</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.title}</option>
                    ))}
                </select>
            </div>

            <div className='formGroup'>
                <label htmlFor="ingredients">Ingredients</label>
                <textarea
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    required
                    placeholder="List of ingredients"
                />
            </div>

            <button className='submitButton' type="submit">Add Recipe</button>
        </form>
    );
};

export default RecipeForm;
