
$(function() {
    let search = "";
    //将历史记录放在页面中显示
    if (localStorage.history) {
        search = localStorage.history;
    }
    let hisarr=search.split(",");
    console.log(hisarr);
    let histr="";
    hisarr.slice(-6).forEach(function(val,index){
       histr+=`<span>${val}</span>`;
    });
    $(".searchhis").html(histr);
    //返回按钮
    $("header span").click(function(){
        history.back();
    });
    //失去焦点后保存搜索的历史记录并执行关键字查询
    $("header input").on("blur", function () {
        if ($(this).val() == "") {
            return;
        }
        search += "," + $(this).val();
        localStorage.history = search;   //保存历史记录
        $.ajax({                         //查询数据
            url: "https://api.jisuapi.com/news/search?keyword=" + $(this).val() + "&appkey=c96d81a2e6f52a48",
            dataType: "jsonp",
            beforeSend:function(){
                $(".jiazai").show();
            },
            success: function (e) {
                let xwnr = e.result.list;
                console.log(xwnr);
                let str = "";
                xwnr.forEach(function (val) {
                    $(".searchhis").html("");
                    $(".jiazai").hide();
                    if (!val.pic) {
                        str += `<div class="xwlist">
                              <div class="rightwutu">
                                    <div class="xwtitle"><a href="${val.url}">${val.title}</a></div>
                                    <div class="xwqt">
                                         <div class="xwsrc">${val.src}</div>
                                          <div class="xwtime">${val.time}</div>
                                    </div>
                              </div>
                          </div>`;
                    } else {
                        str += `<div class="xwlist">
                              <div class="xwtp"><img src="${val.pic}" alt=""></div>
                              <div class="right">
                                    <div class="xwtitle"><a href="${val.url}">${val.title}</a></div>
                                    <div class="xwqt">
                                         <div class="xwsrc">${val.src}</div>
                                          <div class="xwtime">${val.time}</div>
                                    </div>
                              </div>
                          </div>`;
                    }
                });
                $("main").html(str);

            }
        })
        this.value = "";
    });
    $(".searchhis").on("click","span",function(){
        let keyword=$(this).text();
        console.log(keyword);
        $.ajax({                         //查询数据
            url: "https://api.jisuapi.com/news/search?keyword=" +keyword+ "&appkey=c96d81a2e6f52a48",
            dataType: "jsonp",
            beforeSend:function(){
                $(".jiazai").show();
            },
            success: function (e) {
                console.log(e);
                let xwnr = e.result.list;
                console.log(xwnr);
                let str = "";
                xwnr.forEach(function (val) {
                    $(".searchhis").html("");
                    $(".jiazai").hide();
                    if (!val.pic) {
                        str += `<div class="xwlist">
                              <div class="rightwutu">
                                    <div class="xwtitle"><a href="${val.url}">${val.title}</a></div>
                                    <div class="xwqt">
                                         <div class="xwsrc">${val.src}</div>
                                          <div class="xwtime">${val.time}</div>
                                    </div>
                              </div>
                          </div>`;
                    } else {
                        str += `<div class="xwlist">
                              <div class="xwtp"><img src="${val.pic}" alt=""></div>
                              <div class="right">
                                    <div class="xwtitle"><a href="${val.url}">${val.title}</a></div>
                                    <div class="xwqt">
                                         <div class="xwsrc">${val.src}</div>
                                          <div class="xwtime">${val.time}</div>
                                    </div>
                              </div>
                          </div>`;
                    }
                });
                $("main").html(str);

            }
        })
    });
})








