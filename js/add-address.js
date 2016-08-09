$(function(){
    var $addProvince = $('.address-province');
    var $addCity = $('.address-city');
    var $addArea = $('.address-area');
    function getData(){
        $.get('data/area.json',function(res){
            if(res != 'undefined' && res){
                if(res.version == 1){
                    renderData(res.content);
                }
            }
        },'json');
    }
    getData();


    function renderData(content){

        //if(content != 'undefined' && content){
            if(content.province.length>0){
                var dataProvince;
                for(var i=0;i<content.province.length;i++){
                    dataProvince = content.province[i];
                    var html='<option value="'+dataProvince.dataId+'">'+dataProvince.name+'</option>';
                    $addProvince.append(html);
                }

            }


            $addProvince.on('change',function(){
                var $provinceList = $(this).children();
                var $provinces;
                for(var i=0;i<$provinceList.length;i++){
                    $provinces = $provinceList[i];
                }
                var $provinceId = $(this).attr('value');
                var dataCity = content.city[$provinceId];
                if(dataCity.length>0){
                    for(var m=0;m<dataCity.length;m++){
                        var cityList = dataCity[m];
                        var htmlC='<option value="'+cityList.dataId+'">'+cityList.name+'</option>';
                        $addCity.append(htmlC);
                    }
                }
            });

            $addCity.on('change',function(){
                var $cityList = $(this).children();
                var $cities;
                for(var i=0;i<$cityList.length;i++){
                    $cities = $cityList[i];
                }
                var $cityId = $(this).attr('value');
                var dataCountry = content.county[$cityId];
                if(dataCountry.length>0){
                    for(var n=0;n<dataCountry.length;n++){
                        var cityList = dataCountry[n];
                        var htmlCo='<option value="'+cityList.dataId+'">'+cityList.name+'</option>';
                        $addArea.append(htmlCo);
                        //if(dataCity!=$cityId){
                        //
                        //}
                    }
                }
            });


        //}
    }


});