class MyPage extends Base {
  constructor(app) {
    super();
    this.app = app;
    this.pickCards();
    this.sliceNr = 8;
  }

  pickCards() {
    const { user } = this.app;

    this.myFavorites = this.app.recipes.filter(recipe => recipe.favorite);
    this.myRecipes = this.app.recipes.filter(recipe => user === recipe.author);
  }

  click(e) {
    if ($(e.target).hasClass('more-btn')) {
      $('.recipeCard:hidden').slice(0, 8).show(10);
      $('.recipeCard:hidden').length == 0 && $(e.target).hide();
      this.slices + 8;
    }
  }

}