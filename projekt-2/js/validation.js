function survey_validation(){
    var valgender = document.querySelector('input[name="gender"]:checked');
    var valage = document.querySelector('input[name="age"]:checked');
    var valseason = document.querySelector('input[name="season"]:checked');
    var validated = true;
    if(valgender == null){
        document.getElementById("valgender").innerHTML = 'Brak zaznaczonej odpowiedzi!!';
        validated = false;
    }
    else document.getElementById("valgender").innerHTML = '';
    if(valage == null){
        document.getElementById("valage").innerHTML = 'Brak zaznaczonej odpowiedzi!!';
        validated = false;
    }
    else document.getElementById("valage").innerHTML = '';
    if(valseason == null){
        document.getElementById("valseason").innerHTML = 'Brak zaznaczonej odpowiedzi!!';
        validated = false;
    }
    else document.getElementById("valseason").innerHTML = '';

    return validated;
}

function log_validation(form){
    var email = form.loginEmail.value;
    var password = form.loginPassword.value;
    var validated = true;
    if(email == ""){
        document.getElementById("vallogemail").innerHTML = 'Brak adresu e-mail!!';
        validated = false;
    }
    else document.getElementById("vallogemail").innerHTML = '';
    if(password == ""){
        document.getElementById("vallogpswd").innerHTML = 'Brak hasła!!';
        validated = false;
    }
    else document.getElementById("vallogpswd").innerHTML = '';

    return validated;
}

function reg_validation(form){
    var email = form.registerEmail.value;
    var password = form.registerPassword.value;
    var validated = true;
    if(email == ""){
        document.getElementById("valregemail").innerHTML = 'Brak adresu e-mail!!';
        validated = false;
    }
    else if(email.indexOf("@")==-1 || email.indexOf(".")==-1){
        document.getElementById("valregemail").innerHTML = 'Błędny adres e-mail!!';
        validated = false;
    }
    else document.getElementById("valregemail").innerHTML = '';
    if(password == ""){
        document.getElementById("valregpswd").innerHTML = 'Brak hasła!!';
        validated = false;
    }
    else document.getElementById("valregpswd").innerHTML = '';

    return validated;
}