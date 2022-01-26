# Eslint

## extends

属性值：

- 指定配置的字符串(配置文件的路径、可共享配置的名称、eslint:recommended 或 eslint:all)。
- 字符串数组：每个配置继承它前面的配置。

它可以是一个eslint **配置文件的路径**，也可以是我们下载的 **npm包或者插件** 的名称，亦或者是 **eslint推荐** 的一些风格例如eslint:recommended 或 eslint:all。 当它是 **数组** 的时候，相当于是这些配置文件的集合，只不过后面相同名称的配置会覆盖之前的配置。

简单解释就是把我们写的eslint规则抽出来，发布一个npm包供大家下载使用,通常输出的是一个配置对象。

以 **eslint-config** 开头的安装包，例如eslint-config-standard可以省略前面的 **eslint-config** 。

## plugins

ESLint 支持使用第三方插件。在使用插件之前，你必须使用  **npm 安装** 它。在配置文件里配置插件时，可以使用 plugins 关键字来存放插件名字的列表。插件名称可以省略  **eslint-plugin-**  前缀。 

##  有两种方法避免 rules 与 Prettier 产生冲突 

第一种方法是对于 Prettier 中所有的配置，ESLint 都进行**避让**。举个例子：Prettier 可以设置是否每句话后面都加分号。ESLint 进行避让的方法是**不检查**，也就是加或者不加都不报错，完全不校验，这样就完美的避免了与 Prettier 无论怎么设置，都不会发生冲突。官方有推荐的对应 extends 包。 

```javascript
yarn add eslint-config-prettier -D
// .eslintrc.js
module.exports = {
  //...
  extends: ['prettier'],
  plugins: [],
  rules: {},
  // ...
};
```

有的同学可能受不了格式错误不提示，所以希望在控制台里看到对应的标红，在控制台里看到编译失败、警告。这时候就可以使用 plugins 。

```javascript
yarn add eslint-plugin-prettier
// .eslintrc.js
module.exports = {
  //...
  extends: [],
  plugins: ['prettier'],
  rules: {
    "prettier/prettier": "error",
  },
  //...
};
```

