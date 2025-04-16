import { IRecipeCard } from '../../interfaces'
import RecipeCard from '../RecipeCard/RecipeCard'
import './style.css'

interface Category {
    id: number;
    createdAt: string;
    title: string;
}

const RecipeList = ({
    recipes,
    setRecipes,
    categories
}: {
    recipes: IRecipeCard[];
    setRecipes: React.Dispatch<React.SetStateAction<IRecipeCard[]>>;
    categories: Category[]
}) => {

    const handleModifySuccess = (updatedRecipe: IRecipeCard) => {
        setRecipes(prev =>
            prev.map(recipe =>
                recipe.id === updatedRecipe.id ? updatedRecipe : recipe
            )
        );
    };

    const deleteRecipe = async (id: number) => {
        console.log(id);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/recipe/${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            setRecipes(recipes.filter(r => r.id !== id));
        }
    };

    return (
        <div>
            <h2>List</h2>
            <div>
                {recipes.map((recipe, index) => (
                    <RecipeCard
                        key={index}
                        {...recipe}
                        categories={categories}
                        onDelete={() => recipe.id !== undefined && deleteRecipe(recipe.id)}
                        onModifySuccess={handleModifySuccess}
                    />
                ))}
            </div>
        </div>
    );
};


export default RecipeList