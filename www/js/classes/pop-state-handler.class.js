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
      '/create_recipe': 'createRecipe',
    };

    this.app.recipes.forEach((recipe) => {
      const url = `/recipe/${recipe.url}`;
      Object.assign(urls, { [url]: 'recipe' });
    });

    // Call the right method
    let methodName = urls[url];
    this[methodName]();

    // Set the right button
    this.app.navbar.changeButton(url);

  }

  startPage() {
    this.app.myPage.slice = 0;
    this.app.startPage.filteredCards.length = 0;
    this.cleanUpPage();
    $('section.container-fluid').removeClass('heading-content');
    $('section.container-fluid').addClass('heading-content-start-page');
    this.app.startPage.render('.heading-content-start-page');
    this.app.startPage.render('main', '2');
  }

  myPage() {
    this.app.startPage.sliceNr = 0;
    this.cleanUpPage();
    $('section.container-fluid').removeClass('heading-content');
    $('section.container-fluid').removeClass('heading-content-start-page');
    this.app.myPage.render('main');
  }

  recipe() {
    this.app.startPage.sliceNr = 0;
    this.app.myPage.slice = 0;
    this.cleanUpPage();
    $('section.container-fluid').addClass('heading-content');
    $('section.container-fluid').removeClass('heading-content-start-page');
    this.renderCorrectRecipe();
  }

  createRecipe() {
    this.app.startPage.sliceNr = 0;
    this.app.myPage.slice = 0;
    this.cleanUpPage();
    $('section.container-fluid').removeClass('heading-content');
    $('section.container-fluid').removeClass('heading-content-start-page');
    this.app.createRecipe.render('main');
  }

  cleanUpPage() {
    $('.heading-content').empty();
    $('.heading-content-start-page').empty();
    $('main').empty();
  }

  renderCorrectRecipe() {
    const url = location.pathname.split('/')[2];
    const recipe = this.app.recipes.filter(recipe => recipe.url === url);
    const { ingridiens, instructions, defaultPortion } = recipe[0];
    this.app.recipe.saveRecipeInfo(ingridiens, instructions, defaultPortion);
    recipe.render('.heading-content');
    recipe.render('main', '2');
    $(`.select-portions option[value=${defaultPortion}]`).prop('selected', true);
  }


}