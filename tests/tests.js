// QUnit case, http://qunitjs.com/
module('createClass');

test('simple', function(){
  var SomeClass = createClass();

  ok(SomeClass instanceof Function);

  var obj = new SomeClass;

  ok(obj instanceof SomeClass);
});

test('properties', function(){
  var SomeClass = createClass({
    myProperties: 123
  });

  var obj = new SomeClass;

  equal(obj.myProperties, 123);
});

test('method', function(){
  var SomeClass = createClass({
    myProperties: 123,
    myMethod: function(){
      return this.myProperties;
    }
  });

  var obj = new SomeClass;

  equal(obj.myMethod(), 123);
});

test('constructor', function(){
  var SomeClass = createClass({
    $constructor: function(arg){
      this.myProperties = this.myProperties + arg;
    },
    myProperties: 'foo'
  });

  var obj = new SomeClass('bar');

  equal(obj.myProperties, 'foobar');
});

test('inheritance', function(){
  var BaseClass = createClass();

  var ParentClass = createClass({
    $extends: BaseClass
  });

  var ChildClass = createClass({
    $extends: ParentClass
  });

  var obj = new ChildClass;

  ok(obj instanceof ChildClass);
  ok(obj instanceof ParentClass);
  ok(obj instanceof BaseClass);
});

test('inheritance 2', function(){
  var BaseClass = createClass({
    getNum: function(){
      return 5;
    }
  });

  var ParentClass = createClass({
    $extends: BaseClass,
    getNum: function(){
      return this.$parent.getNum() + 1;
    }
  });

  var ChildClass = createClass({
    $extends: ParentClass,
    getNum: function(){
      return this.$parent.getNum() + 2;
    }
  });

  var baseObj = new BaseClass;
  var parentObj = new ParentClass;
  var childObj = new ChildClass;

  equal(baseObj.getNum(),   5);
  equal(parentObj.getNum(), 6); // 5 + 1
  equal(childObj.getNum(),  8); // 5 + 1 + 2
});

test('inheritance and constructor', function(){
  var BaseClass = createClass({
    val: null,
    $constructor: function(){
      this.val = 5;
    }
  });

  var ParentClass = createClass({
    $extends: BaseClass
  });

  var baseObj = new BaseClass;
  var parentObj = new ParentClass;

  equal(baseObj.val, 5);
  equal(parentObj.val, 5);
});

test('constructor overloading', function(){
  var BaseClass = createClass({
    val: null,
    $constructor: function(){
      this.val = 5;
    }
  });

  var ParentClass = createClass({
    $extends: BaseClass,
    $constructor: function(){
      this.$parent.$constructor();
      this.val++;
    }
  });

  var baseObj = new BaseClass;
  var parentObj = new ParentClass;

  equal(baseObj.val, 5);
  equal(parentObj.val, 6); // 5++
});