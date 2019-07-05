const apiKey = "f0bf5d8d51491246b6b53615632db6a2";

let input = document.getElementById("input");
let grad = document.getElementById("grad");
let temperatura = document.getElementById("temp");
let vetar = document.getElementById("vetar");
let icon = document.getElementById("icon");
let dugme = document.getElementById("dugme");


function ispis() {
    if (event.key === "Enter") {
        prva();
      }
}
input.addEventListener("keyup", ispis);

function prva(){
    if(input.value === ""){

    }else{
        let link = "https://api.openweathermap.org/data/2.5/weather?q=" + input.value + "&appid=" + apiKey;
        request(link, response);
    }
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

function response(res){
    let jsonObj = JSON.parse(res);
    grad.innerHTML = jsonObj.name;
    icon.src = "http://openweathermap.org/img/w/" + jsonObj.weather[0].icon + ".png";
    vetar.innerHTML =  jsonObj.wind.speed;
    temperatura.innerHTML = parseInt(jsonObj.main.temp - 273) + "°";
}


/*

{
    "coord":
        {
            "lon":20.46,
            "lat":44.82
        },
    "weather":
        [
            {
                "id":800,
                "main":"Clear",
                "description": "clear sky",
                "icon":"01d"
            }
        ],
    "base":"stations",
    "main":
        {
            "temp":301.15,
            "pressure":1022,
            "humidity":48,
            "temp_min":301.15,
            "temp_max":301.15
        },
    "visibility":10000,
    "wind":
        {
            "speed":1.5,
            "deg":120
        },
    "clouds":
        {
            "all":0
        },
    "dt":1561905123,
    "sys":
        {
            "type":1,
            "id":7028,
            "message":0.0084,
            "country":"RS",
            "sunrise":1561863308,
            "sunset":1561919283
        },
    "timezone":7200,
    "id":792680,
    "name":"Belgrade",
    "cod":200
}

*/