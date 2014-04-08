function load_list(){
    $.mobile.showPageLoadingMsg();
    $.ajax({
        type: 'POST',
        url: 'http://staging.decorapolis.com/media/search/photo.json?sort=last&service_type=all&page=1&perPage=15&partner_id=cam&',
        data: {},
        contentType: 'application/json',
        dataType: 'json',
        timeout: 10000,
        success: function (response) {
            alert(response);
        var result = JSON.stringify(response);
        var stock = jQuery.parseJSON(result);
        for(var i=0;i<stock.length;i++){
            
            $(".imageList").append('<li><a href="#" onclick="goto_retailer('+i+')">'+stock.length+'</a></li>');   
            $(".imageList").listview('refresh');
           
            setTimeout(function(){ $.mobile.hidePageLoadingMsg();},500);
            }
        },
        error: function (response) {
           setTimeout(function(){ $.mobile.hidePageLoadingMsg();},500);
           alert("Sorry network busy try again!");
        }
    });
}