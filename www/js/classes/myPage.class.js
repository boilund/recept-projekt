class MyPage extends Base {
  constructor(app) {
    super();
    this.app = app;
    this.pickCards();
    this.sliceFav = 0;
    this.sliceMyRecipe = 0;
  }

  pickCards() {
    const { user } = this.app;

    this.myFavorites = this.app.recipes.filter(recipe => recipe.favorite);
    this.myRecipes = this.app.recipes.filter(recipe => user === recipe.author);
  }

  click(e) {
    this.validateUserAndEvent(e, 'sliceCards');
  }

  keyup(e) {
    this.validateUserAndEvent(e, 'sliceCards');
  }

  validateUserAndEvent(e, method) {
    const moreFavBtn = $(e.target).hasClass('more-btn-fav');
    const myRecipeBtn = $(e.target).hasClass('my-more-btn');

    if (!moreFavBtn || !moreFavBtn) { return; }
    const parameters = myRecipeBtn ? [
      '.my-recipeCard:hidden',
      'sliceMyRecipe'
    ] : [
      '.recipeCard-fav:hidden',
      'sliceFav'
    ];

    (e.type === 'click' || e.which === 13) && this[method](e.target, parameters);
  }

  sliceCards(target, [selector, slice]) {
    const sliced = $(selector).slice(0, 8).show(10);
    $(selector).length == 0 && $(target).hide();
    this[slice] = this[slice] + sliced.length;
  }

}