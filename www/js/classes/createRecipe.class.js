class CreateRecipe extends Base {
  constructor(app) {
    super();
    this.app = app;
    this.load().then((data) => {
      this.ingredientsOptions = data;
    });
    this.eventHandlers();
    this._stepsList = [];
    this._ingredientsList = [];
    this._ingredientsList.push(new Ingredients(this));

  }

  get recipeTitle() {
    return `${this._recipeTitle}`;
  }

  set recipeTitle(val) {
    this._recipeTitle = val;
  }



  //click add ingredients

  click(event) {
    let target = $(event.target);
    if (target.hasClass("add-one")) {
      event.preventDefault();
      let that = this;

      let ingredient = new Ingredients(this);
      that._ingredientsList.push(ingredient);
      $(".add-ingr").empty();
      that._ingredientsList.render(".add-ingr", "");

    }



  }

  change(event) {
    this.labelCss(event);
  }

  keyup(event) {
    this.labelCss(event);
    let target = $(event.target);

    //get recipe-title
    if (target.hasClass("recept-name")) {
      this._recipeTitle = target.val();
    }


  }

  deleteIngr(item) {
    let i = this._ingredientsList.indexOf(item);
    if (i > -1) {
      this._ingredientsList.splice(i, 1);
    }
    $("#addIngr").empty();
    this._ingredientsList.render("#addIngr", "");
  }

  deleteStep(item) {
    let i = this._stepsList.indexOf(item);
    if (i > -1) {
      this._stepsList.splice(i, 1);
    }
    $(".steps-here").empty();
    this._stepsList.render(".steps-here", "");
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
    return $.getJSON('/json/food.json');
  }



  //       steps 

  eventHandlers() {
    let that = this;

    // press enter render step
    $(document).on("keyup", "#receptTextarea", function (e) {

      if (e.keyCode === 13) {
        let step = new Step($("#receptTextarea").val(), that);
        $("#receptTextarea").val('');
        that._stepsList.push(step);
        $(".steps-here").empty();
        that._stepsList.render(".steps-here", "");
      }
    })

    $(document).on("click", "#add-one-step", function () {
      let step = new Step($("#receptTextarea").val(), that);
      $("#receptTextarea").val('');
      that._stepsList.push(step);
      $(".steps-here").empty();
      that._stepsList.render(".steps-here", "");
    })




  }







}