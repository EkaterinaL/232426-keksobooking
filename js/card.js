'use strict';

(function () {
  var apartmentType = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом'
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

  window.card = {
    renderOffer: renderOffer
  };
})();
