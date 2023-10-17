console.log("Выполнено:.\n- Часы и календарь +15\n- Приветствие +10\n- Смена фонового изображения +20\n- Виджет погоды +15\n- Виджет цитата дня +10\n- Аудиоплеер +15\n- Продвинутый аудиоплеер +20\n- Перевод приложения на два языка (en/ru или en/be) +15\n- Настройки приложения +14 (не выполнено API)\n- ToDo list +10\nScores: 145/150");
import playList from '../js/playList.js';

const body = document.querySelector('body');
const time = document.querySelector('.time');
const day = document.querySelector('.date');
const greetingText = document.querySelector('.greeting');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');


const greetingTranslation = getGreeting();


// languages--------------------------------------------------------------------------------------------------

const langBtns = document.querySelectorAll('.language');
const enBtn = document.querySelector('.en');


if (localStorage.getItem('language')) {
    let language = document.querySelector(`.${localStorage.getItem('language')}`);
    language.classList.add('active-language');
} else {
    enBtn.classList.add('active-language');
}


langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        for (let i = 0; i < langBtns.length; i++) {
            langBtns[i].classList.remove('active-language');
        }
        btn.classList.add('active-language');
        let activeLanguage = document.querySelector('.active-language');
        localStorage.setItem('language', activeLanguage.textContent);
        showDate();
        showGreeting();
        getWeather();
        getQuotes();
        showSettingsText();
        translateToDoTitlePlaceholder();
        document.querySelector('.name').setAttribute('placeholder', `${greetingPlaceholder[document.querySelector('.active-language').textContent]}`);
        city.setAttribute('placeholder', `${cityPlaceholderTranslation[document.querySelector('.active-language').textContent]}`);
    })
})


// time and calendar---------------------------------------------------------------------

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    
    showDate();
    showGreeting();
    
    setTimeout(showTime, 1000);
}
let currentDayBe ={
    понедельник: "панядзелак",
    вторник: "аўторак",
    среда: "серада",
    четверг: "чацвер",
    пятница: "пятніца",
    суббота: "субота",
    воскресенье: "нядзеля",
}
let currentMonthBe = {
    января: "студзеня",
    февраля: "лютага",
    марта: "сакавіка",
    апреля: "красавіка",
    мая: "траўня",
    июня: "чэрвеня",
    июля: "ліпеня",
    августа: "жніўня",
    сентября: "верасня",
    октября: "кастрычніка",
    ноября: "лістапада",
    декабря: "снежня",
}
function showDate() {
    const date = new Date();
    const options = {month: 'long', day: 'numeric', weekday: 'long'};
    let currentDay;
    if (document.querySelector('.active-language').textContent == "en") {
        currentDay = date.toLocaleDateString('en-Br', options);
    } else if (document.querySelector('.active-language').textContent == "be") {
        currentDay = date.toLocaleDateString('be-BY', options);
        let currentDayRu = currentDay.split(' ')[0].slice(0, -1);
        let currentMonthRu = currentDay.split(' ')[2];
        let keyDay = currentDayRu;
        let keyMonth = currentMonthRu;
        
        currentDay = `${currentDayBe[keyDay]}, ${date.getDate()} ${currentMonthBe[keyMonth]}`
        
    } else if (document.querySelector('.active-language').textContent == "ru") {
        currentDay = date.toLocaleDateString('ru-RU', options);
    }
    day.textContent = currentDay;
}   

showTime();



// greeting-------------------------------------------------------------------------------------


function getGreeting() {
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 6 && hours < 12) {
        return  {
                en: "Good morning,",
                be: "Добрай раніцы,",
                ru: "Доброе утро,",
            }
    } else if (hours >= 12 && hours < 18) {
        return  {
                en: "Good afternoon,",
                be: "Добры дзень,",
                ru: "Добрый день,",
            }
    } else if ((hours >= 18 && hours < 24 && hours != 0)) {
        return   {
                en: "Good evening,",
                be: "Добры вечар,",
                ru: "Добрый вечер,",
            }
    } else {
        return  {
                en: "Good night,",
                be: "Дабранач,",
                ru: "Доброй ночи,",
            }
    }
}

function showGreeting() {
    greetingText.textContent = greetingTranslation[document.querySelector('.active-language').textContent];
}

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 6 && hours < 12) {
        return "morning";
    } else if (hours >= 12 && hours < 18) {
        return "afternoon";
    } else if ((hours >= 18 && hours < 24)) {
        return  "evening";
    } else {
        return "night";
    }
}

const greetingPlaceholder = {
    en: '[Enter name]',
    be: '[Увядзіце імя]',
    ru: '[Введите имя]',
}

document.querySelector('.name').setAttribute('placeholder', `${greetingPlaceholder[document.querySelector('.active-language').textContent]}`);

const inputName = document.querySelector('.name');

inputName.addEventListener("input", function(){
    if (this.value) {
        document.querySelector('.name').removeAttribute('placeholder');
    } else {
        document.querySelector('.name').setAttribute('placeholder', `${greetingPlaceholder[document.querySelector('.active-language').textContent]}`);
    } 
});

if (localStorage.getItem('name')) {
    document.querySelector('.name').removeAttribute('placeholder');
} 



// slider-------------------------------------------------------------------------------------------

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randomNum = getRandomNum(1, 20);

function setBg() {
    let timeOfDay = getTimeOfDay();
    let bgNum = String(randomNum);
    if (bgNum.length == 1) {
       bgNum = bgNum.padStart(2, "0");
    }
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/AntonLeshkovich/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.webp` 
    img.onload = () => {      
        body.style.backgroundImage = `url('https://raw.githubusercontent.com/AntonLeshkovich/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.webp')`;
    };
}
setBg();

function getSlideNext() {
    if (randomNum > 19) {
        randomNum = 0;
    }
    randomNum += 1;
    setBg();
}

function getSlidePrev() {
    if (randomNum < 2) {
        randomNum = 21;
    }
    randomNum -= 1;
    setBg();
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);





// weather---------------------------------------------------------------------------

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const errorText = document.querySelector('.weather-error');

const city = document.querySelector('.city');

const cityPlaceholderTranslation = {
    en: '[Enter city]',
    be: '[Увядзіце горад]',
    ru: '[Введите город]'
}

city.value = 'Minsk';

function removeWeatherDesc() {
    city.setAttribute('placeholder', `${cityPlaceholderTranslation[document.querySelector('.active-language').textContent]}`);
        weatherIcon.removeAttribute('class');
        temperature.textContent = '';
        weatherDescription.textContent = '';
        wind.textContent = '';
        humidity.textContent = '';
}

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${document.querySelector('.active-language').textContent}&appid=8b869c8765cb0b65cb61ce9a19b9fd66&units=metric`;
    const res = await fetch(url);
    const errorTranslationWithValue = {
        en: `Error! City "${city.value}" is undefined! Please enter another city!`,
        be: `Памылка! Горад "${city.value}" не вызначаны! Калі ласка, увядзіце іншы горад!`,
        ru: `Ошибка! Город "${city.value}" не определён! Пожалуйста введите другой город!`,
    }
    const errorTranslationWithoutValue = {
        en: `Error! Please enter city!`,
        be: `Памылка! Калі ласка, увядзіце горад!`,
        ru: `Ошибка! Пожалуйста введите город!`,
    }
    if (res.ok) {
        const data = await res.json();
        const windTranslation = {
            en: `Wind speed: ${Math.round(data.wind.speed)} m/s`,
            be: `Хуткасць ветру: ${Math.round(data.wind.speed)} м/с`,
            ru: `Скорость ветра: ${Math.round(data.wind.speed)} м/с`,
        }
        const humidityTranslation = {
            en: 'Humidity:',
            be: 'Вільготнасць:',
            ru: 'Влажность:',
        }
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        errorText.textContent = '';
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `${windTranslation[document.querySelector('.active-language').textContent]}`;
        humidity.textContent = `${humidityTranslation[document.querySelector('.active-language').textContent]} ${Math.round(data.main.humidity)}%`;
    } else if (city.value) {
        errorText.textContent = `${errorTranslationWithValue[document.querySelector('.active-language').textContent]}`;
        city.value = '';
        removeWeatherDesc();
    } else {
        errorText.textContent = `${errorTranslationWithoutValue[document.querySelector('.active-language').textContent]}`;
        removeWeatherDesc();
    }
    
}

document.addEventListener('DOMContentLoaded', getWeather);

city.addEventListener('keypress', (event) => {
    if (event.code === 'Enter') {
        getWeather();
    }
})

city.addEventListener('focusout', () => {
    getWeather(); 
})


// quote start-----------------------------------------------------------------------------------------------------------------

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const quoteBtn = document.querySelector('.change-quote');

async function getQuotes() {
    const quotes = 'quotes.json';
    const res = await fetch(quotes);
    const data = await res.json();
    
    let randomQuote = getRandomNum(0, data.length - 1);

    if (document.querySelector('.active-language').textContent == 'en') {
        quote.textContent = data[randomQuote].en.text;
        author.textContent = data[randomQuote].en.author;
    } else if (document.querySelector('.active-language').textContent == 'be') {
        quote.textContent = data[randomQuote].be.text;
        author.textContent = data[randomQuote].be.author;
    } else if (document.querySelector('.active-language').textContent == 'ru') {
        quote.textContent = data[randomQuote].ru.text;
        author.textContent = data[randomQuote].ru.author;
    }
}

getQuotes();

quoteBtn.addEventListener('click', getQuotes);


// audio player start--------------------------------------------------------------------------------------------------------------------------

const playBtn = document.querySelector('.play');
const playNextBtn = document.querySelector('.play-next');
const playPrevBtn = document.querySelector('.play-prev');
const playListContainer = document.querySelector('.play-list');
const progressContainer = document.querySelector('.progress-bar');
const progress = document.querySelector('.progress');
const timePlay = document.querySelector('.time-play');
const volumeContainer = document.querySelector('.volume-block');
const volumeBar = document.querySelector('.volume-bar');
const volumeValue = document.querySelector('.volume-value');
const volumeBtn = document.querySelector('.volume-btn');
const currentTrackBlock = document.querySelector('.current-track-block');
const currentTrackText = document.querySelector('.current-track-text');


const audio = new Audio();

audio.volume = 0.3;
localStorage.removeItem('currentTime');

let isPlay = false;

let currentTime;
let playNum = 0;
let indexActivLi;
let arrLi = [];

playList.forEach (item => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = item.title;
    playListContainer.append(li);
    arrLi.push(li);
})

arrLi.forEach(item => {
    const btn = document.createElement('div');
    btn.classList.add('li-btn');
    item.prepend(btn);
})

function playAudio() {
    currentTime = localStorage.getItem('currentTime');
    if (localStorage.getItem('currentItem') !== null) {
        indexActivLi = Number(localStorage.getItem('currentItem'));
    } else {
        indexActivLi = showActiveItem();
    }
    arrLi.forEach(item => {
        item.firstChild.classList.remove('li-btn-active');
    })
    
    if (currentTime) {
        audio.src = playList[indexActivLi].src;
        if (localStorage.getItem('currentItem') !== null) {
            audio.currentTime = 0;
        } else {
            audio.currentTime = localStorage.getItem('currentTime');
        }
        arrLi[indexActivLi].firstChild.classList.add('li-btn-active');
        arrLi[indexActivLi].classList.add('item-active');
        if (currentTime < 1) {
            timePlay.textContent = `00:00/${playList[indexActivLi].duration}`;
        }
        timePlay.classList.add('time-play-active');
        currentTrackBlock.style.width = '225px';
        currentTrackBlock.style.opacity = 1;
        currentTrackText.textContent = playList[indexActivLi].title;
        audio.play();
    } else {
        audio.src = playList[playNum].src;
        audio.currentTime = 0;
        arrLi[playNum].firstChild.classList.add('li-btn-active');
        arrLi[playNum].classList.add('item-active');
        if (currentTime < 1) {
            timePlay.textContent = `00:00/${playList[playNum].duration}`;
        }
        timePlay.classList.add('time-play-active');
        currentTrackBlock.style.width = '225px';
        currentTrackBlock.style.opacity = 1;
        currentTrackText.textContent = playList[playNum].title;
        audio.play();
    }
    localStorage.removeItem('currentItem');
}

function showActiveItem() {
    for (let i = 0; i < arrLi.length; i++) {
        if (arrLi[i].classList.contains('item-active')) {
            return i;
        }
    }
}

function pauseAudio() {
    audio.pause();
    playBtn.classList.remove('pause');
    indexActivLi = showActiveItem();
    // arrLi[indexActivLi].firstChild.classList.remove('li-btn-active');
    timePlay.classList.remove('time-play-active');
    currentTrackBlock.style.width = '0px';
    currentTrackBlock.style.opacity = 0;
    currentTrackText.textContent = '';
}

function playNext() {
    currentTime = localStorage.getItem('currentTime');
    isPlay = true;
    playBtn.classList.add('pause');
    if (currentTime) {
        indexActivLi = showActiveItem();
        indexActivLi += 1;
        if (indexActivLi > (playList.length - 1)) {
            indexActivLi = 0;
        }
        localStorage.setItem('currentItem', indexActivLi);
    } else {
        indexActivLi = 0;
    }
    arrLi.forEach(item => {
        item.classList.remove('item-active');
    })
    playAudio();
}

function playPrev() {
    currentTime = localStorage.getItem('currentTime');
    isPlay = true;
    playBtn.classList.add('pause');
    if (currentTime) {
        indexActivLi = showActiveItem();
        indexActivLi -= 1;
        if (indexActivLi < 0) {
            indexActivLi = playList.length - 1;
        }
        localStorage.setItem('currentItem', indexActivLi);
    } else {
        indexActivLi = 0;
    }
    arrLi.forEach(item => {
        item.classList.remove('item-active');
    })
    playAudio();
}

playBtn.addEventListener('click', () => {
    currentTime = localStorage.getItem('currentTime');
    arrLi.forEach(item => {
        item.firstChild.classList.remove('li-btn-active');
    })
    if (currentTime) {
        playBtn.classList.toggle('pause');
        if (isPlay == false) {
            isPlay = true;
            playAudio();
        } else if (isPlay == true) {
            isPlay = false;
            pauseAudio();
        } 
    } else {
        playBtn.classList.toggle('pause');
        if (isPlay == false) {
            isPlay = true;  
            playAudio();
        } else if (isPlay == true) {
            isPlay = false;
            pauseAudio();
        }
    }
});

playNextBtn.addEventListener('click', playNext)

playPrevBtn.addEventListener('click', playPrev);

const liBtns = document.querySelectorAll('.li-btn');

const arrLiBtns = [];

liBtns.forEach(btn => {
    arrLiBtns.push(btn)
    btn.addEventListener('click', (event) => {
        let indexBtn = arrLiBtns.indexOf(event.target);
        currentTime = localStorage.getItem('currentTime');
        indexActivLi = showActiveItem();

        if (btn.classList.contains('li-btn-active')) {
            playBtn.classList.remove('pause');
            btn.classList.remove('li-btn-active');
            isPlay = false;
            pauseAudio();
        } else {
            for (let i = 0; i < arrLiBtns.length; i++) {
                arrLiBtns[i].classList.remove('li-btn-active');
            }
            playBtn.classList.add('pause');
            btn.classList.add('li-btn-active');
            audio.src = playList[indexBtn].src;
            if (currentTime && indexActivLi == indexBtn) {
                audio.currentTime = currentTime;   
            } else {
                audio.currentTime = 0;
            }
            audio.play();
            isPlay = true;
            if (audio.currentTime == 0) {
                timePlay.textContent = `00:00/${playList[indexBtn].duration}`;
            }
            timePlay.classList.add('time-play-active');
            currentTrackBlock.style.width = '225px';
            currentTrackBlock.style.opacity = 1;
            currentTrackText.textContent = playList[indexBtn].title;
        }
        arrLi.forEach(item => {
            if (item.classList.contains('item-active')) {
                item.classList.remove('item-active');
            }
        })
        arrLi[indexBtn].classList.add('item-active');
    })
})

audio.addEventListener('ended', playNext)

progress.style.width = 0;

function showCurrentTime() {
    indexActivLi = showActiveItem();
    let currentDuration = playList[indexActivLi].duration;
    let seconds = Math.floor(audio.currentTime % 60);
    let minutes = Math.floor(audio.currentTime / 60);
    if (seconds < 10 && minutes < 10) {
        timePlay.textContent = `0${minutes}:0${seconds}/${currentDuration}`;
    }
    if (seconds > 9 && minutes < 10) {
        timePlay.textContent = `0${minutes}:${seconds}/${currentDuration}`;
    }
    if (seconds < 10 && minutes > 9) {
        timePlay.textContent = `${minutes}:0${seconds}/${currentDuration}`;
    }
    if (seconds > 9 && minutes > 9) {
        timePlay.textContent = `${minutes}:${seconds}/${currentDuration}`;
    }
}

function getDurationSec() {
    indexActivLi = showActiveItem();
    let duration = playList[indexActivLi].duration;
    let durationMinutesInSec = Number(duration.substring(0, 2)) * 60;
    let durationSec = Number(duration.substring(3, 5));
    return duration = durationMinutesInSec + durationSec;
}
function updateProgress(e) {
    currentTime = audio.currentTime;
    localStorage.setItem('currentTime', audio.currentTime);
    let duration = getDurationSec();
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    
    setInterval(showCurrentTime, 1000)
    
}

audio.addEventListener('timeupdate', updateProgress)

function setProgress(e) {
    const width = this.clientWidth;
    const clickWidth = e.offsetX;
    let duration = getDurationSec();

    audio.currentTime = (clickWidth / width) * duration;
}

progressContainer.addEventListener('click', setProgress)


function setVolume(e) {
    const width = this.clientWidth;
    const clickWidth = e.offsetX;
    audio.volume = (1 / width) * clickWidth;

    volumeValue.style.width = `${audio.volume * volumeBar.clientWidth}px`;

    volumeBtn.classList.remove('mute');
    if (audio.volume == 0) {
        volumeBtn.classList.add('mute');
    }
}

volumeBar.addEventListener('click', setVolume);

volumeContainer.addEventListener('mouseover', () => { volumeValue.style.width = `${audio.volume * volumeBar.clientWidth}px` });
volumeContainer.addEventListener('mouseout', () => { volumeValue.style.width = `${0}px` });

volumeBtn.addEventListener('click', () => {

    volumeBtn.classList.toggle('mute');
    
    if (volumeBtn.classList.contains('mute')) {
        localStorage.setItem('volume', audio.volume);
        audio.volume = 0;
        volumeValue.style.width = `${0}px`; 
    } else {
        audio.volume = localStorage.getItem('volume');
        volumeValue.style.width = `${audio.volume * volumeBar.clientWidth}px`;
    }
})



// settings-------------------------------------------------------------------------------------------------------------------------

const settingsBtnsBlock = document.querySelector('.settings-btns-block');
const arrSettingsBtnContainer = [];
let btnsCount = 7;

for (let i = 0; i < btnsCount; i++) {
    const settingsBtnContainer = document.createElement('div');
    const settingsBtnText = document.createElement('span');
    const settingsBtnBox = document.createElement('div');
    const settingsBtn = document.createElement('div');

    let settingsBtnBoxID = {
        0: "player",
        1: "weather",
        2: "time",
        3: "date",
        4: "greeting-block",
        5: "quotes",
        6: "todo"
    }

    settingsBtnContainer.className = "settings-btn-container";
    settingsBtnText.className = "settings-btn-text";
    settingsBtnBox.className = "settings-btn-box";
    settingsBtnBox.id = `${settingsBtnBoxID[i]}`;
    settingsBtn.className = "settings-btn";

    settingsBtnsBlock.append(settingsBtnContainer)
    settingsBtnContainer.prepend(settingsBtnText);
    settingsBtnText.after(settingsBtnBox);
    settingsBtnBox.prepend(settingsBtn);

    arrSettingsBtnContainer.push(settingsBtnContainer)
}

const settingsBtnsText = document.querySelectorAll('.settings-btn-text');
const settingsBtnsBox = document.querySelectorAll('.settings-btn-box');

const settingsTextEn = {
    0: "Audio player",
    1: "Weather",
    2: "Time",
    3: "Date",
    4: "Greeting",
    5: "Quotes",
    6: "ToDo list"
}   
const settingsTextBe = {
    0: "Аўдыяплэер",
    1: "Надвор'е",
    2: "Час",
    3: "Дата",
    4: "Прывітанне",
    5: "Цытаты",
    6: "Спіс спраў"
}
const settingsTextRu = {
    0: "Аудиоплеер",
    1: "Погода",
    2: "Время",
    3: "Дата",
    4: "Приветствие",
    5: "Цитаты",
    6: "Список дел"
}
function showSettingsText() {
    for (let i = 0; i < arrSettingsBtnContainer.length; i++) {
        if (document.querySelector('.active-language').textContent == "en") {
            settingsBtnsText[i].textContent = settingsTextEn[i];
        }
        if (document.querySelector('.active-language').textContent == "be") {
            settingsBtnsText[i].textContent = settingsTextBe[i];
        }
        if (document.querySelector('.active-language').textContent == "ru") {
            settingsBtnsText[i].textContent = settingsTextRu[i];
        }
    }
}

showSettingsText();

settingsBtnsBox.forEach(btn => {
    if (localStorage.getItem(`${btn.id}`)) {
        btn.classList.remove('settings-btn-box-active');
        btn.firstElementChild.classList.remove('settings-btn-active');
        document.querySelector(`.${btn.id}`).style.opacity = 0;
        document.querySelector(`.${btn.id}`).style.pointerEvents = 'none';
    } else {
        btn.classList.add('settings-btn-box-active');
        btn.firstElementChild.classList.add('settings-btn-active');
    }
    btn.addEventListener('click', function() {
        document.querySelector(`.${btn.id}`).style.transition = 'opacity .4s'
        btn.classList.toggle('settings-btn-box-active');
        if (document.querySelector(`.${this.id}`).classList.contains('player')) {
            pauseAudio();
            isPlay = false;
        }
        if (this.classList.contains('settings-btn-box-active')) {
            btn.firstElementChild.classList.add('settings-btn-active');
            localStorage.removeItem(`${this.id}`);
            document.querySelector(`.${this.id}`).style.opacity = 1;
            document.querySelector(`.${this.id}`).style.pointerEvents = 'auto';
        } else {
            btn.firstElementChild.classList.remove('settings-btn-active');
            localStorage.setItem(`${this.id}`, 'disabled');
            document.querySelector(`.${this.id}`).style.opacity = 0;
            document.querySelector(`.${this.id}`).style.pointerEvents = 'none';
        }
    })
})

// todo-----------------------------------------------------------------------------------------------

const addBtn = document.querySelector('.addBtn');
const todosList = document.querySelector('.todos-list');
const todoInput = document.querySelector('.todo-input');
const todoTitle = document.querySelector('.todo-title');

if (localStorage.getItem('ToDoHTML')) {
    todosList.innerHTML = localStorage.getItem('ToDoHTML');
}

function deleteItemToDo() {
    let arrTodoCloseBtn = document.querySelectorAll('.todo-close-btn');
        
    arrTodoCloseBtn.forEach(item => {
        
        item.addEventListener('click', function() {
            this.previousSibling.style.transition = 'opacity .3s';
            this.style.opacity = '0';
            this.closest('.todo-item').style.maxHeight = '0px';
            this.previousSibling.style.opacity = '0';
            this.closest('.todo-item').style.marginTop = '0px';
            
            function deleteItem() {
                let arrInactiveItem = document.querySelectorAll('.todo-item');
                arrInactiveItem.forEach(item => {
                    if (item.clientHeight == 0) {
                        item.remove();
                    }
                    saveTodoLocalStorage();
                })
                
            }
            setTimeout(deleteItem, 500)
        })
    })
}

deleteItemToDo();

function createTodoItem() {
      
    if (todoInput.value === "" ) {
        todoInput.value === "";
    } else if (todosList.clientHeight < 230) {    //250
        let todoItem = document.createElement('div');
        let todoItemTextBlock = document.createElement('div')
        let todoItemText = document.createElement('span');
        let todoCompleteIcon = document.createElement('span');
        let todoCloseBtn = document.createElement('span');

        todoItem.className = 'todo-item';
        todoItemTextBlock.className = 'todo-item-text-block'
        todoItemText.className = 'todo-item-text';
        todoCompleteIcon.className = 'todo-complete-icon';
        todoCloseBtn.className = 'todo-close-btn';

        todoItem.style.maxHeight = '0px';
        todoItemTextBlock.style.transition = 'opacity 1s';

        function showTodoItem() {
            todoItem.style.maxHeight = '90px';
            todoItemTextBlock.style.opacity = '1';
            todoCloseBtn.style.opacity = '1';
        }
        setTimeout(showTodoItem, 1);

        todoItemText.textContent = todoInput.value;
        todoCompleteIcon.innerHTML = `<?xml version="1.0" ?>
            <svg class="complete-svg" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_105_1758)">
                    <path d="M20 7.00024L10 17.0002L5 12.0002" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </g>
                <defs><clipPath id="clip0_105_1758"><rect fill="white" height="24" transform="translate(0 0.000244141)" width="24"/></clipPath></defs>
            </svg>`;
        todoCloseBtn.innerHTML = `<?xml version='1.0' encoding='iso-8859-1'?>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 18 18" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 18 18">
            <g>
                <g>
                    <path fill="#fff" fill-rule="evenodd" d="m16.088,0h-13.549c-0.466,0-0.845,0.379-0.845,0.846v2.541c0,0.469 0.379,0.848 0.846,0.848l.848,13.548c0,0.469 0.379,0.846 0.846,0.846h10.161c0.469,0 0.848-0.377 0.848-0.846l.846-13.548c0.469,0 0.848-0.379 0.848-0.848v-2.541c-0.002-0.467-0.381-0.846-0.849-0.846zm-2.54,16.935h-8.467l-.848-12.7h10.161l-.846,12.7zm1.694-14.395h-11.855v-0.846h11.854v0.846zm-7.621,13.55c0.469,0 0.848-0.379 0.848-0.848v-9.314c0-0.469-0.379-0.848-0.848-0.848-0.467,0-0.846,0.379-0.846,0.848v9.314c0,0.469 0.379,0.848 0.846,0.848zm3.387,0c0.469,0 0.848-0.379 0.848-0.848v-9.314c0-0.469-0.379-0.848-0.848-0.848-0.467,0-0.846,0.379-0.846,0.848v9.314c0,0.469 0.379,0.848 0.846,0.848z"/>
                </g>
            </g>
            </svg>`;

        todosList.append(todoItem);
        todoItem.prepend(todoItemTextBlock);
        todoItemTextBlock.prepend(todoCompleteIcon);
        todoItemTextBlock.append(todoItemText);
        todoItem.append(todoCloseBtn);
        if (todoItem.offsetTop > 240) {   //230
            todoItem.remove()
        }
        todoInput.value = "";

        deleteItemToDo();
    }
    setTimeout(saveTodoLocalStorage, 1000)
}

addBtn.addEventListener('click', createTodoItem)
todoInput.addEventListener('keypress', (event) => {
    if (event.code === 'Enter' && todosList.clientHeight < 230) {  //250
        createTodoItem();
    }
})

todosList.addEventListener('click', function(e) {
    if (e.target.classList.contains('todo-item-text')) {
        if (e.target.previousSibling.style.opacity == 0) {
            e.target.previousSibling.style.opacity = 1;
        } else {
            e.target.previousSibling.style.opacity = 0;
        }
        e.target.classList.toggle('completed-text');
    }
    if (e.target.classList.contains('complete-svg') ) {
        if (e.target.closest('.todo-complete-icon').style.opacity == 0) {
            e.target.closest('.todo-complete-icon').style.opacity = 1;
        } else {
            e.target.closest('.todo-complete-icon').style.opacity = 0;
        }
        e.target.closest('.todo-complete-icon').nextElementSibling.classList.toggle('completed-text');
    }
    saveTodoLocalStorage();
})

function translateToDoTitlePlaceholder() {
    
    if (document.querySelector('.active-language').textContent == "en") {
        todoTitle.textContent = "ToDo list";
        todoInput.setAttribute('placeholder', 'Add ToDo');
    }
    if (document.querySelector('.active-language').textContent == "be") {
        todoTitle.textContent = "Спіс спраў";
        todoInput.setAttribute('placeholder', 'Дадаць справу');
    }
    if (document.querySelector('.active-language').textContent == "ru") {
        todoTitle.textContent = "Список дел";
        todoInput.setAttribute('placeholder', 'Добавить дело');
    }
    
}
translateToDoTitlePlaceholder(); 

function saveTodoLocalStorage() {
    localStorage.setItem("ToDoHTML", todosList.innerHTML)
}

// localStorage--------------------------------------------------------------------------------------------------------------------

function setLocalStorage() {
    let city = document.querySelector('.city');
    localStorage.setItem('city', city.value);
    let name = document.querySelector('.name');
    localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    let city = document.querySelector('.city');
    let name = document.querySelector('.name');
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    } 
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage);