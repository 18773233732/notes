## 不变性

```javascript
let obj = {

};
Object.defineProperty(obj, 'OBJECT_NAME', {
  value: 'Mr.Yao',
});
console.log(Object.getOwnPropertyDescriptor(obj, "OBJECT_NAME"))
/*
defineProperty 没有传参数默认都为false,
*/
```

1. 对象常量

   结合 `writable:false` 和 `configurable:false` 就可以创建一个真正的常量属性（不可修改、 重定义或者删除）：

   ```javascript
   var myObject = {};
   Object.defineProperty( myObject, "FAVORITE_NUMBER", {
   	value: 42,
   	writable: false,
   	configurable: false,
   });
   ```

2. 禁止扩展

   如果你想禁止一个对象添加新属性并且保留已有属性，可以使用 `Object.prevent Extensions(..)`

   ```javascript
   var myObject = {
   	a:2
   };
   Object.preventExtensions( myObject );
   myObject.b = 3;
   myObject.b; // undefined
   ```

   在非严格模式下，创建属性 `b` 会静默失败。在严格模式下，将会抛出 `TypeError` 错误。

3. 密封

   `Object.seal(..)` 会创建一个“密封”的对象，这个方法实际上会在一个现有对象上调用 `Object.preventExtensions(..)` 并把所有现有属性标记为 `configurable:false`。

   所以，密封之后不仅不能添加新属性，也不能重新配置或者删除任何现有属性（虽然可以修改属性的值）。

4. 冻结

   `Object.freeze(..)` 会创建一个冻结对象，这个方法实际上会在一个现有对象上调用 `Object.seal(..)` 并把所有“数据访问”属性标记为 `writable:false`，这样就无法修改它们的值。

   这个方法是你可以应用在对象上的级别最高的不可变性，它会禁止对于对象本身及其任意直接属性的修改（不过就像我们之前说过的，这个对象引用的其他对象是不受影响的）。

   > 你可以“深度冻结”一个对象，具体方法为，首先在这个对象上调用 `Object.freeze(..)`，然后遍历它引用的所有对象并在这些对象上调用 `Object.freeze(..)`。但是一定要小心，因 为这样做有可能会在无意中冻结其他（共享）对象。

## 多态

多态是一个非常广泛的话题，我们现在所说的“相对”只是多态的一个方面：任何方法都可以引用继承层次中高层的方法（无论高层的方法名和当前方法名是否相同）。之所以说 “相对”是因为我们并不会定义想要访问的绝对继承层次（或者说类），而是使用相对引用 “查找上一层”。多态的另一个方面是，在继承链的不同层次中一个方法名可以被多次定义，当调用方法时 会自动选择合适的定义。

> 在传统的面向类的语言中 `super` 还有一个功能，就是从子类的构造函数中通过 `super` 可以直接调用父类的构造函数。通常来说这没什么问题，因为对于真正的类来说，构造函数是属于类的。然而，在 `JavaScript` 中恰好相反——实际 上“类”是属于构造函数的（类似 `Foo.prototype...` 这样的类型引用）。由于 `JavaScript` 中父类和子类的关系只存在于两者构造函数对应的 `.prototype` 对象中，因此它们的构造函数之间并不存在直接联系，从而无法简单地实现两者的相对引用（在 `ES6` 的类中可以通过 `super` 来“解决”这个问题，参见附录 `A`）。

## 检查“类”关系

```javascript
function Foo() {
	// ...
}
Foo.prototype.blah = ...;
var a = new Foo();
a instanceof Foo; // true
```

`instanceof` 操作符的左操作数是一个普通的对象，右操作数是一个函数。`instanceof` 回答的问题是：在 `a` 的整条 `[[Prototype]]` 链中是否有指向 `Foo.prototype` 的对象？

可惜，这个方法只能处理对象`（a）`和函数（`带 .prototype` 引用的 `Foo`）之间的关系。如果你想判断两个对象（比如 a 和 b）之间是否通过 `[[Prototype]]` 链关联，只用 `instanceof` 无法实现。

## Object.is

在 `js` 中 0 === -0，但是要区分 0 和 -0

NAN 自身不相等

```javascript

function is(x, y) {
	// 0 === -0，要区分
	// 当前情况下，只有一种情况是特殊的，即 +0 -0
	// 如果 x !== 0，则返回true
	// 如果 x === 0，则需要判断+0和-0，则可以直接使用 1/+0 === Infinity 和 1/-0 === -Infinity来进行判断
	if (x === y) {
		return x !== 0 || 1 / x === 1 / y;
	}
	// x !== y 的情况下，只需要判断是否为NaN，如果x!==x，则说明x是NaN，同理y也一样
	// x和y同时为NaN时，返回true
	return x !== x && y !== y;
}
```

