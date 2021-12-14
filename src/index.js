import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// 导入 antd-mobile css样式
import "antd-mobile/dist/antd-mobile.css";

// 导入字体图标库
import "./assets/fonts/iconfont.css";

// 自定义全局样式应放在组件库后面导入 防止覆盖
import "./index.css";

ReactDOM.render(<App />, document.getElementById("root"));
