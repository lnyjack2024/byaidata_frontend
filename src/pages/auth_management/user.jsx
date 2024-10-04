/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-09-30 20:42:03
 * @LastEditTime: 2024-10-04 23:19:56
 */
import React , { useEffect } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Table } from 'antd'
import './user.css'

export default function User() {
  const handClink = () => {

  }
  const hangFinish = (e) => {
    console.log(e)
  }
  useEffect(() => {

  },[])

  const column = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  const data = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  return (
    <div className='user'>
      <div className='flex-box'>
        <Button type='primary' onClick={() => handClink('add')} style={{marginLeft:'1%'}}> + 新增 </Button>
        <Form
          layout='inline'
          onFinish={hangFinish}
        >
          <Form.Item name="keyword">
            <Input placeholder='请输入操作员'/>
          </Form.Item>
          <Form.Item name="keyword">
            <Button type='primary' htmlType='submit' icon={<SearchOutlined />}> 查询 </Button>
          </Form.Item>
        </Form>
      </div>
      <Table columns={ column } dataSource={ data } rowKey={ data => data.key }/>
    </div>
  )
}
