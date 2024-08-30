/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-08-20 17:15:33
 * @LastEditTime: 2024-08-30 14:25:28
 */

import React, { Component }  from 'react';
import { Flex, Layout } from 'antd';

import HeaderNav from '../../components/header'
import LeftNav from '../../components/left-nav'

const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 90,
  paddingInline: 48,
  lineHeight: '64px',
  // backgroundColor: '#4096ff',
};
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  // backgroundColor: '#0958d9',
};
const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  // backgroundColor: '#1677ff',
};
const footerStyle = {
  textAlign: 'center',
  color: 'black',
};
const layoutStyle = {
  overflow: 'hidden',
  width: 'calc(50% - 8px)',
  maxWidth: '100%',
  height:'995px',
};


export default class Home extends Component {
  render() {
    return (
          <Flex  >
            <Layout style={layoutStyle}>
              <Sider width="13%" style={siderStyle}>
                <LeftNav />
              </Sider>
              <Layout>
                <Header style={headerStyle}>
                  <HeaderNav/>
                </Header>
                <Content style={contentStyle}>Content</Content>
                <Footer style={footerStyle}>推荐使用谷歌浏览器、欢迎使用本原智数系统管理...</Footer>
              </Layout>
            </Layout>
          </Flex>
    )
  }
}