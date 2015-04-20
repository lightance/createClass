/**
 * Classes in JavaScript.
 *
 * Функция создаёт новый класс(функцию-конструктор) по параметрам.
 *
 * See more examples in the tests.
 *
 * @function
 *
 * @param {Object} options Настройки класса.
 * @param {mixed} options.myProperties Одно из свойств создаваемого класса.
 * @param {Function} options.myMethod Один из методов создаваемого класса.
 * @param {Function} options.$constructor Конструктор создаваемого класса.
 * @param {Function} options.$extends Родительский класс.
 * @returns {Function} Конструктор нового класса.
 *
 * @example
 *   var SomeClass = createClass({
 *     myProperties: 123,
 *     myMethod: function(){
 *       return this.myProperties;
 *     }
 *   });
 *   var obj = new SomeClass;
 *   obj.myMethod(); // 123
 *
 * @author Lightance.com
 * @license MIT License
 */
var createClass = function() {

  // При объявлении, конструктор родительского класса
  var KEYWORD_EXTENDS = '$extends';
  // При объявлении, функция конструктор
  // Внутри методов, ссылка на конструктор текущего класса
  var KEYWORD_CONSTRUCTOR = '$constructor';
  // Внутри методов, ссылка на конструктор текущего класса
  var KEYWORD_SELF = '$self';
  // Внутри методов, ссылка на конструктор родительского класса
  var KEYWORD_SUPER = '$super';
  // Внутри методов, ссылка на прототип родительского класса
  var KEYWORD_PARENT = '$parent';

  /**
   * Установка родителя для класса
   *
   * @param {Function} child Класс, которому нужно установить родителя
   * @param {Function} parent Класс родителя
   */
  var extendClass = function(child, parent) {
    var TempClass = function(){};

    // extend
    TempClass.prototype = parent.prototype;
    child.prototype = new TempClass();

    // help links
    child.prototype[KEYWORD_SUPER] = parent;
    child.prototype[KEYWORD_PARENT] = parent.prototype;
  };
  //~

  /**
   * Создание класса
   *
   * @inner
   */
  return function(options) {
    options = options || {};

    // constructor
    var constructor = options[KEYWORD_CONSTRUCTOR];
    if (!constructor) {
      if (options[KEYWORD_EXTENDS] && options[KEYWORD_EXTENDS].prototype.$constructor) {
        /** @inner */
        constructor = function(){ this.$parent.$constructor(); };
      }
      else {
        /** @inner */
        constructor = function(){};
      }
    }

    constructor.prototype[KEYWORD_SELF] = constructor;
    constructor.prototype[KEYWORD_CONSTRUCTOR] = constructor;

    // inheritance
    if (options[KEYWORD_EXTENDS]) {
      extendClass(constructor, options[KEYWORD_EXTENDS]);
    }

    // regular properties and methods
    for (var key in options) {
      if (key!=KEYWORD_CONSTRUCTOR && key!=KEYWORD_EXTENDS) {
        constructor.prototype[key] = options[key];
      }
    }

    return constructor;
  };
  //~

}();