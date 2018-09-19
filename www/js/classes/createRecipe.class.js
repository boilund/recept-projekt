class CreateRecipe extends Base {
  constructor(app, ingredients) {
    super();
    this.app=app;
    this.load();
    this.eventHandlers();
    this._stepsList = [];
    this._ingredientsList = [];
    //this.renderIngr();

  }

  get recipeTitle() {
    return `${this._recipeTitle}`;
  }

  set recipeTitle(val) {
    this._recipeTitle = val;
  }

  

  //click add ingredients

  click(event) {
    let target= $(event.target);
    if (target.hasClass("add-one")) {
      event.preventDefault();
      let that = this;
      // let ingredient = new Ingredients();
      // that._ingredientsList.push(ingredient);
      // that._ingredientsList.render()
      that.app.ingredients.render(".add-ingr", "");
    }
    if (target.hasClass("ingredient-btn")) {
      target.parents("div.card").empty();
      // delete templete here
    
   

    
    }

    // if ($(event.target).hasClass("delete-step")) {
    //   let text = $(event.target).prev().text();
    //   // for(let i=0; i< this.stepsList.length; i++){
    //   //   let context= this.stepsList[i].context;
    //   //   if(new String(context).valueOf()===new String(text).valueOf()){
    //   //     console.log[i];
    //   //   }
    //   // }

    //   //not working and don't know why








    // }
  }

  change(event) {
    this.labelCss(event);
  }

  keyup(event) {
    this.labelCss(event);
    let target=$(event.target);

    //get recipe-title
    if (target.hasClass("recept-name")){
      this._recipeTitle=target.val();
    }

    
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
    $(document).on("keyup", ".ingredient", function (e) {
      console.log(e)
      var inputText = $(e.target).val();
      // console.log(inputText)
      if (inputText) {
        var list = that.search(data, inputText);
        // console.log(list)
        that.changeInput(e, list);
      } else {
        $(e.target).next().empty();
        //autocomplete list get deleted by deleting input text
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
    console.log(val);

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

  //       autocomplete

  //       steps 

  eventHandlers() {
    let that = this;

    // press enter render step
    $(document).on("keyup", "#receptTextarea", function (e) {

      if (e.keyCode === 13) {
        let step = new Step($("#receptTextarea").val());
        $("#receptTextarea").val('');
        that._stepsList.push(step);
        $(".steps-here").empty();
        that._stepsList.render(".steps-here", "");
      }
    })

    $(document).on("click", "#add-one-step", function () {
      let step = new Step($("#receptTextarea").val());
      $("#receptTextarea").val('');
      that._stepsList.push(step);
      $(".steps-here").empty();
      that._stepsList.render(".steps-here", "");
    })

    
    

  }







}