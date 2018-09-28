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
    if ($(e.target).hasClass('more-btn-fav')) {
      this.sliceCards(
        e.target, 
        '.recipeCard-fav:hidden', 
        'sliceFav'
      );
    } else if ($(e.target).hasClass('my-more-btn')) {
      this.sliceCards(
        e.target, 
        '.my-recipeCard:hidden', 
        'sliceMyRecipe'
      );
    }
  }

  keyup(e) {
    if ($(e.target).hasClass('more-btn-fav') && e.which == 13) {
      this.sliceCards(
        e.target,
        '.recipeCard-fav:hidden',
        'sliceFav'
      );
    } else if ($(e.target).hasClass('my-more-btn') && e.which == 13) {
      this.sliceCards(
        e.target,
        '.my-recipeCard:hidden',
        'sliceMyRecipe'
      );
    }
  }



  sliceCards(target, selector, slice) {
    const sliced = $(selector).slice(0, 8).show(10);
    $(selector).length == 0 && $(target).hide();
    this[slice] = this[slice] + sliced.length;
  }

}