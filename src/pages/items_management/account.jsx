/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-09-30 20:34:40
 * @LastEditTime: 2024-10-24 18:27:52
 */
import React, { useEffect, useState } from 'react'
import { SearchOutlined, RedoOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Table, Select, message, Col, Row, DatePicker, Upload } from 'antd'
import dayjs from 'dayjs';
import '../common_css/style.css'
import { reqGetAccountDatas, reqAddAccountDatas, reqGetItemDatas, reqAddAccountDetailDatas, reqGetAccountDetailDatas } from '../../api/index'
import storageUtils from '../../utils/storageUtils'
const { RangePicker } = DatePicker;
const itemLayout = { 
  labelCol:{span:7},
  wrapperCol:{span:15} 
}

const props = {
  name: 'file',
  action: 'http://localhost:3003/items/account/upload',
  headers: {
    authorization: 'authorization-text',
    'token': storageUtils.getToken()
  },
  onChange(info) {
    if (info.file.status === 'done') {
      if(info.file.response.status === 1){
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

const Account = () => {
  const [ modalType, setModalType ] = useState(0)
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ isModalOpen1, setIsModalOpen1 ] = useState(false)
  const [ data, setData ] = useState([])
  const [ detail_data, setDetailData ] = useState([])
  const [ table_loading, setTableLoading ] = useState(true)
  const [ id, setId ] = useState(0)
  const [ form ] = Form.useForm();
  const [ form_add ] = Form.useForm();
  const [ form_detail ] = Form.useForm();
  const [ messageApi, contextHolder ] = message.useMessage();

  useEffect(() => {
    getTableData()
    getAccountDetailData()
  },[])

  const getTableData = async () => {
    const reqData = await reqGetAccountDatas()
      setData(reqData.data)
      setTableLoading(false)
  }

  const getAccountDetailData = async () => {
    const reqData = await reqGetAccountDetailDatas()
    setDetailData(reqData.data)
  }

  const handClink = (type,rowData) => {
    if(type === 'add'){
      setIsModalOpen(!isModalOpen)
      setModalType(0)
    }else{
      setId(rowData.id)
      setIsModalOpen1(!isModalOpen1)
    }
  }

  const handleOk = () => {
    form_add.validateFields().then( async (val)=>{
        const result = await reqAddAccountDatas(val)
        if(result.status === 1){
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

  const handleOk1 = () => {
    form_detail.validateFields().then( async (val)=>{
      val.account_id = id
      const result = await reqAddAccountDetailDatas(val)
      if(result.status === 1){
        form_detail.resetFields()
        getAccountDetailData()
        message.info('新增成功...')
      }else{
        message.error('新增失败...')
      }
   }).catch(()=>{
     messageApi.error('参数有误...请检查!!!')
  })
  }

  const handleCancle1 = () => {
    setIsModalOpen1(false)
    form_detail.resetFields()
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
      dataIndex: 'item_id',
      key: 'item_id',
      fixed: 'left'
    },
    {
      title: '项目名称',
      dataIndex: 'item_name',
      key: 'item_name',
      fixed: 'left'
    },
    {
      title: '业务线',
      dataIndex: 'service_line',
    },
    {
      title: '基地',
      dataIndex: 'base',
    },
    {
      title: '项目负责人',
      dataIndex: 'project_leader',
    },
    {
      title: '结算类型',
      dataIndex: 'item_settlement_type',
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
      title: '结算周期',
      dataIndex: 'item_settlement_day'
    },
    {
      title: '项目周期',
      dataIndex: 'item_day',
    },
    {
      title: '作业日期',
      dataIndex: 'item_start_date',
      render:(item_start_date)=>{
        return (
          dayjs(item_start_date).format('YYYY-MM-DD')
        )
      }
    },
    {
      title: '交付日期',
      dataIndex: 'item_delivery_date',
      render:(item_delivery_date)=>{
        return (
          dayjs(item_delivery_date).format('YYYY-MM-DD')
        )
      }
    },
    {
      title: '项目状态',
      dataIndex: 'item_status'
    },
    {
      title: '结算状态',
      dataIndex: 'item_settlement_status'
    },
    {
      title: '回款状态',
      dataIndex: 'refund_status'
    },
    {
      title: '对账人',
      dataIndex: 'reconciler'
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      render:(rowData)=>{
          return (
            <div>
              <Button onClick={()=> handClink('detail',rowData)}>对账明细</Button>
            </div>
          )
      }
    }
  ];

  const account_detail_column = [
    {
      title: '对账日期',
      dataIndex: 'account_day',
      render:(account_day)=>{
        return (
          dayjs(account_day).format('YYYY-MM-DD')
        )
      }
    },
    {
      title: '对账周期',
      dataIndex: 'account_period',
    },
    {
      title: '任务包',
      dataIndex: 'tasks',
    },
    {
      title: '结算比例',
      dataIndex: 'settlement_scale',
    },
    {
      title: '数量级',
      dataIndex: 'amount',
    },
    {
      title: '单价',
      dataIndex: 'price'
    },
    {
      title: '总计',
      dataIndex: 'sum',
    },
    {
      title: '甲方是否验收',
      dataIndex: 'is_accept',
    },
    {
      title: '对账人',
      dataIndex: 'reconciler'
    },
    {
      title: '附件',
      dataIndex: 'attachment'
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
            label='结算周期'
            name="settlement_day"
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
      <Modal
        open={isModalOpen1}
        title={ '对账明细' }
        onOk={handleOk1}
        onCancel={handleCancle1}
        okText='确定'
        cancelText='取消'
        maskClosable={false}
        width={'70%'}
        footer={null}
      >
        <Form
          form={form_detail}
          labelCol={{span:3}} 
          wrapperCol={{span:10}} 
        >
          <Form.Item
            label='对账日期'
            name="account_day"
            rules={[{required:true,message:'请输入对账日期'}]}
          >
            <DatePicker
              placeholder={['请选择对账日期']}
              style={{width:'470px'}}
            />
          </Form.Item>
          <Form.Item
            label='对账周期'
            name="account_period"
            rules={[{required:true,message:'请输入对账周期'}]}
          >
             <RangePicker     
                placeholder={['开始日期', '结束日期']}
                style={{width:'470px'}}
             />
          </Form.Item>
          <Form.Item
            label='任务包'
            name="tasks"
            rules={[{required:true,message:'请输入任务包'}]}
          >
            <Select
                placeholder='请选择任务包'
                mode="multiple"
                allowClear
                options={[
                  {
                    value: 'xxx',
                    label: 'xxx',
                  },
                  {
                    value: 'yyy',
                    label: 'yyy',
                  },
                  {
                    value: 'zzz',
                    label: 'zzz',
                  },
                  {
                    value: 'vvv',
                    label: 'vvv',
                  }
                ]}
              />
          </Form.Item>
          <Form.Item
            label='结算比例'
            name="settlement_scale"
            rules={[{required:true,message:'请输入结算比例'}]}
          >
            <Input placeholder='如:0.95'/>
          </Form.Item>
          <Form.Item
            label='数量级'
            name="amount"
            rules={[{required:true,message:'请输入数量级'}]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='单价'
            name="price"
            rules={[{required:true,message:'请输入单价'}]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='总金额'
            name="sum"
            rules={[{required:true,message:'请输入总金额'}]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='甲方是否验收'
            name="is_accept"
            rules={[{required:true,message:'请输入甲方是否验收'}]}
          >
            <Select
                placeholder='请输入甲方是否验收'
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
          <Form.Item
            label='附件'
            name="attachment"
          >
            <div style={{display:'flex'}}>
              <div style={{flex:1}}>
              <Upload  
                  showUploadList={true} 
                  {...props}
                  	
                >
                  <Button style={{width:'80px'}} icon={<UploadOutlined />}>导入</Button>
                  <span style={{color:'red'}}>新增完成之后再导入附件</span>
                </Upload>
              </div>
              <div style={{flex:1}}>
                <Button style={{width:'80px'}} onClick={ handleOk1 } type='primary' > + 新增 </Button>
              </div>
            </div>
          </Form.Item>
        </Form>
        <div style={{ width: '100%', height: '85%', overflow:'auto'}}>
          <Table 
            columns={ account_detail_column } 
            dataSource={ detail_data } 
            rowKey={ data => data.id }  
          />
      </div>
      </Modal>
    </div>
  )
}

export default Account;