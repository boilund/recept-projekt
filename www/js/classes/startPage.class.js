class StartPage extends Base {
  constructor(app) {
    super();
    this.app = app;
    this.app.recipes.sort((a, b) => b.likes - a.likes);
    this.sliceNr = 8;
    this.load();
    // this.keyup();
  }

  click2(e) {
    if ($(e.target).hasClass('more-btn')) {
      $('.recipeCard:hidden').slice(0, 8).show(10);
      $('.recipeCard:hidden').length == 0 && $(e.target).hide();
      this.slices + 8;
    }
  }

  // search field
  click(e) {
    if ($(e.target).hasClass('search-input')) {
      console.log('Clicked on search feild');
      // console.log(this.app.recipes.title);

    }
  }

  // keyup(e) {
  //   console.log('keyup, input!', e);
  // }


  async load() {
    await $.getJSON('/json/recipe.json').then((data) => {
      this.autoComplete(data);
    });
  }

  autoComplete(data) {
    console.log('this', this);
    let that = this;
    // console.log('data loaded', data);

    $(document).on('keyup', '.search-input', function (e) {
      console.log('e', e);
      let inputText = $(e.target).val();
      // console.log('inputText:', inputText);  

      if (inputText) {
        var list = that.search(data, inputText);
        // console.log(list)
        that.changeInput(e, list);
      } else {
        $(e.target).next().empty();
      }

    });

  }

  search(jsonList, searchText) {
    if (searchText) {
      let regEx = new RegExp(`(^|\\s)${searchText}(\\s|$)`, 'ig');
      let result = jsonList.filter(x => x.title.match(regEx) || x.author.match(regEx) !== null);
      result.sort((a, b) => {
        return a.title.indexOf(searchText) < b.title.indexOf(searchText) ? -1 : 1;
      })
      return result;
    }
  }

  setSearch(e, val) {
    console.log(val)
    let target = $(e.target).next();
    target.empty();
    $(e.target).val(val);
  }

  changeInput(e, list) {
    let target = $(e.target).next();
    // console.log('list::', list);
    target.empty();
    for (var i = 0, len = list.length; i < len; i++) {
      let listText = list[i].title;
      let node = $(`<a class="list-group-item list-group-item-action pop" href="/recipe/${list[i].url}">${listText}</a>`);
      $(target).append(node);
      node.on("click", () => this.setSearch(e, listText));
    }

  }


}