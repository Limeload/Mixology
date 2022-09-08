document.addEventListener('DOMContentLoaded', () => { 
    fetchDrinks();
})

let drinks = [];

const fetchDrinks = async () => {
let url = 'http://localhost:3000/drinks';

const response = await fetch(url);
drinks = await response.json();
displayDrinks(drinks);
}

// Displaying data that will render it into index.html(card)
const cocktailList = document.querySelector('#cocktail-list');

const displayDrinks = (drinks) => {
  const card = drinks.map((drink) => {
  return `
  <div class="container-card">
    <div class="card" style="width: 18rem;">
      <img src="${drink.strDrinkThumb}" class="card-img-top" alt="${drink.strDrink}">
      <div class="card-body">
        <p class="card-text">${drink.strDrink}</p>
        <h5 class="card-title">${drink.glass}</h5>
        <p>Category : ${drink.category}</p>
        <p id="ingredient-list">Ingredients: 
        ${drink.ingredients[0].ingredientName} - ${drink.ingredients[0].measurement} ${drink.ingredients[0].units},
        ${drink.ingredients[1].ingredientName} - ${drink.ingredients[1].measurement} ${drink.ingredients[1].units}
        </p>
        <p>Instructions : ${drink.instructions}</p>
      </div>
    </div>
    </div>
  `
})
.join('');
cocktailList.innerHTML = card;
};
fetchDrinks();


// Search a cocktail by name, glass

const searchByname = document.getElementById('search-bar');

searchByname.addEventListener('keyup', (e) => {
 const searchString = e.target.value;
 const filterDrinks =  drinks.filter(drink => {
    return (
      drink.strDrink.toLowerCase().includes(searchString.toLowerCase()) 
    )
  });
 displayDrinks(filterDrinks);
})

// Toggle light mode and dark mode

const element = document.getElementById("togglebtn");

element.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Random cocktail generator

function getRandomCocktail() {
  // get random index value
  let randomIndex = Math.floor(Math.random() * drinks.length);
  // get random item
  let item = drinks[randomIndex];
  cocktailList.innerHTML = "";
  displayDrinks([item]);
}


const randomDrinkbtn = document.getElementById("random-drink");
randomDrinkbtn.addEventListener("click", getRandomCocktail);

// Display all drinks

const showAllDrinks = document.getElementById("show-all");
showAllDrinks.addEventListener("click", () => {
  displayDrinks(drinks);
});