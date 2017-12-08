$(function(){
    $("header span").click(function(){
        history.back();
    });
    let xwindex=localStorage.xwindex;
    let xwchanel=localStorage.xwchanel;
    $.ajax({
        url:"http://api.jisuapi.com/news/get?channel="+xwchanel+"&start="+xwindex+"&num=1&appkey=c96d81a2e6f52a48",
        dataType: "jsonp",
        beforeSend:function(){
            $(".jiazai").show();
        },
        success: function (e) {
            $(".jiazai").hide();
            let obj=e.result.list;
            console.log(obj);
            let str="";
            obj.forEach(function(val){
                str=`<div class="title">${val.title}</div>
                      <div class="content">${val.content}</div>
                      <div class="time">${val.time}</div>
                      <div class="src">${val.src}</div>`;
            });

            $("main").html(str);
        }
    });
});