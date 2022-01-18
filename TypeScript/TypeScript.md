# TypeScript

## 基础类型

- 布尔值 boolean

- 数字 number

- 字符串 string

- 数组 Array

- 元组 tuple

  元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。比如，你可以定义一对值分别为 `string` 和 `number` 类型的元组。 

- 枚举 enum

  `enum` 类型是对 JavaScript 标准数据类型的一个补充。像 C# 等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。

- any

  有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 

- Void

  某种程度上来说，`void` 类型像是与 `any` 类型相反，它表示没有任何类型。当一个函数没有返回值时，你通常会见到其返回值类型是 `void`。

- null 和 undefined

  TypeScript 里，`undefined` 和 `null` 两者各自有自己的类型分别叫做 `undefined` 和 `null`。和 `void` 相似，它们的本身的类型用处不是很大。默认情况下 `null` 和 `undefined` 是所有类型的子类型。 就是说你可以把 `null` 和 `undefined` 赋值给 `number` 类型的变量。 

- never

  `never` 类型表示的是那些永不存在的值的类型。例如， `never` 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型；变量也可能是 `never` 类型，当它们被永不为真的类型保护所约束时。`never` 类型是任何类型的子类型，也可以赋值给任何类型；然而，*没有*类型是 `never` 的子类型或可以赋值给 `never` 类型（除了 `never` 本身之外）。即使 `any` 也不可以赋值给 `never`。

- object

  `object` 表示非原始类型，也就是除 `number`，`string`，`boolean`，`symbol`，`null` 或 `undefined` 之外的类型。 

### 类型断言

有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。              

通过*类型断言*这种方式可以告诉编译器，“相信我，我知道自己在干什么”。类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。它没有运行时的影响，只是在编译阶段起作用。TypeScript会假设你，程序员，已经进行了必须的检查。                

类型断言有两种形式。其一是“尖括号”语法：                

```typescript
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```

另一个为 `as` 语法：

```typescript
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```

当你在 TypeScript 里使用 JSX 时，只有 `as` 语法断言是被允许的。