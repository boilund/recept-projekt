class StartPage extends Base {
  constructor(app) {
    super();
    this.app = app;
    this.app.recipes.sort((a, b) => b.likes - a.likes);
    this.sliceNr = 8;
     this.load();
    // this.autoComplete();
    // this.keyup();


  }

  click2(e) {
   if($(e.target).hasClass('more-btn')) {
     $('.recipeCard:hidden').slice(0, 8).show(10);
     $('.recipeCard:hidden').length == 0 && $(e.target).hide();
     this.slices + 8;
   }
  }

  // search field
  click(e) {
    if ($(e.target).hasClass('search-input')) {
      console.log('AAAAAAAAAa');
      // console.log(this.app.recipes.title);

    }
  }

  // keyup(e) {
  //   console.log('keyup, input!', e);
  // }


  // autocomplete
  async load() {
    $.getJSON('/json/recipe.json').then((data) => {
      this.autoComplete(data);
    });
  }



  autoComplete(data) {
    console.log('this', this);
    let that = this;
    console.log('that', that);

     $(document).on('keyup', '.search-input', function(e) {
      console.log('e', e);
      let inputText = $(e.target).val();
      console.log('inputText:', inputText);

      if (inputText) {
        var list = that.search(data, inputText);
        console.log(list)
        that.changeInput(e, list);
      } else {
        $(e.target).next().empty();
      }


    })

  }


}