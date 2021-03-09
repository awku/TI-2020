var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var req;

function updateSQLite(){
    var db = req.result;
    var objectStore = db.transaction("MyObjectStore", "readwrite" ).objectStore("MyObjectStore");
    var openedCursor = objectStore.openCursor();
    
    openedCursor.onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            var data = {}
            data.dateandtime = cursor.value.dateandtime;
            data.gender = cursor.value.gender;
            data.age = cursor.value.age;          
            data.season = cursor.value.season;
            console.log("sync: "+data);
            _insert_from_local(data);
            cursor.delete();
            cursor.continue();
        }
    };
    db.deleteObjectStore("MyObjectStore");
}

function website_offline(){
    console.log("offline");
    document.getElementById("n").innerHTML = `<ul>
            <li id="a" onclick="a_offline()">Ankieta</li>
            <li id="r" onclick="lw()">Lokalne wyniki</li>
            <li id="d" onclick="d()">Dokumentacja</li>
            </ul>`;

    a_offline();

    req = indexedDB.open("SurveyDataBase", 1);
    req.onsuccess = function() {
        var db = req.result;
    }
    req.onupgradeneeded = function() {
        var db = req.result;
        var store = db.createObjectStore("MyObjectStore", {keyPath: 'key', autoIncrement: true});
    };
}

function website_online(){
    console.log("online");
    document.getElementById("n").innerHTML = `<ul>
            <li id="a" onclick="a_online()">Ankieta</li>
            <li id="d" onclick="d()">Dokumentacja</li>
            <li id="r" onclick="r()">Rejestracja</li>
            <li id="l" onclick="l()">Logowanie</li>
            </ul>`;

    a_online();

    try{
        updateSQLite();
    }catch (e){
        console.log("no local database");
    }

    _logged();
}

function updateOnlineStatus() {
    var condition = navigator.onLine ? "ONLINE" : "OFFLINE";
    if (condition=='ONLINE'){
        website_online();
    } else{
        website_offline();
    }
}

function loaded() {
    updateOnlineStatus();
    document.body.addEventListener("offline", function () { updateOnlineStatus() }, false);
    document.body.addEventListener("online", function () { updateOnlineStatus() }, false);
}

function loggedmenu(){
    document.getElementById("n").innerHTML = ` <ul>
            <li id="a" onclick="a_online()">Ankieta</li>
            <li id="r" onclick="w()">Wyniki</li>
            <li id="d" onclick="d()">Dokumentacja</li>
            <li id="r" onclick="lo()">Wyloguj się</li>
            </ul>`;
}

function _logged(){
    var myVar = sessionStorage.getItem("surveyloggeduser") || "defaultValue";
    if (myVar==="logged"){
        loggedmenu();
    }
}

function a_online(){
    document.getElementById("wiadomosc").innerHTML="";
    document.getElementById("data").innerHTML=`<form id="ankietaform">
    <p>Wybierz płeć:<span class="val" id="valgender"></span></p>
      <input type="radio" name="gender" id="male" value="male">
      <label for="male">Mężczyzna</label>
      <input type="radio" name="gender" id="female" value="female">
      <label for="female">Kobieta</label>
      <input type="radio" name="gender" id="other" value="other">
      <label for="other">Inne</label>
    <p>Wybierz wiek:<span class="val" id="valage"></span></p>
      <input type="radio" name="age" id="age1" value="30">
      <label for="age1">0 - 30</label>
      <input type="radio" name="age" id="age2" value="60">
      <label for="age2">31 - 60</label>
      <input type="radio" name="age" id="age3" value="100">
      <label for="age3">61 - 100</label>
    <p>Wybierz porę roku:<span class="val" id="valseason"></span></p>
      <input type="radio" name="season" id="spring" value="spring">
      <label for="spring">Wiosna</label>
      <input type="radio" name="season" id="summer" value="summer">
      <label for="summer">Lato</label>
      <input type="radio" name="season" id="fall" value="fall">
      <label for="fall">Jesień</label>
      <input type="radio" name="season" id="winter" value="winter">
      <label for="winter">Zima</label></br>
      <input class="btn" type="button" value="Wyślij" onclick="_insert(this.form)">
    </form>`;
}

function a_offline(){
    document.getElementById("wiadomosc").innerHTML="";
    document.getElementById("data").innerHTML=`<form id="ankietaformoffline">
    <p>Wybierz płeć:<span class="val" id="valgender"></span></p>
      <input type="radio" name="gender" id="male" value="male">
      <label for="male">Mężczyzna</label>
      <input type="radio" name="gender" id="female" value="female">
      <label for="female">Kobieta</label>
      <input type="radio" name="gender" id="other" value="other">
      <label for="other">Inne</label>
    <p>Wybierz wiek:<span class="val" id="valage"></span></p>
      <input type="radio" name="age" id="age1" value="30">
      <label for="age1">0 - 30</label>
      <input type="radio" name="age" id="age2" value="60">
      <label for="age2">31 - 60</label>
      <input type="radio" name="age" id="age3" value="100">
      <label for="age3">61 - 100</label>
    <p>Wybierz porę roku:<span class="val" id="valseason"></span></p>
      <input type="radio" name="season" id="spring" value="spring">
      <label for="spring">Wiosna</label>
      <input type="radio" name="season" id="summer" value="summer">
      <label for="summer">Lato</label>
      <input type="radio" name="season" id="fall" value="fall">
      <label for="fall">Jesień</label>
      <input type="radio" name="season" id="winter" value="winter">
      <label for="winter">Zima</label></br>
      <input class="btn" type="button" value="Wyślij" onclick="offline_insert(this.form)">
    </form>`;
}

function r(){
    document.getElementById("wiadomosc").innerHTML="";
    _register_form();
}
function l(){ 
    document.getElementById("wiadomosc").innerHTML="";
    _login_form();
}
function w(){
    document.getElementById("wiadomosc").innerHTML="";
    _results_gender();
}
function lw(){
    document.getElementById("wiadomosc").innerHTML="";
    offline_list();
}
function d(){
    document.getElementById("data").innerHTML=`<h3>Temat aplikacji:</h3>
    <p>program do zbierania danych ankietowych na temat ulubionej pory roku 
    w zależności od płci i przedziału wiekowego.</p>
    <h3>Wykorzystane technologie:</h3>
    <p>po stronie serwera PHP w stylu REST,</br>
    po stronie przeglądarki HTML5, CSS3 oraz JavaScript</br>
    dostęp do baz danych: serwer - SQLite, przeglądarka: IndexedDB</br>
    do podtrzymywania sesji po stronie przeglądarki zastosowano sessionStorage.</p>

    <p>Przesyłanie z lokalnej bazy IndexedDB do MongoDB dzieje się automatycznie po przejściu do trybu online.</p>
    <p>Dostęp do wyników poprzez logowanie, w przeciwnym przypadku użytkownik 
    niezalogowany może przeglądać swoje odpowiedzi jedynie z lokalnej bazy danych w trybie off-line.</p>`;
    document.getElementById("wiadomosc").innerHTML="";
}

function offline_insert(form){
    document.getElementById("wiadomosc").innerHTML="";
    var validated = survey_validation();
    if(validated){
        var db = req.result;
        var objectStore = db.transaction("MyObjectStore", "readwrite").objectStore("MyObjectStore");
        var trans = objectStore.put({dateandtime: new Date().toLocaleString(), gender: form.gender.value, age: form.age.value, season: form.season.value});
        document.getElementById("ankietaformoffline").reset(); 
        trans.onsuccess = function(){
            document.getElementById("wiadomosc").innerHTML = 'Dodano dane do lokalnej bazy.';
        }
    }
}

function offline_list(){
    var keys = {'male':'mężczyzna', 'female':'kobieta', 'other':'inne',
        'winter':'zima', 'spring':'wiosna', 'summer':'lato', 'fall':'jesień',
        '30':'0 - 30', '60':'31 - 60', '100':'61 - 100'};
    try{
        var db = req.result;
        var objectStore = db.transaction("MyObjectStore", "readonly").objectStore("MyObjectStore");
        var cursorRequest = objectStore.openCursor();
        var t = `<table>
                    <tr>
                        <th>ID</th><th>DATA</th><th>PŁEĆ</th><th>WIEK</th><th>PORA ROKU</th>
                    </tr>`;
        cursorRequest.onsuccess = function(event) {
            var cursor = event.target.result;
            if (cursor) {
                t += '<tr><td>'+cursor.key;
                t += '</td><td>'+cursor.value.dateandtime;
                t += '</td><td>'+keys[cursor.value.gender];
                t += '</td><td>'+keys[cursor.value.age];
                t += '</td><td>'+keys[cursor.value.season]+'</td></tr>';
                cursor.continue();
            } else{
                t += '</table>'
                document.getElementById("data").innerHTML = t;
            }
        };
    }catch (e){
        var t = `<table>
                    <tr>
                        <th>ID</th><th>DATA</th><th>PŁEĆ</th><th>WIEK</th><th>PORA ROKU</th>
                    </tr>
                </table>`;
        document.getElementById("data").innerHTML = t;
    }
}

function loggedout(){
    document.getElementById("n").innerHTML = `<ul>
            <li id="a" onclick="a_online()">Ankieta</li>
            <li id="d" onclick="d()">Dokumentacja</li>
            <li id="r" onclick="r()">Rejestracja</li>
            <li id="l" onclick="l()">Logowanie</li>
            </ul>`;
}

function change_results(a01, a02, a03, b01, b02, b03, c01, c02, c03, d01, d02, d03){
    var max_height = 320;
    var max_height_hist = 220;
    var m = Math.max(a01, a02, a03, b01, b02, b03, c01, c02, c03, d01, d02, d03);

    var winter1 = a01 / m * max_height_hist;
    var winter2 = a02 / m * max_height_hist;
    var winter3 = a03 / m * max_height_hist;

    var spring1 = b01 / m * max_height_hist;
    var spring2 = b02 / m * max_height_hist;
    var spring3 = b03 / m * max_height_hist;

    var summer1 = c01 / m * max_height_hist;
    var summer2 = c02 / m * max_height_hist;
    var summer3 = c03 / m * max_height_hist;

    var fall1 = d01 / m * max_height_hist;
    var fall2 = d02 / m * max_height_hist;
    var fall3 = d03 / m * max_height_hist;

    document.getElementById("wi1").setAttribute("height", winter1);
    document.getElementById("wi1").setAttribute("y", max_height - winter1);
    document.getElementById("wi2").setAttribute("height", winter2);
    document.getElementById("wi2").setAttribute("y", max_height - winter2);
    document.getElementById("wi3").setAttribute("height", winter3);
    document.getElementById("wi3").setAttribute("y", max_height - winter3);

    document.getElementById("sp1").setAttribute("height", spring1);
    document.getElementById("sp1").setAttribute("y", max_height - spring1);
    document.getElementById("sp2").setAttribute("height", spring2);
    document.getElementById("sp2").setAttribute("y", max_height - spring2);
    document.getElementById("sp3").setAttribute("height", spring3);
    document.getElementById("sp3").setAttribute("y", max_height - spring3);

    document.getElementById("su1").setAttribute("height", summer1);
    document.getElementById("su1").setAttribute("y", max_height - summer1);
    document.getElementById("su2").setAttribute("height", summer2);
    document.getElementById("su2").setAttribute("y", max_height - summer2);
    document.getElementById("su3").setAttribute("height", summer3);
    document.getElementById("su3").setAttribute("y", max_height - summer3);

    document.getElementById("fa1").setAttribute("height", fall1);
    document.getElementById("fa1").setAttribute("y", max_height - fall1);
    document.getElementById("fa2").setAttribute("height", fall2);
    document.getElementById("fa2").setAttribute("y", max_height - fall2);
    document.getElementById("fa3").setAttribute("height", fall3);
    document.getElementById("fa3").setAttribute("y", max_height - fall3);

    document.getElementById("leg1r").setAttribute("height", "10");
    document.getElementById("leg2r").setAttribute("height", "10");
    document.getElementById("leg3r").setAttribute("height", "10");
}   

function change_results_gender(data){
    var winter = ('winter' in data) ? data.winter : false;
    var spring = ('spring' in data) ? data.spring : false;
    var summer = ('summer' in data) ? data.summer : false;
    var fall = ('fall' in data) ? data.fall : false;

    a1 = a2 = a3 = 0;
    b1 = b2 = b3 = 0;
    c1 = c2 = c3 = 0;
    d1 = d2 = d3 = 0;

    if (winter){
        for (var x=0;x<winter.length;x++){
            if (winter[x].gender=='female')
                a1 = parseInt(winter[x].count, 10);
            if (winter[x].gender=='male')
                a2 = parseInt(winter[x].count, 10);
            if (winter[x].gender=='other')
                a3 = parseInt(winter[x].count, 10);
        }
    }

    if (spring){
        for (var x=0;x<spring.length;x++){
            if (spring[x].gender=='female')
                b1 = parseInt(spring[x].count, 10);
            if (spring[x].gender=='male')
                b2 = parseInt(spring[x].count, 10);
            if (spring[x].gender=='other')
                b3 = parseInt(spring[x].count, 10);
        }
    }

    if (summer){
        for (var x=0;x<summer.length;x++){
            if (summer[x].gender=='female')
                c1 = parseInt(summer[x].count, 10);
            if (summer[x].gender=='male')
                c2 = parseInt(summer[x].count, 10);
            if (summer[x].gender=='other')
                c3 = parseInt(summer[x].count, 10);
        }
    }

    if (fall){
        for (var x=0;x<fall.length;x++){
            if (fall[x].gender=='female')
                d1 = parseInt(fall[x].count, 10);
            if (fall[x].gender=='male')
                d2 = parseInt(fall[x].count, 10);
            if (fall[x].gender=='other')
                d3 = parseInt(fall[x].count, 10);
        }
    }

    document.getElementById("leg1").textContent = "Kobieta";
    document.getElementById("leg2").textContent = "Mężczyzna";
    document.getElementById("leg3").textContent = "Inne";
    change_results(a1, a2, a3, b1, b2, b3, c1, c2, c3, d1, d2, d3);
}

function change_results_age(data){
    var winter = ('winter' in data) ? data.winter : false;
    var spring = ('spring' in data) ? data.spring : false;
    var summer = ('summer' in data) ? data.summer : false;
    var fall = ('fall' in data) ? data.fall : false;

    a1 = a2 = a3 = 0;
    b1 = b2 = b3 = 0;
    c1 = c2 = c3 = 0;
    d1 = d2 = d3 = 0;

    if (winter){
        for (var x=0;x<winter.length;x++){
            if (winter[x].age=='30')
                a1 = winter[x].count;
            if (winter[x].age=='60')
                a2 = winter[x].count;
            if (winter[x].age=='100')
                a3 = winter[x].count;
        }
    }

    if (spring){
        for (var x=0;x<spring.length;x++){
            if (spring[x].age=='30')
                b1 = spring[x].count;
            if (spring[x].age=='60')
                b2 = spring[x].count;
            if (spring[x].age=='100')
                b3 = spring[x].count;
        }
    }

    if (summer){
        for (var x=0;x<summer.length;x++){
            if (summer[x].age=='30')
                c1 = summer[x].count;
            if (summer[x].age=='60')
                c2 = summer[x].count;
            if (summer[x].age=='100')
                c3 = summer[x].count;
        }
    }

    if (fall){
        for (var x=0;x<fall.length;x++){
            if (fall[x].age=='30')
                d1 = fall[x].count;
            if (fall[x].age=='60')
                d2 = fall[x].count;
            if (fall[x].age=='100')
                d3 = fall[x].count;
        }
    }

    document.getElementById("leg1").textContent = "0 - 30";
    document.getElementById("leg2").textContent = "31 - 60";
    document.getElementById("leg3").textContent = "61 - 100";
    change_results(a1, a2, a3, b1, b2, b3, c1, c2, c3, d1, d2, d3);
}

