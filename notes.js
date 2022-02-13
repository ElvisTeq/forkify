'strict mode';

///////////////////////////////////////////////////////////////////////

// #1

// Project planning => .286

// 1. ********** User Stories **********
// => Description of the aplication's function from the user's perspective
// => Common Format: As a [type of user], I want [an action] so that [benefit]

// ex1: As a [user], I want to [search for recipes], so I can [find new idead for meals]
// => function to => input field to send request to API with keywords
// => Display result with pagination
// => Display recipe with cooking time, servings and ingredients

// ex2: As a [user], I want to be able to [update the numbers of servings], so that i can [cook a meal for different number of people]
// => function => upgrade all ingredients according to current number of servings

// ex3: As a [user], I want to [bookmark recipes], so that [I can review them later]
// => function => display list of all bookmarked recipes

// ex4: As a [user], I want to be able to [create my own recipes], so I can [have them all organized in the same app]
// => function => User crease own recipes => will automatically bookmarked
// => User can only see their own recipes, not reciped from other users

// ex5: As a [user], I want to be able to [see my bookmarks and own recipes when I leave the app and come back later], so than [I can close the app safely after cooking]
// => Store bookmark data in the browser using local storage
// => On page load, read saved bookmarks from local data storage and display

///////////////////////////////////////////////////////////////////////

// #2

// Loading recipe form API

// sass folder => better way to write CSS in a large scale => has to be converted to CSS using parcel

// ---------------------------------- npm i parcel@next -D
// => update parcel to new version

// ---------------------------------- npm i core-js regenerator-runtime
// was installed in the terminal to support old browsers

// A technique was use using .map().join()
// => loop over an object to change HTML data
// .join('') => was added to merge everything into a string

///////////////////////////////////////////////////////////////////////

// #3

// ------------------------- window.addEventListener('hashchange', _)
// => hash => the '#CODE' on the link

// window.addEventListener('hashchange', showRecipe);
// in addEventListener to the HTML
// any '#CODE' change => will call showRecipe()

// ------------------------ window.location.hash
// => current window hash => #CODE

//
// We can call multiple EventListener at the same time
//

// ['event1', 'event2'].forEach(event => addEventListener(event, function))

// Guard close was added to ID

///////////////////////////////////////////////////////////////////////

// #4

// The MVC Architecture => .290
// => Model View Controller

// Structure => Organization of COde
// Maintainability => Able to make changes in the future easily
// Expandability => Able to add features easily in the future
// => Everything combine = The Perfect Architecture

// -------- Components of any Architecture --------

// Business Logic
// => Code that solves the actual business problem

// State
// => Essentially stores all the data about the application
// => should be the 'single source of truth'
// => UI should be kept in sync with the state
// => state libraries exist

// HTTP Library
// => Responsible for making and receiving AJAX request
// => Optional but almost always necessary in real-world apps

// Application Logic (Router)
// => Code that is only concerned about the Implementation of Application irself
// => Handling UI Objects, and navigation of the page

// Presentation Logic (UI Layer)
// => Coda that is concerned about the Visible part of the application
// => Essentially displays application 'State' in sync

// --------------------------------------------

// ------------  Model view controller (MVC) Architecture

// Model
// => Businedd Logic
// => State
// => HTTP Libraries

// Controller
// => Application logic
// => Connection between 'Model' and 'View' (which they don't know about each other)
// => Handles UI events and 'dispatches tasks to 'Model' and 'View'

// View
// => Presentation Logic

///////////////////////////////////////////////////////////////////////

// #5

// Refactoring for Model View Controller (MVC)

// on js folder => model.js created
// on js folder => views folder created
// on views folder => recipeView.js created

///////////////////////////////////////////////////////////////////////

// #6

// Helpers and configuration files

// config.js => was created to contain the const/var that we going to reuse
// => magic values : values that has no explanations
// => var/const are : CAPITALIZED

// helpers.js => was create to contain all the functions we are reusing a lot in the project

// throw err => makes the importing module to throw the error instead of the original module

///////////////////////////////////////////////////////////////////////

// #7

// Event handlers in MVC - Publisher-Subscriber patters

// Subscriber => Code that wants to react
// => After loading, will pass code to Publisher

// Publisher => Code that know when to react
// => Doesn't know Subscriber exist
// => Blindly receive code from Subscribers as callbacks

//
// Using "init()" => call imported "Class.method(localMethod)"
//

///////////////////////////////////////////////////////////////////////

// #8

// Implementing  Error & Success Messages

// Displaying messages on UI => User Interface

// message(message) => was created on the "View"

// renderError(message) => was created on the "View"

// Modification on => {} catch(err) {} => from "controlRecipe()"
// => recipeView.renderError();
// => throw err => was added on "model.js"

///////////////////////////////////////////////////////////////////////

// #9

// Implementing Search result .p1

// loadSearchResults() => created on the "model.js"

// searchView.js => was created for a new Class

// Always e.preventDefault() reload on "submit" events

// Publisher/Subscriber => was used on "controlSearchResults()"

///////////////////////////////////////////////////////////////////////

// #10

// Implementing Search result .p2

// resultsView.js => was created

// View.js => was created

// RecipeView class => changed Truly Private "#" => to only protected "_"
// => because babel was not supporting it

// Refactoring some Render methods from "recipeView.js" => to "View.js"
// => class "extends" was used on "recipeView.js" to "View.js"

// added error handling message to search results in "View" & "resultsView"

///////////////////////////////////////////////////////////////////////

// #11

// Implementing Pagination .p1

// resultsPerPage => was added to "state.search"

// getSearchResultsPage() => was created to calculate pages to be 10 by 10
// => RES_PER_PAGE was a magic value, so it was moved to "config.js"
// => method added to "controlSearchResults()" to render it
// => npm was resetted to work
// => module.hot was disabled in "controller"
// => page was stored to "state.search", value set to 1 default

/*
// ______________________________________________
=> Math implemented to render 10 by page

const start = (page - 1) * 10
const end = page * 10

allResults.slice(start, end)
}
// ______________________________________________
*/

///////////////////////////////////////////////////////////////////////

// #12

// Implementing Pagination .p2
// => button for pages

// paginationView.js => module created
// => _generateMarkup() is created on every view module, so is automatically called on the main "view.js" module

// controlPagination() => created on "controller.js"

///////////////////////////////////////////////////////////////////////

// #13

// Project Planing .II
///////////////////////////////////////////////////////////////////////

// #14

// Updating recipe servings => .300

// updateServings() => created on "model.js"
// => Using "state.recipe.ingredients.quantity"
// => to manipulate "state.recipe.serving"

// addHandlerUpdateServings() => added on "recipeView.js"

// dataset.updateTo (JS) = data-update-to (in the DOM)
// => "-" are Converted to Cammel Case

///////////////////////////////////////////////////////////////////////

// #15

// Developing a DOM Updating Algorithm
// => Updating only specific part of the DOM

// ________________________________________________________________
// ---------------------------------- document.createRange()
// ------------------------------- .createContextualFragment(newMarkup)

// update() => created in "View.js"
// const newDOM = document.createRange().createContextualFragment(newMarkup);
// => creates a copy of all the classes that contains (newMarkup) elements

// attribute/setAttribute was used

// const newElements = newDOM.querySelectorAll('*');
// => selects all the elements('*')
// => returns a NODE List
// ________________________________________________________________

// ---------------------------------------- newEl.isEqualNode(curEl)
// => check for true/false if "newEl".isEqualNode to "curEl"

// --------------------------------------- .nodeValue
// => returns textContent
// => null if not
// ________________________________________________________________

// Changes added on "results.View.js"
// => _generateMarkupPreview()
// => to mark the selected recipe on the UI

///////////////////////////////////////////////////////////////////////

// #16

// Implementing Bookmarks .p1

// Fixed bug with pagination number reset after searching another menu
// => in the model "loadSearchResults()"

// controlAddBookmark() => created in "controller.js"

// addHandlerAddBookmark() => created in "recipeView.js"

// addBookmark() & deleteBookmark() => added on "model.js"

///////////////////////////////////////////////////////////////////////

// #17

// Implementing Bookmarks .p2

// bookmarkView.js => module created
// => is was a copy of the "resultsView.js"
// => was added to "controlAddBookmark()" to render
// => bookmarkView.update in controlRecipe() to fix highligh err

// previewView.js => module created
// => parent element of "resultsView.js" and "bookmarkView.js" because they were using the same code

// Changed made on "resultsView.js" and "bookmarkView.js"
// => _generateMarkup()

///////////////////////////////////////////////////////////////////////

// #18

// Storing Bookmarks With Local Storage

// persistBookmark() created on "model.js"

// debuger => was used on video .304

// controlBookmarks() => was created on "controller.js"
// => to fix the bug

// addHandlerRender() => was created on "bookmarksView.js"
// => then was added to the init()

// clearBookmark() => was created in "model.js"
// => we may need it in the future to clear the bookmarks

///////////////////////////////////////////////////////////////////////

// #19

// Project Planning .III

///////////////////////////////////////////////////////////////////////

// #20

// Uploading new Recipe p1

// addRecipeView.js => module created

// controlAddRecipe() => created on "constroller.js"
// => added to the init()

// ---------------------------------- new FormData(formEl)
// was used to convert the HTML element into a dataForm
// then [...] => was used to spread the data into a array to be able to use it

// ---------------------------------- Object fromEntries(array)
// => converts a array of data into a Object of data

///////////////////////////////////////////////////////////////////////

// #21

// Updating new Recipe p2

// uploadRecipe() => created on "model.js"
// => to filter/take the data of the ADD RECIPE

// --------------------------------- Object.entries(obj)
// => opposite of Object.fromEntries()
// convert Objects into array

// Added try{} catch() {} => to "controlAddRecipe()" in "controller.js"
// => throw new Error => in "model.js" module , "uploadRecipe()"

//
// ************** Sendind JSON ****************
// => To send data to the API
// sendJSON() => created in "helper.js"

// A trick for conditionally add Properties was used on "createRecipeObject()" in "model.js"
// => using "..." and "&&"

///////////////////////////////////////////////////////////////////////

// #22

// Updating new Recipe p3

// More changes to the "controlAddRecipe()" in the "controller.js"

// -------------------------------- window.history.pushState()
// => (state, 'title', 'URLToChange')
// => this was added to controlAddRecipe() => to change the URL with the ID of the new recipe

// window.history.back() => to go backwards

// Refactored getJSON() & sendJSON() into one function in "helper.js"
// AJAX(url, uploadData = undefined) => functions combined
// => if you give only a URL => getJSON
// => if URL and DATA is given => sendJSON

// Added KEY-icon to created recipes
// => we gave the created recipes a KEY for this reason
// ${KEY} => was added to the URL so it loads our data

// Changes made on "recipeView.js" and "previewView.js"
// => data contains KEY => remove "hidden" from the class to show the icon

// ...(recipe.key && { key: recipe.key })
// => was added to the data in the "model.js" so it returns the data with a KEY if contains
// => to show KEY icon in the pagination

// -----------------------------------------------
// Temporary bug fix about API
// => wrong data sent to API

// state.search.results = state.search.results.filter(
//   recipe => recipe.publisher !== 'Elvis Tek'
// );
// console.log(state.search.results);
// -----------------------------------------------

///////////////////////////////////////////////////////////////////////

// Final consideration

// --------------------------------------- /** */
// => use to write notes/documentation for co-workers
// => Example on "view.js"
// => VSCODE will automatically show people on mouse.hover the details we specify

///////////////////////////////////////////////////////////////////////

// Simple deploiment with Netify => .313

// www.netlify.com
// => static web publishing
// => to deploy web app that only contains HTML, CSS, JS, IMG

// => delete ".parcel-cache" and "dist" folder

// changes in the "package.json" file

// if parcel = version 2.0.0-beta.1, we need to add
// --dist-dir => distribution directory OPTION
// ./dist => FOLDER NAME
// => "build": "parcel build index.html --dist-dir ./dist"

// "default": "index.html"
// was => "main": "index.html"

///////////////////////////////////////////////////////////////////////

// Setting up Git and GitHub => .314

// ------------------------------ git init
// => convert the folder into git repository

//_________________________________________________________________
// Connect local installation into my GitHub account

// ------------------------------ git config --global user.name
// --global => all files
// user.name => my GitHub username

// ------------------------------ git config --global user.email
// user.email => my GutHub email
//_________________________________________________________________

///////////////////////////////////////////////////////////////////////

// Git fundamentals

// "gitignore" => file will be automatically created when "git init"
// => the files we put in here it will make Git to ignore it

// --------------------------------- git status
// => shows file that are untrack
// => "U" mark in the files

// --------------------------------- git add -A
// add file to git
// -A => all
// Files will be marked as "A" tracked

// "M" => when we do any changes on the file
// then is going to be untracked

// --------------------------------- git commit -m `Initial commit`
// `Initial commit` => name
// => turns our file back into normal
// "M" will still show if we make any changes

// --------------------------------- git reset --hard HEAD
// => to reset any changes made on the "M"

// --------------------------------- git commit -m "New feature"
// => To save/commit any changes to our code
// => make sure to "init add -A" before committing

// --------------------------------- git log
// => will log all commits I did
// => each commit has an ID that we need to use to go back
// => "Q" or ":q" key to quit the console command

// --------------------------------- git reset HARD ID
// ID =>  ID of the "git log"
// => to go back to previous saving files
// => not recommended when we doing a lot of changes
// => instead we create a new branch for the tree

// -------------------------------- git branch
// => to log the branch

// -------------------------------- git branch new-feature
// new-feature => name of the branch
// => create a new copy of the branch

// -------------------------------- git chechout new-feature
// => to select branch to work with
// new-feature => the name of the branch to select

// -------------------------------- git merge new-feature
// to merge 2 branch
// new-feature => the second branch we want to merge with the current one
