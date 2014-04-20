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
          $("#path").append('<span>Ajuda</span>');
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
        break;
        case "partilha":
          goToMenu("partilha-config");
          $("#path").append('<span>Opções</span>');
          
        break;
        case "pontos":
          goToMenu("pontos-config");
          $("#path").append('<span>Opções</span>');
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
          $("#path").append('<span>Pontos de Interesse</span>');
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

          items[input.attr('value')] ^= true //toggle boolean (XOR)

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
    } else if(e.which === 37){ //left
      switch (menu) {
        case "main":
          goToMenu("partilha");
          $("#path").append('<span>Partilha de Informação</span>');
        break;
        default:
          var ul = $('ul');
          if(ul && ul[0].title) {
            previousSelection = menu;
            goToMenu(ul[0].title);
            $("li.selected").removeClass("selected");
            liSelected = $("li[title='"+previousSelection+"']").addClass('selected');
            console.log($("li[title='"+previousSelection+"']"));
            $("#path").children().last().remove();
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

    } else if ($("li.selected div span").attr('class') === "privacy") {
      console.log('oi')
      $("#button").attr("src","img/button7.png");
    } else if ($("li.selected").attr('class') === "time") {
      $("#button").attr("src","img/button5.png");
    } else {
      $("#button").attr("src","img/button3.png");
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