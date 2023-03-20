class SearchView {
  _parentElement = document.querySelector('.search');
  _searchBoxField = this._parentElement.querySelector('.search__box--field');
  _suggestionList = document.querySelector('.search__suggestion--list');

  getQuery() {
    const query = this._searchBoxField.value;
    this._clearSuggestions();
    return query;
  }

  setQuery(query) {
    this._searchBoxField.value = query;
    this._clearSuggestions();
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
    return suggestions.map(sug => `<li>${sug}</li>`).join('');
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  addHandlerSuggestions(handler) {
    this._parentElement.addEventListener('keyup', function (e) {
      const query = e.target.value.trim();
      handler(query); // e.key returns only a key
    });
  }

  addHandlerClickSuggestion(handler, handler2) {
    this._parentElement.addEventListener('click', function (e) {
      const list = e.target.closest('.search__suggestion--list');
      if (!list) return;

      // console.log(this._searchBoxField); // setQuery(){}
      handler(e.target.textContent);
      handler2();
    });
  }
}

export default new SearchView();
