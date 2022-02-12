import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The dara to be rendered (ex. recipe)
   * @param {boolean} [render = true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Elvis Cen
   * @todo Finish implementation
   */

  // @param => parameter
  // {whatToExpect to receive}
  // data => name of the parameter

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    // => If no data, or data .isArray && empty => renderError

    this._data = data;
    // this.data => recipeView.render(model.state.recipe); on the controller.js
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    // Emptying recipe container
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    // Add data to recipe container
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();

    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // => create a copy of the classes that contains "newMarkup" data

    const newElements = Array.from(newDOM.querySelectorAll('*'));
    // => selects all the elements('*')
    // => returns a node list
    // => Array.from() to convert into array

    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Updated changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // Make sure textContent contain only text, and is not empty before changing it
        // .nodeValue => returns only textContent
        // => if not curEl.textContent = newEl.textContent; will override unwanted code
        // => added optional chainig ?. because firstChild may not always exist
        curEl.textContent = newEl.textContent;
      }

      // Updated changed Attributes
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(
          // => all "false" attributes .forEach()
          attr => curEl.setAttribute(attr.name, attr.value)
          // => replace all attributes of 'curEl' from 'newEl'
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
    // Emptying recipe container
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div> 
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    // Grabs parent element, clears it, and insert the spinner
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
