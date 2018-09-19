class StartPage extends Base {
  constructor(app) {
    super();
    this.app = app;
  }

  click2(e) {
   if($(e.target).hasClass('more-btn')) {
     $('.recipeCard:hidden').slice(0, 8).slideDown();
     $('.recipeCard:hidden').length == 0 && $(e.target).hide();
   }
  }
}