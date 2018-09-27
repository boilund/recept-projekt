class Recipe extends Base {
  constructor(app) {
    super();
    this.app = app;
  }

  varyLikes() {
    this.favorite ? this.likes-- : this.likes++;
    this.favorite = !this.favorite; // "toggle"
  }

  // reicpe page
  pressHearts2() {
    const selectedPortion = $('.select-portions').val();
    this.varyLikes();
    this.app.myPage.pickCards();
    this.app.popState.startPage();
    this.app.popState.recipe();
    this.hasPortionChanged(selectedPortion);
    this.calculateIngrediens(selectedPortion);
  }
  // recipe page
  click2(e) {
    $(e.target).hasClass('comments-btn') && $('.comments').toggle();
    $(e.target).hasClass('fa-print') && window.print();
    if ($(e.target).hasClass('fa-heart') && this.author != this.app.user) {
      this.pressHearts2();
    }
  }
  // recipe page
  keyup2(e) {
    if ($(e.target).hasClass('fa-heart') 
        && e.which === 13
        && this.author != this.app.user
      ) {
      this.pressHearts2();
    } else if ($(e.target).hasClass('fa-print') && e.which === 13) {
      window.print();
    }
  }

  makeNewIngrediensHtml(newIngrediens, portion) {
    this.newIngrediensHTML = newIngrediens.map((x) => `<li class="list-group-item border-0 pl-0 pb-0 pt-2">${x.quantity} ${x.unit} ${x.name}</li>`);
    $('main').empty();
    this.render('main', '2');
    $(`.select-portions option[value=${portion}]`).prop('selected', true);
  }

  calculateIngrediens(portion) {
    // Choose rounding element by each unit of ingredients
    const roundingElement = {
      "g": 1,
      "kg": 100,
      "ml": 1,
      "dl": 10,
      "st": 10,
      "tsk": 10,
      "msk": 10,
      "krm": 1,
    };
    const newIngrediens = this.ingridiens.map(item => {
      return {
        ...item,
        quantity: item.unit === "" ? "" : Math.round(item.quantity / this.defaultPortion * portion * roundingElement[item.unit]) / roundingElement[item.unit]
      };
    });
    this.makeNewIngrediensHtml(newIngrediens, portion);
  }

  hasPortionChanged(portion) {
    this.changePortion = parseInt(portion) === this.defaultPortion ? false : true;
  }

  // recipe portions
  change2(e) {
    if ($(e.target).hasClass('select-portions')) {
      const selectedPortion = $('.select-portions').val();
      this.hasPortionChanged(selectedPortion);
      this.calculateIngrediens(selectedPortion);
    }
  }

  showMore(selector, slice, btn) {
    $(selector).slice(0, slice).show(10);
    $(selector).length == 0 && $(btn).hide();
  }

  // start-page cards
  click3(e) {
    if ($(e.target).hasClass('fa-heart')) {
      this.pressHearts3();
    }
  }
  // start page
  keyup3(e) {
    if ($(e.target).hasClass('fa-heart') && e.which === 13) {
      this.pressHearts3();
    }
  }
  // start page
  pressHearts3() {
    this.varyLikes();
    this.app.recipes.sort((a, b) => b.likes - a.likes);
    this.app.myPage.pickCards();
    $('.main-contents').empty();
    this.app.startPage.render('.main-contents', 4);
    this.showMore(
      '.recipeCard:hidden',
      this.app.startPage.sliceNr,
      '.more-btn'
    );
  }

  // mina-favoriter cards
  click4(e) {
    if ($(e.target).hasClass('fa-heart')) {
      this.pressHearts4();
    }
  }

  // mina favoriter
  keyup4(e) {
    if ($(e.target).hasClass('fa-heart') && e.which === 13) {
      this.pressHearts4();
    }
  }
  // mina favoriter
  pressHearts4() {
    this.varyLikes();
    this.app.myPage.pickCards();
    $('main').empty();
    this.app.myPage.render('main');
    /* this.app.popState.myPage(); */
    this.showMore(
      '.recipeCard-fav:hidden',
      this.app.myPage.sliceFav,
      '.more-btn-fav'
    );
  }

  // mina-recept cards
  click5(e) {
    if ($(e.target).hasClass('fa-heart') && this.author != this.app.user) {
      this.pressHearts5();
    }
  }

  // mina recept
  keyup5(e) {
    if ($(e.target).hasClass('fa-heart') 
        && e.which === 13
        && this.author != this.app.user
      ) {
      this.pressHearts5();
    }
  }
  // mina recept
  pressHearts5() {
    this.varyLikes();
    this.app.myPage.pickCards();

    $('.favorite-cards').empty();
    this.app.myPage.myFavorites.render('.favorite-cards', '4');

    $('.my-cards').empty();
    this.app.myPage.myRecipes.render('.my-cards', '5');

    this.showMore(
      '.my-recipeCard:hidden',
      this.app.myPage.sliceMyRecipe,
      '.my-more-btn'
    );
  }

}