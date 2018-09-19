class Recipe extends Base {
  constructor(app) {
    super();
    this.app = app;
  }

  varyLikes() {
    this.favorite ? this.likes-- : this.likes++;
    this.favorite = !this.favorite; // "toggle"
  }

  click2(e) {
    $(e.target).hasClass('comments-btn') && $('.comments').toggle();
  }

  showMore(page) {
    page === 'startPage' && $('.recipeCard:hidden').slice(0, this.app.startPage.sliceNr).show(10);
    page === 'myPage' && $('.recipeCard:hidden').slice(0, this.app.myPage.sliceNr).show(10);
    $('.recipeCard:hidden').length == 0 && $('.more-btn').hide();
  }

  click3(e) {
    if ($(e.target).hasClass('fa-heart')) {
      this.varyLikes();
      this.app.recipes.sort((a, b) => b.likes - a.likes);
      this.app.myPage.pickCards();
      this.app.popState.startPage();
      this.render('', 3);
      this.showMore('startPage');
    }
  }

  // mina-sidor
  click4(e) {
    if ($(e.target).hasClass('fa-heart')) {
      this.varyLikes();
      this.app.myPage.pickCards();
      this.app.popState.myPage();
      this.render('', 4);
      this.showMore('myPage');
    }
  }

}