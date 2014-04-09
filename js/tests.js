var li, liSelected;

var options = {
  "tests": {
    "active": false,
    "interval": {
      "start": {
        "hours": 22,
        "minutes": 00,
      },
      "end": {
        "hours": 22,
        "minutes": 00,
      }
    },
    "type": []
  } 
} 

$(window).load(function(){
  goToMenu("testes-calculo");
  $("#button").attr("src","img/button3.png");



  li = $('b');
  liSelected = li.eq(0).addClass('selected');;;
  $(window).keydown(function(e){

      if(e.which === 39){
          if(liSelected){
              liSelected.removeClass('selected');
              next = liSelected.next();
              if(next.length > 0){
                  liSelected = next.addClass('selected');
              }else{
                  liSelected = li.eq(0).addClass('selected');
              }
          }else{
              liSelected = li.eq(0).addClass('selected');
          }
      }else if(e.which === 37){
          if(liSelected){
              liSelected.removeClass('selected');
              next = liSelected.prev();
              if(next.length > 0){
                  liSelected = next.addClass('selected');
              }else{
                  liSelected = li.last().addClass('selected');
              }
          }else{
              liSelected = li.last().addClass('selected');
          }
      }else if(e.which === 38){
        var number = eval(liSelected[0].textContent);
        if(number<9) {number++;}
        liSelected[0].textContent = number;          
      }else if(e.which === 40){
        var number = eval(liSelected[0].textContent);
        if(number>0) {number--;}
        liSelected[0].textContent = number;          
      }


      //Alterar botao
      if(liSelected[0].children[0].children[0].type === "checkbox"){
        $("#button").attr("src","img/button4.png");
      } else if (liSelected[0].children[0].children[1] && liSelected[0].children[0].children[1].textContent.indexOf('+') != -1) {
        $("#button").attr("src","img/button5.png");
      } else {
        $("#button").attr("src","img/button3.png");
      }

  });
});

function goToMenu(id) {
  var html = getHTML("partials/"+id+".html");

  $('#container').html(html);

  li = $('b');
  liSelected = li.eq(0).addClass('selected');
}

function getHTML(url) {
  var data;
  $.ajax({
    async: false,
    url: url,
    success: function(response) {
      data = response;
    }
  });
  return data;
}