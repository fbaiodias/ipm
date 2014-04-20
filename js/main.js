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
  },
  "sharing": {
    "outgoing": {
      "all": "Ninguém",
      "name": "Ninguém",
      "position": "Ninguém",
      "photo": "Ninguém",
      "destination": "Ninguém"
    },
    "incoming": {
      "all": true,
      "name": true,
      "position": true,
      "photo": true,
      "destination": true
    }

  }
} 

var menu = "main";

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
          $("#path").append('<span>Ajuda</span>');
          //$("#button").attr("src","img/button3.png");
        break;
        default:
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
      }
    }else if(e.which === 38){ //up
      switch (menu) {
        case "main":
          goToMenu("testes");
          $("#path").append('<span>Testes de Aptidão para Condução</span>');
          //$("#button").attr("src","img/button3.png");
        break;
        case "partilha":
          goToMenu("partilha-config");
          $("#path").append('<span>Opções</span>');
          //$("#button").attr("src","img/button3.png");
          
        break;
        case "pontos":
          goToMenu("pontos-config");
          $("#path").append('<span>Opções</span>');
          //$("#button").attr("src","img/button3.png");
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
      switch (menu) {
        case "main":
          goToMenu("pontos");
          $("#path").append('<span>Pontos de Interesse</span>');
          $("#button").attr("src","img/button7.png");
        break;
        case "partilha":
        case "pontos":
        break;
        case "partilha-config-receber":
          var input = $('li.selected div input');
          var incoming = options.sharing.incoming;

          incoming[input.attr('value')] ^= true //toggle boolean (XOR)

          if (input.attr('value') == "all") {
            for (var value in incoming) {
              if (value != "all") {
                incoming[value] = incoming['all'];
              }
            }
          } else {
            incoming['all'] = false;
          }
          var checks = 0;
          var total = 0;
          for (var value in incoming) {
              total++;
              if (incoming[value] && value != "all") {
                checks++;
              }
          }
          if (checks == total-1) {
            incoming['all'] = true;
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
        default:
          if(liSelected) {
          if(liSelected[0].title) {
            var pathText = liSelected[0].textContent;
            $("#path").append('<span>'+pathText+'</span>');
            goToMenu(liSelected[0].title);

            var element = liSelected[0].children[0].children[0];
            if(element.id === "start-hours") {
              $('#start-hours').html(options.tests.interval.start.hours);
              $('#start-minutes').html(options.tests.interval.start.minutes);
            }else if(element.id === "end-hours") {
              $('#end-hours').html(options.tests.interval.end.hours);
              $('#end-minutes').html(options.tests.interval.end.minutes);
            }

          } else if(element.id === "start-hours"){
            if(options.tests.interval.start.hours > 22) options.tests.interval.start.hours = -1;
            $('#start-hours').html(++options.tests.interval.start.hours);
          } else if(element.id === "start-minutes"){
            if(options.tests.interval.start.minutes >= 50) options.tests.interval.start.minutes = -10;
            options.tests.interval.start.minutes += 10;
            $('#start-minutes').html(options.tests.interval.start.minutes);
          } else if(element.id === "end-hours"){
            if(options.tests.interval.end.hours > 22) options.tests.interval.end.hours = -1;
            $('#end-hours').html(++options.tests.interval.end.hours);
          } else if(element.id === "end-minutes"){
            if(options.tests.interval.end.minutes >= 50) options.tests.interval.end.minutes = -10;
            $('#end-minutes').html(++options.tests.interval.end.minutes);
          } else if(liSelected[0].children[0]){
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
    }else if(e.which === 37){ //left
      switch (menu) {
        case "main":
          goToMenu("partilha");
          $("#path").append('<span>Partilha de Informação</span>');
          $("#button").attr("src","img/button7.png");
          
        break;
        default:
          var ul = $('ul');
          if(ul && ul[0].title) {
            goToMenu(ul[0].title);
            $("#path").children().last().remove();
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
    $("#button").attr("src","img/button-"+menu+".png");

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

    //manter consistencia com variaveis
    switch (menu) {
      case "partilha-config-enviar":
        for (var title in options.sharing.outgoing) {
          $("li[title='"+title+"'] div span").html(options.sharing.outgoing[title]);
        }
      break;
      case "partilha-config-receber":
        for (var value in options.sharing.incoming) {
          $("input[value='"+value+"']").prop('checked', options.sharing.incoming[value]);
        }
      break;
    }



  });
});

function goToMenu(id) {
  menu = id;
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