# DOM (JavaScript 高级程序设计)

## 元素尺寸

### 偏移尺寸

第一组属性涉及偏移尺寸 `（offset dimensions）`，包含元素在屏幕上占用的所有视觉空间。元素在页面上的视觉空间由其高度和宽度决定，包括所有内边距、滚动条和边框（但不包含外边距）。以下 4 个属性用于取得元素的偏移尺寸。

1. `offsetHeight`，元素在垂直方向上占用的像素尺寸，包括它的高度、水平滚动条高度（如果可见）和上、下边框的高度。
2. `offsetLeft`，元素左边框外侧距离包含元素左边框内侧的像素数。
3. `offsetTop`，元素上边框外侧距离包含元素上边框内侧的像素数。
4. `offsetWidth`，元素在水平方向上占用的像素尺寸，包括它的宽度、垂直滚动条宽度（如果可见）和左、右边框的宽度。

其中，`offsetLeft` 和 `offsetTop` 是相对于包含元素的，包含元素保存在 `offsetParent` 属性中。`offsetParent` 不一定是 `parentNode`。比如，`<td>` 元素的 `offsetParent` 是作为其祖先的 `<table>` 元素，因为 `<table>` 是节点层级中第一个提供尺寸的元素。图 `16-1` 展示了这些属性代表的不同尺寸。

![1644495555673](.\assets\1644495555673.png)

要确定一个元素在页面中的偏移量，可以把它的 `offsetLeft` 和 `offsetTop` 属性分别与 `offsetParent`
的相同属性相加，一直加到根元素。下面是一个例子：

```javascript
// 计算 actualLeft
function getElement(element) {
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent;
  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }
  return actualLeft;
}
```

```javascript
// 计算 actualTop
function getElementTop(element) {
  let actualTop = element.offsetTop;
  let current = element.offsetParent;
  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  return actualTop;
}
```

这两个函数使用 `offsetParent` 在 `DOM` 树中逐级上溯，将每一级的偏移属性相加，最终得到元素的实际偏移量。对于使用 `CSS` 布局的简单页面，这两个函数是很精确的。而对于使用表格和内嵌窗格的页面布局，它们返回的值会因浏览器不同而有所差异，因为浏览器实现这些元素的方式不同。一般来说，包含在 `<div>` 元素中所有元素都以 `<body>` 为其 `offsetParent`，因此 `getElementleft()` 和 `getElementTop()` 返回的值与 `offsetLeft` 和 `offsetTop` 返回的值相同。

> 注意 所有这些偏移尺寸属性都是只读的，每次访问都会重新计算。因此，应该尽量减少查询它们的次数。比如把查询的值保存在局量中，就可以避免影响性能。

## 客户端尺寸

元素的客户端尺寸`（client dimensions）`包含元素内容及其内边距所占用的空间。客户端尺寸只有两个相关属性：`clientWidth` 和 `clientHeight`。其中，`clientWidth` 是内容区宽度加左、右内边距宽度，`clientHeight` 是内容区高度加上、下内边距高度。图 `16-2` 形象地展示了这两个属性。

![1644496479325](.\assets\1644496479325.png)

客户端尺寸实际上就是元素内部的空间，因此不包含滚动条占用的空间。这两个属性最常用于确定浏览器视口尺寸，即检测 `document.documentElement` 的 `clientWidth` 和 `clientHeight`。这两个属性表示视口（ `<html>` 或 `<body>` 元素）的尺寸。

> 注意 与偏移尺寸一样，客户端尺寸也是只读的，而且每次访问都会重新计算。

## 滚动尺寸

最后一组尺寸是滚动尺寸`（scroll dimensions）`，提供了元素内容滚动距离的信息。有些元素，比如 `<html>`无须任何代码就可以自动滚动，而其他元素则需要使用 `CSS` 的 `overflow` 属性令其滚动。滚动尺寸相关的属性有如下 4 个。

1. `scrollHeight`，没有滚动条出现时，元素内容的总高度。

2. `scrollLeft`，内容区左侧隐藏的像素数，设置这个属性可以改变元素的滚动位置。

3. `scrollTop`，内容区顶部隐藏的像素数，设置这个属性可以改变元素的滚动位置。

4. `scrollWidth`，没有滚动条出现时，元素内容的总宽度。

图 `16-3` 展示了这些属性的含义。

![1644496852503](.\assets\1644496852503.png)

`scrollWidth` 和 `scrollHeight` 可以用来 aa 确定给定元素内容的实际尺寸。例如，`<html>` 元素是浏览器中滚动视口的元素。因此，`document.documentElement.scrollHeight` 就是整个页面垂直方向的总高度。

`scrollWidth` 和 `scrollHeight` 与 `clientWidth` 和 `clientHeight` 之间的关系在不需要滚动的文档上是分不清的。如果文档尺寸超过视口尺寸，则在所有主流浏览器中这两对属性都不相等，`scrollWidth` 和 `scollHeight` 等于文档内容的宽度，而 `clientWidth` 和 `clientHeight` 等于视口的大小。

`scrollLeft` 和 `scrollTop` 属性可以用于确定当前元素滚动的位置，或者用于设置它们的滚动位置。元素在未滚动时，这两个属性都等于 `0`。如果元素在垂直方向上滚动，则 `scrollTop` 会大于 `0`，表示元素顶部不可见区域的高度。如果元素在水平方向上滚动，则 `scrollLeft` 会大于 `0`，表示元素左侧不可见区域的宽度。因为这两个属性也是可写的，所以把它们都设置为 `0` 就可以重置元素的滚动位置。

下面这个函数检测元素是不是位于顶部，如果不是则把它滚动回顶部：

```javascript
function scrollToTop(element) {
  if (element.scrollTop != 0) {
    element.scrollTop = 0;
  }
}
```

这个函数使用 `scrollTop` 获取并设置值。

## 确定元素尺寸

浏览器在每个元素上都暴露了 `getBoundingClientRect()` 方法，返回一个`DOMRect` 对象，包含 `6` 个属性：`left`、`top`、`right`、`bottom`、`height` 和 `width`。这些属性给出了元素在页面中相对于视口的位置。图 `16-4` 展示了这些属性的含义。

![1644497629755](.\assets\1644497629755.png)
