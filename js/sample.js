 
$(document).ready(function() {
	$('.eventcell').each(function(){
		$(this).html('aa');
	});
});

var google = new OAuth2('google', { //今回はGoogleのAPIにアクセスするためgoogleを指定
    client_id: '',
    client_secret: 'Client secret',
    api_scope: 'https://www.googleapis.com/auth/calendar' //スコープはGoogleカレンダー
});
 
google.authorize(function() {
 
    var body = JSON.stringify({
        "description": "詳細説明",
        "summary": "タイトル",
        "transparency": "opaque",
        "status": "confirmed",
        "start" : {"dateTime":st}, //開始時間
        //RFC3339形式で記述。日本時間なら2014-02-16T16:00:00+09:00
        //終日設定の場合、YYYY-MM-DDのみで指定し、実際の終了日に+1する。
        "end": {"dateTime":st} //終了時間
    });
 
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange =  function() { //レスポンスによって処理を振り分ける
        if(xhr.readyState == 4) {
            if(xhr.status == 200) {
                alert("成功しました");
 
                    }
            else{
                var data  =  JSON.parse(xhr.responseText);
                alert("(Error)" + data.error.code + " : " + data.error.message);
            }
        }
    }
 
    xhr.open('POST',
        "https://www.googleapis.com/calendar/v3/calendars/"+ カレンダーのID +"/events",
        true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + google.getAccessToken()); //アクセストークンの取得
    xhr.send(body);
});