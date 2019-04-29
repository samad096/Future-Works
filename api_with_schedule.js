
function getApi(room, start_date, end_date){

  fetch('https://online.ada.edu.az/rooms/api/events?token=ASj3krb0llf8pawAdrg4fjkr345nfm43&from='+start_date+'&to='+end_date+'&room='+room)
  .then(
    function(response) {

      if (response.status !== 200) {
        alert('Server Error. Status Code: ' + response.status);
        return;
      }
      response.json().then(function(data) {

        if (data.length>0) {
          var date = new Date();
         // date.setHours(10,00); /* showing real time*/
         var hours = date.getHours();
         var mins = date.getMinutes();

         document.getElementById('all_lessons').getElementsByTagName('h3')[0].innerHTML = room.fontcolor("#fff");

         for(var k in data) {

          var new_row = document.getElementById('table').getElementsByTagName('tbody')[0].insertRow();
          new_row.innerHTML = "<td>"+data[k].responsible+
          "<\/td><td>"+data[k].title+"<\/td><td>"+
          data[k].start_date+"<\/td><td>"+data[k].end_date+
          "</td><td>"+data[k].start_time+
          "<\/td><td>"+data[k].end_time+"</td>";

          var start_lesson = data[k].start_time.split(':', 2);
          var end_lesson = data[k].end_time.split(':', 2);

          start_lesson[0] = parseInt(start_lesson[0]);
          start_lesson[1] = parseInt(start_lesson[1]);
          end_lesson[0] = parseInt(end_lesson[0]);
          end_lesson[1] = parseInt(end_lesson[1]);

          if((((hours == start_lesson[0]) && (mins >= start_lesson[1])) ||
            (hours > start_lesson[0])) && (((hours == end_lesson[0]) &&
             (mins <= end_lesson[1])) || (hours < end_lesson[0]))){
            new_row.classList.add("selected_lesson");
          cur_lesson = document.createElement('div');
          cur_lesson.className = "cur_lesson";
          cur_lesson.innerHTML = data[k].room.fontsize(18) + "<br>"+"<br>"+"<br>"
          + data[k].title + "<br>"
          + data[k].responsible + "<br>"
          + data[k].start_time + "-" +  data[k].end_time;
        }

      }

      setInterval(function() {
        var screen = document.getElementById("screen");
        var all_lessons = document.getElementById("all_lessons");
        if (screen.style.display === "none") {
          screen.style.display = "block";
          all_lessons.style.display = "none";
        } else {
          screen.style.display = "none";
          all_lessons.style.display = "block";
        }
      }, 10000);

    }

    if (typeof(cur_lesson) === 'undefined') {
      cur_lesson = document.createElement('div');
      cur_lesson.className = "cur_lesson";
      cur_lesson.innerHTML = room.fontsize(16) +"<br> <br> Empty";
    }

    document.getElementById('screen').appendChild(cur_lesson);

  })
      .catch(function(){
        document.getElementById('screen').innerHTML = "<center>The response not in json</center>";
      });
    }
    )
  .catch(function(err) {
    alert('Error :', err);
  });
}
function findGetParameter(parameterName) {
  var result = null,
  tmp = [];
  location.search
  .substr(1)
  .split("&")
  .forEach(function (item) {
    tmp = item.split("=");
    if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
  });
  return result;
}

var parameter = findGetParameter('room');

if((parameter !== null) && (parameter != 'undefined')){
  var fromDate = new Date();
  var toDate = new Date(fromDate.getTime() + 86400000);
  var today = fromDate.getFullYear() + "-" + (fromDate.getMonth() + 1) + "-" + fromDate.getDate();
  var tomorrow = toDate.getFullYear() + "-" + (toDate.getMonth()+1) + "-" + toDate.getDate();
  getApi(parameter, today, tomorrow);
} else {
  document.getElementById('screen').innerHTML = "<center>Please add a get parameter (room) to the link. Example: ?room=A102</center>";
}
