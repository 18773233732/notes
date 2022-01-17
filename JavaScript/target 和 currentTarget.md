# target 和 currentTarget

## target

对触发事件的对象的引用（即它标识事件发生的元素）。

## currentTarget

当事件遍历DOM时，标识事件的当前目标。它总会引用事件处理程序附加到的元素，this指向currentTarget。