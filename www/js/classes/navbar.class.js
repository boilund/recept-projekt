class Navbar extends Base {
  constructor() {
    super();

    this.toMyPageButton = `<a href="/my_page" class="pop btn  ml-1 nav-btn">Mina sidor</a>`;
    this.toCreatePageButton = `<a href="/create_recipe" class="pop btn ml-1 nav-btn">Skapa ett nytt recept</a>`;
  }

  changeButton(url = '/') {
    this.url = url;

    $('header').empty();
    this.render('header');
  }
}