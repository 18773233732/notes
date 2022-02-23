# 弹性盒子

 弹性盒子是一种用于按行或按列布局元素的一维布局方法。元素可以膨胀以填充额外的空间, 收缩以适应更小的空间。 

## flex模型

 ![flex_terms.png](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox/flex_terms.png) 

**主轴（main axis）**是沿着flex元素放置的方向延伸的轴（比如页面上的横向的行、纵向的列）。该轴的开始和结束被称为 **main start**和**main end**。

**交叉轴（cross axis）**是垂直于flex元素放置方向的轴。该轴的开始和结束被称为**cross start**和**cross end**。

## flex属性

### 语法

`flex: none | auto | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]`

如果flex的属性只有一个值：

1. 如果是数值则表示**flex-grow**，此时**flex-shrink**值为1，**flex-basis**的值为0%。
2. 如果是长度值则表示**flex-basis**，此时**flex-grow**值为1，**flex-shrink**值为1。

如果flex的属性有两个值，第一个值一定是**flex-grow**

1. 如果第2个值是数值则表示**flex-shrink**，此时**flex-basis**值为0%。
2. 如果第2个值是长度值则表示**flex-basis**，此时**flex-shrink**值为0。

如果flex的属性有三个值则长度值表示**flex-basis**，其余两个数值分别表示**flex-grow**和**flex-shrink**。

### 关键字属性值

`initial`等同于设置`flex: 0 1 auto`

`auto`等同于`flex: 1 1 auto`

`none`等同于`flex: 0 0 auto`

