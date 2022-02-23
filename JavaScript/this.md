# this

`this` 是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调用时的各种条件。`this` 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。

当一个函数被调用时，会创建一个活动记录（有时候也称为执行上下文）。这个记录会包含函数在哪里被调用（调用栈）、函数的调用方法、传入的参数等信息。`this` 就是记录的其中一个属性，会在函数执行的过程中用到。

## 调用位置

你可以把调用栈想象成一个函数调用链，就像我们在前面代码段的注释中所写的一样。但是这种方法非常麻烦并且容易出错。另一个查看调用栈的方法是使用浏览器的调试工具。绝大多数现代桌面浏览器都内置了开发者工具，其中包含 `JavaScript` 调试器。就本例来说，你可以在工具中给 `foo()` 函数的第一行代码设置一个断点，或者直接在第一行代码之前插入一条 ·`debugger;` 语句。运行代码时，调试器会在那个位置暂停，同时会展示当前位置的函数调用列表，这就是你的调用栈。因此，如果你想要分析 `this` 的绑定，使用开发者工具得到调用栈，然后找到栈中第二个元素，这就是真正的调用位置。

## 默认绑定

```javascript
function foo() {
	console.log( this.a );
}
var a = 2;
foo(); // 2
```

函数调用时应用了 `this` 的默认绑定，因此 `this` 指向全局对象。在代码中，`foo()` 是直接使用不带任何修饰的函数引用进行调用的，因此只能使用默认绑定，无法应用其他规则。如果使用严格模式 `strict mode`，那么全局对象将无法使用默认绑定，因此 `this` 会绑定
到 `undefined`：

```javascript
function foo() {
	"use strict";
	console.log( this.a );
}
var a = 2;
foo(); // TypeError: this is undefined
```

虽然 `this` 的绑定规则完全取决于调用位置，但是只有 `foo()` 运行在非 `strict mode` 下时，默认绑定才能绑定到全局对象；严格模式下与 `foo()` 的调用位置无关。

## 隐式绑定

```javascript
function foo() {
	console.log( this.a );
}
var obj = {
	a: 2,
	foo: foo
};
obj.foo(); // 2
```

调用位置会使用 `obj` 上下文来引用函数，因此你可以说函数被调用时 `obj` 对象“拥有” 或者“包含” 它。无论你如何称呼这个模式，当 `foo()` 被调用时，它的落脚点确实指向 `obj` 对象。当函数引用有上下文对象时， 隐式绑定规则会把函数调用中的 `this` 绑定到这个上下文对象。因为调用 `foo()` 时 `this` 被绑定到 `obj`， 因此 `this.a` 和 `obj.a` 是一样的。

对象属性引用链中只有最顶层或者说最后一层会影响调用位置。

```javascript
function foo() {
	console.log( this.a );
}
var obj2 = {
	a: 42,
  foo: foo
};
var obj1 = {
	a: 2,
	obj2: obj2
};
obj1.obj2.foo(); // 42
```

### 隐式丢失

一个最常见的 `this` 绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把 `this` 绑定到全局对象或者 `undefined` 上，取决于是否是严格模式。

```javascript
function foo() {
	console.log( this.a );
}
var obj = {
	a: 2,
	foo: foo
};
var bar = obj.foo; // 函数别名！
var a = "oops, global"; // a 是全局对象的属性
bar(); // "oops, global"
```

虽然 `bar` 是 `obj.foo` 的一个引用，但是实际上，它引用的是 `foo` 函数本身， 因此此时的 `bar()`  其实是一个不带任何修饰的函数调用，因此应用了默认绑定。

## 显式绑定

```javascript
function foo() {
	console.log( this.a );
}
var obj = {
	a:2
};
foo.call( obj ); // 2
```

通过 `foo.call(..)`，我们可以在调用 `foo` 时强制把它的 `this` 绑定到 `obj` 上。

> 如果你传入了一个原始值（字符串类型、布尔类型或者数字类型）来当作 `this` 的绑定对象，这个原始值会被转换成它的对象形式（也就是 `new String(..)`、 `new Boolean(..)` 或者 `new Number(..)`）。这通常被称为“装箱”。

### 硬绑定

```javascript
function foo() {
console.log( this.a );
}
var obj = {
a:2
};
var bar = function() {
foo.call( obj );
};
bar(); // 2
setTimeout( bar, 100 ); // 2
// 硬绑定的 bar 不可能再修改它的 this
bar.call( window ); // 2
```

创建了函数 `bar()`，并在它的内部手动调用了 `foo.call(obj)`，因此强制把 `foo` 的 `this` 绑定到了 `obj`。无论之后如何调用函数 `bar`，它总会手动在 `obj` 上调用 `foo`。这种绑定是一种显式的强制绑定，因此我们称之为硬绑定。

由于 **硬绑定** 是一种非常常用的模式，所以在 **ES5** 中提供了内置的方法 `Function.prototype.bind`，它的用法如下：

```Javascript
function foo(something) {
	console.log( this.a, something );
	return this.a + something;
}
var obj = {
	a:2
};
var bar = foo.bind( obj );
var b = bar( 3 ); // 2 3
console.log( b ); // 5
```

`bind(..)` 会返回一个硬编码的新函数，它会把参数设置为 `this` 的上下文并调用原始函数。

### polyfill bind

```javascript
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== "function") {
      // 与 ECMAScript 5 最接近的
      // 内部 IsCallable 函数
      throw new TypeError("Function.prototype.bind - what is trying " + "to be bound is not callable");
    }
    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function() {},
      fBound = function() {
        return fToBind.apply(
          (
            this instanceof fNOP &&
            oThis ? this : oThis
          ),
          aArgs.concat(
            Array.prototype.slice.call(arguments)
          )
        );
      }
  }
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};
```

## new绑定

使用 `new` 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。

1. 创建（或者说构造）一个全新的对象。
2. 这个新对象会被执行 `[[ 原型 ]]` 连接。
3. 这个新对象会绑定到函数调用的 `this`。
4. 如果函数没有返回其他对象，那么 `new` 表达式中的函数调用会自动返回这个新对象。

## 优先级

`new` 绑定 > 显式绑定 > 隐式绑定 > 默认绑定

## 判断 `this`

1. 函数是否在 `new` 中调用（new 绑定）？如果是的话 `this` 绑定的是新创建的对象。

   `var bar = new foo()`

2. 函数是否通过` call、 apply`（显式绑定） 或者硬绑定调用？ 如果是的话，`this` 绑定的是指定的对象。
`var bar = foo.call(obj2)`
3. 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，`this` 绑定的是那个上下文对象。
`var bar = obj1.foo()`
4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 `undefined`，否则绑定到全局对象。
`var bar = foo()`

## 软绑定

```Javascript
if (!Function.prototype.softBind) {
  Function.prototype.softBind = function(obj) {
    var fn = this;
    // 捕获所有 curried 参数
    var curried = [].slice.call(arguments, 1);
    var bound = function() {
      return fn.apply(
        (!this || this === (window || global)) ? obj : this,
        curried.concat.apply(curried, arguments)
      );
    };
    bound.prototype = Object.create(fn.prototype);
    return bound;
  };
}
```

## 箭头函数

箭头函数并不是使用 `function` 关键字定义的，而是使用被称为“胖箭头” 的操作符 `=>` 定义的。箭头函数不使用 `this` 的四种标准规则，而是根据外层（函数或者全局）作用域来决定 `this`。

```javascript
function foo() {
  // 返回一个箭头函数
  return (a) => {
    //this 继承自 foo()
    console.log( this.a );
  };
}
var obj1 = {
	a:2
};
var obj2 = {
	a:3
};
var bar = foo.call( obj1 );
bar.call( obj2 ); // 2, 不是 3 ！
```

