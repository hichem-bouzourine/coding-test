import { useEffect, useState } from 'react'
import './App.css'
import RecipeForm from './components/RecipeForm/RecipeForm'
import RecipeList from './components/RecipeList/RecipeList'

interface Recipe {
  id?: number;
  name: string;
  category: string;
  ingredients: string;
}

interface Category {
  id: number;
  createdAt: string;
  title: string;
}

function App() {
  const url = import.meta.env.VITE_API_URL;

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const handleAddRecipe = (newRecipe: Recipe) => {
    setRecipes(prevRecipes => [...prevRecipes, newRecipe]);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await fetch(`${url}/recipe`)
      if (res.ok) {
        const data = await res.json();
        setRecipes(data)
      }
    }

    const fetchCategories = async () => {
      const res = await fetch(`${url}/category`)
      if (res.ok) {
        const data = await res.json();
        setCategories(data)
      }
    }

    fetchRecipes();
    fetchCategories()
  }, [])

  return (
    <div className='app'>
      <h1>Recipe app</h1>
      <RecipeForm categories={categories} onAddRecipe={handleAddRecipe} />
      <RecipeList recipes={recipes} setRecipes={setRecipes} categories={categories} />
    </div>
  )
}

export default App