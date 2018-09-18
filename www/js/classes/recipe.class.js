class Recipe extends Base {
  constructor(app) {
    super();
    this.app = app;

    // test data
    this.recipes = [{
        url: 'apple_pie',
        img: 'apple-pie.jpg',
        title: 'Äpplepaj',
        author: 'Catarina Bennetoft',
        time: '40 min',
        likes: 79,
        favorite: true,
      },
      {
        url: 'apple_pie',
        img: 'apple-pie.jpg',
        title: 'Äpplepaj',
        author: 'Catarina Bennetoft',
        time: '40 min',
        likes: 79,
        favorite: false,
      }
    ];

    this.myFavorites = []; // will be 1 card
    this.myRecipes = []; // will be 2 cards
  }

  pickCards() {
    const {
      user
    } = this.app;

    this.myFavorites = this.recipes.filter(recipe => recipe.favorite);
    this.myRecipes = this.recipes.filter(recipe => user === recipe.author);
  }

  renderCards() {
    this.render('.my-favorite-cards', '4');
    this.render('.my-recept-cards', '5');
  }
}