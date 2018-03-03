'use strict';

(function () {
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
      window.popup.removePopup();
      window.popup.createPopup(button.dataset.id);
      window.map.map.querySelector('.popup__close').addEventListener('click', function () {
        window.popup.removePopup();
      });
      document.addEventListener('keydown', window.popup.keydownEscHandler);
    });
    return button;
  };

  var renderMap = function (mapElem, arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(createPin(arr[i]));
    }
    mapElem.appendChild(fragment);
  };

  window.pins = {
    renderMap: renderMap
  };
})();
