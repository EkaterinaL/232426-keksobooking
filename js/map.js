'use strict';
(function () {
  var mapElem = document.querySelector('.map__pins');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormFieldset = noticeForm.querySelectorAll('fieldset');
  var mapPinMain = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  var map = document.querySelector('.map');

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
    window.pins.renderMap(mapElem, window.data.offerAd);
    mapPinMain.removeEventListener('mouseup', onAddMapPins);
  };

  doMapBlocked();
  mapPinMain.addEventListener('mouseup', onAddMapPins);

  window.map = {
    map: map
  };
})();
