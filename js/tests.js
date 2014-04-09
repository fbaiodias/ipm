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
    "type": [],
    "start": false,
    "time": 30
  } 
} 

$(window).load(function(){
  goToMenu("testes-calculo");

  li = $('b');
  liSelected = li.eq(0).addClass('selected');;;
  $(window).keydown(function(e){

      if(options.tests.start) {
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
          else {number = 0}
          liSelected[0].textContent = number;          
        }else if(e.which === 40){
          var number = eval(liSelected[0].textContent);
          if(number>0) {number--;}
          else {number = 9}
          liSelected[0].textContent = number;          
        }
      } else {
        options.tests.start = true;
        $("#problemBefore").toggle();
        $("#problemAfter").toggle();
        $("#timer").toggle();

        setTimeout(testCountDown, 1000);


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

function testCountDown() {
  if (options.tests.time <= 0) {
    $("#problemAfter").toggle();
    $("#testFailed").toggle();
    $("#timer").toggle();
  } else {
    options.tests.time--;
    $('#timerNumber').text(options.tests.time);
    setTimeout(testCountDown, 1000);
  }
}