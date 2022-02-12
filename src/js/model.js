import { async } from 'regenerator-runtime';

import { API_URL, RES_PER_PAGE, KEY } from './config.js';

// import { getJSON, sendJSON } from './helpers.js';
// => this was refactored to AJAX

import { AJAX } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  // recipe = data.data.recipe

  // console.log(recipe)
  // => unorganized object with recipe data

  // Formatting {recipe} => So everything is in order
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    serving: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
    // && => If recipe.key = false => nothing happends
    // && => if recipe.key = true => key = recipe.key
    // ... => Does nothing in here => was just needed for "&&" to work
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);

    state.recipe = createRecipeObject(data);
    // assigning recipe to => state so we can export it

    // Check if current ID is on bookmark or not
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    // console.log(state.recipe);
  } catch (err) {
    // Temporary error handling
    console.error(`${err} ****`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    // Original Link = https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza
    // => automatically returns a list of recipes for a specific search query

    // Storing data to "state" => because is what the other modules use for data
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        ...(recipe.key && { key: recipe.key }),
      };
    });

    // __________________________________________________________
    // Temporal bug fix #22
    state.search.results = state.search.results.filter(
      recipe => recipe.publisher !== 'Elvis Tek'
    );
    // _________________________________________________________

    state.search.page = 1;
    // Set default page after loading new recipe
  } catch (err) {
    console.error(`${err} ****`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

// #14
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.serving;
    // newIngQt = oldIngQt * newServings / oldServings // 2 * 8 / 4 = 4
  });

  // to preserve updated data from function
  state.recipe.serving = newServings;
};

// Storing bookmarks to localStorage
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
  // .setItem('name', string)
};

export const addBookmark = function (recipe) {
  // Add to bookmark
  state.bookmarks.push(recipe);

  // Add & Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  // Delete Bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  // .findIndex() => to find matching id
  state.bookmarks.splice(index, 1);
  // .splice(whatToDelete, ammountToDelete)

  // Unmark recipe as bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
  // JSON.parse() => convert string back into object
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
  localStorage.clear(state.recipes);
};

clearBookmarks();

export const uploadRecipe = async function (newRecipe) {
  try {
    // console.log(Object.entries(newRecipe));
    const ingredients = Object.entries(newRecipe)
      // Object.entries(object) => convert into array
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      // .filter() => for eachArr if index of [0] startsWith "ingredient"
      // && => index of [1] !== ''
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        // .trim() => removes blank spaces of both end of the string

        // const ingArr = ing[1]
        //   // .map => index [1] that contains 3 different data, then destructuring it
        //   .replaceAll(' ', '')
        //   // .replaceAll => to take out the spaces
        //   .split(',');
        // // .split(',') => divide a string with ",", and returns them in array

        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredients format!, Please use the correct format'
          );
        // To make sure to put the ","'s in the input field as asked in the add recipe

        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
        // => return them into Objects
        // if there's a quantity => return as "+" number => ":" else null
      });

    // Get all data together for API/ for other functions to work
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
      // => ingredients arr we created
    };
    console.log(recipe);

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    // Send Data to API

    state.recipe = createRecipeObject(data);
    // Store data to state, so we can use it in our API

    addBookmark(state.recipe);
    // Add created Recipe to Bookmark
  } catch (err) {
    throw err;
    // this function was async => so we need to use try/catch for the throw err to work
  }
};

localStorage.clear(state);
