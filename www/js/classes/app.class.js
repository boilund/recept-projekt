class App extends Base {

  constructor() {
    super();
    this.load();
  }

  async load() {
    // TODO: load Json data
    this.start();
  }

  start() {
    // Create a navbar
    this.navbar = new Navbar();
    $('header').empty();
    this.navbar.render('header');

    // Create a footer
    this.footer = new Footer();
    $('footer').empty();
    this.footer.render('footer');

    // Create pages
    this.startPage = new StartPage(this);
    this.myPage = new MyPage();
    this.recipe = new Recipe();
    //this.ingredients = new Ingredients(this);
    this.createRecipe = new CreateRecipe(this);

    // Initiate handling of SPA push/pop-state
    this.popState = new PopStateHandler(this);
  }

}