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
    this._categoriesList = [];
    this._nutrients = {};


  }

  get recipeTitle() {
    return this._recipeTitle;
  }

  set recipeTitle(val) {
    this._recipeTitle = val;
  }

  get portions() {
    return this._portions;
  }

  set portions(val) {
    this._portions = val;
  }

  get time() {
    return this._time;
  }

  set time(val) {
    this._time = val;
  }





  //click add ingredients

  click(event) {
    let target = $(event.target);
    if (target.hasClass("add-one")) {
      event.preventDefault();
      let that = this;

      let ingredient = new Ingredients(this);
      //that.app.ingredient.createIngredient();
      that._ingredientsList.push(ingredient);
      $(".add-ingr").empty();
      that._ingredientsList.render(".add-ingr", "");

    }

    if (target.hasClass("submint-btn")) {
      this.calcPortionNutrition();
      let json = this.createRecipe();
      //this.saveRecipe(json);

    }



  }

  change(event) {
    this.labelCss(event);
    let target = $(event.target);
    if ((target).hasClass("portions")) {
      let that = this;
      that._portions = target.val();
    }

    if ((target).hasClass("form-check-input")) {
      let that = this;
      let category = target.val();
      that._categoriesList.push(category);
    }
    //console.log(this._categoriesList);

  }

  keyup(event) {
    this.labelCss(event);
    let target = $(event.target);

    //get recipe-title
    if (target.hasClass("recept-name")) {
      this._recipeTitle = target.val();
    }
    //get cooking time
    if (target.hasClass("time")) {
      this._time = target.val();
    }




  }
  createRecipe() {
    let newRecipe = {};
    newRecipe.favorite = true;
    newRecipe.title = this._recipeTitle;
    //newRecipe.img =this._img;
    newRecipe.time = this._time;
    newRecipe.likes = 1;
    newRecipe.category = this._categoriesList;
    newRecipe.author = "Catarina Bennetoft";
    newRecipe.url = Date.now();
    newRecipe.defaultPortion = this._portions;
    newRecipe.ingredient = this._ingredientsList;
    newRecipe.instructions = this._stepsList;
    newRecipe.nutrition = this._nutrients;
    newRecipe.comments = [];
   // newRecipe.⚙ = "Recipe";


    return newRecipe;
  }

  calcPortionNutrition() {
    let that = this;
    //console.log(this._ingredientsList);
    let nList = [];
    that._ingredientsList.forEach((i) => {
      if (i.name) {
        nList.push(i.itemNutrients);
      }

      // let i= Ingredients;
      // console.log(i);
    })
    let kj = 0;
    let kcal = 0;
    let fat = 0;
    let saturatedFat = 0;
    let carbohydrates = 0;
    let protein = 0;
    let salt = 0;

    for (let i = 0; i < nList.length; i++) {
      let l = nList[i];
      kj += l.EnergyKJ;
      kcal += l.EnergyKCAL;
      fat += l.Fat;
      saturatedFat += l.TotalMonounsaturatedFattyAcids + l.TotalPolyunsaturatedFattyAcids;
      carbohydrates += l.Carbohydrates;
      protein += l.Protein;
      salt += l.Salt;
    }

    that._nutrients.kj = kj;
    that._nutrients.kcal = kcal;
    that._nutrients.fat = fat;
    that._nutrients.saturatedFat = saturatedFat;
    that._nutrients.carbohydrates = carbohydrates;
    that._nutrients.protein = protein;
    that._nutrients.salt = salt;
    //console.log(that._nutrients)
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

  saveRecipe(json) {
    let recipeList = [];
    JSON._save('testCreate', {recept:json});
    // $.getJSON('/json/testCreate.json').then((data) => {
    //   recipeList = data;
    //   recipeList.push(json);
    //   console.log(recipeList)
    //   JSON._save('testCreate', json);
    //})
  }







}