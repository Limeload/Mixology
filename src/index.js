document.addEventListener('DOMContentLoaded', () => {
  fetchDrinks();
});

let drinks = [];

const fetchDrinks = async () => {
  let url = 'http://localhost:3000/drinks';

  const response = await fetch(url);
  drinks = await response.json();
  displayDrinks(drinks);
};

const cocktailList = document.querySelector('#cocktail-list');

const displayDrinks = (drinks) => {
  const cards = drinks.map((drink) => {
      return `
          <div class="container-card">
              <div class="card" style="width: 18rem;">
                  <img src="${drink.strDrinkThumb}" class="card-img-top" alt="${drink.strDrink}">
                  <div class="card-body">
                      <p class="card-text">${drink.strDrink}</p>
                      <h5 class="card-title">${drink.glass}</h5>
                      <p class="category">Category : ${drink.category}</p>
                      <p class="ingredients" id="ingredient-list">Ingredients:
                          ${drink.ingredients[0].ingredientName} - ${drink.ingredients[0].measurement} ${drink.ingredients[0].units},
                          ${drink.ingredients[1].ingredientName} - ${drink.ingredients[1].measurement} ${drink.ingredients[1].units},
                          ${drink.ingredients[2].ingredientName} - ${drink.ingredients[2].measurement} ${drink.ingredients[2].units}
                      </p>
                      <p class="instructions">Instructions : ${drink.instructions}</p>
                      <button class="like-button" id="drink-${drink.id}"><img src="./images/like.png" alt="" width="30"></button>
                      <span class="like-count" id="like-count-${drink.id}"> ${drink.likes}</span>
                  </div>
              </div>
          </div>
      `;
  }).join('');
  cocktailList.innerHTML = cards;

  // Add event listener to each like button
  const likeButtons = document.querySelectorAll('.like-button');
  likeButtons.forEach((button) => {
      button.addEventListener('click', () => {
          const drinkId = button.id.split('-')[1];
          const likeCount = document.querySelector(`#like-count-${drinkId}`);
          likeCount.textContent = Number(likeCount.textContent) + 1;
      });
  });
};

const searchByName = document.getElementById('search-bar');

searchByName.addEventListener('keyup', (e) => {
  const searchString = e.target.value;
  const filteredDrinks = drinks.filter(drink => {
      return drink.strDrink.toLowerCase().includes(searchString.toLowerCase());
  });
  displayDrinks(filteredDrinks);
});

const element = document.getElementById('togglebtn');

element.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

function getRandomCocktail() {
  const randomIndex = Math.floor(Math.random() * drinks.length);
  const item = drinks[randomIndex];
  cocktailList.innerHTML = '';
  displayDrinks([item]);
}

const randomDrinkBtn = document.getElementById('random-drink');
randomDrinkBtn.addEventListener('click', getRandomCocktail);

const showAllDrinks = document.getElementById('show-all');
showAllDrinks.addEventListener('click', () => {
  displayDrinks(drinks);
});
