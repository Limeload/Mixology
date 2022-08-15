document.addEventListener('DOMContentLoaded', () => { 
    fetchDrinks();
})

const fetchDrinks = async () => {
let url = 'http://localhost:3000/drinks';

const response = await fetch(url);
const drinks = await response.json();

// Displaying data that will render it into index.html(card)
const cocktailList = document.querySelector('#cocktail-list');

let card = '' ;
drinks.forEach(drink => {
  card += `
  <div class="container-card">
    <div class="card border-dark" style="width: 18rem;">
      <img src="${drink.strDrinkThumb}" class="card-img-top" alt="${drink.strDrink}">
      <div class="card-body">
        <h5 class="card-title">${drink.idDrink}</h5>
        <p class="card-text">${drink.strDrink}</p>
        <h5 class="card-title">${drink.glass}</h5>
      </div>
    </div>
    </div>
  `
})
cocktailList.innerHTML = card;

}
   

