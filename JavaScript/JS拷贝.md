# 浅拷贝和深拷贝

## 浅拷贝

如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址。

### Object.assign()

Object.assign()方法可以把任意多个的原对象自身的可枚举属性拷贝给目标对象，然后返回该目标对象。

```javascript
let myObj = {
	name: 'Mr.Yao'
};
let yourObj = {
	age: 22
};
let targetObj = Object.assign({}, myObj, yourObj);
console.log(targetObj)
```

### 展开运算符...

```javascript
let myObj = {
	name: 'Mr.Yao'
};
let yourObj = {
	age: 22
};
let targetObj = {...myObj, ...yourObj}
console.log(targetObj)
```

### Array.prototype.concat()

```javascript
let myArray = [1, 2, 3];
let yourArray = [3, 4, 5];
let targetArray = Array.prototype.concat.call([], myArray, yourArray);
console.log(targetArray)
```

### Array.prototype.slice()

```javascript
let myArray = [1, 2, 3];
let targetArray = myArray.slice();
console.log(targetArray)
```

### 自定义函数

```javascript
function clone(target, source) {
	for (let key in source) {
		if (typeof source[key] !== 'object') {
			target[key] = source[key];
		} else {
			let type = Object.prototype.toString.call(source[key]).toLowerCase().split(' ')[1].slice(0, -1);
			if(type === "object") {
				target[key] = {};
			} else {
				target[key] = [];
			}
			clone(target[key], source[key]);
		}
	}
}
let target = {};
let source = { 
	name: 'Mr.Yao',
	info: {
		age: 22,
		work: 'student',
		array: [1, 2, [3, 4]]
	}
};
clone(target, source);
console.log(target['info']['array'][2])
```

## 深拷贝

将一个对象从内存中完整的拷贝一份出来，从堆内存中开辟一个新的区域存放新对象。