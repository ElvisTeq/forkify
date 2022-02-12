// Channged => Private"#" => to Protected"_"
// => because babel may not support it
class SearchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      // Always prevent default-reload on "submit" events
      handler();
      // Publisher of "controlSearchResults" in 'controller.js'
    });
  }
}

export default new SearchView();
// new => always export a new"fresh" class
