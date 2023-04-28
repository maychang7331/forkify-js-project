class SearchView {
  _header = document.querySelector('.header');
  _parentElement = document.querySelector('.search');
  _mobileSearch = document.querySelector('.nav__btn--search');
  _searchBoxField = this._parentElement.querySelector('.search__box--field');
  _suggestionList = document.querySelector('.search__suggestion--list');
  _selectedIndex = -1;

  constructor() {
    this._addHandlerShowSearch();
  }

  toggleMobileSearch() {
    this._header.classList.toggle('mobile--search');
  }

  closeMobileSearch() {
    this._header.classList.remove('mobile--search');
  }

  _addHandlerShowSearch() {
    this._mobileSearch.addEventListener(
      'click',
      this.toggleMobileSearch.bind(this)
    );
  }

  getQuery() {
    const query = this._searchBoxField.value;
    this._clearSuggestions();
    return query;
  }

  _clearSuggestions() {
    this._suggestionList.innerHTML = '';
    this._parentElement.classList.remove('search--active');
  }

  renderMarkup(suggestions) {
    if (!suggestions.length) {
      this._clearSuggestions();
      return;
    }

    this._suggestionList.innerHTML = '';
    this._parentElement.classList.add('search--active');
    const markup = this._generateMarkupSuggestions(suggestions);
    this._suggestionList.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkupSuggestions(suggestions) {
    return suggestions
      .map(sug => `<li class="search__suggestion--item"><div>${sug}</div></li>`)
      .join('');
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  addHandlerSuggestions(handler) {
    this._parentElement.addEventListener('input', function (e) {
      const query = e.target.value.trim();
      this._selectedIndex = -1;
      handler(query);
    });
  }

  addHandlerSuggestionArrowKey() {
    this._parentElement.addEventListener('keydown', function (e) {
      const items = document.querySelectorAll('.search__suggestion--item');
      if (!items) return;
      if (!(e.key === 'ArrowDown' || e.key === 'ArrowUp')) return;

      if (e.key === 'ArrowDown') {
        this._selectedIndex = (this._selectedIndex + 1) % items.length;
      } else if (e.key === 'ArrowUp') {
        this._selectedIndex =
          (this._selectedIndex - 1 + items.length) % items.length;
      } else {
        return;
      }

      items.forEach((item, index) => {
        if (index === this._selectedIndex) {
          item.classList.add('selected');
          document.querySelector('.search__box--field').value =
            item.textContent;
        } else {
          item.classList.remove('selected');
        }
      });
    });
  }

  addHandlerSuggestionMouseClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const list = e.target.closest('.search__suggestion--list');
      if (!list) return;

      document.querySelector('.search__box--field').value =
        e.target.textContent;
      handler();
    });
  }
}

export default new SearchView();
