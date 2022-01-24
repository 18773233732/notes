# Redux

## 概念

Redux 是 JavaScript 状态容器，提供可预测化的状态管理。可以让你构建一致化的应用，运行于不同的环境（客户端、服务器、原生应用），并且易于测试。不仅于此，它还提供超爽的开发体验，比如有一个[时间旅行调试器可以编辑后实时预览](https://github.com/gaearon/redux-devtools)。 

## 介绍

### 三大动机

#### 单一数据源

整个应用的 [state](https://www.redux.org.cn/docs/Glossary.html#state) 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。

这让同构应用开发变得非常容易。来自服务端的 state 可以在无需编写更多代码的情况下被序列化并注入到客户端中。由于是单一的 state tree，调试也变得非常容易。在开发中，你可以把应用的 state 保存在本地，从而加快开发速度。此外，受益于单一的 state tree，以前难以实现的如“撤销/重做”这类功能也变得轻而易举。 

#### State 是只读的

唯一改变 state 的方法就是触发 [action](https://www.redux.org.cn/docs/Glossary.html#action)，action 是一个用于描述已发生事件的普通对象。

这样确保了视图和网络请求都不能直接修改 state，相反它们只能表达想要修改的意图。因为所有的修改都被集中化处理，且严格按照一个接一个的顺序执行，因此不用担心 race condition 的出现。Action 就是普通对象而已，因此它们可以被日志打印、序列化、储存、后期调试或测试时回放出来。 

#### 使用纯函数来执行修改

为了描述 action 如何改变 state tree，你需要编写 [reducers](https://www.redux.org.cn/docs/Glossary.html#reducer)。

Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state。刚开始你可以只有一个 reducer ，随着应用变大，你可以把它拆成多个小的 reducers，分别独立地操作 state tree 的不同部分，因为 reducer 只是函数，你可以控制它们被调用的顺序，传入附加数据，甚至编写可复用的 reducer 来处理一些通用任务，如分页器。 

## 基础

### Action

#### 定义

**Action** 是把数据从应用（译者注：这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）传到 store 的有效载荷。它是 store 数据的**唯一**来源。一般来说你会通过 [`store.dispatch()`](https://www.redux.org.cn/docs/api/Store.html#dispatch) 将 action 传到 store。 

Action 本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 `type` 字段来表示将要执行的动作。多数情况下，`type` 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。 

#### Action 创建函数

**Action 创建函数** 就是生成 action 的方法。“action” 和 “action 创建函数” 这两个概念很容易混在一起，使用时最好注意区分。 

### Reducer

#### 定义

**Reducers** 指定了应用状态的变化如何响应 [actions](https://www.redux.org.cn/docs/basics/Actions.html) 并发送到 store 的，记住 actions 只是描述了有事情发生了这一事实，并没有描述应用如何更新 state。 

#### Action 处理

现在我们已经确定了 state 对象的结构，就可以开始开发 reducer。reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。 

`(previousState, action) => newState`

之所以将这样的函数称之为 reducer，是因为这种函数与被传入 [`Array.prototype.reduce(reducer, ?initialValue)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 里的回调函数属于相同的类型。保持 reducer 纯净非常重要。**永远不要**在 reducer 里做这些操作： 

- 修改传入参数；
- 执行有副作用的操作，如 API 请求和路由跳转；
- 调用非纯函数，如 `Date.now()` 或 `Math.random()`。

只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。

### Sotre

#### Store 的职责

- 维持应用的 state；
- 提供 [`getState()`](https://www.redux.org.cn/docs/api/Store.html#getState) 方法获取 state；
- 提供 [`dispatch(action)`](https://www.redux.org.cn/docs/api/Store.html#dispatch) 方法更新 state；
- 通过 [`subscribe(listener)`](https://www.redux.org.cn/docs/api/Store.html#subscribe) 注册监听器;
- 通过 [`subscribe(listener)`](https://www.redux.org.cn/docs/api/Store.html#subscribe) 返回的函数注销监听器。

再次强调一下 **Redux 应用只有一个单一的 store**。当需要拆分数据处理逻辑时，你应该使用 [reducer 组合](https://www.redux.org.cn/docs/basics/Reducers.html#splitting-reducers) 而不是创建多个 store。 

<<<<<<< HEAD


=======
## Connect

连接 React 组件与 Redux store。

`connect([mapStateToProps], [mapDispatchToProps], [mergeProps],[options])`

参数说明：

- `mapStateToProps(state, ownProps) : stateProps`

  这个函数允许我们将 store 中的数据作为 props 绑定到组件上。

  ```react
  const mapStateToProps = (state) => {
    return {
      count: state.count
    }
  }
  ```

  1. 这个函数的第一个参数就是 Redux 的 store，我们从中摘取了 count 属性。你不必将 state 中的数据原封不动地传入组件，可以根据 state 中的数据，动态地输出组件需要的（最小）属性。

  2. 函数的第二个参数 ownProps，是组件自己的 props。有的时候，ownProps 也会对其产生影响。

  当 state 变化，或者 ownProps 变化的时候，mapStateToProps 都会被调用，计算出一个新的 stateProps，（在与 ownProps merge 后）更新给组件。

  > 通过 `mapStateToProps` 提取数据
  >
  > mapStateToProps 用于从 store 中提取连接的组件所需要的部分数据。
  >
  > - 每次 store 状态改变时都会调用它；
  > - 接收整个存储状态，并应返回该组件所需的数据对象。
  >
  > ownProps 如果组件需要来自其自己的 props 数据来从 store 中检索数据，可以使用第二个参数定义该函数。
  >
  > ```react
  > // Todo.js
  > 
  > function mapStateToProps(state, ownProps) {
  >   const { visibilityFilter } = state
  >   // ownProps would look like { "id" : 123 }
  >   const { id } = ownProps
  >   const todo = getTodoById(state, id)
  > 
  >   // component receives additionally:
  >   return { todo, visibilityFilter }
  > }
  > 
  > // Later, in your application, a parent component renders:
  > ;<ConnectedTodo id={123} />
  > // and your component receives props.id, props.todo, and props.visibilityFilter
  > ```
  >
  > 返回值：
  >
  > - 返回的 object 的每一个字段将会作为实际组件的 props；
  > - 字段中的值将用于确定组件是否需要重新渲染。
  >
  > |                              | `(state) => stateProps`                | `(state, ownProps) => stateProps`                            |
  > | ---------------------------- | -------------------------------------- | ------------------------------------------------------------ |
  > | `mapStateToProps` runs when: | store `state` changes                  | store `state` changes or any field of `ownProps` is different |
  > | component re-renders when:   | any field of `stateProps` is different | any field of `stateProps` is different or any field of `ownProps` is different |

- `mapDispatchToProps(dispatch, ownPorps) : stateProps`

  作为传递到连接的第二个参数，mapDispatchToProps 用于将 dispatch 分派到 store。

  
>>>>>>> d1245c099075f70315f94e721eb045f5f847a5a9
