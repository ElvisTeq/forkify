import * as model from './model.js';
// import 'everything' as 'name' from 'file'

import { MODAL_CLOSE_SEC } from './config.js';

import recipeView from './views/recipeView.js';

import searchView from './views/searchView.js';

import resultsView from './views/resultsView.js';

import paginationView from './views/paginationView.js';

import bookmarkView from './views/bookmarkView.js';

import addRecipeView from './views/addRecipeView.js';

/* _______________________________________________________
// Parcel 1
// import icons from '../img/icons.svg';

moved to 'view'

// Parcel 2
import icons from 'url:../img/icons.svg';
// type="module" => was added to the HTML <cript></cript> in order to work
// => this is a file
__________________________________________________________*/

// --------------------------=> For old browsers to work
// Polyfilling everthing else
import 'core-js/stable';
// Polyfilling async/await
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const recipeContainer = document.querySelector('.recipe');

/* ______________________________________________________________
// Moved to => helper.js

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
 ______________________________________________________________*/

// https://forkify-api.herokuapp.com/v2

//////////////////////////////////////////////////////////////////////

// #2

// Loading recipe form API
// => aditional notes on notes.js

// installed & import
// => core-js
// => core-js regenerator-runtime

/* _______________________________________________________
// Moved to => 'view'

const renderSpinner = function (parentEl) {
  const markup = `
  <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> 
  `;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
  // Grabs parent element, clears it, and insert the spinner
};
__________________________________________________________*/

// #2 => Loading Recipe API

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    recipeView.renderSpinner();
    // adds spinner before fetching data finishes loading

    // 0) Update result view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmarks);

    // 1) Loading recipe
    await model.loadRecipe(id);
    // we need to call model.loadRecipe() because => loadRecipe is a module from model
    // await => was used because => async function

    /* ______________________________________________________

    // This mas refactored => moved to model.js

    const res = await fetch(
      // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    // numbers after the => /recipe/#NUMBERS
    // => is a ID of an object data
    // => so by only changing the ID, we will get a different recipe

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    console.log(res, data);

    let { recipe } = data.data;
    // recipe = data.data.recipe

    // console.log(recipe)
    // => unorganized object with recipe data

    // Formatting {recipe} => So everything is in order
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      serving: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);

    ____________________________________________________________ */

    // 2) Rendering recipe

    recipeView.render(model.state.recipe);
    // same as =>
    // const recipeView = new recipeView(model.state.recipe)

    /* _________________________________________________________

// Refactored to => recipeView.js

    const markup = `
    <figure class="recipe__fig">
    <img src="${recipe.image}" alt="${
      recipe.title
    }" class="recipe__img" crossorigin/>
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        recipe.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        recipe.serving
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">

    ${recipe.ingredients
      .map(ing => {
        return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${ing.quantity}</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>
      `;
      })
      .join('')}

      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">0.5</div>
        <div class="recipe__description">
          <span class="recipe__unit">cup</span>
          ricotta cheese
        </div>
      </li>
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        recipe.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>
  `;
    // Emptying recipe container
    recipeContainer.innerHTML = '';
    // Add data to recipe container
    recipeContainer.insertAdjacentHTML('afterbegin', markup);

    _________________________________________________________ */
  } catch (err) {
    recipeView.renderError();
    console.error(err);
    // throw err => was added on "model.js"
    // => So it connects to this one
    // => If we console.log => the error will be shown as from this module
  }
};

//////////////////////////////////////////////////////////////////////

// #3

// Listening For load and hashchange Events

// ------------------------- window.addEventListener('hashchange', _)
// Hash => the '#CODE' on the link

// window.addEventListener('hashchange', showRecipe);
// // in addEventListener to the HTML
// // any '#Hash' change => will call showRecipe()

// ------------------------ window.location.hash
// => current window hash => #CODE

// window.addEventListener('load', showRecipe);
// // => on load will fire showRecipe with current #Hash

//
// ******** Calling multiple eventListener at the same time **********
//

/* ____________________________________________________________
moved to View => #7. Publisher-Subscriber pattern

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipe)
);
_____________________________________________________________*/
// Guard close was added on ShowRecipe for ID
// => if (!id) on loadEvent => return

//////////////////////////////////////////////////////////////////////

// #4

// The MVC Architecture => .290
// => Model View Controller
// => Code on Notes.js

//////////////////////////////////////////////////////////////////////

// #5

// Refactoring for Model View Controller (MVC)

// on js folder => model.js created
// on js folder => views folder created
// on views folder => recipeView.js created

//////////////////////////////////////////////////////////////////////

// #6

// Helpers and configuration files

// notes.js

//////////////////////////////////////////////////////////////////////

// #7

// Event handlers in MVC - Publisher-Subscriber patters

// Need to use "init()"

//_________________________________________________________
// #9 => Implementing Search result .p1
const controlSearchResults = async function () {
  try {
    // resultsView.renderSpinner();
    console.log(resultsView);

    // 1. Get Search Query
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Load Search results
    await model.loadSearchResults(query);

    // 3. Render Results
    // console.log(model.state.search.results);
    // This is where "model.loadSearchResults" data is stored

    // #10 => .296 => confusing
    resultsView.render(model.getSearchResultsPage());
    // => resultsView has inherited ".render"
    // => So we can call "render()"

    // 4. Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
//_________________________________________________________
// #12 => Implementing Pagination .p2

const controlPagination = function (goToPage) {
  // 1. Render New results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // => .render => automatically overrides all data because it contains a clear() method

  // 2. Render New Pagination Buttons
  paginationView.render(model.state.search);
};

//_________________________________________________________
// #14 => Servings

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe View
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

//_________________________________________________________
// #16 => implementing bookmarks

// When click
const controlAddBookmark = function () {
  // 1) Add/Remove Bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // console.log(model.state.recipe);

  // 2) Update Recipe View
  recipeView.update(model.state.recipe);

  // 3) Render Bookmarks
  bookmarkView.render(model.state.bookmarks);
};

//_________________________________________________________
// #18 => fixing bug

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

//_________________________________________________________
// #20 => Updating newRecipe

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // console.log(newRecipe);
    await model.uploadRecipe(newRecipe);
    // => this function returns a promise, so we need to await
    // => and make this function async
    // => for the catch(err) to work
    console.log(model.state.recipe);

    // Render Recipe
    recipeView.render(model.state.recipe);

    // Success Message
    addRecipeView.renderMessage();

    // Render Bookmark view
    bookmarkView.render(model.state.bookmarks);

    // Change ID in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close Form window automatically
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};
//_________________________________________________________
// Testing git branch
const newFeature = function () {
  console.log('Welcome to the application');
};

//_________________________________________________________

const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  // This was added to add the bookmark ASAP before controlRecipe()
  // => it was causing a bug where "bookmarkView.update" was trying compare data that were not supposed to

  recipeView.addHandlerRender(controlRecipe);
  // 'addHandlerRender' is a method imported from 'recipeView'
  // => Se we can just call the method with our 'controlRecipe'

  recipeView.addHandlerUpdateServings(controlServings);
  // When servings "+", "-" button click
  // => Update servings

  recipeView.addHandlerAddBookmark(controlAddBookmark);
  // Setting bookmarked to "true" on bookmark icon click
  // => then change bookmark icon to bookmarked

  searchView.addHandlerSearch(controlSearchResults);
  // When "submitEvent" happends => call controlSearchResult()
  // => subscriber of "addHandlerSearch()" of 'searchView.js'

  paginationView.addHandlerClick(controlPagination);
  // paginationView => search results window
  // .addHandlerClick => page button handler

  addRecipeView.addHandlerUpload(controlAddRecipe);
  // When Upload is clicken in the AddRecipe window

  newFeature();
};
init();

//////////////////////////////////////////////////////////////////////

// #8

// Implementing  Error & Success Messages

// Displaying messages on UI => User Interface

// message(message) => was created on the "View"

// renderError(message) => was created on the "View"

// Modification on => {} catch(err) {} => from "controlRecipe()"
// => recipeView.renderError();
// => throw err => was added on "model.js"

//////////////////////////////////////////////////////////////////////

/*

// #9

// Implementing Search result .p1

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults('pizza');
  } catch (err) {
    console.log(err);
  }
};

*/

//////////////////////////////////////////////////////////////////////

// #10

// Implementing Search result .p2

//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
