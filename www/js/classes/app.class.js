class App extends Base {

  constructor() {
    super();
    this.user = "Catarina Bennetoft";
    this.load();
  }

  async load() {
    // TODO: load Json data
    JSON._classes(Recipe);
    this.recipes = await JSON._load('recipe.json');
    this.recipes.forEach((obj) => {
      obj.app = this;
    });

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
    this.myPage = new MyPage(this);
    this.recipe = new Recipe(this);
    this.createRecipe = new CreateRecipe();

    // Initiate handling of SPA push/pop-state
    this.popState = new PopStateHandler(this);
  }

}