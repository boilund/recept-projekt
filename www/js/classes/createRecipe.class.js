class CreateRecipe extends Base {
  constructor(app) {
    super();
    this.app = app;
    this.load().then((data) => {
      this.ingredientsOptions = data;
      this.imgUpload();
    });
    //this.eventHandlers();
    this._stepsList = [];
    this._ingredientsList = [];
    this._ingredientsList.push(new Ingredients(this));
    this._categoriesList = [];
    this._nutrients = {};
    this._id = Date.now();

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

  get img() {
    return this._img;
  }

  set img(val) {
    this._img = val;
  }





  //click add ingredients

  click(event) {
    let that = this;
    let target = $(event.target);
    if (target.hasClass("add-one")) {
      event.preventDefault();


      let ingredient = new Ingredients(this);
      //that.app.ingredient.createIngredient();
      that._ingredientsList.push(ingredient);
      $(".add-ingr").empty();
      that._ingredientsList.render(".add-ingr", "");
      that.inputLabel();

      let checkItems = $(".quantity");
      console.log(checkItems)
      for (let i = 0; i < checkItems.length; i++) {
        let checkVal = checkItems[i].value
        if (isNaN(checkVal) || checkVal < 0) {
          //console.log(checkItems[i])
          $(checkItems[i]).next().removeClass("hidden");
          $(checkItems[i]).parents("ing").addClass("mb-0");

        } else {
          $(checkItems[i]).next().addClass("hidden");
        }

      }


    }

    if (target.hasClass("upload-file-btn")) {
      this.fileSelectHandler(event);

    }

    if (target.hasClass("submint-btn")) {

      // event.preventDefault();
      // that.calcPortionNutrition();
      if (this.validateInput()) {
        $('.sumbit-alert').empty();
        let json = that.createRecipe();
        that.saveRecipe(json);
      } else {
        event.preventDefault();
        $('.sumbit-alert').empty();
        $('.sumbit-alert').append(`<div class="col-12 my-3">
        <div class="mt-3 mt-md-0 alert alert-danger" role="alert">
          <i class="fas fa-exclamation-circle"></i>
          <p class="font-weight-bold d-inline">Du måste fylla i alla fält!</p>
        </div>
      </div>`);
      }

    }

    //   add    steps
    if (target.hasClass("add-one-step")) {
      //console.log(target)
      this.showSteps();
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

    //upload file
    if ((target).hasClass("fileUpload")) {
      //console.log("upload")
      this.fileSelectHandler(event);
    }
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
      this.validateTimeInput();
    }

    //    add   steps
    if (target.hasClass("receptTextarea")) {
      if (event.keyCode == 13) {
        this.showSteps();
      }

    }
  }

  validateTimeInput() {
    if (isNaN(this._time) || this._time < 1) {
      document.getElementById("time-validation").innerHTML = "Vänligen ange ett nummer större än 1";
      return false;
    }
    document.getElementById("time-validation").innerHTML = "";
    return true;
  }

  // img upload start here
  imgUpload() {
    let that = this;
    that.uploadInit();
  }

  uploadInit() {
    //console.log("Upload Initialised");
    let that = this;
    let xhr = new XMLHttpRequest();
    if (xhr.upload) {
      //let fileDrag = $(".file-drag");
      let fileDrag = document.getElementById('file-drag');
      //console.log(fileDrag)
      fileDrag.addEventListener('dragover', (e) => {
        that.fileDragHover(e);
      })
      fileDrag.addEventListener('dragleave', (e) => {
        that.fileDragHover(e);
      })
      fileDrag.addEventListener('drop', (e) => {
        that.fileSelectHandler(e);
      })

    }

  }

  fileDragHover(e) {
    e.stopPropagation();
    e.preventDefault();
    $(e.target).addClass("modal-body file-upload");

  }

  fileSelectHandler(event) {
    let that = this;
    // Fetch FileList object
    let files = event.target.files || event.dataTransfer.files;
    console.log(files)
    // Cancel event and hover styling
    that.fileDragHover(event);

    // // Process all File objects
    for (let i = 0, f; f = files[i]; i++) {
      that.parseFile(f);
      that.uploadFile(f);
    }
  }


  parseFile(file) {
    let that = this;
    //console.log(file.name);
    that._img = encodeURI(file.name);

    let isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(that._img);
    if (isGood) {
      //console.log("img")
      $("#uploader-start").addClass("hidden");
      $("#messages").append(
        '<strong>' + that._img + '</strong>'
      );
      $("#file-image").removeClass("hidden");
      $("#file-image").attr("src", `../imgs/${this._img}`);
      //$("#file-image").src=URL.createObjectURL(file);
      $("#mobil-review").removeClass("hidden");
      $("#mobil-review").attr("src", `../imgs/${this._img}`);
    } else {
      $('#notimage').removeClass('hidden');
      $('#file-upload-form').trigger("reset");
    }
  }

  uploadFile(file) {
    //console.log(file.size)
    let xhr = new XMLHttpRequest();

    // pBar = document.getElementById('file-progress'),
    let fileSizeLimit = 1024; // In MB
    if (xhr.upload) {
      // Check if file is less than x MB
      if (file.size >= fileSizeLimit * 1024 * 1024) {
        $("#messages").append(
          '<strong> Please upload a smaller file (< ' + fileSizeLimit + ' MB). </strong>'
        );


      }
      // xhr.open('POST', document.getElementById('file-upload-form').action, true);
      // xhr.setRequestHeader('X-File-Name', file.name);
      // xhr.setRequestHeader('X-File-Size', file.size);
      // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
      // xhr.send(file);
    }
  }



  createRecipe() {
    let newRecipe = {};
    let ingredents = this._ingredientsList.export();
    let onlyIngredients = [];
    let singleNutrient = [];
    for (let ing of ingredents) {
      onlyIngredients.push(ing[0]);
      singleNutrient.push(ing[1]);
    }
    //console.log(singleNutrient)

    newRecipe.favorite = false;
    newRecipe.title = this._recipeTitle;
    newRecipe.img = this._img;
    newRecipe.time = this._time;
    newRecipe.likes = 0;
    newRecipe.category = this._categoriesList;
    newRecipe.author = "Catarina Bennetoft";
    newRecipe.url = this._id;
    newRecipe.defaultPortion = this._portions;
    newRecipe.ingridiens = onlyIngredients;
    //newRecipe.ingredient = ingredents;
    newRecipe.instructions = this._stepsList.export();
    newRecipe.nutrition = this.calcPortionNutrition(singleNutrient);
    newRecipe.comments = [];
    newRecipe["⚙"] = "Recipe";




    return newRecipe;
  }

  calcPortionNutrition(ingredientsList) {
    console.log(ingredientsList)
    let kj = 0;
    let kcal = 0;
    let fat = 0;
    let saturatedFat = 0;
    let monounsaturatedFattyAcids = 0;
    let polyunsaturatedFattyAcids = 0;
    let carbohydrates = 0;
    let protein = 0;
    let salt = 0;

    ingredientsList.forEach((item) => {
      kj += item.EnergyKJ;
      kcal += item.EnergyKCAL;
      fat += item.Fat;
      saturatedFat += item.TotalSaturatedFattyAcids;
      monounsaturatedFattyAcids += item.TotalMonounsaturatedFattyAcids;
      polyunsaturatedFattyAcids += item.TotalPolyunsaturatedFattyAcids;
      carbohydrates += item.Carbohydrates;
      protein += item.Protein;
      salt += item.Salt;
    });

    return {
      kj,
      kcal,
      fat,
      saturatedFat,
      monounsaturatedFattyAcids,
      polyunsaturatedFattyAcids,
      carbohydrates,
      protein,
      salt
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

  inputLabel() {
    let inputs = $(".ingr-css");
    inputs.map((inpt) => {
        if (inpt.value !== "") {
          $(".ingr-d-none").addClass("active highlight");
        }
      }

    )
  }


  //autocomplete
  load() {
    return $.getJSON('/json/food.json');
  }




  saveRecipe(json) {
    //let newRecipeList=[];
    //let that = this;

    $.getJSON("./json/recipe.json").then((data) => {
      data.push(json);
      $("#savedSuccessModal").modal('show');
      $(".save-btn").on("click", () => {
        JSON._save("recipe", data).then(() => {
          console.log("saved!");
          const url = `/recipe/${json.url}`;
          Object.assign(this.app.popState.urls, {
            [url]: 'recipe'
          });
          //location.replace("http://localhost:3000/my_page");
        });
      })

    })


  }

  validateInput() {
    if (
      this._recipeTitle !== undefined &&
      this.validateTimeInput() &&
      this._img &&
      this._categoriesList &&
      this._categoriesList.length &&
      this._ingredientsList.some(i => i._name !== "") &&
      this._ingredientsList.some(i => i._quantity !== "") &&
      this._ingredientsList.some(i => i.unit !== undefined) &&
      this._stepsList.length > 0
    ) {
      return true;
    }
    return false;
  }

  showSteps() {
    let that = this;
    let text = $("#receptTextarea").val();
    if(text){
      let step = new Step(text, that);
      $("#receptTextarea").val('');
      that._stepsList.push(step);
      $(".steps-here").empty();
      console.log(that._stepsList)
      that._stepsList.render(".steps-here", "");
    }
   
  }

}