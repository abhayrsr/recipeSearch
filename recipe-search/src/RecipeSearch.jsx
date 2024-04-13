import React, { useState, useEffect } from "react";

export default function RecipeSearch() {
  const [recipeData, setRecipeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
   const delay = 1000; // Delay in milliseconds
    let timeoutId;

    const fetchData = () => {
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

          const debouncedFetchData = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(fetchData, delay);
        };
    
        // Call the debouncedFetchData function when searchTerm changes
        debouncedFetchData();
    
        // Clean up the timeout when the component unmounts or searchTerm changes
        return () => clearTimeout(timeoutId);
      };
  }, [searchTerm]);

  function handleSearch(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <div>
      <h1>Recipe Search</h1>
      <input type="search" value={searchTerm} onChange={handleSearch} />
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
