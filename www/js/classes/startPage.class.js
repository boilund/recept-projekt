class StartPage extends Base {
  constructor(app) {
    super();
    this.app = app;
    this.app.recipes.sort((a, b) => b.likes - a.likes);
    this.filteredCards = [];
    this.selectedCategory = [];
    this.sliceNr = 0;
  }

  click2(e) {
   if($(e.target).hasClass('more-btn')) {
     const sliced = $('.recipeCard:hidden').slice(0, 8).show(10);
     $('.recipeCard:hidden').length == 0 && $(e.target).hide();
     this.sliceNr = this.sliceNr + sliced.length;
   }
  }

  pickFilteredCards(selectedCategory) {

    const isIncluded = (category) => {
      return selectedCategory.some(item => category.includes(item));
    };
    this.filteredCards = this.app.recipes.filter(recipe => isIncluded(recipe.category));

    // empty only main contents because checkbox need to maintain checks,
    // then render filtered cards
    $('.main-contents').empty();
    this.render('.main-contents', 4);
  }

  change2(e) {
    if ($(e.target).hasClass("form-check-input")) {
      this.sliceNr = 0;
      this.selectedCategory = [];
      const checkedElements = $("input:checked");
      for (let i = 0; i < checkedElements.length; i++) {
        this.selectedCategory.push(checkedElements[i].value);
      }
    }
    this.pickFilteredCards(this.selectedCategory);
  }

}