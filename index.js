document.addEventListener('DOMContentLoaded', () => { 
    fetch('http://localhost:3000/drinks', {method : 'GET'})
    .then(response => response.json())
    .catch(error => console.error("Error:", error))
    .then(response => console.log("Success:", JSON.stringify(response)))
    .then(cocktails => displayCocktails(cocktails?.drinks));
    // fetchDrinks();
})

// function fetchDrinks() {
//   fetch('http://localhost:3000/drinks', {method : 'GET'})
//   .then(response => response.json())
//   .then(cocktails => displayCocktails(cocktails.drinks));
// }
   
// Displaying data that will render it into index.html(card)
 displayCocktails = cocktails => {
  
 const cocktailList = document.querySelector("#cocktail-list");
  
    cocktails?.forEach(cocktail => {
    const {name, image} = cocktail;
    let cocktailImg = document.createElement("img");
    cocktailImg.src = image;
    cocktailList.appendChild(cocktailImg);
  
    let cocktailName = name;
    let heading = document.createElement("h1");
    heading.innerHTML = cocktailName;
    cocktailList.appendChild(heading);
  })
  
}
