var fs = require('fs');

var path = './partials/';
var files = fs.readdirSync(path);
var htmls = {}

for (var i in files) {
  var data = fs.readFileSync(path + files[i], 'utf8');

  data=data.replace(/\n/g,'');
  data=data.replace(/\s\s/g,'');
  data=data.replace(/\t/g,'');

  htmls[files[i].split('.html')[0]] = data;
}

fs.writeFile("./htmls.json", JSON.stringify(htmls, null, 2), function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("The htmls file was saved!");
  }
}); 