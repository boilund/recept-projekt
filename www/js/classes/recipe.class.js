class Recipe extends Base {
  constructor(app) {
    super();
    this.app = app;
    this.myFavorites = [];
    this.myRecipes = [];
  }

  click3(e) {
    if ($(e.target).hasClass('fa-heart')) {
      this.favorite ? this.likes-- : this.likes++;
      this.app.recipes.sort((a, b) => b.likes - a.likes);
      this.favorite = !this.favorite; // "toggle"
      this.app.popState.startPage();
      this.render('', 3);
    }
  }

  // mina sidor
  pickCards() {
    const {
      user
    } = this.app;

    this.myFavorites = this.app.recipes.filter(recipe => recipe.favorite);
    this.myRecipes = this.app.recipes.filter(recipe => user === recipe.author);
  }

  // mina sidor
  renderCards() {
    this.render('.my-favorite-cards', '4');
    this.render('.my-recept-cards', '5');
  }
}