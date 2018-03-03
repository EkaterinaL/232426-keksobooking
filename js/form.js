'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var checkin = noticeForm.querySelector('#timein');
  var checkout = noticeForm.querySelector('#timeout');
  var type = noticeForm.querySelector('#type');
  var price = noticeForm.querySelector('#price');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');
  var title = noticeForm.querySelector('#title');
  var option = capacity.querySelectorAll('option');
  var address = document.querySelector('#address');

  var housePrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var getAddress = function (x, y) {
    address.value = 'x: ' + x + ', y: ' + y;
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
      option[0].disabled = true;
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

  window.form = {
    getAddress: getAddress
  };
})();
