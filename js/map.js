'use strict';
(function () {
  var mapElem = document.querySelector('.map__pins');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormFieldset = noticeForm.querySelectorAll('fieldset');
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  var locationFrame = {
    x: {
      min: 300,
      max: 900
    },
    y: {
      min: 100,
      max: 500
    }
  };
  // Кнопка нажата
  var pinOnMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // Перетаскивание
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - mapPinMain.offsetLeft,
        y: startCoords.y - mapPinMain.offsetTop
      };

      var moveСonstraints = {
        minX: locationFrame.x.min,
        minY: locationFrame.y.min,
        maxX: locationFrame.x.max,
        maxY: locationFrame.y.max
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var coordinateX = Math.min(Math.max(startCoords.x - shift.x, moveСonstraints.minX), moveСonstraints.maxX);
      var coordinateY = Math.min(Math.max(startCoords.y - shift.y, moveСonstraints.minY), moveСonstraints.maxY);

      window.form.getAddress(coordinateX, coordinateY);

      mapPinMain.style.zIndex = 10;
      mapPinMain.style.top = coordinateY + 'px';
      mapPinMain.style.left = coordinateX + 'px';
    };
    // Отпускаем
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };


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

  var onAddMapPins = function (evt) {
    pinOnMouseDown(evt);
    doMapActive();
    window.pins.renderMap(mapElem, window.data.offerAd);
  };

  doMapBlocked();
  mapPinMain.addEventListener('mousedown', onAddMapPins);

  window.map = {
    map: map
  };
})();
