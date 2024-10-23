/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-09-30 20:34:40
 * @LastEditTime: 2024-10-23 16:10:25
 */
import React, { useEffect, useState } from 'react'
import { SearchOutlined, RedoOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Table, Select, message, Col, Row } from 'antd'
import dayjs from 'dayjs';
import './account.css'
import { reqGetAccountDatas, reqAddAccountDatas, reqGetItemDatas } from '../../api/index'
// const { RangePicker } = DatePicker;
const itemLayout = { 
  labelCol:{span:7},
  wrapperCol:{span:15} 
}
const Account = () => {
  const [ modalType, setModalType ] = useState(0)
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ data, setData ] = useState([])
  const [ table_loading, setTableLoading ] = useState(true)
  const [ form ] = Form.useForm();
  const [ form_add ] = Form.useForm();
  const [ messageApi, contextHolder ] = message.useMessage();

  useEffect(() => {
    getTableData()
  },[])

  const getTableData = async () => {
    const reqData = await reqGetAccountDatas()
      setData(reqData.data)
      setTableLoading(false)
  }

  const handClink = (type,rowData) => {
    setIsModalOpen(!isModalOpen)
    if(type === 'add'){
      setModalType(0)
    }
  }

  const hangFinish = (e) => {

  }

  const handleOk = () => {
    form_add.validateFields().then( async (val)=>{
        const result = await reqAddAccountDatas(val)
        if(result.status === 1){
          reqGetAccountDatas()
          setIsModalOpen(false)
          form.resetFields()
          getTableData()
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
    form_add.resetFields()
  }

  const handSearch = () => {
    form.validateFields().then( async (val)=>{
      const reqData = await reqGetAccountDatas(val)
      setData(reqData.data)
      setTableLoading(false)
    })
  }

  const handSearchItem = () => {
    form_add.validateFields().then( async (val)=>{
      const reqData = await reqGetItemDatas(val)
      if(reqData.data.length === 0){
        messageApi.error('请确认ID是否存在...')
        return;
      }
      const cloneData = JSON.parse(JSON.stringify(reqData.data))
      cloneData[0].start_date = dayjs(cloneData.start_date).format('YYYY-MM-DD')
      cloneData[0].delivery_date = dayjs(cloneData.delivery_date).format('YYYY-MM-DD')
      form_add.setFieldsValue(cloneData[0])
    })
  }

  const handReset = () => {
    form.resetFields()
  }
  
  const column = [
    {
      title: '项目ID',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left'
    },
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left'
    },
    {
      title: '业务线',
      dataIndex: 'base',
    },
    {
      title: '基地',
      dataIndex: 'base',
    },
    {
      title: '项目负责人',
      dataIndex: 'service_line',
    },
   
    {
      title: '项目周期',
      dataIndex: '',
    },
    {
      title: '作业日期',
      dataIndex: 'delivery_date',
      render:(delivery_date)=>{
        return (
          dayjs(delivery_date).format('YYYY-MM-DD')
        )
      }
    },
    {
      title: '交付日期',
      dataIndex: 'delivery_date',
      render:(delivery_date)=>{
        return (
          dayjs(delivery_date).format('YYYY-MM-DD')
        )
      }
    },
    {
      title: '结算类型',
      dataIndex: 'settlement_type',
      render:(text,record,index)=>{
        if(text === 'day'){
           return '包天'
        }else if(text === 'month'){
          return '包月'
        }else{
          return '计件'
        }
      }
    },
    {
      title: '项目周期',
      dataIndex: '',
    },
    {
      title: '项目状态',
      dataIndex: '',
    },
    {
      title: '结算状态',
      dataIndex: 'settlement_type',
      render:(text,record,index)=>{
        if(text === 'day'){
           return '包天'
        }else if(text === 'month'){
          return '包月'
        }else{
          return '计件'
        }
      }
    },
    {
      title: '回款状态',
      dataIndex: 'settlement_type',
      render:(text,record,index)=>{
        if(text === 'day'){
           return '包天'
        }else if(text === 'month'){
          return '包月'
        }else{
          return '计件'
        }
      }
    },
    {
      title: '对账人',
      dataIndex: 'delivery_status',
    },
    {
      title: '对账周期',
      dataIndex: 'create_time',
      render:(create_time)=>{
        return (
          dayjs(create_time).format('YYYY-MM-DD HH:mm:ss')
        )
      }
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      render:(rowData)=>{
          return (
            <div>
              <Button onClick={()=> handClink('add',rowData)}>明细</Button>&nbsp;&nbsp;
            </div>
          )
      }
    }
  ];
 
  return (
    <div className='account'>
      <div className='flex-box'>
        <Form form={form}
          className='flex-box-form'
          layout='inline'
          onFinish={hangFinish}
        >
          <Row>
            <Col span={6}>
              <Form.Item name="item_name" label="项目名称" {...itemLayout}>
                <Input placeholder='请输入项目名称'/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="base" label="基地" {...itemLayout}>
                <Select
                  placeholder='请输入基地'
                  style={{textAlign:'left'}}
                  options={[
                    {
                      value: '郑州',
                      label: '郑州',
                    },
                    {
                      value: '成都',
                      label: '成都',
                    },
                    {
                      value: '长沙',
                      label: '长沙',
                    },
                    {
                      value: '商丘',
                      label: '商丘',
                    },
                    {
                      value: '太原',
                      label: '太原',
                    },
                    {
                      value: '邯郸',
                      label: '邯郸',
                    },
                    {
                      value: '宿迁',
                      label: '宿迁',
                    },
                    {
                      value: '濮阳',
                      label: '濮阳',
                    }
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="status" label="项目状态" {...itemLayout}>
              <Select
                  placeholder='请输入项目状态'
                  style={{textAlign:'left'}}
                  options={[
                    {
                      value: '待验收',
                      label: '待验收',
                    },
                    {
                      value: '未完成',
                      label: '未完成',
                    },
                    {
                      value: '已完成',
                      label: '已完成',
                    },
                    {
                      value: '已暂停',
                      label: '已暂停',
                    }
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="business_manager" label="项目负责人" {...itemLayout}>
                <Input placeholder='请输入项目负责人'/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="reconciler" label="对账人" {...itemLayout}>
                <Input placeholder='请输入对账人'/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="delivery_status" label="结算状态" {...itemLayout}>
              <Select
                  placeholder='请输入结算状态'
                  style={{textAlign:'left'}}
                  options={[
                    {
                      value: '结算中',
                      label: '结算中',
                    },
                    {
                      value: '结算完成',
                      label: '结算完成',
                    }
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="refund_status" label="回款状态" {...itemLayout}>
              <Select
                  placeholder='请输入回款状态'
                  style={{textAlign:'left'}}
                  options={[
                    {
                      value: '未回款',
                      label: '未回款',
                    },
                    {
                      value: '部分回款',
                      label: '部分回款',
                    },
                    {
                      value: '回款完成',
                      label: '回款完成',
                    }
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item >
                <Button onClick={() => handClink('add')} style={{marginLeft:'1%'}}> + 新增 </Button>&nbsp;&nbsp;
                <Button onClick={ handReset } type='primary' htmlType='button' icon={<RedoOutlined />}> 重置 </Button>&nbsp;&nbsp;
                <Button onClick={ handSearch } type='primary' htmlType='submit' icon={<SearchOutlined />}> 查询 </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div style={{ width: '100%', height: '85%', overflow:'auto'}}>
        <Table 
          columns={ column } 
          dataSource={ data } 
          rowKey={ data => data.id }  
          scroll={{x: 'max-content'}}
          loading={table_loading}
        />
      </div>
      {contextHolder}
      <Modal
        open={isModalOpen}
        title={ modalType ? '编辑' : ''}
        onOk={handleOk}
        onCancel={handleCancle}
        okText='确定'
        cancelText='取消'
        maskClosable={false}
        width={950}
      >
        <Form
          form={form_add}
          labelCol={{span:5}} 
          wrapperCol={{span:10}} 
          style={{marginTop:'50px'}}
        >
           <Form.Item
            label='项目ID'
            name="id"
            rules={[{required:true,message:'请输入项目ID'}]}
          >
            <div style={{display:'flex'}}>
              <div style={{flex:1}}>
                <Input placeholder='请输入项目ID' style={{width:'180px'}}/>
              </div>
              <div style={{flex:1}}>
                <Button style={{width:'90px'}} onClick={ handSearchItem } type='primary' htmlType='submit' icon={<SearchOutlined />}> 查询 </Button>
              </div>
            </div>
          </Form.Item>
           <Form.Item
            label='项目名称'
            name="name"
          >
            <Input disabled={true}/>
          </Form.Item>
          <Form.Item
            label='业务线'
            name="service_line"
          >
            <Input disabled={true}/>
          </Form.Item>
          <Form.Item
            label='基地'
            name="base"
          >
            <Input disabled={true}/>
          </Form.Item>
          <Form.Item
            label='项目负责人'
            name="project_leader"
          >
            <Input disabled={true}/>
          </Form.Item>
          <Form.Item
            label='项目状态'
            name="status"
          >
            <Input disabled={true}/>
          </Form.Item>
          <Form.Item
            label='结算类型'
            name="settlement_type"
          >
            <Input disabled={true}/>
          </Form.Item>
          <Form.Item
            label='项目周期'
            name="day"
          >
            <Input disabled={true}/>
          </Form.Item>
          <Form.Item
            label='作业日期'
            name="start_date"
          >
            <Input disabled={true}/>
          </Form.Item>
          <Form.Item
            label='交付日期'
            name="delivery_date"
          >
            <Input disabled={true}/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Account;