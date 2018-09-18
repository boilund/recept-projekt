class Recipe extends Base {
  constructor(app) {
    super();
    this.app = app;
  }

  click3(e) {
    if ($(e.target).hasClass('fa-heart')) {
      this.favorite ? this.likes-- : this.likes++;
      this.favorite = !this.favorite; // "toggle"
      this.render('', 3);
    }
  }
}