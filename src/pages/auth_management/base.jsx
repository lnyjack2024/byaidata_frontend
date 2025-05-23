/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-10-21 16:07:49
 * @LastEditTime: 2025-01-06 13:12:44
 */
import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Popconfirm, Table, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import './service_line.css'
import { reqGetBaseDatas_, reqAddBaseDatas, reqDeleteBaseDatas } from '../../api/index'
const ServiceLine = () => {
  const [ modalType, setModalType ] = useState(0)
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ data, setData ] = useState([])
  const [ form ] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getTableData()
  },[])

  const getTableData = async () => {
    const reqData = await reqGetBaseDatas_()
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
    const result = await reqDeleteBaseDatas(e)
    if(result.status === 1){
      getTableData()
      message.info('删除成功...')
    }else{
      message.error('删除失败...')
    }
  }

  const handleOk = () => {
    form.validateFields().then( async (val)=>{
    const result = await reqAddBaseDatas(val)
    if(result.status === 1){
      setIsModalOpen(false)
      form.resetFields()
      message.info('新增成功...')
      getTableData()
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
      title: '基地',
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
      title: '操作人',
      dataIndex: 'user',
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
    <div className='service_line'>
      <div className='flex-box'>
        <Button onClick={() => handClink('add')} icon={<PlusOutlined />} style={{backgroundColor: "#000000",color:'white',marginLeft:'1%'}}> 新增 </Button>
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
            label='基地'
            name="name"
            rules={[{required:true,message:'请输入基地'}]}
          >
            <Input placeholder='请输入基地' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ServiceLine;
