import View from './View.js';
import icons from 'url:../../img/icons.svg';

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded';

  _window = document.querySelector('.add-recipe-window');
  // => addRecipe window
  _overlay = document.querySelector('.overlay');
  // => The whole page
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  // => ADD RECIPE button in the UI
  _btnClose = document.querySelector('.btn--close-modal');
  // => "X" button to close for the addRecipe

  constructor() {
    super();
    this._addHandlerShowWindow();
    // This constructor was made to call "_addHandlerShowWindow()" automatically
    // super() => to make "this._" to work

    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    // .bing(this) => if not used, the toggleWindow(this) = this._btnOpen
    // toggleWindow() => was created because "this._overlay" will point to "this.btnOpen"
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
    // Close window when click on "X" or "overlay"
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      // Always prevent default when submitting

      const dataArr = [...new FormData(this)];
      // new FormData(formElement) => returns a object with all the data
      // (formElement) => this._parentElement => data to Form
      // [...] => to spread the FormData object into a array so we can use it

      const data = Object.fromEntries(dataArr);
      // => converts the Array of Data into a Object

      console.log(data);

      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new addRecipeView();
