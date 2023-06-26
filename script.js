

const api = {
    key: "9e790df358657d746c9feb282638eb59",
    baseUrl: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.input-box');

searchBox.addEventListener('keyup', onInputPress);

function onInputPress(event) {
    event.preventDefault();
    if(event.keyCode === 13) {
        getResult(searchBox.value);
    }
    setUp()
}

function getResult(query) {
    fetch(`${api.baseUrl}forecast?q=${query}&units=metric&appid=${api.key}`)
    .then(weather => {
        return weather.json();    
    })
    .then(displayResult)
    .catch(error => console.log(error))
}

function displayResult(weather) {
    let city = document.querySelector('.location .city')
    city.innerHTML = `${weather.city.name}, ${weather.city.country} `;

    let now = new Date();
    let date = document.querySelector('.location .date')
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector('.current .temp')
    //console.log(`${weather.list[0].main.temp}`)
    temp.innerHTML  = `${Math.round(weather.list[0].main.temp)}<span>°c</span>`

    let weatherDescription = document.querySelector('.weather')
    weatherDescription.innerHTML = `${weather.list[0].weather[0].main}`

    let minMaxTemp = document.querySelector('.maxMin');
    minMaxTemp.innerHTML = `${Math.round(weather.list[0].main.temp_min)}°c / ${Math.round(weather.list[0].main.temp_max)}°c`


}

function setUp(){
    searchBox.innerHTML = ''
}

function dateBuilder(d) {
    let months = ["January", "Feruary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}
