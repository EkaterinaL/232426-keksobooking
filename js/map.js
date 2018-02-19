'use strict';

var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var TYPES = ['flat', 'house', 'bungalo'];

var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var ROOMS_MIN = 1;
var ROOMS_MAX = 5;

var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;

var LOCATION_X_MIN = 300;
var LOCATION_X_MAX = 900;

var LOCATION_Y_MIN = 150;
var LOCATION_Y_MAX = 500;

var AMOUNT = 8;

var getRandom = function (max, min) {
  min = min || 0;
  return Math.floor(Math.random() * (max - min)) + min;
};

var locAddress = {
  x: getRandom(LOCATION_X_MIN, LOCATION_X_MAX),
  y: getRandom(LOCATION_Y_MIN, LOCATION_Y_MAX)
};

// случайный индекс
var getRandomArrIndex = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

// случайный элемент массива
var getRandomElemArr = function (arr) {
  return arr[getRandomArrIndex(arr)];
};

// перемешанный массив случайным образом
var getRandomArr = function (randomArr) {
  randomArr.sort(function () {
    return 0.5 - Math.random();
  });
  return randomArr;
};

// Создаем объявление
var getOffer = function () {
  var array = [];
  for (var i = 1; i <= AMOUNT; i++) {
    var locationX = getRandom(LOCATION_X_MIN, LOCATION_X_MAX);
    var locationY = getRandom(LOCATION_Y_MIN, LOCATION_Y_MAX);
    var advert = {
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },

      'offer': {
        'title': getRandomElemArr(TITLES),
        'address': 'locAddress.x' + 'locAddress.y',
        'price': getRandom(PRICE_MIN, PRICE_MAX),
        'type': getRandomElemArr(TYPES),
        'rooms': getRandom(ROOMS_MIN, ROOMS_MAX),
        'guests': getRandom(1, 10),
        'checkin': getRandomElemArr(CHECKIN),
        'checkout': getRandomElemArr(CHECKOUT),
        'features': getRandomArr(FEATURES),
        'description': '',
        'photos': getRandomArr(PHOTOS)
      },

      'location': {
        'x': locationX,
        'y': locationY
      }
    };
    array.push(advert);
  }
  return array;
};

// Активируем карту
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Создаем элемент пина
var createPin = function (data) {
  var button = document.createElement('button');
  button.className = 'map__pin';
  button.style.left = data.location.x + 'px';
  button.style.top = data.location.y + 'px';
  button.draggable = false;
  var imgButton = document.createElement('img');
  imgButton.src = '';
  imgButton.style.width = '40' + 'px';
  imgButton.style.height = '40' + 'px';
  imgButton.src = data.author.avatar;
  button.appendChild(imgButton);
  return button;
};

var apartmentType = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом'
};

var renderMap = function (mapElem, arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(createPin(arr[i]));
  }
  mapElem.appendChild(fragment);
};

// получить DOM элемент фич
var getFeatures = function (features) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var featuresElement = document.createElement('li');
    featuresElement.className = 'feature feature--' + features[i];
    fragment.appendChild(features);
  }
  return fragment;
};

// Создаем объявление
var renderOffer = function (data) {
  var template = document.querySelector('template').content.querySelector('article.map__card');
  var CardElem = template.cloneNode(true);
  CardElem.querySelector('.popup__avatar').src = data.author.avatar;
  CardElem.querySelector('h3').textContent = data.offer.title;
  CardElem.querySelector('.popup__price').textContent = data.offer.price + '&#x20bd;/ночь';
  CardElem.querySelector('h4').textContent = apartmentType[data.offer.type];
  CardElem.querySelector('h4').nextElementSibling.nextElementSibling.textContent = 'Заезд после ' + data.offer.checkin + ',' + ' выезд до ' + data.offer.checkout;
  CardElem.querySelector('.popup__features').textContent = '';
  CardElem.querySelector('.popup__features').appendChild(getFeatures(data.offer.features));
  CardElem.querySelector('.popup__features + p').textContent = data.offer.description;
  return CardElem;
};

var mapElem = document.querySelector('.map__pins');
var OfferAd = getOffer(AMOUNT);
renderMap(mapElem, OfferAd);
var offer = renderOffer(OfferAd);
map.appendChild(offer);


