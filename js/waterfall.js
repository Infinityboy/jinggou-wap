$(function(){
    var p = 1,
        $oUl = $('.publish-wrap ul'),
        $winHeight = $(window).height();
    function getData(){
        $.get('data/waterfall.json',function(res){
            if(typeof res!='undefined' && res) {
                //if(res.data && res.shop.length>0){

                    var page = res.length / 10;
                    if (p < page + 1) {
                        for (var i = (p - 1) * 10; i < 10 * p; i++) {
                            var obj = res[i];
                            var html = '<div class="list-wrap">' +
                                '<div class="list-article">' +
                                '<a href="">' +
                                '<img src="' + obj.img + '" alt="loading..."/>' +
                                '<li class="publish-person">' +
                                '<ul class="publish-list">' +
                                '<li class="list-title">' + '英雄联盟LOL:' + obj.title + '</li>' +
                                '<li class="list-issue">' + '期号：' + obj.issue + '</li>' ;

                            if(obj.q_end_time < obj.stime){
                                html+='<li class="list-name">' + '获得者：' + obj.name + '</li>'+
                                    '<li class="list-num">' + '幸运号码：' + obj.num + '</li></ul></li></a></div></div>' ;
                            }else{
                                var allTime = obj.q_end_time-obj.stime;
                                console.log(allTime);
                                html+='</ul></li><div class="publish-time-wrap" data-time="'+allTime+'"></div></a></div></div>';
                            }

                            $oUl.append(html);
                        }
                        p++;
                    }
                //}
            }
        },'json');

    }

    getData();

    $(document).on('scroll',function(){
        var $scrollTop = $(window).scrollTop(),
            $documentHeight = $(document).height(),
            $dis = $scrollTop + $winHeight;
        if( $dis>=$documentHeight){
            getData();
        }
    });

    var _djs = $('.publish-time-wrap'),
        times = _djs.data('time');
    if (times < 0) {
        return;
    }
    do_show_time(times * 1000, $(this));

    function do_show_time(endTime, obj) {
        var timeold = endTime - 50;

        var rTimeout = window.setTimeout(function () {
            do_show_time(timeold, obj);
        }, 50);

        if (timeold <= 0) {
            obj.find('.publish-time-wrap').html("正在计算...");
            rTimeout && clearTimeout(rTimeout);
            //get_lottery_info(obj);
        } else {
            var msPerDay = 24 * 60 * 60 * 1000;
            var e_daysold = timeold / msPerDay;
            var daysold = Math.floor(e_daysold);
            var e_hrsold = (e_daysold - daysold) * 24;
            var hrsold = Math.floor(e_hrsold);
            var e_minsold = (e_hrsold - hrsold) * 60;

            //分
            var minsold = Math.floor((e_hrsold - hrsold) * 60);
            minsold = (minsold < 10 ? '0' + minsold : minsold) + '';
            var i = minsold.substr(0, 2);

            //秒
            var e_seconds = (e_minsold - minsold) * 60;
            var seconds = Math.floor((e_minsold - minsold) * 60);
            seconds = (seconds < 10 ? '0' + seconds : seconds) + '';
            var s = seconds.substr(0, 2);
            //毫秒
            var ms = (e_seconds - seconds) + '';
            var mss = ms.substr(2, 2);

            var str = '<span class="publish-time">' + i + '</span>:<span class="publish-time">' + s + '</span>:<span class="publish-time">' + mss + '</span>';

            $('.publish-time-wrap').html(str);

            //console.log(i + ':' + s + ':' + mss);
        }
    }

});