# componentDidMount 同步方法和异步方法的区别：

```typescript
componentDidMount(): void { /* do something */ }

async componentDidMount(): Promise<void> {
    /* do something */
    /* You can use "await" here */
}
```

通过查看代码，可以指出以下区别:

1. async 关键字:在 typescript 中，这仅仅是一个代码标记。

   -  强制返回类型为 Promise<void> 而不是 void。如果你显式地指定返回类型为非 promise (例如: void)，typescript 会向你抛出一个错误。
   -  允许你在方法内部使用 await 关键字。

2. 返回类型从 void 更改为 Promise<void>。

   - 这意味着你现在可以这样做:

     `async someMethod(): Promise<void> {await componentDidMount();｝`

3. 现在可以在方法内部使用 await 关键字并暂时暂停其执行。

   ```typescript
   async componentDidMount(): Promise<void> {
       const users = await axios.get<string>("http://localhost:9001/users");
       const questions = await axios.get<string>("http://localhost:9001/questions");
   
       // Sleep for 10 seconds
       await new Promise(resolve => { setTimeout(resolve, 10000); });
   
       // This line of code will be executed after 10+ seconds
       this.setState({users, questions});
       return Promise.resolve();
   }
   ```

   