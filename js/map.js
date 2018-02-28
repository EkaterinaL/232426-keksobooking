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
  var newArr = randomArr.slice();
  newArr.sort(function () {
    return 0.5 - Math.random();
  });
  return newArr;
};

// Создаем объявление
var getOffer = function () {
  var array = [];
  var title = getRandomArr(TITLES);
  for (var i = 1; i <= AMOUNT; i++) {
    var locationX = getRandom(LOCATION_X_MIN, LOCATION_X_MAX);
    var locationY = getRandom(LOCATION_Y_MIN, LOCATION_Y_MAX);
    var advert = {
      'id': i,
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },

      'offer': {
        'title': title[i],
        'address': locationX + ', ' + locationY,
        'price': getRandom(PRICE_MIN, PRICE_MAX),
        'type': getRandomElemArr(TYPES),
        'rooms': getRandom(ROOMS_MIN, ROOMS_MAX),
        'guests': getRandom(10, 1),
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

// Ищем айдишник Пина
var findById = function (id) {
  for (var i = 0; i < offerAd.length; i++) {
    if (offerAd[i].id === parseInt(id, 10)) {
      return offerAd[i];
    }
  }
  return null;
};

// Убираем поп-ап
var removePopup = function () {
  var popupCard = map.querySelector('.map__card');
  if (popupCard) {
    map.removeChild(popupCard);
  }
};

// Убираем поп-ап с помощью ESCAPE
var keydownEscHandler = function (evt) {
  if (evt.keyCode === ESC) {
    removePopup();
  }
};

// Создаем поп-ап
var createPopup = function (id) {
  var infoPin = findById(id);
  var popupOffer = renderOffer(infoPin);
  addPopupToMap(popupOffer);
  return popupOffer;
};

// Добавляем  попап на карту
var addPopupToMap = function (advert) {
  map.appendChild(advert);
};

// Создаем элемент пина
var createPin = function (data) {
  var button = document.createElement('button');
  button.className = 'map__pin';
  button.style.left = data.location.x + 'px';
  button.style.top = data.location.y + 'px';
  button.draggable = false;
  button.dataset.id = data.id;
  var imgButton = document.createElement('img');
  imgButton.src = '';
  imgButton.style.width = '40' + 'px';
  imgButton.style.height = '40' + 'px';
  imgButton.src = data.author.avatar;
  button.appendChild(imgButton);

  button.addEventListener('click', function () {
    removePopup();
    createPopup(button.dataset.id);
    map.querySelector('.popup__close').addEventListener('click', function () {
      removePopup();
    });
    document.addEventListener('keydown', keydownEscHandler);
  });
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
    fragment.appendChild(featuresElement);
  }
  return fragment;
};

// Создаем объявление
var renderOffer = function (data) {
  var template = document.querySelector('template').content.querySelector('article.map__card');
  var cardElem = template.cloneNode(true);
  cardElem.querySelector('.popup__avatar').src = data.author.avatar;
  cardElem.querySelector('h3').textContent = data.offer.title;
  cardElem.querySelector('.popup__price').textContent = data.offer.price + ' ₽/ночь';
  cardElem.querySelector('h4').textContent = apartmentType[data.offer.type];
  cardElem.querySelector('h4').nextElementSibling.nextElementSibling.textContent = 'Заезд после ' + data.offer.checkin + ',' + ' выезд до ' + data.offer.checkout;
  cardElem.querySelector('.popup__features').textContent = '';
  cardElem.querySelector('.popup__features').appendChild(getFeatures(data.offer.features));
  cardElem.querySelector('.popup__features + p').textContent = data.offer.description;

  return cardElem;
};

var mapElem = document.querySelector('.map__pins');
var offerAd = getOffer(AMOUNT);
var noticeForm = document.querySelector('.notice__form');
var noticeFormFieldset = noticeForm.querySelectorAll('fieldset');
var mapPinMain = document.querySelector('.map__pin--main');
var address = document.querySelector('#address');
var map = document.querySelector('.map');
var ESC = 27;


var doMapActive = function () {
  noticeForm.classList.remove('notice__form--disabled');
  map.classList.remove('map--faded');
  for (var i = 0; i < noticeFormFieldset.length; i++) {
    noticeFormFieldset[i].disabled = false;
  }
};

var doMapBlocked = function () {
  noticeForm.classList.add('notice__form--disabled');
  map.classList.add('map--faded');
  for (var i = 0; i < noticeFormFieldset.length; i++) {
    noticeFormFieldset[i].disabled = true;
  }
};

var getAddress = function (event) {
  var mainPinCoordinates = event.clientX + ', ' + event.clientY;
  address.value = mainPinCoordinates;
};

var onAddMapPins = function (event) {
  doMapActive();
  getAddress(event);
  renderMap(mapElem, offerAd);
  mapPinMain.removeEventListener('mouseup', onAddMapPins);
};

doMapBlocked();
mapPinMain.addEventListener('mouseup', onAddMapPins);

var checkin = noticeForm.querySelector('#timein');
var checkout = noticeForm.querySelector('#timeout');
var type = noticeForm.querySelector('#type');
var price = noticeForm.querySelector('#price');
var roomNumber = noticeForm.querySelector('#room_number');
var capacity = noticeForm.querySelector('#capacity');
var title = noticeForm.querySelector('#title');
var option = capacity.querySelectorAll('option');

var housePrice = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

var checkTitle = function () {
  if (title.validity.valueMissing) {
    title.setCustomValidity('Укажите заголовок объявления');
  } else if (title.validity.tooShort) {
    title.setCustomValidity('Заголовок слишком короткий, длина текста' + title.value.length + ' символов');
  } else if (title.validity.tooLong) {
    title.setCustomValidity('Заголовок слишком длинный, длина текста' + title.value.length + ' символов');
  } else {
    title.setCustomValidity('');
  }
};

var checkPrice = function () {
  if (price.validity.rangeUnderflow) {
    price.setCustomValidity('Цена не может быть меньше ' + price.min + ' рублей!');
  } else if (price.validity.rangeOverflow) {
    price.setCustomValidity('Цена не может превышать 1 000 000 рублей!');
  } else if (price.validity.valueMissing) {
    price.setCustomValidity('Укажите цену');
  } else {
    price.setCustomValidity('');
  }
};

var priceChangeHandler = function () {
  var minPrice = housePrice[type.value];
  price.min = minPrice;
  price.placeholder = minPrice;
};

var guestsNumberHandler = function (evt) {
  if (evt.target.value === '1') {
    option[0].disabled = true;
    option[1].disabled = true;
    option[2].disabled = false;
    option[3].disabled = true;
    capacity.value = '1';
  }
  if (evt.target.value === '2') {
    option[0].disabled = false;
    option[1].disabled = false;
    option[2].disabled = false;
    option[3].disabled = true;
    capacity.value = '2';
  }
  if (evt.target.value === '3') {
    option[0].disabled = false;
    option[1].disabled = false;
    option[2].disabled = false;
    option[3].disabled = true;
    capacity.value = '3';
  }
  if (evt.target.value === '100') {
    option[0].disabled = true;
    option[1].disabled = true;
    option[2].disabled = true;
    option[3].disabled = false;
    capacity.value = '0';
  }
};

type.addEventListener('change', priceChangeHandler);
roomNumber.addEventListener('change', guestsNumberHandler);

checkin.addEventListener('change', function () {
  checkout.value = checkin.value;
});

checkout.addEventListener('change', function () {
  checkin.value = checkout.value;
});

noticeForm.addEventListener('invalid', function () {
  checkTitle();
  checkPrice();
});
