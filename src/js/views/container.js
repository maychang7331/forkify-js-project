class Container {
  _container = document.querySelector('.container');

  openRecipeView() {
    this._container.classList.add('open-recipe');
  }

  removeRecipeView() {
    // Remove id, so that if back button is clicked, the hash is removed
    // for preventing rendoring previous id
    if (window.matchMedia('(max-width: 52.5em)').matches) {
      window.location.hash = '';
    }

    // Open the searchResult view (i.e. remove the recipeView)
    this._container.classList.remove('open-recipe');
  }
}

export default new Container();
