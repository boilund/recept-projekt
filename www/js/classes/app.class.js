class App extends Base {

  constructor() {
    super();
    this.user = "Catarina Bennetoft";
    this.load();
  }

  async load() {
    JSON._classes(Recipe);
    this.recipes = await JSON._load('recipe.json');
    this.recipes.forEach((obj) => {
      obj.ingridiensHTML = obj.ingridiens.map(x => `<li class="list-group-item border-0 pl-0 pb-0 pt-2">${x.quantity} ${x.unit} ${x.name}</li>`);
      obj.instructions = obj.instructions.map(instruction => `<li class="list-group-item border-0 pl-0 pb-0">${instruction}</li>`);
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
    this.createRecipe = new CreateRecipe(this);


    // Initiate handling of SPA push/pop-state
    this.popState = new PopStateHandler(this);
  }

}