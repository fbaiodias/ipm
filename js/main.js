var li, liSelected, num, numSelected;

var htmls = {
  "controlos": "<div class=\"description\">Seleccione as funcionalidades que pretende activar.</div><ul title=\"main\"><li><div>Seleccionar todos<input type=\"checkbox\" value=\"all\"></div></li><li><div>Aquecimento<input type=\"checkbox\" value=\"heating\"></div></li><li><div>Ar condicionado<input type=\"checkbox\" value=\"ac\"></div></li><li><div>Piloto automático<input type=\"checkbox\" value=\"autopilot\"></div></li><li><div>Rádio<input type=\"checkbox\" value=\"radio\"></div></li></ul>",
  "main-ajuda": "<ul title=\"main\"><li><div>Brevemente <img class=\"next_img\" src=\"./img/next.png\"></div></li></ul>",
  "main": "",
  "menu-testes": "<ul title=\"menu\"><li> <div>Activar <input type=\"checkbox\" id=\"testsActive\"><div></li><li title=\"menu-testes-intervalo\" class=\"disabled\"><div>Intervalo de Actividade <img class=\"next_img\" src=\"./img/next.png\"></div></li><li title=\"menu-testes-tipo\" class=\"disabled\"><div>Tipos de Testes <img class=\"next_img\" src=\"./img/next.png\"></div></li></ul>",
  "menu": "<ul><li title=\"menu-testes\"><div>Testes de Aptidão para Condução <img class=\"next_img\" src=\"./img/next.png\"></div></li><li class=\"disabled\"><div>Partilha de Informação <img class=\"next_img\" src=\"./img/next.png\"></div> </li><li class=\"disabled\"><div>Estacionamento próximo <img class=\"next_img\" src=\"./img/next.png\"></div> </li></ul>",
  "partilha-ajuda": "<ul title=\"partilha\"><li><div>Brevemente <img class=\"next_img\" src=\"./img/next.png\"></div></li></ul>",
  "partilha-config-enviar": "<div class=\"description\">Seleccione com quem pretende partilhar a sua informação.</div><ul title=\"partilha-config\"><li title=\"all\"><div>Alterar todos<span class=\"privacy\">Ninguém</span> <img class=\"next_img\" src=\"./img/switch.png\"></div></li><li title=\"name\"><div>Nome<span class=\"privacy\">Ninguém</span> <img class=\"next_img\" src=\"./img/switch.png\"></div></li><li title=\"photo\"><div>Fotografia<span class=\"privacy\">Ninguém</span> <img class=\"next_img\" src=\"./img/switch.png\"></div></li><li title=\"destination\"><div>Destino<span class=\"privacy\">Ninguém</span> <img class=\"next_img\" src=\"./img/switch.png\"></div></li></ul>",
  "partilha-config-receber": "<div class=\"description\">Seleccione que informação pretende receber de outros condutores.</div><ul title=\"partilha-config\"><li><div>Seleccionar todos<input type=\"checkbox\" value=\"all\"></div></li><li><div>Nome<input type=\"checkbox\" value=\"name\"></div></li><li><div>Fotografia<input type=\"checkbox\" value=\"photo\"></div></li><li><div>Destino<input type=\"checkbox\" value=\"destination\"></div></li></ul>",
  "partilha-config": "<ul title=\"partilha\"><li title=\"partilha-config-enviar\"><div>Informação a enviar <img class=\"next_img\" src=\"./img/next.png\"></div></li><li title=\"partilha-config-receber\"><div>Informação a receber <img class=\"next_img\" src=\"./img/next.png\"></div> </li></ul>",
  "partilha": "<ul title=\"main\"></ul><div class=\"overlay\" id=\"people\"></div>",
  "pontos-ajuda": "<ul title=\"pontos\"><li><div>Brevemente <img class=\"next_img\" src=\"./img/next.png\"></div></li></ul>",
  "pontos-config": "<ul title=\"pontos\"><li><div>Seleccionar todos<input type=\"checkbox\" value=\"all\"></div> </li><li><div class=\"has_icon\"><img class=\"icon\" src=\"./img/icons/bathroom.png\">Casa de banho<input type=\"checkbox\" value=\"bathroom\"></div> </li><li><div class=\"has_icon\"><img class=\"icon\" src=\"./img/icons/entertainment.png\">Entertenimento<input type=\"checkbox\" value=\"entertainment\"></div> </li><li><div class=\"has_icon\"><img class=\"icon\" src=\"./img/icons/hotel.png\">Hotel/Residencial<input type=\"checkbox\" value=\"hotel\"></div> </li><li><div class=\"has_icon\"><img class=\"icon\" src=\"./img/icons/atm.png\">Multibanco<input type=\"checkbox\" value=\"atm\"></div> </li><li><div class=\"has_icon\"><img class=\"icon\" src=\"./img/icons/restaurant.png\">Restaurante<input type=\"checkbox\" value=\"restaurant\"></div> </li><li><div class=\"has_icon\"><img class=\"icon\" src=\"./img/icons/health.png\">Saúde<input type=\"checkbox\" value=\"health\"></div> </li><li><div class=\"has_icon\"><img class=\"icon\" src=\"./img/icons/shopping.png\">Supermercado<input type=\"checkbox\" value=\"supermarket\"></div> </li></ul>",
  "pontos": "<ul title=\"main\"></ul>",
  "testes-ajuda": "<ul title=\"testes\"><li><div>Brevemente <img class=\"next_img\" src=\"./img/next.png\"></div></li></ul>",
  "testes-executar": "<ul title=\"testes\"></ul><div class=\"description\"><div id=\"problemBefore\">O veículo encontra-se bloqueado pois activou os Testes de Aptidão para Condução. Terá que responder correctamente a uma pergunta dentro do limite de tempo para desbloquear o veículo.<br><br>Prima qualquer tecla para começar.</div><div id=\"problemAfter\"> Use os botões direccionais para inserir a resposta correcta antes do limite de tempo.<div id=\"equation\">81 ÷ 9 = <span id=\"result\"><b id=\"x00\" class=\"number selected\">0</b><b id=\"0x0\" class=\"number\">0</b><b id=\"00x\" class=\"number\">0</b></span><span></span></div></div><div id=\"testFailed\"> Falhou o teste. Não é aconselhada a condução nestas condições. Pressione qualquer tecla para continuar.</div><div id=\"testPassed\"> Passou o teste com sucesso. Pressione qualquer tecla para desbloquear o veículo. </div></div><div id=\"timer\"><span id=\"timerNumber\">30</span>s</div>",
  "testes-intervalo-fim": "<ul title=\"testes-intervalo\"><li class=\"time\"><div><span id=\"end-hours\">22</span> horas <img class=\"next_img\" src=\"./img/plus.png\"></div></li><li class=\"time\"><div><span id=\"end-minutes\">22</span> minutos <img class=\"next_img\" src=\"./img/plus.png\"></div></li></ul>",
  "testes-intervalo-inicio": "<ul title=\"testes-intervalo\"><li class=\"time\"><div><span id=\"start-hours\">22</span> horas <img class=\"next_img\" src=\"./img/plus.png\"></div></li><li class=\"time\"><div><span id=\"start-minutes\">22</span> minutos <img class=\"next_img\" src=\"./img/plus.png\"></div></li></ul>",
  "testes-intervalo": "<ul title=\"testes\"><li title=\"testes-intervalo-inicio\"><div>Inicio <img class=\"next_img\" src=\"./img/next.png\"></div></li><li title=\"testes-intervalo-fim\"><div>Fim <img class=\"next_img\" src=\"./img/next.png\"></div></li></ul><div class=\"note\">Nota: Esta funcionalidade será deactivada após 24 horas.</div>",
  "testes-tipo": "<ul title=\"testes\"><li><div>Seleccionar Todos <input type=\"checkbox\" value=\"todos\"></div></li><li><div>Cálculo Matemático <input type=\"checkbox\" value=\"calculo\"></div></li><li><div>Coordenação<input type=\"checkbox\" value=\"coordenacao\"></div></li><li><div>Reflexos <input type=\"checkbox\" value=\"reflexos\"></div></li><li><div>Quebra Cabeças<input type=\"checkbox\" value=\"quebra\"></div></li></ul>",
  "testes": "<div class=\"description\">Ao executar um teste, o carro ficará bloqueado até que o teste seja passado com sucesso.Pode optar por executar o teste agora ou seleccionar um horário onde o teste será activado ao ligar o carro.</div><ul title=\"main\"><li title=\"testes-executar\"><div>Executar teste agora <img class=\"next_img\" src=\"./img/next.png\"></div></li><li title=\"testes-intervalo\"><div>Activar por intervalo <img class=\"next_img\" src=\"./img/next.png\"></div> </li></ul>"
}

var options = {
  "tests": {
    "started": false,
    "finished": false,
    "active": false,
    "time": 5,
    "answer": 0,
    "correct_answer": 9,
    "interval": {
      "start-hours": 22,
      "start-minutes": 00,
      "end-hours": 22,
      "end-minutes": 00,
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
    "all": true,
    "bathroom": true,
    "entertainment": true,
    "hotel": true,
    "atm": true,
    "restaurant": true,
    "health": true,
    "supermarket": true
  },
  "controls": {
    "all": false,
    "heating": false,
    "ac": false,
    "autopilot": false,
    "radio": false
  }
} 

var menu = "main";
var previousSelection;

$(window).load(function(){

  setInterval(testCountDown, 1000);

  goToMenu("main");

  li = $('li');
  liSelected = li.eq(0).addClass('selected');

  $(window).keydown(function(e){
    if(e.which === 40){ //down
      switch (menu) {
        case "main":
          goToMenu("controlos");
          changePath("Controlos do Veículo");
        break;
        case "partilha":
        case "pontos":
          goToMenu(menu + "-ajuda");
          changePath("Ajuda");
        break;
        case "testes-executar-iniciar":
          if (!options.tests.started) {
            testStart()
          } else {
            var number = eval(numSelected[0].textContent);
            if(number>0) {number--;}
            else {number = 9}
            numSelected[0].textContent = number;
          }
          if (options.tests.finished) {
            options.tests.answer = 0;
            options.tests.finished = false;
            goToMenu("main");
            removePath();
            setTimeout(removePath, 200);
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
        case "partilha-ajuda":

          goToMenu("partilha-config");
          removePath();
          changePath("Opções");
        break;
        case "pontos":
        case "pontos-ajuda":
          goToMenu("pontos-config");
          removePath();
          changePath("Opções");
        break;
        case "testes-executar-iniciar":
          if (!options.tests.started) {
            testStart();
          } else {
            var number = eval(numSelected[0].textContent);
            if(number<9) {
              number++;
            }
            else {number = 0}
            numSelected[0].textContent = number; 
          }
          if (options.tests.finished) {
            options.tests.finished = false;
            options.tests.answer = 0;
            goToMenu("main");
            removePath();
            setTimeout(removePath, 200);
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
        case "testes-intervalo":
          items = options.tests;
        case "controlos":
          if (!items) {
            items = options.controls;
          }
        case "partilha-config-receber":
          if (!items) {
            items = options.sharing.incoming;
          }
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
        case "testes-executar-iniciar":
          if(numSelected){
              numSelected.removeClass('selected');
              next = numSelected.next();
              if(next.length > 0){
                  numSelected = next.addClass('selected');
              }else{
                  numSelected = num.eq(0).addClass('selected');
              }
          }else{
              numSelected = num.eq(0).addClass('selected');
          }
          if (options.tests.finished) {
            options.tests.finished = false;
            options.tests.answer = 0;
            goToMenu("main");
            removePath();
            setTimeout(removePath, 200);
          }
        break;
      }
        if(menu != "pontos") {
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

        if ($('[value="todos"]').is(':checked') ){
          $('[name="tipo"]').prop("checked", true);
          for (var i = 0; i < 5 ; i++) {
            options.tests.type[i] = true;
          }
        }

        }
      }
    } else if(e.which === 37){ //left
      switch (menu) {
        case "main":
          goToMenu("partilha");
          changePath("Partilha de Informação");
        break;
        case "testes-executar-iniciar":
          if (!options.tests.started) {
            goToMenu("main");
          } else {
            if(numSelected){
                numSelected.removeClass('selected');
                next = numSelected.prev();
                if(next.length > 0){
                    numSelected = next.addClass('selected');
                }else{
                    numSelected = num.last().addClass('selected');
                }
            }else{
                numSelected = num.last().addClass('selected');
            }
          }
          if (options.tests.finished) {
            options.tests.finished = false;
            options.tests.answer = 0;
            goToMenu("main");
            removePath();
            setTimeout(removePath, 200);
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
      case "testes-intervalo":
        items = options.tests;
      case "controlos":
        if (!items) {
          items = options.controls;
        }
      case "partilha-config-receber":
        if (!items) {
          items = options.sharing.incoming;
        }
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

    } else if (liSelected[0].children[0].children[1] && liSelected[0].children[0].children[1].type === "checkbox"){
      if(liSelected[0].children[0].children[1].checked === true) {
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

    if(menu.indexOf("ajuda") != -1) {
      $("#button").attr("src","img/button-help.png");
    }

    toggleOverlays();




  });
});

function goToMenu(id) {  
  menu = id;
  var html = htmls[id];

  $('#container').html(html);

  li = $('li');
  liSelected = li.eq(0).addClass('selected');

  toggleOverlays();
  if (menu == "testes-executar-iniciar") {  
    options.tests.time = 30;
    options.tests.answer = 0;

    options.tests.finished = false;
    options.tests.started = true;

    num = $('b');
    $('#x00').text('0');
    $('#0x0').text('0');
    $('#00x').text('0');

    numSelected = $('.number.selected')
  }

  if(menu == "main") {
    setTimeout(showHelp, 5000);
  }
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

function testCountDown() {
  if (menu == "testes-executar-iniciar") {
    if (options.tests.time <= 0) {
      $("#problemAfter").toggle();
      $("#testFailed").toggle();
      $("#timer").toggle();
      options.tests.started = false;
      options.tests.finished = true;
      options.tests.time = 30;
      options.tests.answer = 0;
    } else if ((options.tests.answer == options.tests.correct_answer) && !options.tests.finished) {
      $("#problemAfter").toggle();
      $("#timer").toggle();
      $("#testPassed").toggle();
      options.tests.started = false;
      options.tests.finished = true;
      options.tests.time = 30;
      options.tests.answer = 0;
    }

    options.tests.time--;
    $('#timerNumber').text(options.tests.time);


    if (menu == "testes-executar-iniciar") {
      options.tests.answer = 100*eval($("#x00").text()) + 10 *eval($("#0x0").text()) + eval($("#00x").text());
    }
  }
  
}

function showHelp() {
  if (menu == "main") {
    $("#button").attr("src","img/helpoverlay.png");
  }
}