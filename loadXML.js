var parser = require('xml2json');
var fs = require('fs');
var xml =fs.readFileSync('name.xml');
var json = parser.toJson(xml);

// fs.writeFile('name.json', json);
var obj=JSON.parse(json);

var items=obj.LivsmedelDataset.LivsmedelsLista.Livsmedel;

// console.log(obj.LivsmedelDataset.LivsmedelsLista.Livsmedel.length);
var filter=items.filter((item)=>{
   return item.Namn=="Talg nöt";
})

console.log(filter[0].Naringsvarden.Naringsvarde);

