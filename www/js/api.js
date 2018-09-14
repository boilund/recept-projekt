var searchText;
var jsonList = [];
var ingredient = $('#ingredient');

$.getJSON("/json/food.json", (data) => {


  jsonList = data;

  ingredient.keyup(() => {
    var inputText = ingredient[0].value;
    console.log(inputText);
    // changeInput(jsonList, inputText)
    var list = search(jsonList, inputText);
    changeInput(list)

  });

});

function search(jsonList, searchText) {
  let regEx = new RegExp(`(^|\\s)${searchText}(\\s|$)`, 'ig');
  //let regEx = new RegExp(searchText.split("").join("\\w*").replace(/\W/, ""), "i");
  let result = jsonList.filter(x => x.Namn.match(regEx) !== null);
  return result

}

function setSearch(val) {
  document.getElementById('search').value = val;
  document.getElementById("result").innerHTML = "";
}

function changeInput(list) {
  var autoCompleteResult = list;
  console.log(autoCompleteResult);
  document.getElementById("result").innerHTML = "";
  for (var i = 0, len = autoCompleteResult.length; i < len; i++) {
   var listText=autoCompleteResult[i].Namn;
   console.log(i,listText)
   document.getElementById("result").innerHTML += '<a class="list-group-item list-group-item-action" href="#"" onclick="setSearch('+ listText +')" >  ' + listText + '   </a>';
  }
  
}

