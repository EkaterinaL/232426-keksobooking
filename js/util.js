'use strict';

(function () {
  var getRandom = function (max, min) {
    min = min || 0;
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomArrIndex = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  var getRandomElemArr = function (arr) {
    return arr[getRandomArrIndex(arr)];
  };

  var getRandomArr = function (randomArr) {
    var newArr = randomArr.slice();
    newArr.sort(function () {
      return 0.5 - Math.random();
    });
    return newArr;
  };
  window.util = {
    getRandomArr: getRandomArr,
    getRandomElemArr: getRandomElemArr,
    getRandom: getRandom
  };
})();
