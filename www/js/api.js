$.getJSON( "/json/food.json", function( item) {
    console.log(data.length);
  });

  function search(jsonList, searchText) {
    return jsonList.filter(function(x) {
        for (var i in x) {
            if (x[i].toLowerCase().indexOf(searchText.toLowerCase()) > -1) return x;
        }
    })
}