import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "./App.css";


export default function App() {
  const APP_ID = "caa91ba1";
  const APP_KEY = "e624888f761581b485ba811f6bad0607";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  },[query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits)
  };

  const getSeacrch= e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
  return (
    <div className="App">
      <form onSubmit={getSeacrch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipe-list">
      {recipes.map((recipe) => (
        <Recipe
        key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
        
      ))}
      </div>
    </div>
  );
}
