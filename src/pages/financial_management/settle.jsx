/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-09-30 20:38:35
 * @LastEditTime: 2024-11-06 15:43:58
 */
import React, { useEffect, useState } from 'react'
import { SearchOutlined, RedoOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Table, Select, Col, Row, DatePicker, message, Upload, Popconfirm } from 'antd'
import dayjs from 'dayjs';
import storageUtils from '../../utils/storageUtils'
import '../common_css/style.css'
import { reqGetSettleDatas, reqEditSettleDatas, reqEditSettleStatus, reqEditSettleInvoice, reqGetInvoiceDetailDatas, reqDeleteInvoiceDatas } from '../../api/index'
const { RangePicker } = DatePicker;
const itemLayout = { labelCol:{span:7},wrapperCol:{span:15} }

const Settle = () => {
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ refundStatusModalOpen, setRefundStatusModalOpen ] = useState(false)
  const [ invoiceModalOpen, setInvoiceModalOpen ] = useState(false)
  const [ data, setData ] = useState([])
  const [ data_invoice, setDetailData ] = useState([])
  const [ hidden_status,   setHiddenStatus  ] = useState(true)
  const [ hidden_status_1, setHiddenStatus1 ] = useState(true)
  const [ hidden_status_2, setHiddenStatus2 ] = useState(false)
  const [ hidden_status_3, setHiddenStatus3 ] = useState(true)
  const [ table_loading,   setTableLoading  ] = useState(true)
  const [ id, setId ] = useState(0)
  const [ detail_id, setDetailId ] = useState(0)
  const [ form ] = Form.useForm();
  const [ form_detail ] = Form.useForm();
  const [ form_refund_status ] = Form.useForm();
  const [ form_invoice ] = Form.useForm();
  const [ messageApi, contextHolder ] = message.useMessage();

  useEffect(() => {
    getTableData()
  },[])

  const getTableData = async () => {
    const reqData = await reqGetSettleDatas()
      setData(reqData.data)
      setTableLoading(false)
  }

  const handClink = async (type,rowData) => {
    setId(rowData.id)
    if(rowData.settlement_type === '计件'){
      setHiddenStatus(false)
      setHiddenStatus1(true)
    }else{
      setHiddenStatus1(false)
      setHiddenStatus(true)
    }
    if(type === 'detail'){
      setIsModalOpen(!isModalOpen)
      if(rowData.settlement_status === '未开始'){
        setHiddenStatus2(false)
      }else{
        setHiddenStatus2(true)
      }
      if(rowData.settlement_status === '结算中'){
        setHiddenStatus3(false)
      }else{
        setHiddenStatus3(true)
      }
      rowData.account_day = dayjs(rowData.account_day).format('YYYY-MM-DD')
      form_detail.setFieldsValue(rowData)
    }else if(type === 'refund_status'){
      setRefundStatusModalOpen(true)
    }else{
      getDetailData({id:rowData.id})
      setInvoiceModalOpen(true)
    }
  }

  const getDetailData = async (e) => {
    const reqData = await reqGetInvoiceDetailDatas(e)
    setDetailData(reqData.data)
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

  const handleStatusCancle = () => {
    setRefundStatusModalOpen(false)
    form_refund_status.resetFields()
  }

  const handleStatusOk = () => {
    form_refund_status.validateFields().then( async (val)=>{
      val.edit_id = id
      val.refund_date = dayjs(val.refund_date).format('YYYY-MM-DD')
      const result = await reqEditSettleStatus(val)
      if(result.status === 1){
        form_refund_status.resetFields()
        setRefundStatusModalOpen(false)
        getTableData()
        message.info('操作成功...')
      }else{
        message.error('操作失败...')
      }
    }).catch(()=>{
      messageApi.error('参数有误...请检查!!!')
    }
    )
  }

  const handReset = () => {
    form.resetFields()
  }

  const handStart = async (v) => {
    let val = {}
    val.edit_id = id
    val.edit_val = v
    const result = await reqEditSettleDatas(val)
    if(result.status === 1){
      setHiddenStatus2(true)
      setIsModalOpen(!isModalOpen)
      form_detail.resetFields()
      getTableData()
      message.info('success...')
    }else{
      message.error('操作失败...')
    }
  }

  const handleInvoiceOk = () => {
    form_invoice.validateFields().then( async (val)=>{
      val.edit_id = id
      val.invoice_date = dayjs(val.invoice_date).format('YYYY-MM-DD')
      const result = await reqEditSettleInvoice(val)
      if(result.status === 1){
        form_invoice.resetFields()
        getDetailData({id:id})
        message.info('操作成功...')
      }else{
        message.error('操作失败...')
      }
    }).catch(()=>{
      messageApi.error('参数有误...请检查!!!')
    }
    )
  }

  const handleInvoiceCancle = () => {
    setInvoiceModalOpen(false)
    form_invoice.resetFields()
  }

  const handUploadClink = (e) => {
    setDetailId(e.id)
  }
  
  const handDelete = async (e) => {
    const result = await reqDeleteInvoiceDatas(e)
    if(result.status === 1){
      getDetailData({id:id})
      message.info('删除成功...')
    }else{
      message.error('删除失败...')
    }
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
            <Button style={{backgroundColor: '#FF4D4F',color: 'white'}}>{settlement_status}</Button>
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
      title: '回款日期',
      dataIndex: 'refund_date'
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
            <Button onClick={()=> handClink('invoice',rowData)}>开票明细</Button>&nbsp;&nbsp;
            <Button onClick={()=> handClink('refund_status',rowData)}>回款状态</Button>
          </div>
        )
      }
    }
  ];

  const column_invoice = [
    {
      title: '开票日期',
      dataIndex: 'invoice_date',
    },
    {
      title: '是否一票多项',
      dataIndex: 'is_ticket',
    },
    {
      title: '操作人',
      dataIndex: 'user',
    },
    {
      title: '操作时间',
      dataIndex: 'create_time',
      render:(create_time)=>{
        return (
          dayjs(create_time).format('YYYY-MM-DD HH:mm:ss')
        )
      }
    },
    {
      title: '附件',
      dataIndex: 'attachment',
      render:(attachment)=>{
        return (
          <div style={{ margin: '10px 0' }}>
            <a 
              href={'http://localhost:3003' + attachment} 
              download={'附件'} 
              style={{ textDecoration: 'none', color: '#007bff' }}
            >
            { attachment ? `📎 附件` : '' }
            </a>
          </div>
        );
      }
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      render:(rowData)=>{
        return (
          <div>
          <Upload  
              showUploadList={false} 
              {...props}
            >
              <Button style={{width:'100px'}} icon={<UploadOutlined />} onClick={()=> handUploadClink(rowData)}>导入</Button>
          </Upload>&nbsp;&nbsp;&nbsp;
          <Popconfirm
              description='是否删除?'
              okText='确认'
              cancelText='取消'
              onConfirm={ () => handDelete(rowData)}
            >
              <Button type='primary' danger>删除</Button>
          </Popconfirm>
          </div>
        )
      }
    }
  ]

  const props = {
    name: 'file',
    action: `http://localhost:3003/finance/settle/invoice_upload?id=${detail_id}`,
    headers: {
      authorization: 'authorization-text',
      'token': storageUtils.getToken()
    },
    onChange(info) {
      if (info.file.status === 'done') {
        if(info.file.response.status === 1){
          getDetailData({id:id})
          message.success(`文件${info.file.name}导入成功`);
        }else if(info.file.response.status === 0){
          message.error(`文件${info.file.name}导入失败`);
        }else if(info.file.response.status === 3){
          message.error(info.file.response.msg);
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name}上传失败`);
      }
    },
  };

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
          <Form.Item hidden={hidden_status_2}>
            <Button type='primary' onClick={()=> handStart('结算中')} style={{marginLeft:'50%'}}>开始结算</Button>
          </Form.Item>
          <Form.Item hidden={hidden_status_3}>
            <Button type='primary' onClick={()=> handStart('结算完成')} style={{marginLeft:'50%'}}>结算完成</Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={refundStatusModalOpen}
        title={'回款状态'}
        onOk={handleStatusOk}
        onCancel={handleStatusCancle}
        okText='确定'
        cancelText='取消'
        maskClosable={false}
        width={'50%'}
      >
        <Form
          form={form_refund_status}
          labelCol={{span:5}} 
          wrapperCol={{span:20}} 
          style={{marginTop:'50px',marginBottom:'50px'}}
        >
           <Form.Item
            label='回款日期'
            name="refund_date"
            rules={[{required:true,message:'请输入回款日期'}]}
           >
            <DatePicker
              placeholder={['请选择时间']}
              style={{width:'300px'}}
            />
          </Form.Item>
           <Form.Item
            label='回款状态'
            name="refund_status"
            rules={[{required:true,message:'请输入回款状态'}]}
           >
            <Select
              placeholder='请输入回款状态'
              style={{textAlign:'left',width:'300px'}}
              options={[
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
        </Form>
      </Modal>
      {contextHolder}
      <Modal
        open={invoiceModalOpen}
        title={''}
        onOk={handleInvoiceOk}
        onCancel={handleInvoiceCancle}
        okText='确定'
        cancelText='取消'
        maskClosable={false}
        width={'70%'}
        footer={null}
      >
        <Form
          form={form_invoice}
          labelCol={{span:4}} 
          wrapperCol={{span:20}} 
          style={{marginTop:'50px',marginBottom:'50px'}}
        >
           <Form.Item
            label='开票日期'
            name="invoice_date"
            rules={[{required:true,message:'请输入开票日期'}]}
           >
            <DatePicker
              placeholder={['请选择时间']}
              style={{width:'300px'}}
            />
          </Form.Item>
           <Form.Item
            label='是否一票多项'
            name="is_ticket"
            rules={[{required:true,message:'请输入是否一票多项'}]}
           >
           <Select
              placeholder='请输入是否一票多项'
              style={{textAlign:'left',width:'300px'}}
              options={[
                {
                  value: '是',
                  label: '是',
                },
                {
                  value: '否',
                  label: '否',
                }
              ]}
            />
          </Form.Item>
          <Form.Item>
              <Button style={{width:'10%',marginLeft:'30%'}} onClick={ handleInvoiceOk } type='primary' > + 新增 </Button>
          </Form.Item>
        </Form>
        <div style={{ width: '100%', height: '85%', overflow:'auto'}}>
          <Table 
            columns={ column_invoice } 
            dataSource={ data_invoice } 
            rowKey={ data_invoice => data_invoice.id }  
            pagination={false}
          />
        </div>
      </Modal>
    </div>
  )
}

export default Settle;
