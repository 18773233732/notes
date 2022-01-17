# CSS盒模型

完整的CSS盒模型应用于块级盒子，内联盒子只使用盒模型中定义的部分内容。模型定义了盒的每个部分——margin，border，padding，and content——合在一起就可以创建我们在页面上看到的内容。为了增加一些额外的复杂性，有一个标准的和替代（IE）的盒模型。 

## 标准盒模型

在标准模型中，如果你给盒设置width和height，实际设置的是content box。padding和border再加上设置的宽高一起决定整个盒子的大小。

 ![Showing the size of the box when the standard box model is being used.](https://mdn.mozillademos.org/files/16559/standard-box-model.png) 

 margin不计入实际大小——当然，它会影响盒子在页面所占空间，但是影响的是盒子外部空间。盒子的范围到边框为止——不会延伸到margin。 

## 替代（IE）盒模型

你可能会认为盒子的大小还要加上边框和内边距，这样很麻烦，而且你的想法是对的！因为这个原因，css还有一个替代盒模型。使用这个模型，所有宽度都是可见宽度，所以内容宽度是该宽度减去边框和填充部分。使用上面相同的样式得到（width= 350px，height=150px）。

 ![Showing the size of the box when the alternate box model is being used.](https://mdn.mozillademos.org/files/16557/alternate-box-model.png) 