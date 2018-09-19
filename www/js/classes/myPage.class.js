class MyPage extends Base {
  constructor(app) {
    super();
    this.app = app;
    this.pickCards();
  }

  pickCards() {
    const { user } = this.app;

    this.myFavorites = this.app.recipes.filter(recipe => recipe.favorite);
    this.myRecipes = this.app.recipes.filter(recipe => user === recipe.author);
  }

}