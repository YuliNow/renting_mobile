import React from "react";
import { Route } from "react-router-dom";
import News from "../News/index";
import HouseList from "../HouseList/index";
import Profile from "../Profile/index";
import Index from "../Index/index";

import { TabBar } from "antd-mobile";

// 导入自己的组件样式
import "./index.css";

// tabbar item 的所有数据
const tabItems = [
  { title: "首页", icon: "icon-ind", path: "/home" },
  { title: "找房", icon: "icon-findHouse", path: "/home/houseList" },
  { title: "资讯", icon: "icon-infom", path: "/home/news" },
  { title: "我的", icon: "icon-my", path: "/home/profile" },
];

export default class Home extends React.Component {
  // 渲染 tabbar 子元素
  renderTabbarItem() {
    return tabItems.map((item) => (
      <TabBar.Item
        title={item.title}
        key={item.title}
        icon={<i className={`iconfont ${item.icon}`} />}
        selectedIcon={<i className={`iconfont ${item.icon}`} />}
        selected={this.props.location.pathname === item.path}
        onPress={() => {
          // 路由切换
          this.props.history.push(item.path);
        }}
        data-seed="logId"
      ></TabBar.Item>
    ));
  }

  render() {
    return (
      <div className="home">
        {/* 渲染子路由 */}
        <Route exact path="/home" component={Index} />
        <Route path="/home/houseList" component={HouseList} />
        <Route path="/home/news" component={News} />
        <Route path="/home/profile" component={Profile} />
        {/* Tabbar */}
        <TabBar tintColor="#21b97a" barTintColor="white" noRenderContent={true}>
          {this.renderTabbarItem()}
        </TabBar>
      </div>
    );
  }
}
