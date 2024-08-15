let cityInput = document.getElementById('cityName');
let findBtn = document.getElementById('find');
let currDayShow = document.getElementById('dayCurrShow');
let currDateShow = document.getElementById('dateCurrShow');
let currCityShow = document.getElementById('cityCurrShow');
let currImgShow = document.getElementById('imgCurrShow');
let currTempShow = document.getElementById('tempCurrShow');
let currMinTempShow = document.getElementById('mintempCurrShow');
let currMaxTempShow = document.getElementById('maxtempCurrShow');
let prcepShow = document.getElementById('precCurrShow');
let currDescriShow = document.getElementById('descriptionCurrShow');
let imgOtherShow = document.getElementsByClassName('imgOtherShow');
let dayOtherShow = document.getElementsByClassName('dayOtherShow')
let tempOtherShow = document.getElementsByClassName('tempOtherShow')
let currWindShow = document.getElementById('currWindShow');
let unitGet = document.getElementById('unitGet');
let apiKey = 'f855bd5299152319ccd8140528133ffa';
let unit = '';
let windUnit = '';
let cityName = 'Islamabad';
let lon = '';
let lat = '';
let data = '';
let description = [];
let minTemp = [];
let maxTemp = [];
let currTemp = [];
let windSpeed = [];
let humditiy = [];
let precipitation = [];
let day = [];
let date = [];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let fullDate = '';
let icon = [];
let currCityTime = '';
let dayOrNigth = '';
let icon2 = '';
cityInput.value = ''
let event1 = '';
event1.key = 'Enter'

convertToLatLon();



cityInput.addEventListener('keypress', (event = event1) => {
    if (event.key === 'Enter') {
        if (cityInput.value == '') {
            alert('Please enter City Name')
        } else {
            cityName = cityInput.value;
            convertToLatLon();
        }
    }
})


async function convertToLatLon() {
    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
    const response = await fetch(url);
    let data = await response.json();
    if (data == '') {
        alert('City Name does not Exist. Please enter correct City Name');
        clear();

    } else {
        lon = data[0].lon;
        lat = data[0].lat;
        getapi();
    }
}



async function getapi() {
    setUnit()
    let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`
    const response = await fetch(url);
    data = await response.json()
    console.log(data);
    setData();
    showData();
    otherDayShow();
    clear();
}

function setData() {
    for (let i = 0; i < 5; i++) {
        description.push(data.daily[i].weather[0].main)
        minTemp.push(data.daily[i].temp.min);
        maxTemp.push(data.daily[i].temp.max);
        windSpeed.push((data.daily[i].wind_speed) / 3.6);
        humditiy.push(data.daily[i].humidity);
        precipitation.push(data.daily[i].pop * 10);
        fullDate = new Date(data.daily[i].dt * 1000)
        let year = fullDate.getFullYear();
        let date1 = fullDate.getDate()
        let month = months[fullDate.getMonth()]
        let day1 = days[fullDate.getDay()]
        day.push(day1)
        date.push(date1 + ' ' + month + ' ' + year);
        icon.push(data.daily[i].weather[0].icon)
    }
    currTemp = (data.current.temp).toFixed(0)
}

function showData() {
    getTime()
    currDayShow.textContent = day[0]
    currDateShow.textContent = date[0];
    currCityShow.textContent = cityName;
    if (currCityTime < 18 && currCityTime > 4) {
        dayOrNigth = 'd'
    } else {
        dayOrNigth = 'n'
    }
    let icon1 = icon[0];
    icon2 = icon1.replace((/(d|n)/g), dayOrNigth)
    currImgShow.src = `http://openweathermap.org/img/wn/${icon2}@2x.png`
    currTempShow.textContent = currTemp + unitShow;
    currDescriShow.textContent = description[0];
    prcepShow.textContent = precipitation[0] + ' %'
    currWindShow.textContent = windSpeed[0].toFixed(2) + windUnit
}


function getTime() {
    let currentDate = new Date();
    console.log(currentDate);
    let utcTime = currentDate.getTime() + (currentDate.getTimezoneOffset() * 60000)
    console.log(utcTime);
    let b = data.timezone_offset;
    let y = 1000;
    let a = (y * b) + utcTime;
    console.log(a);
    let currCityDate = new Date(a)
    console.log(currCityDate);
    currCityTime = currCityDate.getHours();
}

function otherDayShow() {
    for (let i = 0; i < 4; i++) {
        imgOtherShow[i].src = `http://openweathermap.org/img/wn/${icon[i + 1]}@2x.png`;
        dayOtherShow[i].textContent = day[i + 1];
        tempOtherShow[i].textContent = ((minTemp[i + 1] + maxTemp[i + 1]) / 2).toFixed(0) + unitShow;
    }
}

function setUnit() {
    if (unitGet.value == 'Metric') {
        unit = 'Metric';
        unitShow = '°C';
        windUnit = ' m/sec'
    } else {
        unit = 'Imperial';
        unitShow = '°F';
        windUnit = ' miles/h'
    }
}

function clear() {
    description = [];
    minTemp = [];
    maxTemp = [];
    currTemp = [];
    windSpeed = [];
    humditiy = [];
    precipitation = [];
    day = [];
    date = [];
    icon = [];
    unit = '';
    unitShow = '';
    windUnit = ''
}
