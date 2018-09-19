class Recipe extends Base {
  constructor(app) {
    super();
    this.app = app;
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
}