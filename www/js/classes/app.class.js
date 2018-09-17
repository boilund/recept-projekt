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

    // Create a footer
    this.footer = new Footer();
    $('footer').empty();
    this.footer.render('footer');

    // Create pages
    // TODO: create instance of pages

    // Initiate handling of SPA push/pop-state
    this.popState = new PopStateHandler(this);
  }

}