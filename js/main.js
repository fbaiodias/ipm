var li, liSelected;

var options = {
  "tests": {
    "started": false,
    "active": false,
    "interval": {
      "start-hours": 22,
      "start-minutes": 00,
      "end-hours": 22,
      "end-minutes": 00
    },
    "type": [false, false, false, false, false]
  },
  "sharing": {
    "outgoing": {
      "all": "Ninguém",
      "name": "Ninguém",
      "photo": "Ninguém",
      "destination": "Ninguém"
    },
    "incoming": {
      "all": true,
      "name": true,
      "photo": true,
      "destination": true
    }

  },
  "points": {
    "all": false,
    "bathroom": false,
    "entertainment": false,
    "hotel": false,
    "atm": false,
    "restaurant": false,
    "health": false,
    "supermarket": false
  }
} 

var menu = "main";
var previousSelection;

$(window).load(function(){

  goToMenu("main");

  li = $('li');
  liSelected = li.eq(0).addClass('selected');
  $(window).keydown(function(e){
    if(e.which === 40){ //down
      switch (menu) {
        case "main":
        case "partilha":
        case "pontos":
          goToMenu(menu + "-ajuda");
          changePath("Ajuda")
        break;
        case "testes-executar":
          if (!options.tests.started) {
            options.tests.started = true;
          } else {

          }
        break;
        default:
          if(liSelected){
            next = liSelected.next();
            if(next.length > 0 && !next.hasClass("disabled")){
              liSelected.removeClass('selected');
              liSelected = next.addClass('selected');
            } else if (!li.eq(0).hasClass("disabled")){
              liSelected.removeClass('selected');
              liSelected = li.eq(0).addClass('selected');
            }
          }else{
              liSelected = li.eq(0).addClass('selected');
          }
      }
    }else if(e.which === 38){ //up
      switch (menu) {
        case "main":
          goToMenu("testes");
          changePath("Testes de Aptidão para Condução");
        break;
        case "partilha":
          goToMenu("partilha-config");
          changePath("Opções");
        break;
        case "pontos":
          goToMenu("pontos-config");
          changePath("Opções");
        break;
        case "testes-executar":
          if (!options.tests.started) {
            options.tests.started = true;
          } else {
            
          }
        break;
        default:
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
    }else if(e.which === 39){ //right
      var items;
      switch (menu) {
        case "main":
          goToMenu("pontos");
          changePath("Pontos de Interesse");
        break;
        case "partilha":
        case "pontos":
        break;
        case "partilha-config-receber":
          items = options.sharing.incoming;
        case "pontos-config":
          if (!items) {
            items = options.points;
          }
          var input = $('li.selected div input');

          items[input.attr('value')] ^= true; //toggle boolean (XOR)

          if (input.attr('value') == "all") {
            for (var value in items) {
              if (value != "all") {
                items[value] = items['all'];
              }
            }
          } else {
            items['all'] = false;
          }
          var checks = 0;
          var total = 0;
          for (var value in items) {
              total++;
              if (items[value] && value != "all") {
                checks++;
              }
          }
          if (checks == total-1) {
            items['all'] = true;
          }

        break;
        case "partilha-config-enviar":
          /*switch (liSelected[0].children[0].children[0].title) {
            case ""
          }*/
          var title = liSelected[0].title;
          switch (options.sharing.outgoing[title]) {
            case "Ninguém":
              options.sharing.outgoing[title] = "Conhecidos";
            break;
            case "Conhecidos":
              options.sharing.outgoing[title] = "Todos";
            break;
            case "Todos":
              options.sharing.outgoing[title] = "Ninguém";
            break;
          }
          $('li.selected div span').html(options.sharing.outgoing[title]);

        break;
        case "testes-executar":
          if (!options.tests.started) {
            options.tests.started = true;
          } else {
            
          }
        break;
        default:
          if(liSelected) {
          var element = liSelected[0].children[0].children[0];
          if(liSelected[0].title) {
            changePath(liSelected[0].textContent);
            goToMenu(liSelected[0].title);

          } else if (element.id.indexOf("hours") != -1){
            if (options.tests.interval[element.id] < 23) {
              options.tests.interval[element.id] += 1;
            } else {
              options.tests.interval[element.id] = 0;
            }
          } else if (element.id.indexOf("minutes") != -1) {
            if (options.tests.interval[element.id] < 50) {
              options.tests.interval[element.id] += 10;
            } else {
              options.tests.interval[element.id] = 0;
            }
          } 

          else if(liSelected[0].children[0]){
            if(element.checked) {
              element.checked = false;

              if (element.id === "testsActive") {
                if ($("li").next(liSelected[0]).attr("title").indexOf('menu-testes-') != -1){
                  $("li").next(liSelected[0]).addClass("disabled");
                }
                options.tests.active = false;
              } else {
                if (element.value === "todos") {
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
              element.checked = true;
              if (element.id === "testsActive") {
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

        }
      }
    } else if(e.which === 37){ //left
      switch (menu) {
        case "main":
          goToMenu("partilha");
          changePath("Partilha de Informação");
        break;
        case "testes-executar":
          if (!options.tests.started) {
            options.tests.started = true;
            console.log('oi')
            $("#problemBefore").toggle();
            $("#problemAfter").toggle();
            $("#timer").toggle();
          } else {
            
          }
        break;
        default:
          var ul = $('ul');
          if(ul && ul[0].title) {
            previousSelection = menu;
            goToMenu(ul[0].title);
            $("li.selected").removeClass("selected");
            liSelected = $("li[title='"+previousSelection+"']").addClass('selected');
            removePath();
          }
        }
    }

    //manter consistencia com variaveis
    var items;
    switch (menu) {
      case "partilha-config-enviar":
        for (var title in options.sharing.outgoing) {
          $("li[title='"+title+"'] div span").html(options.sharing.outgoing[title]);
        }
      break;
      case "partilha-config-receber":
          items = options.sharing.incoming;
      case "pontos-config":
        if (!items) {
          items = options.points;
        }
        for (var value in items) {
          $("input[value='"+value+"']").prop('checked', items[value]);
        }
      break;
      case "testes-intervalo-inicio":
        $('#start-minutes').html(options.tests.interval['start-minutes']);
        $('#start-hours').html(options.tests.interval['start-hours']);
      break;
      case "testes-intervalo-fim":
        $('#end-minutes').html(options.tests.interval['end-minutes']);
        $('#end-hours').html(options.tests.interval['end-hours']);
      break;
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
    $("#button").attr("src","img/button-"+menu+".png");

    if(liSelected[0].children[0].children[0].type === "checkbox"){
      if(liSelected[0].children[0].children[0].checked === true) {
        $("#button").attr("src","img/button6.png");
      } else {
        $("#button").attr("src","img/button4.png");
      }

    } else if ($("li.selected div span").hasClass("privacy")) {
      $("#button").attr("src","img/button7.png");
    } else if ($("li.selected").hasClass("time")) {
      $("#button").attr("src","img/button5.png");
    } else {
      $("#button").attr("src","img/button3.png");
    }

    toggleOverlays();



  });
});

function goToMenu(id) {
  menu = id;
  var html = getHTML("partials/"+id+".html");

  $('#container').html(html);

  li = $('li');
  liSelected = li.eq(0).addClass('selected');

  toggleOverlays();
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

function changePath(title) {

  if(title != $("#path").children().last().text() ) { //para prevenir bugs no path
    $("#path").append("<span>"+title+"</span>");
    $("#path").children().last().animate({ marginLeft: "2"} , 100).hide().fadeToggle(100).dequeue();
  }
  
}

function removePath() {
  $("#path").children().last().animate({ marginLeft: "-20"} , 100).fadeToggle(100, function() {
    $(this).remove();
  }).dequeue();
}

function toggleOverlays() {
    if (menu == "pontos" || menu == "pontos-config") {
    for (var point in options.points) {
      if (options.points[point]) {
        $("#" + point).show();
      } else {
        $("#" + point).hide();
      }
    }
  } else {
    $(".overlay").hide();
  }

  if (menu.indexOf("partilha") != -1) {
    var noTrues = true;
    $("#box").show();
    for (var info in options.sharing.incoming) {
      if (options.sharing.incoming[info]) {
        $("#" + info).show();
        noTrues = false;
      } else {
        $("#" + info).hide();
      }
    }

    if(options.sharing.incoming.photo) {
      $("#nophoto").hide();
    } else {
      $("#nophoto").show();
    }

    if (noTrues) {
      $("#nophoto").hide();
      $("#box").hide();
    }

  } else {
    $(".overlay-sharing").hide();
  }


}