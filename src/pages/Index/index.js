import React, { Component } from "react";
import { Carousel, Flex, Grid, WingBlank } from "antd-mobile";
import axios from "axios";

import "./index.scss";

// 导入导航菜单图片
import Nav1 from "../../assets/homeImage/nav-1.png";
import Nav2 from "../../assets/homeImage/nav-2.png";
import Nav3 from "../../assets/homeImage/nav-3.png";
import Nav4 from "../../assets/homeImage/nav-4.png";

// 导航栏数据
const Navs = [
  { id: 1, img: Nav1, title: "整租", path: "/home/houseList" },
  { id: 2, img: Nav2, title: "合租", path: "/home/houseList" },
  { id: 3, img: Nav3, title: "地图找房", path: "/map" },
  { id: 4, img: Nav4, title: "去出租", path: "/rent" },
];

const ip = "http://localhost:8081";

class Index extends Component {
  state = {
    swipers: [],
    isSwiperLoaded: false,

    // 租房小组数据
    groups: [],
    // 新闻资讯列表
    news: [],
  };
  componentDidMount() {
    this.getSwipers();
    this.getGroups();
    this.getNews();
  }

  // 根据地区id获取租房小组信息
  getGroups() {
    axios
      .get(`${ip}/home/groups`, {
        params: { area: "AREA%7C88cff55c-aaa4-e2e0" },
      })
      .then((res) => {
        this.setState({ groups: [...res.data.body] });
      });
  }

  // 获取轮播图数据
  getSwipers() {
    axios.get(`${ip}/home/swiper`).then((res) => {
      // console.log(res.data.body);
      this.setState({ swipers: [...res.data.body], isSwiperLoaded: true });
    });
  }

  getNews() {
    axios
      .get(`${ip}/home/news`, {
        params: { area: "AREA%7C88cff55c-aaa4-e2e0" },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ news: [...res.data.body] });
      });
  }

  // 渲染轮播图结构
  renderSwipers() {
    return this.state.swipers.map((val) => (
      <a
        key={val.id}
        href="http://www.alipay.com"
        style={{
          display: "inline-block",
          width: "100%",
          height: 212,
        }}
      >
        <img
          src={`http://localhost:8081${val.imgSrc}`}
          alt={val.alt}
          style={{ width: "100%", verticalAlign: "top" }}
        />
      </a>
    ));
  }

  // 渲染轮播图结构
  renderNavs() {
    return Navs.map((item) => (
      <Flex.Item
        key={item.id}
        onClick={() => this.props.history.push(item.path)}
      >
        <img src={item.img} alt="" />
        <div className="sub">{item.title}</div>
      </Flex.Item>
    ));
  }

  // 渲染最新资讯
  renderNews() {
    return this.state.news.map((item) => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img className="img" src={ip + item.imgSrc} alt="" />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ));
  }

  render() {
    return (
      <div className="index">
        {/* 轮播图 */}
        <div className="swiper">
          {this.state.isSwiperLoaded ? (
            <Carousel className="carousel" autoplay infinite>
              {this.renderSwipers()}
            </Carousel>
          ) : (
            ""
          )}
        </div>

        {/* 导航菜单 */}
        <Flex className="nav">{this.renderNavs()}</Flex>

        {/* 租房小组 */}
        <div className="group">
          <h3 className="group-title">
            租房小组<span className="more">更多</span>
          </h3>

          <Grid
            data={this.state.groups}
            columnNum={2}
            square={false}
            hasLine={false}
            renderItem={(item) => (
              <Flex className="group-item" justify="around" key={item.id}>
                <div className="desc">
                  <p className="title">{item.title}</p>
                  <span className="info">{item.desc}</span>
                </div>
                <img src={ip + item.imgSrc} alt="" />
              </Flex>
            )}
          />
        </div>

        {/* 最新资讯 */}
        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          <WingBlank>{this.renderNews()}</WingBlank>
        </div>
      </div>
    );
  }
}

export default Index;
