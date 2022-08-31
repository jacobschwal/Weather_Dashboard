var APIkey = 'd69b4d38f36dbfe62cdddd7268192a4a';
var city; 

/* click event that takes in value of user search input so that we can place it into an api call */
document.querySelector('#Searchbtn').addEventListener('click',function(){
    var searchInput = document.querySelector('#user-search').value
    console.log(searchInput);
    Geoselector(searchInput);
    document.querySelector('#user-search').innerHTML = '';

})


/*create function that takes in input value as a perameter and returns latitude and longitude */
function Geoselector(searchInput){
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=5&appid=${APIkey}`)
    .then(response=>response.json())
    .then(dataResponse=>{
        console.log(dataResponse);
    currentWeather(dataResponse[0].lat,dataResponse[0].lon);
    forcast(dataResponse[0].lat,dataResponse[0].lon);
    
    })
};

/* create function that takes in latitude and longitude parameters from our geocode function and returns current weather data*/
function currentWeather(lat,lon,){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`)
    .then(response=>response.json())
    .then(dataResponse=>{
        console.log(dataResponse);
        var weatherCard = document.createElement('div');
        weatherCard.setAttribute('class','card');

        var currentDate = document.createElement('h3');
        currentDate.textContent = moment.unix(dataResponse.current.dt).format('MM/DD/YY')

        var CurrentTemp = document.createElement('p');
        CurrentTemp.textContent = 'temp: ' + dataResponse.current.temp + '°F';
        console.log(dataResponse.current.temp);

        var currentWind = document.createElement('p');
        currentWind.textContent = 'Wind: ' + dataResponse.current.wind_speed + ' MPH';
        var currenthumid = document.createElement('p');
        currenthumid.textContent = 'humidity: ' + dataResponse.current.humidity + '%';
        var currentUV = document.createElement('p');
        currentUV.textContent = 'UV Index: ' + dataResponse.current.uvi;

        weatherCard.append(currentDate, CurrentTemp, currentWind ,currenthumid, currentUV);
        document.querySelector('#current-weather').append(weatherCard);
    })
}
/* create function that takes in lat and lon parameters and returns forcast data */
function forcast(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`)
    .then(response=>response.json())
    .then(dataResponse=>{
        console.log(dataResponse);
        for (var i = 1; i < dataResponse.daily.length-2; i++) {
            var weatherCard = document.createElement('div');
            weatherCard.setAttribute('class','card');

            var forcastDates = document.createElement('h4');
            forcastDates.textContent = moment.unix(dataResponse.daily[i].dt).format('MM/DD/YY');

            var forcastIcon = document.createElement('img');
            forcastIcon.textContent = dataResponse.daily[i].weather;


            var forcastTemp = document.createElement('p');
            forcastTemp.textContent = 'temp: ' + dataResponse.daily[i].temp.day + '°F';

            var forcastWind = document.createElement('p');
            forcastWind.textContent = 'Wind: ' + dataResponse.daily[i].wind_speed + ' MPH';

            var forcastHumid = document.createElement('p');
            forcastHumid.textContent = 'Humidity: ' + dataResponse.daily[i].humidity + '%';


            weatherCard.append(forcastDates, forcastIcon ,forcastTemp, forcastWind, forcastHumid);
            document.querySelector('#forcast').append(weatherCard);
        }
    })
}