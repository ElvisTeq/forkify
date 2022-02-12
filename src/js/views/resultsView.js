import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe found for your query, Please try again';
  _message = '';

  _generateMarkup() {
    // console.log(this._data);
    // => returns => model.state.search.results

    return this._data.map(result => previewView.render(result, false)).join('');
    // .render(false) => was used so it won't call in here
    // => So we can call it on the render() in "View.js"
    // => because .render this._data from here it won't work
    // => because we have to return a string first to the main .render()
  }
}

export default new ResultsView();

/*

<div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>

*/
