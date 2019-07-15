const apiKey = "5e7698eccb6040e6814d8aac3bcd613f";

let input = document.getElementById("input");
let grad = document.getElementById("grad");
let temperatura = document.getElementById("temp");
let vetarBrzina = document.getElementById("vetarBrzina");
let vetarPravac = document.getElementById("vetarPravac");
let icon = document.getElementById("icon");
let dugme = document.getElementById("dugme");
let opis = document.getElementById("desc");
let dugme1 = document.getElementById("dugmePrvo");
let dugme2 = document.getElementById("dugmeDrugo");
let dugme3 = document.getElementById("dugmeTrece");
let option = document.getElementsByTagName("option");
let vremeDiv2 = document.getElementById("vremeDiv2");
let dani = document.getElementById("dani");

if(dugme1){
dugme1.onclick = function(){
    if(input.value == ""){
    }else{
        let link = "https://api.weatherbit.io/v2.0/current?city=" + input.value + "&key=" + apiKey;
        request(link, responseDnevna);
    }
}
}


if(dugme2){
dugme2.onclick = function(){
    let link = "https://api.weatherbit.io/v2.0/forecast/daily?city=" + input.value + "&key=" + apiKey 
    + "&days=" + dani.value;
     request(link, responseVisednevna);
}
}

if(dugme3)
dugme3.onclick = function(){
    let link = "https://api.weatherbit.io/v2.0/forecast/hourly?city=" + input.value + "&key=" + apiKey;
    request(link, responseSati);
}

function request(url, callback){
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            callback(httpRequest.responseText);
        }
    }
    httpRequest.open("GET", url, true);
    httpRequest.send();
}

function responseDnevna(res){
    let jsonObj = JSON.parse(res);
    grad.innerHTML = jsonObj.data[0].city_name;
    icon.src = "https://www.weatherbit.io/static/img/icons/" + jsonObj.data[0].weather.icon + ".png";
    vetarBrzina.innerHTML = "Brzina: " + jsonObj.data[0].wind_spd;
    vetarPravac.innerHTML = "Pravac: " + jsonObj.data[0].wind_cdir_full;
    temperatura.innerHTML = parseInt(jsonObj.data[0].temp) + "°";
    opis.innerHTML = jsonObj.data[0].weather.description;
}

function responseVisednevna(res){
    let jsonObj = JSON.parse(res);
    vremeDiv2.innerHTML = "";
    for(let i=0; i<dani.value; i++){
        let datum = jsonObj.data[i].datetime;
        let icon = "https://www.weatherbit.io/static/img/icons/" + jsonObj.data[i].weather.icon + ".png";
        vremeDiv2.innerHTML += `<div id="prikazVisednevna"><h2>Datum: ${datum.slice(8,10)}.${datum.slice(5,7)}.${datum.slice(0,4)}.</h2> 
        Temperatura: ${parseInt(jsonObj.data[i].temp) + "°"}<br>
        Brzina vetra: ${jsonObj.data[0].wind_spd}
        </p>
        <img src="${icon}" style="width: 50px; height: 50px;">
        </div>`;
    }
}

function responseSati(res){
    let jsonObj = JSON.parse(res);
    vremeDiv2.innerHTML = "";
    for(let i=0; i<=47; i++){
        let x = jsonObj.data[i].timestamp_local;
        let icon = "https://www.weatherbit.io/static/img/icons/" + jsonObj.data[i].weather.icon + ".png";
        vremeDiv2.innerHTML += `<div id="prikazSati"><h3>${x.slice(8,10)}.${x.slice(5,7)}.${x.slice(0,4)}. ${x.slice(11,16)}</h3>
        Temperatura: ${parseInt(jsonObj.data[i].temp) + "°"}<br>
        <img src="${icon}" style="width: 50px; height: 50px;">
        </div>`
    }
}

