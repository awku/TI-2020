var request;
var objJSON;

function getRequestObject() {
    if ( window.ActiveXObject)  {
        return ( new ActiveXObject("Microsoft.XMLHTTP")) ;
    } else if (window.XMLHttpRequest)  {
        return (new XMLHttpRequest())  ;
    } else {
        return (null) ;
    }
}

function _insert_from_local(data) {
    txt = JSON.stringify(data);
    request = getRequestObject() ;
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200 ) {
            objJSON = JSON.parse(request.response);
            if (objJSON.return == 'ok'){
                document.getElementById("wiadomosc").innerHTML = 'Dodano lokalne dane do bazy.';
            }
        }
    }
    request.open("POST", "rest/survey", true);
    request.send(txt);
}

function _insert(form) {
    var validated = survey_validation();
    if(validated){
        var data = {};
        data.dateandtime = new Date().toLocaleString();
        data.gender = form.gender.value;
        data.age = form.age.value;          
        data.season = form.season.value;
        document.getElementById("ankietaform").reset(); 
        txt = JSON.stringify(data);
        request = getRequestObject() ;
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200 ) {
                objJSON = JSON.parse(request.response);
                if (objJSON.return == 'ok'){
                    document.getElementById("wiadomosc").innerHTML = 'Dodano dane do bazy.';
                }
            }
        }
        request.open("POST", "rest/survey", true);
        request.send(txt);
    }
}

function _register_form() {
    request = getRequestObject();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200 ) {
            objJSON = JSON.parse(request.response);
            document.getElementById("data").innerHTML = objJSON.template;
        }
    }
    request.open("GET", "rest/user", true);
    request.send(null);
}

function _register(form) {
    var validated = reg_validation(form);
    if(validated){
        var user = {};
        user.email = form.registerEmail.value;
        user.password = form.registerPassword.value;
        txt = JSON.stringify(user);
        request = getRequestObject();
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200 ) {
                objJSON = JSON.parse(request.response);
                if (objJSON.return == 'ok'){
                    document.getElementById("wiadomosc").innerHTML = 'Zarejestrowano użytkownika.';
                    document.getElementById("rejestracjaform").reset(); 
                }
                else if (objJSON.return == 'not registered'){
                    document.getElementById("wiadomosc").innerHTML = 'E-mail istnieje już w bazie.';
                }
            }
        }
        request.open("POST", "rest/user", true);
        request.send(txt);
    }
}

function _login_form() {
    request = getRequestObject();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200 ) {
            objJSON = JSON.parse(request.response);
            document.getElementById("data").innerHTML = objJSON.template;
        }
    }
    request.open("GET", "rest/session", true);
    request.send(null);
}

function _login(form)  {
    var validated = log_validation(form);
    if(validated){
        var user = {};
        user.email = form.loginEmail.value;
        user.password = form.loginPassword.value;
        txt = JSON.stringify(user);
        request = getRequestObject();
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200 ) {
                objJSON = JSON.parse(request.response);
                if (objJSON.return == 'ok'){
                    loggedmenu();
                    document.getElementById("logowanieform").reset(); 
                    document.getElementById("data").innerHTML = 'Zalogowano użytkownika.';
                    document.getElementById("wiadomosc").innerHTML = '';
                    sessionStorage.setItem("surveyloggeduser", "logged");
                }
                else if (objJSON.return == 'not logged'){
                    document.getElementById("wiadomosc").innerHTML = 'Błędne dane.';
                }
            }
        }
        request.open("POST", "rest/session", true);
        request.send(txt);
    }
}

function lo(){
    request = getRequestObject();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200 ) {
            objJSON = JSON.parse(request.response);
            if (objJSON.return == 'ok'){
                document.getElementById("data").innerHTML = 'Wylogowano użytkownika.';
                loggedout();
                sessionStorage.removeItem("surveyloggeduser");
            }
        }
    }
    request.open("DELETE", "rest/session", true);
    request.send(null);
}

function _results_gender() {
    request = getRequestObject() ;
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200 ) {
            objJSON = JSON.parse(request.response);
            document.getElementById("data").innerHTML = objJSON.template;
            change_results_gender(objJSON.answers);
        }
    }
    request.open("GET", "rest/survey?sortby=gender", true);
    request.send(null);
}

function _results_age(){
    request = getRequestObject() ;
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200 ) {
            objJSON = JSON.parse(request.response);
            document.getElementById("data").innerHTML = objJSON.template;
            change_results_age(objJSON.answers);
        }
    }
    request.open("GET", "rest/survey?sortby=age", true);
    request.send(null);
}
