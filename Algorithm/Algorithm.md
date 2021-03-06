## 算法复杂度

执行效率是算法一个非常重要的考量指标，而时间复杂度和空间复杂度则是衡量算法代码的执行效率。

## 大 `O` 表示法

`T(n) = O(f(n))`

1. `T(n)` 表示代码的执行时间
2. `n` 表示数据的规模
3. `f(n)` 表示每行代码执行的次数总和，因为这是一个公式，所以用 `f(n)` 表示
4. 公式中的 `O` 表示代码的执行时间 `T(n)` 与 `f(n)` 表达式成正比

## 时间复杂度分析

只关注循环执行次数最多的一段代码
大 `O` 复杂度表示方法只是表示一种变化趋势，通常可忽略掉公式中的常量、低阶、系数，只需记录最大阶的量级即可。
加法法则：总复杂度等于量级最大的那段代码的复杂度
乘法法则：嵌套代码的复杂度等于嵌套内外代码复杂度的乘积

## 常见时间复杂度分析

`O(1) < O(logn) < O(n) < O(nlogn) < O(n^2) < O(n^3) < O(2^n) < O(n!) < O(n^k)
`

## 空间复杂度分析

算法的空间复杂度通过计算算法所需的存储空间实现，算法空间复杂度的计算公式记着：`S(n)=O(f(n))`

1. `n` 为数据的规模
2. `f(n)` 为语句关于 `n` 所占存储空间的函数

## 二分插入排序

```javascript
function DichotomySort(array) {
	for (let i = 0; i < array.length; i++) {
		let start = 0,
			end = i - 1,
			mid = 0;
		let temp = array[i];
		while (start <= end) {
			mid = Math.floor((start + end) / 2);
			if (temp < array[mid]) {
				end = mid - 1;
			} else {
				start = mid + 1;
			}
		}
		for (let j = i - 1; j > end; j--) {
			array[j + 1] = array[j];
		}
		array[end + 1] = temp;
	}
	return array;
}

let array = [1, 3, 2, 5, 4, 7, 6];
console.log(DichotomySort(array));
```