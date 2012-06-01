var socket = io.connect('http://localhost:8910');
//とりあえずテスト的にjquery依存してるけど読み込むものなので辞めたい
socket.on('less_refresh', function (data) {
  $("link").each(function(){
    var href = $(this).attr("href");
    $(this).attr("href",href+"?"+(new Date()).getTime());
  });
});