'use strict';

(function () {
  var ESC = 27;

  // Убираем поп-ап
  var removePopup = function () {
    var popupCard = window.map.map.querySelector('.map__card');
    if (popupCard) {
      window.map.map.removeChild(popupCard);
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
    var infoPin = window.data.findById(id);
    var popupOffer = window.card.renderOffer(infoPin);
    addPopupToMap(popupOffer);
    return popupOffer;
  };

  // Добавляем  попап на карту
  var addPopupToMap = function (advert) {
    window.map.map.appendChild(advert);
  };

  window.popup = {
    keydownEscHandler: keydownEscHandler,
    removePopup: removePopup,
    createPopup: createPopup
  };
})();
