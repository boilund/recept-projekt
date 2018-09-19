class StartPage extends Base {
  constructor(app) {
    super();
    this.app = app;
     this.load();
    // this.autoComplete();
    // this.keyup();


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