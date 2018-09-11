var parser = require('xml2json');
var fs = require('fs');
var xml =fs.readFileSync('naringsinnehall.xml');
var json = parser.toJson(xml);
var obj=JSON.parse(json);
var items=obj.LivsmedelDataset.LivsmedelsLista.Livsmedel;
var myJSON = JSON.stringify(items);
fs.writeFile('food.json',myJSON);
// var obj=JSON.parse(json);

// var items=obj.LivsmedelDataset.LivsmedelsLista.Livsmedel;

// // console.log(obj.LivsmedelDataset.LivsmedelsLista.Livsmedel.length);
// // var filter=items.filter((item)=>{
// //    return item.Namn=="nöt";
// // })
// var search='Talg';
// var filter=items.filter(function(obj) {
//     return obj.VAL=== search;});
// console.log(filter[0]);
//console.log(filter[0].Naringsvarden.Naringsvarde);

// var search='CPP@';
//     var results=_.filter(collection,function(item){
//     return item.VAL.indexOf(search)>-1;
//     });
//     console.log(results);