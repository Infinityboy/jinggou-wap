$(function(){

    $(document).on('tap','.index-container-list li',function(){
        var dataId = $(this).data('id');
        $(this).addClass('selected').siblings().removeClass();
        $('.index-content').children().eq(dataId).show().siblings().hide();
    })

});