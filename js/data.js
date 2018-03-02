'use strict';

(function () {
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

  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;
  var AMOUNT = 8;
  var LOCATION_X_MIN = 300;
  var LOCATION_X_MAX = 900;
  var ROOMS_MIN = 1;
  var ROOMS_MAX = 5;
  var LOCATION_Y_MIN = 150;
  var LOCATION_Y_MAX = 500;

  var getOffer = function () {
    var array = [];
    var title = window.util.getRandomArr(TITLES);
    for (var i = 1; i <= AMOUNT; i++) {
      var locationX = window.util.getRandom(LOCATION_X_MIN, LOCATION_X_MAX);
      var locationY = window.util.getRandom(LOCATION_Y_MIN, LOCATION_Y_MAX);
      var advert = {
        'id': i,
        'author': {
          'avatar': 'img/avatars/user0' + i + '.png'
        },

        'offer': {
          'title': title[i],
          'address': locationX + ', ' + locationY,
          'price': window.util.getRandom(PRICE_MIN, PRICE_MAX),
          'type': window.util.getRandomElemArr(TYPES),
          'rooms': window.util.getRandom(ROOMS_MIN, ROOMS_MAX),
          'guests': window.util.getRandom(10, 1),
          'checkin': window.util.getRandomElemArr(CHECKIN),
          'checkout': window.util.getRandomElemArr(CHECKOUT),
          'features': window.util.getRandomArr(FEATURES),
          'description': '',
          'photos': window.util.getRandomArr(PHOTOS)
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
  var findById = function (id) {
    for (var i = 0; i < offerAd.length; i++) {
      if (offerAd[i].id === parseInt(id, 10)) {
        return offerAd[i];
      }
    }
    return null;
  };

  var offerAd = getOffer(AMOUNT);

  window.data = {
    findById: findById,
    offerAd: offerAd
  };
})();
