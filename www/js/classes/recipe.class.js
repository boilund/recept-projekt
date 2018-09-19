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

  showMore() {
    $('.recipeCard:hidden').slice(0, this.app.startPage.sliceNr).show(10);
    $('.recipeCard:hidden').length == 0 && $('.more-btn').hide();
  }

  click3(e) {
    if ($(e.target).hasClass('fa-heart')) {
      this.varyLikes();
      this.app.recipes.sort((a, b) => b.likes - a.likes);
      this.app.myPage.pickCards();
      this.app.popState.startPage();
      this.render('', 3);
      this.showMore();
    }
  }

  // mina-sidor
  click4(e) {
    if ($(e.target).hasClass('fa-heart')) {
      this.varyLikes();
      this.app.myPage.pickCards();
      this.app.popState.myPage();
      this.render('', 4);
    }
  }

  click5(e) {
    if ($(e.target).hasClass('fa-heart')) {
      this.varyLikes();
      this.app.myPage.pickCards();
      this.app.popState.myPage();
      this.render('', 5);
    }
  }

}