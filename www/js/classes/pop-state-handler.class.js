class PopStateHandler {

  // Note: Only instantiate PopStateHandler once!
  constructor(app) {

    this.app = app;
    // Add event handlers for a.pop-links once
    this.addEventHandler();
    // Call changePage on initial page load
    this.changePage();
    // Call changePage on pop events
    // (the user clicks the forward or backward button)
    // from an arrow function to keep "this"
    // inside changePage pointing to the PopStateHandler object
    window.addEventListener('popstate', () => this.changePage());

  }

  addEventHandler() {

    // make "that" the PopStateHandler object
    // (since this will be the a tag inside the click function)
    let that = this;

    $(document).on('click', 'a.pop', function (e) {

      // Create a push state event
      let href = $(this).attr('href');
      history.pushState(null, null, href);

      // Call the changePage function
      that.changePage();

      // Stop the browser from starting a page reload
      e.preventDefault();

    });
  }

  changePage() {
    // React on page changed
    // (replace part of the DOM etc.)

    // Get the current url
    let url = location.pathname;

    // Change which menu link that is active
    $('header a').removeClass('active');
    $(`header a[href="${url}"]`).addClass('active');

    // A small "dictionary" of what method to call
    // on which url
    let urls = {
      '/': 'startPage',
      '/my_page': 'myPage',
      '/recipe/apple_pie': 'recipe',
      '/create_recipe': 'createRecipe',
    };

    // Call the right method
    let methodName = urls[url];
    this[methodName]();

  }

  startPage() {
    $('.heading-content').empty();
    $('main').empty();
    $('section.container-fluid').removeClass('heading-content');
    $('section.container-fluid').addClass('heading-content-start-page');
    this.app.startPage.render('.heading-content-start-page');
    this.app.startPage.render('main', '2');
  }

  myPage() {
    $('.heading-content').empty();
    $('.heading-content-start-page').empty();
    $('section.container-fluid').removeClass('heading-content');
    $('section.container-fluid').removeClass('heading-content-start-page');
    $('main').empty();
    this.app.myPage.render('main');
  }

  recipe() {
    $('.heading-content').empty();
    $('.heading-content-start-page').empty();
    $('section.container-fluid').addClass('heading-content');
    $('section.container-fluid').removeClass('heading-content-start-page');
    $('main').empty();
    this.app.recipe.render('.heading-content');
    this.app.recipe.render('main', 2);
  }

  createRecipe() {
    $('.heading-content').empty();
    $('.heading-content-start-page').empty();
    $('section.container-fluid').removeClass('heading-content');
    $('section.container-fluid').removeClass('heading-content-start-page');
    $('main').empty();
    this.app.createRecipe.render('main');
  }

}