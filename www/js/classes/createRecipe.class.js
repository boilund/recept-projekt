class CreateRecipe extends Base {
  constructor() {
    super();
    this.load();
    this.eventHandlers();
    this.stepsList=[];

  }

  renderIngr() {
    this.render(".add-ingr", "Ingr");
  }

  //click add ingredients

  click(event) {
    if ($(event.target).hasClass("add-one")) {
      event.preventDefault();
      this.render(".add-ingr", "Ingr");
    }
    if ($(event.target).hasClass("ingredient-btn")) {
      $(event.target).parent("div").parent("div").parent("div").empty();
    }
  }

  keyup(event) {
    this.labelCss(event);
  }



  change(event) {
    this.labelCss(event);
  }

  //method for control css when keyup
  labelCss(event) {
    var label = $(event.target).prev();
    if ($(event.target).val() === '') {
      $(label).removeClass('active highlight');
    } else {
      $(label).addClass('active highlight');
    }
  }




  //autocomplete
  load() {
    $.getJSON('/json/food.json').then((data) => {
      this.autoComplete(data);
    });
  }

  autoComplete(data) {
    let that = this;
    $(".ingredient").on({
      keyup: function (e) {
        var inputText = $(e.target).val();
        if (inputText) {
          var list = that.search(data, inputText);
          that.changeInput(e, list)
        } else {
          $(e.target).next().empty();
          //autocomplete list get deleted by deleting input text
        }

      }

    })
  }

  search(jsonList, searchText) {
    if (searchText) {
      if (searchText.toLowerCase() !== "vatten") {
        let regEx = new RegExp(`(^|\\s)${searchText}(\\s|$)`, 'ig');
        // let regEx = new RegExp(searchText.split("").join("\\w*").replace(/\W/, ""),
        // "i");
        let result = jsonList.filter(x => x.Namn.match(regEx) !== null);
        result.sort((a, b) => {
          return a.Namn.indexOf(searchText) < b.Namn.indexOf(searchText) ? -1 : 1;
        })
        return result;
      } else {
        let result = [{
          Namn: "vatten"
        }];
        return result;
      }
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

    target.empty();
    for (var i = 0, len = list.length; i < len; i++) {
      let listText = list[i].Namn;
      let node = $(`<a class='list-group-item list-group-item-action'>  ${listText}   </a>`);
      $(target).append(node);
      node.on("click", () => this.setSearch(e, listText));

    }

  }

  eventHandlers() {
    let that = this;
    $(document).on("keyup", "#receptTextarea", function (e) {

      if (e.keyCode === 13) {
        let step = new Step($("#receptTextarea").val());
        
        $("#receptTextarea").val('');
        that.stepsList.push(step);
        $(".steps-here").empty();
        that.stepsList.render(".steps-here", "");


      }
    })
  }

  //       autocomplete
}