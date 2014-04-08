var input_username;
var input_password;
var username;
var pwd;
          
function init() {
  
}
           
function goto_signup() {
    window.location = "signup.html";
}
           
function goto_signin() {
    window.location = "dashboard.html";
}

function sign_in(){
var state = window.localStorage.getItem("networkstate");
    
    if(state == "No network connection"){
        console.log("No network connection");
        var message = "Internet connection required";
        showAlert(message);
    }else if(state == "WiFi connection" || state == "Unknown connection" || state == "Cell 2G connection" ||  state == "Cell 3G connection" ||  state == "Cell 4G connection" ||  state == "Cell generic connection" ){
        console.log("connection available");
        
        username = document.getElementById('username_input').value;
        pwd = document.getElementById('password_input').value;
        
        username = username.replace(/ /g,"_");
        pwd = pwd.replace(/ /g,"_");
        
        if(username != '' && pwd != '') {
            $.mobile.showPageLoadingMsg();
            $.ajax({
                type: 'POST',
                url: 'http://staging.decorapolis.com/users/sign_in.json?user[email]='+username+'&user[password]='+pwd,
                data: {},
                contentType: 'application/json',
                dataType: 'json',
                timeout: 120000,
                success: function (response) {
                var result = JSON.stringify(response);
                var data = jQuery.parseJSON(result);
                for(var i=0;i<data.length;i++){
                    if(data[i].result == username){
                        setTimeout(function(){ $.mobile.hidePageLoadingMsg();},1000);
                        window.localStorage.setItem("usr", username);
                        window.localStorage.setItem("pwd", pwd);
                        window.location="dashboard.html";
                    }else if(data[i].result != username){
                        setTimeout(function(){ $.mobile.hidePageLoadingMsg();},1000);
                        alert("Incorrect username/password!")
                    }
                 }
                },
                error: function (response) {
                   console.log(response.responseText);
                   alert("Sorry network error try Again"+response.responseText);
                }
            });
        }
        else if(username == '' && pwd == '' ) {
            var message = "Please fill out all required fields";
            showAlert(message);
        }
        else if(username == '' ) {
            var message = "Please fill out all required fields";
            showAlert(message);
        }
        else if(pwd == '') {
            var message = "Please fill out all required fields";
            showAlert(message);
        }
    }
}


