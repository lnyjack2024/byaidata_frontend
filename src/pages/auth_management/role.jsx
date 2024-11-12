/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-09-30 20:42:43
 * @LastEditTime: 2024-11-11 10:16:44
 */
import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import moment from 'moment';
import './role.css'
import { reqGetRoleDatas } from '../../api/index'

const column = [
  // {
  //   title: 'ID',
  //   dataIndex: 'id',
  // },
  {
    title: '角色名',
    dataIndex: 'name',
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    render:(create_time)=>{
      return (
        moment(create_time).format('YYYY-MM-DD HH:mm:ss')
      )
    }
  },
  // {
  //   title: '授权时间',
  //   dataIndex: 'create_time',
  //   render:(create_time)=>{
  //     return (
  //       moment(create_time).format('YYYY-MM-DD HH:mm:ss')
  //     )
  //   }
  // },
  // {
  //   title: '授权人',
  //   dataIndex: 'role',
  // }
]
export default function Role() {
  const [ data, setData ] = useState([])

  useEffect(() => {
    getTableData()
  },[])

  const getTableData = async () => {
    const reqData = await reqGetRoleDatas()
      setData(reqData.data)
  }
  
  return (
    <div className='role'>
      {/* <div className='flex-box'>
        <Form
          layout='inline'
          onFinish={hangFinish}
        >
          <Form.Item name="keyword">
            <Input placeholder='请输入角色名'/>
          </Form.Item>
          <Form.Item name="keyword">
            <Button type='primary' htmlType='submit' icon={<SearchOutlined />}> 查询 </Button>
          </Form.Item>
        </Form>
      </div> */}
      <Table columns={ column } dataSource={ data } rowKey={ data => data.id }/>
    </div>
  )
}
