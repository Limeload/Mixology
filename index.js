document.addEventListener('DOMContentLoaded', () => { 
    fetchDrinks();
})

let drinks = [];
let drinksArray = [];
let numberOfDrinks;

const fetchDrinks = async () => {
let url = 'http://localhost:3000/drinks';

const response = await fetch(url);
drinks = await response.json();
drinksArray = [...drinks];
numberOfDrinks = drinks.length;
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
      </div>
    </div>
    </div>
  `
})
.join('');
cocktailList.innerHTML = card;
};
fetchDrinks();



// Search a cocktail by name

const searchByname = document.getElementById('search-bar');

searchByname.addEventListener('keyup', (e) => {
 const searchString = e.target.value;
 const filterDrinks =  drinks.filter(drink => {
    return (
      drink.strDrink.includes(searchString) || 
      drink.glass.includes(searchString)
    );
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
  let randomIndex = Math.floor(Math.random() * numberOfDrinks);
  // get random item
  let item = drinksArray[randomIndex];
  cocktailList.innerHTML = "";
  displayDrinks(item);
}


const randomDrinkbtn = document.getElementById("random-drink");
randomDrinkbtn.addEventListener("click", getRandomCocktail);

// Display all drinks

const showAllDrinks = document.getElementById("show-all");
showAllDrinks.addEventListener("click", () => {
  displayDrinks(drinks);
});