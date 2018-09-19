class Recipe extends Base {
  constructor(app) {
    super();
    this.app = app;
    this.myFavorites = [];
    this.myRecipes = [];
  }

  varyLikes() {
    this.favorite ? this.likes-- : this.likes++;
    this.app.recipes.sort((a, b) => b.likes - a.likes);
    this.favorite = !this.favorite; // "toggle"
  }

  click2(e) {
    $(e.target).hasClass('comments-btn') && $('.comments').toggle();
  }

  click3(e) {
    if ($(e.target).hasClass('fa-heart')) {
      this.varyLikes();
      this.app.popState.startPage();
      this.render('', 3);
    }
  }

  // mina-sidor
  click4(e) {
    if ($(e.target).hasClass('fa-heart')) {
      this.varyLikes();
      this.app.popState.myPage();
    }
  }

  click5(e) {
    if ($(e.target).hasClass('fa-heart')) {
      this.varyLikes();
      this.app.popState.myPage();
    }
  }

  pickCards() {
    const {
      user
    } = this.app;

    this.myFavorites = this.app.recipes.filter(recipe => recipe.favorite);
    this.myRecipes = this.app.recipes.filter(recipe => user === recipe.author);
  }

  renderCards() {
    this.render('.my-favorite-cards', '4');
    this.render('.my-recept-cards', '5');
  }
}