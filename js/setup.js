'use strict';

var WIZARD_NUMBER = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var setupOpen = document.querySelector('.setup-open');
var userDialog = document.querySelector('.setup');
var setupClose = userDialog.querySelector('.setup-close');
var setupUserName = userDialog.querySelector('.setup-user-name');
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var fireballDiv = document.querySelector('.setup-fireball-wrap');
var inputWizardCoat = document.querySelector('input[name="coat-color"]');
var inputWizardEyes = document.querySelector('input[name="eyes-color"]');
var inputFireball = document.querySelector('input[name="fireball-color"]');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

/**
 *Выбирает случайный элемент массива
 *@param {Array} array - исходный массив
 *@return {*} - случайный элемент массива
*/
var getArrayElement = function (array) {
  var elementIndex = Math.round((Math.random() * (array.length - 1)));
  var randomElement = array[elementIndex];
  return randomElement;
};

/**
*Генерирует волшебников
*@param {number} wizardsNumber - количество необходимых волшебников
*@return {Array} - массив с волшебниками
*/
var generateWizards = function (wizardsNumber) {
  var arrayOfWizards = [];
  for (var i = 0; i < wizardsNumber; i++) {
    var wizardObject = {
      name: getArrayElement(WIZARD_NAMES) + ' ' + getArrayElement(WIZARD_SURNAMES),
      coatColor: getArrayElement(WIZARD_COATS),
      eyesColor: getArrayElement(WIZARD_EYES)
    };
    arrayOfWizards.push(wizardObject);
  }
  return arrayOfWizards;
};

/**
*Создаёт волшебника на основе шаблона
*@param {Array} wizard - массив с волшебником
*@return {*}
*/
var createWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

/**
*Отрисовывает волшебников
*@param {Array} wizardsArray - массив с волшебниками
*/
var renderWizards = function (wizardsArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizardsArray.length; i++) {
    fragment.appendChild(createWizard(wizardsArray[i]));
  }
  similarListElement.appendChild(fragment);
};

renderWizards(generateWizards(WIZARD_NUMBER));
userDialog.querySelector('.setup-similar').classList.remove('hidden');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (evt.target === setupUserName) {
      evt.stopPropogation();
    }
    closePopup();
  }
};

/**
*Открывает попап
*/
var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};


/**
*Закрывает попап
*/
var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});


setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupUserName.addEventListener('invalid', function () {
  if (setupUserName.validity.tooShort) {
    setupUserName.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (setupUserName.validity.tooLong) {
    setupUserName.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (setupUserName.validity.valueMissing) {
    setupUserName.setCustomValidity('Обязательное поле');
  } else {
    setupUserName.setCustomValidity('');
  }
});

/**
*Генерирует цвет мантии мага
*/
var onWizardCoatClick = function () {
  var wizardCoatColor = getArrayElement(WIZARD_COATS);
  wizardCoat.style.fill = wizardCoatColor;
  inputWizardCoat.value = wizardCoatColor;
};

wizardCoat.addEventListener('click', function () {
  onWizardCoatClick();
});

/**
*Генерирует цвет глаз мага
*/
var onWizardEyesClick = function () {
  var wizardEyesColor = getArrayElement(WIZARD_EYES);
  wizardEyes.style.fill = wizardEyesColor;
  inputWizardEyes.value = wizardEyesColor;
};

wizardEyes.addEventListener('click', function () {
  onWizardEyesClick();
});

/**
*Генерирует цвет фаербола
*/
var onFireballClick = function () {
  var fireballColor = getArrayElement(FIREBALL_COLOR);
  fireballDiv.style.background = fireballColor;
  inputFireball.value = fireballColor;
};

fireballDiv.addEventListener('click', function () {
  onFireballClick();
});
