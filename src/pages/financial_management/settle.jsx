/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-09-30 20:38:35
 * @LastEditTime: 2024-11-05 16:41:43
 */
import React, { useEffect, useState } from 'react'
import { SearchOutlined, RedoOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Table, Select, Col, Row, DatePicker } from 'antd'
import dayjs from 'dayjs';
import '../common_css/style.css'
import { reqGetSettleDatas } from '../../api/index'
const { RangePicker } = DatePicker;
const itemLayout = { 
  labelCol:{span:7},
  wrapperCol:{span:15} 
}

const Settle = () => {
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ data, setData ] = useState([])
  const [ hidden_status, setHiddenStatus ] = useState(true)
  const [ hidden_status_1, setHiddenStatus1 ] = useState(true)
  const [ table_loading, setTableLoading ] = useState(true)
  const [ form ] = Form.useForm();
  const [ form_detail ] = Form.useForm();

  useEffect(() => {
    getTableData()
  },[])

  const getTableData = async () => {
    const reqData = await reqGetSettleDatas()
      setData(reqData.data)
      setTableLoading(false)
  }

  const handClink = async (type,rowData) => {
    setIsModalOpen(!isModalOpen)
    if(rowData.settlement_type === '计件'){
      setHiddenStatus(false)
      setHiddenStatus1(true)
    }else{
      setHiddenStatus1(false)
      setHiddenStatus(true)
    }
    if(type === 'detail'){
      rowData.account_day = dayjs(rowData.account_day).format('YYYY-MM-DD')
      form_detail.setFieldsValue(rowData)
    }
  }

  const handSearch = () => {
    form.validateFields().then( async (val)=>{
      const reqData = await reqGetSettleDatas(val)
      setData(reqData.data)
      setTableLoading(false)
    })
  }

  const handleCancle = () => {
    form_detail.resetFields()
    setIsModalOpen(false)
  }

  const handReset = () => {
    form.resetFields()
  }

  const column = [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left'
    },
    {
      title: '项目ID',
      dataIndex: 'item_id',
      fixed: 'left'
    },
    {
      title: '项目名称',
      dataIndex: 'item_name',
      fixed: 'left'
    },
    {
      title: '对账日期',
      dataIndex: 'account_day',
      render:(create_time)=>{
        return (
          dayjs(create_time).format('YYYY-MM-DD')
        )
      }
    },
    {
      title: '对账周期',
      dataIndex: 'account_period',
    },
    {
      title: '对账人',
      dataIndex: 'reconciler',
      key: 'reconciler',
    },
    {
      title: '对账人联系电话',
      dataIndex: 'reconciler_number',
    },
    {
      title: '结算状态',
      dataIndex: 'settlement_status',
      render:(settlement_status)=>{
        if(settlement_status === '未开始'){
          return (
            <Button style={{backgroundColor: '#FF4D4F',color: 'white'}}>未开始</Button>
          )
        }else if(settlement_status === '结算中'){
          return (
            <Button style={{backgroundColor: '#1677FF',color: 'white'}}>{settlement_status}</Button>
          )
        }else{
          return (
            <Button style={{backgroundColor: '#000000',color: 'white'}}>{settlement_status}</Button>
          )
        }
      }
    },
    {
      title: '开票状态',
      dataIndex: 'invoice_status',
    },
    {
      title: '回款状态',
      dataIndex: 'refund_status'
    },
    {
      title: '结算单创建时间',
      dataIndex: 'create_time',
      render:(create_time)=>{
        return (
          dayjs(create_time).format('YYYY-MM-DD HH:mm:ss')
        )
      }
    },
    
    {
      title: '结算操作人',
      dataIndex: 'settlement_user'
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      render:(rowData)=>{
          return (
            <div>
              <Button onClick={()=> handClink('detail',rowData)}>详情</Button>&nbsp;&nbsp;
              <Button onClick={()=> handClink('',rowData)}>开票明细</Button>&nbsp;&nbsp;
              <Button onClick={()=> handClink('',rowData)}>回款状态</Button>
            </div>
          )
      }
    }
  ];

  return (
    <div className='style'>
      <div className='flex-box'>
        <Form form={form}
          className='flex-box-form'
          layout='inline'
        >
          <Row>
            <Col span={6}>
              <Form.Item name="item_name" label="项目名称" {...itemLayout}>
                <Input placeholder='请输入项目名称'/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="service_line" label="业务线" {...itemLayout}>
              <Select
                  placeholder='请输入业务线'
                  style={{textAlign:'left'}}
                  options={[
                    {
                      value: '混元',
                      label: '混元',
                    },
                    {
                      value: '百度',
                      label: '百度',
                    },
                    {
                      value: '字节',
                      label: '字节',
                    },
                    {
                      value: '小红书',
                      label: '小红书',
                    },
                    {
                      value: '文远',
                      label: '文远',
                    },
                    {
                      value: '众包类',
                      label: '众包类',
                    }
                  ]}
                />
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
              <Form.Item name="reconciler" label="开票状态" {...itemLayout}>
                <Select
                  placeholder='请输入开票状态'
                  style={{textAlign:'left'}}
                  options={[
                    {
                      value: '未开票',
                      label: '未开票',
                    },
                    {
                      value: '开票中',
                      label: '开票中',
                    },
                    {
                      value: '开票完成',
                      label: '开票完成',
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
              <Form.Item name="create_time" label="开票日期" {...itemLayout}>
                <RangePicker     
                  placeholder={['开始日期', '结束日期']}
                  style={{width:'250px'}}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="create_time" label="回款日期" {...itemLayout}>
                <RangePicker     
                  placeholder={['开始日期', '结束日期']}
                  style={{width:'250px'}}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item >
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
      <Modal
        open={isModalOpen}
        title={''}
        onCancel={handleCancle}
        okText='确定'
        cancelText='取消'
        maskClosable={false}
        width={'70%'}
        footer={null}
      >
        <Form
          form={form_detail}
          labelCol={{span:5}} 
          wrapperCol={{span:20}} 
          style={{marginTop:'20px',marginBottom:'50px'}}
        >
           <Form.Item
            label='项目ID'
            name="item_id"
           >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
           <Form.Item
            label='项目名称'
            name="item_name"
           >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
           <Form.Item
            label='业务线'
            name="service_line"
           >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
           <Form.Item
            label='基地'
            name="base"
           >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
           <Form.Item
            label='项目负责人'
            name="item_leader"
           >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
           <Form.Item
            label='任务包明细'
            name="tasks"
           >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
           <Form.Item
            label='对账日期'
            name="account_day"
           >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
           <Form.Item
            label='对账周期'
            name="account_period"
           >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
           <Form.Item
            label='结算类型'
            name="settlement_type"
           >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
           <Form.Item
            label='结算周期'
            name="settlement_day"
           >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
           <Form.Item
            label='数量级'
            name="amount"
            hidden={hidden_status}
           >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
           <Form.Item
            label='正常工时'
            name="normal_hour"
            hidden={hidden_status_1}
           >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
           <Form.Item
            label='工作日加班工时'
            name="normal_overtime_hour"
            hidden={hidden_status_1}
           >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
           <Form.Item
            label='周六日加班工时'
            name="week_overtime_hour"
            hidden={hidden_status_1}
           >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
           <Form.Item
            label='法定节假日加班工时'
            name="holidays_overtime_hour"
            hidden={hidden_status_1}
           >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
           <Form.Item
            label='1.5倍工时'
            name="times_overtime_hour15"
            hidden={hidden_status_1}
           >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
           <Form.Item
            label='2倍工时'
            name="times_overtime_hour2"
            hidden={hidden_status_1}
           >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
           <Form.Item
            label='3倍工时'
            name="times_overtime_hour3"
            hidden={hidden_status_1}
           >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
           <Form.Item
            label='单价'
            name="price"
           >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
           <Form.Item
            label='总价'
            name="sum"
           >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Settle;
