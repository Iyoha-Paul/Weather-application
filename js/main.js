'use strict';
let checkWeather = document.querySelector('.check-city');
let cityName = document.querySelector('.city__name');
let InputCityName = document.querySelector('.input');
let cityContainer = document.querySelector('.weather__result');
let refreshBtn = document.querySelector('.refresh');
let weatherContainer = document.querySelector('.weather__result');
let delBtns = document.querySelectorAll('.btn-del');
let city;
let request = new XMLHttpRequest();
let cities = [];
let searchedCities = [];
let id = 0;

InputCityName.addEventListener('keypress', function (e) {
  console.log(e.key);

  if (e.key === 'Enter') {
    checkWeatherFunction();
  }
});
refreshBtn.addEventListener('click', refreshWeatherList);
delBtns.forEach(item =>
  item.addEventListener('click', deleteWeatherInfo(item))
);
checkWeather.addEventListener('click', checkWeatherFunction);
weatherContainer.addEventListener('click', function (event) {
  let element = event.target;
  const Job = event.target.attributes.job.value;
  console.log(Job);

  if (Job == 'delete') {
    removeWeatherInfo(element);
  }
});
function refreshWeatherList() {
  searchedCities = [];
  cities = [];

  weatherContainer.innerHTML = '';
}
function deleteWeatherInfo(item) {}

function checkWeatherFunction() {
  city = InputCityName.value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7c9fb7a1ec4a9a3b5b7ef7192288f343`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      readApi(data);
    });
  // request.open(
  //   'GET',
  //   `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7c9fb7a1ec4a9a3b5b7ef7192288f343`
  // );
  // request.send();
  // request.addEventListener('load', readApi);
}

function readApi(weatherData) {
  // let weatherData = data;
  console.log(weatherData);
  if (
    weatherData.message === 'city not found' ||
    weatherData.message === 'Nothing to geocode'
  ) {
    alert('Not a city. please try again');
  }
  let {
    name: name,
    sys: { country },
    main: { temp },
  } = weatherData;
  let [weatherDescription] = weatherData.weather;
  let { description } = weatherDescription;
  console.log(name, temp, description);

  if (searchedCities.includes(name)) {
    alert('City already among list. please try again');
  } else {
    searchedCities.push(name);
    let newCity = ` <div class="city">
  <div class="city__name">
                        ${name} <span class="city__country"> ${country}</span>
                    </div>
                    <div class="city__temp">
                        <span class="city__temp__num">${Math.round(
                          temp - 273
                        )}</span> <span class="city__temp__deg">&#176;</span> <span
                            class="city__temp__symbol">C</span>
                    </div>
                    <div class="city__weather">
                        <div class="city__weather__symbol"><i
                                class="fa-solid fa-cloud-showers-heavy city__weather__symbol"></i></div>
                                <P class="city__weather__msg">${description}</P>

                    </div>
                    <button class="btn-del btn" job = 'delete' id = ${id}>X</button>

                </div>`;

    weatherContainer.insertAdjacentHTML('beforeend', `${newCity}`);
    id++;
    // cities.push(newCity);

    // cityContainer.innerHTML = cities.join('');
    // cityContainer.insertAdjacentHTML('afterbegin', newCity);
  }
  document.querySelector('.input').value = '';
  // console.log(weatherData);
  // console.log(searchedCities);
}
function removeWeatherInfo(element) {
  // let temp = Number(element.attributes.id.value);
  // console.log(element.attributes.id.value);

  // searchedCities[element.attributes.id.value] = '';

  delete searchedCities[element.attributes.id.value];
  // console.log(searchedCities);
  element.parentNode.parentNode.removeChild(element.parentNode);
}
// todoList[element.id].trash = true;
// function displayData() {
//   let htmlContent = ` <div class="city">
//                     <div class="city__name">
//                         ${name} <span class="city__country"> ${sys.country}</span>
//                     </div>
//                     <div class="city__temp">
//                         <span class="city__temp-num">9</span> <span class="city__temp-deg">&#176;</span> <span
//                             class="city__temp-symbol">C</span>
//                     </div>
//                     <div class="city__weather">
//                         <div class="city__weather-symbol"><i
//                                 class="fa-solid fa-cloud-showers-heavy city__weather-symbol"></i></div>
//                         <P class="city__weather-msg">Heavy rain</P>

//                     </div>
//                 </div>`;
// }
// const inputBtn = document.querySelectorAll('.btn-num');
// const equalBtn = document.querySelector('.btn-equal');
// const delBtn = document.querySelector('.btn-del');
// const clearBtn = document.querySelector('.btn-clear');
// const screenOutputDiaplay = document.querySelector('#fname');

// inputBtn.forEach(item =>
//   item.addEventListener('click', function () {
//     screenOutputDiaplay.value = `${screenOutputDiaplay.value}${item.textContent}`;
//   })
// );
// clearBtn.addEventListener('click', reset);
// equalBtn.addEventListener('click', equate);
// delBtn.addEventListener('click', del);

// // ##FUNCTIONS##FUNCTIONS##FUNCTIONS##FUNCTIONS
// function reset() {
//   screenOutputDiaplay.value = ``;
// }
// function del() {
//   let temp = screenOutputDiaplay.value;
//   screenOutputDiaplay.value = temp.slice(0, temp.length - 1);
//   console.log(screenOutputDiaplay.value);
// }
// function equate() {
//   let temp = screenOutputDiaplay.value;
//   if (!eval(temp)) {
//     console.log('cnt');
//   }
//   screenOutputDiaplay.value = eval(temp);
// }
// const themeBtn = document.querySelector('.btn-theme');
// const startBtn = document.querySelector('.btn-start');

// const stopBtn = document.querySelector('.btn-stop');
// const resetBtn = document.querySelector('.btn-reset');
// const allButtons = document.querySelectorAll('.btn');
// let timerIsCounting = false;
// let stopWatchScreen = document.querySelector('.stopwatch__timer');
// const main = document.querySelector('.main');
// const stopWatchContaier = document.querySelector('.stopwatch');
// let hr = 0;
// let min = 0;
// let sec = 0;
// let vat;
// themeBtn.addEventListener('click', toggleTheme);
// stopBtn.addEventListener('click', stopTimer);
// resetBtn.addEventListener('click', resetTimer);
// startBtn.addEventListener('click', startTimer);

// // ##FUNCTIONS##FUNCTIONS##FUNCTIONS
// function toggleTheme() {
//   main.classList.toggle('dark-theme');
//   stopWatchContaier.classList.toggle('dark-theme');
//   allButtons.forEach(item => item.classList.toggle('dark-theme'));
// }
// function startTimer() {
//   if (!timerIsCounting) {
//     vat = setInterval(startTimercode, 1000);
//     timerIsCounting = true;
//   }
//   return vat;
// }
// function startTimercode() {
//   sec++;
//   // console.log('working');
//   if (min > 59) {
//     hr++;
//     min = 0;
//   }

//   min = sec > 59 ? min + 1 : min;

//   sec = sec > 59 ? 0 : sec;
//   let hrTag = hr > 9 ? '' : 0;
//   let minTag = min > 9 ? '' : 0;
//   let secTag = sec > 9 ? '' : 0;
//   stopWatchScreen.textContent = `${hrTag}${hr}:${minTag}${min}:${secTag}${sec}`;
//   timerIsCounting = true;
// }
// function stopTimer() {
//   clearInterval(vat);
//   timerIsCounting = false;
// }
// function resetTimer() {
//   stopTimer();
//   hr = '00';
//   min = '00';
//   sec = '00';
//   stopWatchScreen.textContent = `${hr}:${min}:${sec}`;
//   hr = 0;
//   min = 0;
//   sec = 0;
//   console.log(typeof hr);
// }
// // while (timerIsCounting) {
// //   console.log('working');
// //   sec++;
// //   stopWatchScreen.textContent = `${hr}:${min}:${sec}`;
// //   timerIsCounting = false;
// // }

// // function toggleMenu() {
// //   if (!showMenu) {
// //     hamBurger.classList.add('open');
// //     nav.classList.add('open');
// //     menuNav.classList.add('open');
// //     menuNavItem.forEach(item => item.classList.add('open'));
// //     showMenu = true;
// //   } else {
// //     hamBurger.classList.remove('open');
// //     showMenu = false;
// //     nav.classList.remove('open');
// //     menuNav.classList.remove('open');
// //     menuNavItem.forEach(item => item.classList.remove('open'));
// //   }
// // }
