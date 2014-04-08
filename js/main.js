var li, liSelected;

$(window).load(function(){
  goToMenu("menu");


  li = $('li');
  liSelected = li.eq(0).addClass('selected');;;
  $(window).keydown(function(e){
      if(e.which === 40){
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
      }else if(e.which === 38){
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
      }else if(e.which === 39){
        if(liSelected && liSelected[0].title) {
          goToMenu(liSelected[0].title);
        } else {
          if(liSelected[0].children[0].checked) {
            liSelected[0].children[0].checked = false;
          } else {
            liSelected[0].children[0].checked = true;
          }
        }
      }else if(e.which === 37){
        var ul = $('ul');
        if(ul && ul[0].title) {
          goToMenu(ul[0].title);
        }
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