class StartPage extends Base {
  constructor(app) {
    super();
    this.app = app;
    this.app.recipes.sort((a, b) => b.likes - a.likes);
    this.sliceNr = 8;
  }

  click2(e) {
    if ($(e.target).hasClass('more-btn')) {
      $('.recipeCard:hidden').slice(0, 8).show(10);
      $('.recipeCard:hidden').length == 0 && $(e.target).hide();
      this.slices + 8;
    }
  }

  pickFilteredCards(selectedCategory) {
    this.filteredCards = [];

    const isIncluded = (category) => {
      return selectedCategory.some(item => category.includes(item));
    };
    this.filteredCards = this.app.recipes.filter(recipe => isIncluded(recipe.category));

    this.app.popState.startPage();
    this.app.recipe.render('', 3);
  }

  change2(e) {
    if ($(e.target).hasClass("form-check-input")) {
      this.selectedCategory = [];
      const checkedElements = $("input:checked");
      for (let i = 0; i < checkedElements.length; i++) {
        this.selectedCategory.push(checkedElements[i].value);
      }
    }
    this.pickFilteredCards(this.selectedCategory);
  }
}