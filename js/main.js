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
    "type": [false, false, false, false, false]
  } 
} 

var menuOpen = false;
var menu = "main"; // main/tests/share/poi

$(window).load(function(){
  goToMenu("main");

  li = $('li');
  liSelected = li.eq(0).addClass('selected');
  $(window).keydown(function(e){

      if(e.which === 40){
        if(menuOpen) {
          if(liSelected){
              
              next = liSelected.next();
              if(next.length > 0 && !next.hasClass("disabled")){
                liSelected.removeClass('selected');
                liSelected = next.addClass('selected');
              }else if (!li.eq(0).hasClass("disabled")){
                liSelected.removeClass('selected');
                liSelected = li.eq(0).addClass('selected');
              }
          }else{
              liSelected = li.eq(0).addClass('selected');
          }
        }else{
          goToMenu("menu");
          $("#path").append('<span>Configurações</span>');
          $("#button").attr("src","img/button3.png");
          menuOpen = true;
        }
      }else if(e.which === 38){
        if(menuOpen) {
          if(liSelected){
              next = liSelected.prev();
              if(next.length > 0 && !next.hasClass("disabled")){
                  liSelected.removeClass('selected');
                  liSelected = next.addClass('selected');
              }else if (!li.last().hasClass("disabled")){
                  liSelected.removeClass('selected');
                  liSelected = li.last().addClass('selected');
              }
          }else{
              liSelected = li.last().addClass('selected');
          }
        }
      }else if(e.which === 39){
        if(menuOpen) {

          if(liSelected) {
            if(liSelected[0].title) {
              var pathText = liSelected[0].textContent;
              $("#path").append('<span>'+pathText+'</span>');
              goToMenu(liSelected[0].title);


              if(liSelected[0].children[0].children[0].id === "start-hours") {
                $('#start-hours').html(options.tests.interval.start.hours);
                $('#start-minutes').html(options.tests.interval.start.minutes);
              }else if(liSelected[0].children[0].children[0].id === "end-hours") {
                $('#end-hours').html(options.tests.interval.end.hours);
                $('#end-minutes').html(options.tests.interval.end.minutes);
              }

            } else if(liSelected[0].children[0].children[0].id === "start-hours"){
              if(options.tests.interval.start.hours > 22) options.tests.interval.start.hours = -1;
              $('#start-hours').html(++options.tests.interval.start.hours);
            } else if(liSelected[0].children[0].children[0].id === "start-minutes"){
              if(options.tests.interval.start.minutes >= 50) options.tests.interval.start.minutes = -10;
              options.tests.interval.start.minutes += 10;
              $('#start-minutes').html(options.tests.interval.start.minutes);
            } else if(liSelected[0].children[0].children[0].id === "end-hours"){
              if(options.tests.interval.end.hours > 22) options.tests.interval.end.hours = -1;
              $('#end-hours').html(++options.tests.interval.end.hours);
            } else if(liSelected[0].children[0].children[0].id === "end-minutes"){
              if(options.tests.interval.end.minutes >= 50) options.tests.interval.end.minutes = -10;
              $('#end-minutes').html(++options.tests.interval.end.minutes);
            } else if(liSelected[0].children[0]){
              if(liSelected[0].children[0].children[0].checked) {
                liSelected[0].children[0].children[0].checked = false;

                if (liSelected[0].children[0].children[0].id === "testsActive") {
                  if ($("li").next(liSelected[0]).attr("title").indexOf('menu-testes-') != -1){
                    $("li").next(liSelected[0]).addClass("disabled");
                  }
                  options.tests.active = false;
                } else {
                  if (liSelected[0].children[0].children[0].value === "todos") {
                    $('[name="tipo"]').prop("checked", false);
                    for (var i = 0; i < 5 ; i++) {
                      options.tests.type[i] = false;
                    }
                  }

                  $('[value="todos"]').prop("checked", false);
                  options.tests.type[0] = false;
                  options.tests.type[$("li").index(liSelected[0])] = false;
                }

              } else {
                liSelected[0].children[0].children[0].checked = true;
                if (liSelected[0].children[0].children[0].id === "testsActive") {
                  if ($("li").next(liSelected[0]).attr("title").indexOf('menu-testes-') != -1){
                    $("li").next(liSelected[0]).removeClass("disabled");
                  }
                  options.tests.active = true;
                } else {
                  options.tests.type[$("li").index(liSelected[0])] = true;
                }


              }
            }
          }

          if ($('[value="todos"]').is(':checked') ){
            $('[name="tipo"]').prop("checked", true);
            for (var i = 0; i < 5 ; i++) {
              options.tests.type[i] = true;
            }

          } /*else {
            $('[name="tipo"]').prop("checked", false);
            for (var i = 0; i < 5 ; i++) {
              options.tests.type[i] = false;
            }
          }*/

          /*if ($('[name="tipo"]').is(':checked')) {
            $('[value="todos"]').prop("checked", true);
            options.tests.type[0] = true;
          }
          var allChecked = true;
          for (var i = 1; i < 5 ; i++) {
            console.log(options.tests.type[i]);
            if (options.tests.type[i] != true) {
              allChecked = false;
            }
          }
          if (allChecked) {
            $('[value="todos"]').prop("checked", true);
          }*/





        }
      }else if(e.which === 37){
        if(menuOpen) {
          var ul = $('ul');
          if(ul && ul[0].title) {
            goToMenu(ul[0].title);
            $("#path").children().last().remove();
          } else {
            goToMenu("main");
            $("#path").children().last().remove();
            menuOpen = false;
            $("#button").attr("src","img/button1.png");
          }
        }
      }


      //Checkboxes
      if (options.tests.active) {
        $('#testsActive').prop('checked', true);
        if ($("li").next(liSelected[0]).attr("title") && $("li").next(liSelected[0]).attr("title").indexOf('menu-testes-') != -1){
          $("li").next(liSelected[0]).removeClass("disabled");
        }
      }

      for (var i = 0; i < 5 ; i++) {
        if (options.tests.type[i] && $("li").get(i)) {
          $("li").get(i).children[0].children[0].checked = true;
        }
      }


      //Alterar botao
      if(liSelected[0].children[0].children[0].type === "checkbox"){
        if(liSelected[0].children[0].children[0].checked === true) {
          $("#button").attr("src","img/button6.png");
        } else {
          $("#button").attr("src","img/button4.png");
        }
        
      } else if (liSelected[0].children[0].children[1]) {

        $("#button").attr("src","img/button5.png");
      } else {
        $("#button").attr("src","img/button3.png");
      }

  });
});

function goToMenu(id) {
  var html = getHTML("partials/"+id+".html");

  $('#container').html(html);

  li = $('li');
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