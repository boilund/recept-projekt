var searchText;
var jsonList;

$.getJSON( "/json/food.json", (data)=> {
 jsonList=data;
   
    
    console.log(jsonList[0]);
    searchText="ägg";
    search(jsonList, searchText);

  });

  function search(jsonList, searchText){
      let regEx = new RegExp(`(^|\\s)${searchText}(\\s|$)`, 'ig');
      let result=jsonList.filter(x => x.Namn.match(regEx) !== null);
  console.log(result);
    }



