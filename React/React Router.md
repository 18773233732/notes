# React Router

## 安装

npm

`npm install react-router-dom@6`

yarn

`yarn add react-router@6`

## 配置路由（Configuring Routes）

```react
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
// import your route components too

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="teams" element={<Teams />}>
          <Route path=":teamId" element={<Team />} />
          <Route path="new" element={<NewTeamForm />} />
          <Route index element={<LeagueStandings />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
```

## 导航（Navigation）

使用`Link`组件或者`useNavgate`钩子来改变URL。

```react
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="about">About</Link>
      </nav>
    </div>
  );
}
```

```react
import { useNavigate } from "react-router-dom";

function Invoices() {
  let navigate = useNavigate();
  return (
    <div>
      <NewInvoiceForm
        onSubmit={async event => {
          let newInvoice = await createInvoice(
            event.target
          );
          navigate(`/invoices/${newInvoice.id}`);
        }}
      />
    </div>
  );
}
```

## 读取URL参数（Reading URL Parameters）

在路由路径中使用语法`:style`或者`useParams()`获得

```react
import { Routes, Route, useParams } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        path="invoices/:invoiceId"
        element={<Invoice />}
      />
    </Routes>
  );
}

function Invoice() {
  let params = useParams();
  return <h1>Invoice {params.invoiceId}</h1>;
}
```

```react
function Invoice() {
  let { invoiceId } = useParams();
  let invoice = useFakeFetch(`/api/invoices/${invoiceId}`);
  return invoice ? (
    <div>
      <h1>{invoice.customerName}</h1>
    </div>
  ) : (
    <Loading />
  );
}
```

## 嵌套路由

这是React Router最强大的功能之一，因此您不必处理复杂的布局代码。绝大多数布局都与URL的片段耦合，而React Router完全接受了这一点。路由可以相互嵌套，它们的路径也会嵌套（子继承父）。

```react
function App() {
  return (
    <Routes>
      <Route path="invoices" element={<Invoices />}>
        <Route path=":invoiceId" element={<Invoice />} />
        <Route path="sent" element={<SentInvoices />} />
      </Route>
    </Routes>
  );
}
```

此路由配置定义了三个路由路径：

- `"/invoices"`
- `"/invoices/sent"`
- `"/invoices/:invoiceId"`

当URL是`"/invoices/sent"`组件树时：

```react
<App>
  <Invoices>
    <SentInvoices />
  </Invoices>
</App>
```

当URL为时"/invoices/123"，组件树将：

```react
<App>
  <Invoices>
    <Invoice />
  </Invoices>
</App>
```

## 默认路由

可以在路由层次结构的任何级别拥有一个默认路由，当父级匹配但其他子级都不匹配时，该默认路由将呈现。 

```react
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Activity />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="activity" element={<Activity />} />
      </Route>
    </Routes>
  );
}
```

## 相对路由

相对`<Linkto>`值（不以a开头/）是相对于渲染它们的路径的路径。下面的两个链接将链接到/dashboard/invoices和/dashboard/team因为它们在`<Dashboard>`。当更改父级的URL或重新排列组件时，这非常好，因为所有链接都会自动更新。

```react
import {
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";

function Home() {
  return <h1>Home</h1>;
}

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="invoices">Invoices</Link>{" "}
        <Link to="team">Team</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

function Invoices() {
  return <h1>Invoices</h1>;
}

function Team() {
  return <h1>Team</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard" element={<Dashboard />}>
        <Route path="invoices" element={<Invoices />} />
        <Route path="team" element={<Team />} />
      </Route>
    </Routes>
  );
}
```

## "NotFound"路由

当没有其他路由与URL匹配时，可以使用path="*"。此路由将匹配任何URL，但具有最弱的优先级，因此路由器仅在没有其他路由匹配时才会选择它。

```react
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```

## 子Routes

可以在`<Routes>`任何需要的地方渲染元素，包括在另一个的组件树深处`<Routes>`。这些将与任何其他一样工作`<Routes>`，除了它们将自动构建在呈现它们的路线的路径上。如果您这样做，请确保在父路由路径的末尾放置一个*。否则，当URL长于父路由的路径时，父路由将与URL不匹配，并且您的后代`<Routes>`将永远不会出现。

```react
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}

function Dashboard() {
  return (
    <div>
      <p>Look, more routes!</p>
      <Routes>
        <Route path="/" element={<DashboardGraphs />} />
        <Route path="invoices" element={<InvoiceList />} />
      </Routes>
    </div>
  );
}
```

