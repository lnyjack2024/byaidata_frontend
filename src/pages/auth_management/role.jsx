/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-09-30 20:42:43
 * @LastEditTime: 2024-12-31 18:52:48
 */
import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import moment from 'moment';
import './role.css'
import { reqGetRoleDatas } from '../../api/index'

const column = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '角色ID',
    dataIndex: 'role_id',
  },
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
  }
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
      <Table columns={ column } dataSource={ data } rowKey={ data => data.id }/>
    </div>
  )
}
