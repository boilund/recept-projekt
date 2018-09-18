class CreateRecipe extends Base {
  constructor() {
    super();
    
  }

  keyup(event){
    this.labelCss(event);
  }

  keyupIngredients(event){
    this.labelCss(event);
  }

  //method for control css when keyup
  labelCss(event){
    var label = event.target.labels[0];
    if($(event.target).val()===''){
      $(label).removeClass('active highlight');
    }else{
      $(label).addClass('active highlight');
    }
  }



  load() {
    return JSON._load('/food').then((data) => {
      //console.log(data[0])
      //let jsonList = data;
      let ingredient = $('#ingredient');

      ingredient.keyup(() => {
        var inputText = ingredient[0].value;
        var list = this.search(data, inputText);
        this.changeInput(list)

      });

    });
  }


  search(jsonList, searchText) {
    if (searchText) {
      if (searchText.toLowerCase() !== "vatten") {
        let regEx = new RegExp(`(^|\\s)${searchText}(\\s|$)`, 'ig');
        // let regEx = new RegExp(searchText.split("").join("\\w*").replace(/\W/, ""),
        // "i");
        let result = jsonList.filter(x => x.Namn.match(regEx) !== null);
        return result;
      } else {
        setSearch("vatten");
      }

    }

  }

  setSearch(val) {
    $('input[name=ingredient]').val(val);
    // document
    //   .getElementById("result")
    //   .innerHTML = "";
    $("#result").empty();
  }

  changeInput(list) {
    if (list) {
      var autoCompleteResult = list;
      //console.log(autoCompleteResult)
      $("#result").empty();
      for (var i = 0, len = autoCompleteResult.length; i < len; i++) {
        var listText = autoCompleteResult[i].Namn;
        console.log(listText)
        $("#result").append(`<a class='list-group-item list-group-item-action' onclick='setSearch("${listText}")' >  ${listText}   </a>`);
      }
    }

  }
}