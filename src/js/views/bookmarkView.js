import View from './View.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    // console.log(this._data);
    // => returns => model.state.search.results

    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
    // .render(false) => was used so it won't call in here
    // => So we can call it on the render() in "View.js"
    // => because .render this._data from here it won't work
    // => because we have to return a string first to the main .render()
  }
}

export default new BookmarksView();
