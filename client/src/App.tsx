import { useEffect, useState } from 'react'
import './App.css'
import RecipeForm from './components/RecipeForm/RecipeForm'
import RecipeList from './components/RecipeList/RecipeList'

function App() {
  const url = "http://localhost:3000";

  const [recipes, setRecipes] = useState<{ name: string; category: string; ingredients: string }[]>([]);
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await fetch(`${url}/recipe`)

      if (res.ok) {
        const data = await res.json();
        setRecipes(data)
        console.log(data)
      }

    }

    const fetchCategories = async () => {
      const res = await fetch(`${url}/category`)

      if (res.ok) {
        const data = await res.json();
        setCategories(data)
        console.log(data)
      }

    }

    fetchRecipes();
    fetchCategories()
  }, [])


  return (
    <div className='app'>
      <h1>Recipe app</h1>
      <RecipeForm categories={categories} />
      <RecipeList recipes={recipes} setRecipes={setRecipes} categories={categories} />
    </div>
  )
}

export default App
