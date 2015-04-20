# createClass

createClass - easy way to use the classes in JavaScript.


## Examples

See more examples in the tests.


### Simple

    var SomeClass = createClass({
      myProperties: 123,
      myMethod: function() {
        return this.myProperties;
      }
    });

    var obj = new SomeClass;

    obj.myProperties; // 123
    obj.myMethod(); // 123


### Protected

Consider all the properties and methods of protected, if they start with '_'.

This is the best compromise between complexity and ease of use.

    var SomeClass = createClass({
      _myProtectedProperties: 123,
      myMethod: function() {
        return this._myProtectedProperties;
      }
    });

    var obj = new SomeClass;

    obj._myProtectedProperties; // incorrect
    obj.myMethod(); // 123


### Constructor

    var SomeClass = createClass({
      $constructor: function(arg) {
        this.myProperties = this.myProperties + arg;
      },
      myProperties: 'foo'
    });

    var obj = new SomeClass('bar');

    obj.myProperties // foobar


### Inheritance

    var ParentClass = createClass({
      getNum: function() {
        return 5;
      }
    });

    var ChildClass = createClass({
      $extends: ParentClass,
      getNum: function() {
        return this.$parent.getNum() + 1;
      }
    });

    var obj = new ChildClass;

    obj instanceof ParentClass; // true
    obj.getNum(); // 6


## Unit Tests

Start `tests/tests.htm`.


## Questions

If you have any questions, please feel free to ask on [hello@lightance.com](mailto:hello@lightance.com).