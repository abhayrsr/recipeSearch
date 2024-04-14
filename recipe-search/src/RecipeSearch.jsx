import React, { useState} from "react";
import debounce from "lodash.debounce";

export default function RecipeSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipeData, setRecipeData] = useState([]);


  const debouncedSearch = debounce(() => {
    console.log("searchterm2:" + searchTerm)
    const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=daabd34a&app_key=c949044cdd2a395d1770fbf917ed8524&q=${searchTerm}`;
    fetch(baseUrl)
          .then(
            (response) => response.json() 
            //handle the response from the server.
          )
          .then((data) => {
            setRecipeData(data.hits);
            console.log(recipeData);
            //handle the JSON data returned
          })
          .catch((err) => {
            console.log("Error:", err);
          });
  }, 500)

const handleInputChange = (event) => {
  setSearchTerm(event.target.value);
  debouncedSearch();
  console.log("searchTerm1" + searchTerm);
}


  return (
    <div>
      <h1>Recipe Search</h1>
      <input type="search" value={searchTerm} onChange={handleInputChange} />
      <ul>
        {/* {
            recipeData.length !== 0 ? (
                <div>
                    {recipeData.map((recipe) =>{
                        console.log(recipe)
                        return (
                        <li>
                            <h3> {recipe.dishType} </h3>
                            <div> {recipe.ingredients.map((ingredient) => {
                                return (
                                    <p>
                                        {ingredient.text}
                                    </p>
                                )
                                })}
                            </div>
                        </li>
                        )
                    }   
                    )}
                </div>
            ) : (<div></div>)
        } */}
      </ul>
      
    </div>
  );
}
