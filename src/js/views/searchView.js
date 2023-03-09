class SearchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement.querySelector(
      '.search__box--field'
    ).value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector('.search__box--field').value = '';
  }

  renderMarkup(suggestions) {
    if (!suggestions) {
      this._parentElement.classList.remove('search--active');
      return;
    }

    this._parentElement.classList.add('search--active');
    const suggestionBox = this._parentElement.querySelector(
      '.search__suggestionBox'
    );
    const markup = this._generateMarkupSuggestions(suggestions);
    suggestionBox.innerHTML = '';
    suggestionBox.insertAdjacentHTML('afterbegin', markup);
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
}

export default new SearchView();
