import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
// import { Button } from "antd-mobile";
// 导入首页和城市选择两个页面组件
import Home from "./pages/Home";
import CityList from "./pages/CityList";

function App() {
  return (
    <Router>
      <div className="App">
        {/* 配置路由 */}
        {/* 默认路由匹配时 重定向到首页 */}
        {/* component 渲染组件 render 渲染内容 */}
        <Route path="/" exact render={() => <Redirect to="/home" />}></Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/citylist" component={CityList}></Route>
      </div>
    </Router>
  );
}

export default App;
