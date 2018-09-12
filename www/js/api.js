var searchText;
var jsonList;
var ingredient = $('#ingredient');

$.getJSON("/json/food.json", (data) => {
  jsonList = data;
  //console.log(jsonList[0]);
  ingredient.keyup(() => {
    var inputText = ingredient[0].value;
    console.log(inputText);
  
    search(jsonList, inputText);
    
  });

});

function search(jsonList, searchText) {
  let regEx = new RegExp(`(^|\\s)${searchText}(\\s|$)`, 'ig');
  //let regEx = new RegExp(searchText.split("").join("\\w*").replace(/\W/, ""), "i");
  let result = jsonList.filter(x => x.Namn.match(regEx) !== null);
  console.log(result);
}

function setSearch(value) {
  document.getElementById('search').value = value;
  document.getElementById("result").innerHTML = "";
}

function changeInput(val) {
  var autoCompleteResult = matchPeople(val);
  document.getElementById("result").innerHTML = "";
  for (var i = 0, limit = 10, len = autoCompleteResult.length; i < len  && i < limit; i++) {
    document.getElementById("result").innerHTML += "<a class='list-group-item list-group-item-action' href='#' onclick='setSearch(\"" + autoCompleteResult[i] + "\")'>" + autoCompleteResult[i] + "</a>";
  }
}