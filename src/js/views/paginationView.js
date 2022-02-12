import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      // clicked.target => closest parentElement(parentName)
      if (!btn) return;
      // Prevent error if don't click a button

      const goToPage = +btn.dataset.goto;
      // + = convert to number
      // => data-goto="" in the HTML

      handler(goToPage);
      // => this calls the function in the parameter
      // => and gives the function "goToPage" as parameter
    });
  }

  _generatePreviusBtn(currrentPage) {
    return `
          <button data-goto="${
            currrentPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currrentPage - 1}</span>
          </button>
    `;
  }

  _genetateNextBtn(currrentPage) {
    return `
          <button data-goto="${
            currrentPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${currrentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
    `;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Math.ceil => round integer up

    // Page 1, and more pages
    if (curPage === 1 && numPages > 1) {
      return this._genetateNextBtn(curPage);
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generatePreviusBtn(curPage);
    }

    // Other page
    if (curPage < numPages) {
      return [
        this._generatePreviusBtn(curPage),
        this._genetateNextBtn(curPage),
      ];
    }

    // Page 1, and no more other pages
    return '';
  }
}

export default new PaginationView();
