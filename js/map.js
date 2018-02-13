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

var amount = 8;

function getRandomData(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var locationX = getRandomData(LOCATION_X_MIN, LOCATION_X_MAX);
var locationY = getRandomData(LOCATION_Y_MIN, LOCATION_Y_MAX);

// Создаем объявление
var getOffer = function () {
  var array = [];
  for (var i = 1; i <= amount; i++) {
    var advert = {
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },

      'offer': {
        'title': TITLES[i],
        'address': '{{location.x}}, {{location.y}}',
        'price': getRandomData(PRICE_MIN, PRICE_MAX),
        'type': TYPES[getRandomData(0, TYPES.length - 1)],
        'rooms': getRandomData(ROOMS_MIN, ROOMS_MAX),
        'guests': getRandomData(1, 10),
        'checkin': CHECKIN[getRandomData(0, CHECKIN.length - 1)],
        'checkout': CHECKOUT[getRandomData(0, CHECKOUT.length - 1)],
        'features': FEATURES[getRandomData(0, FEATURES.length - 1)],
        'description': '',
        'photos': PHOTOS[getRandomData(0, PHOTOS.length - 1)]
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
  var buttonLocation = document.createElement('button');
  buttonLocation.className = 'map__pin';
  buttonLocation.style.left = data.location.x + 'px';
  buttonLocation.style.top = data.location.y + 'px';
  buttonLocation.draggable = false;
  var imgButton = document.createElement('img');
  imgButton.src = '';
  imgButton.style.width = '40' + 'px';
  imgButton.style.height = '40' + 'px';
  imgButton.src = data.author.avatar;
  buttonLocation.appendChild(imgButton);
  return buttonLocation;
};

var template = document.querySelector('template').content.querySelector('article.map__card');
var getApartmentType = function (arr) {
  var apartmentType;
  if (arr.offer.type === 'flat') {
    apartmentType = 'Квартира';
  } else if (arr.offer.type === 'house') {
    apartmentType = 'Дом';
  } else if (arr.offer.type === 'bungalo') {
    apartmentType = 'Бунгало';
  }
  return apartmentType;
};

var renderMap = function (mapElem, arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(createPin(arr[i]));
  }
  mapElem.appendChild(fragment);
};

// Создаем объявление
var renderOffer = function (data) {
  var CardElem = template.cloneNode(true);
  CardElem.querySelector('.popup__avatar').src = data.author.avatar;
  CardElem.querySelector('h3').textContent = data.offer.title;
  CardElem.querySelector('.popup__price').textContent = data.offer.price + '&#x20bd;/ночь';
  CardElem.querySelector('h4').textContent = getApartmentType(data.offer.type);
  CardElem.querySelector('h4').nextElementSibling.nextElementSibling.textContent = 'Заезд после ' + data.offer.checkin + ',' + ' выезд до ' + data.offer.checkout;
  CardElem.children[9].textContent = data.offer.description;
  return CardElem;
};

var mapElem = document.querySelector('.map__pins');
var OfferAd = getOffer(amount);
renderMap(mapElem, OfferAd);
var offer = renderOffer(OfferAd[0]);
map.appendChild(offer);


