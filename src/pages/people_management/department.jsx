/*
 * @Description: 部门列表
 * @Author: wangyonghong
 * @Date: 2024-09-29 15:25:05
 * @LastEditTime: 2024-10-14 15:24:34
 */
import React, { useEffect, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Popconfirm, Table, message } from 'antd'
import moment from 'moment';
import './department.css'

import { reqGetDepartmentDatas, reqAddUserDatas, reqDeleteDepartmentDatas } from '../../api/index'
const Department = () => {
  const [ modalType, setModalType ] = useState(0)
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ data, setData ] = useState([])
  const [ form ] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getTableData()
  },[])

  const getTableData = async () => {
      const reqData = await reqGetDepartmentDatas()
      setData(reqData.data)
  }

  const handClink = (type,rowData) => {
    setIsModalOpen(!isModalOpen)
    if(type === 'add'){
      setModalType(0)
    }else{ 
      setModalType(1)
    }
  }
  const handDelete = async (e) => {
    const result = await reqDeleteDepartmentDatas(e)
    if(result.status === 1){
      getTableData()
      message.info('删除成功...')
    }else{
      message.error('删除失败...')
    }
  }
  const hangFinish = async (e) => {
      const reqData = await reqGetDepartmentDatas({name:e.keyword})
      setData(reqData.data)
  }
  
  const handleOk = () => {
    form.validateFields().then( async (val)=>{
    if(val.base === undefined){
      val.base = ''
    }
    if(val.department === undefined){
      val.department = ''
    }
    const result = await reqAddUserDatas(val)
    if(result.status === 1){
      getTableData()
      setIsModalOpen(false)
      form.resetFields()
      message.info('新增成功...')
    }else{
      message.error('新增失败...')
    }
    }).catch(()=>{
      messageApi.error('参数有误...请检查!!!')
    })
  }
  const handleCancle = () => {
    setIsModalOpen(false)
    form.resetFields()
  }

  const column = [
    {
      title: '部门',
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
    {
      title: '操作',
      render:(rowData)=>{
        return (
          <div>
            <Popconfirm
              description='是否删除?'
              okText='确认'
              cancelText='取消'
              onConfirm={ () => handDelete(rowData)}
            >
              <Button type='primary' danger style={{marginLeft:'15px'}}>删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }
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
            <Input placeholder='请输入部门名称'/>
          </Form.Item>
          <Form.Item name="keyword">
            <Button type='primary' htmlType='submit' icon={<SearchOutlined />}> 查询 </Button>
          </Form.Item>
        </Form>
      </div>
      <Table columns={ column } dataSource={ data } rowKey={ data => data.id }/>
      {contextHolder}
      <Modal
        open={isModalOpen}
        title={ modalType ? '编辑' : '新增'}
        onOk={handleOk}
        onCancel={handleCancle}
        okText='确定'
        cancelText='取消'
        centered={true}
        maskClosable={false}
        width={700}
      >
        <Form
          form={form}
          labelCol={{span:3}} 
          wrapperCol={{span:15}} 
          labelAlign='left'
          style={{marginTop:'30px'}}
        >
          <Form.Item
            label='部门名称'
            name="account"
            rules={[{required:true,message:'请输入部门名称'}]}
          >
            <Input placeholder='请输入部门名称' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Department;
