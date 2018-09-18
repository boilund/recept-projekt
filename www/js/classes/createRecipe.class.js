class CreateRecipe extends Base {
  constructor() {
    super();
    this.changeInput();
    this.load();
  }

  load() {
    return JSON._load('/food').then((data) => {
      console.log(data[0])
      let jsonList = data;
      let ingredient = $('#ingredient');

      ingredient.keyup(() => {
        var inputText = ingredient[0].value;
        //console.log(inputText);
        var list = search(jsonList, inputText);
        changeInput(list)

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
    document
      .getElementById("result")
      .innerHTML = "";
  }

  changeInput(list) {
    if (list) {
      var autoCompleteResult = list;
      document
        .getElementById("result")
        .innerHTML = "";
      for (var i = 0, len = autoCompleteResult.length; i < len; i++) {
        var listText = autoCompleteResult[i].Namn;
        $("#result").append(`<a class='list-group-item list-group-item-action' onclick='setSearch("${listText}")' >  ${listText}   </a>`);
      }
    }

  }
}