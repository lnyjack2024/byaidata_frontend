/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-09-30 20:34:40
 * @LastEditTime: 2025-01-21 14:40:46
 */
import React, { useEffect, useState } from 'react'
import { SearchOutlined, RedoOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Table, Select, message, Col, Row, DatePicker, Upload, InputNumber } from 'antd'
import dayjs from 'dayjs';
import { BASE } from '../../utils/networkUrl'
import '../common_css/style.css'
import { reqGetAccountDatas, 
         reqAddAccountDatas, 
         reqGetItemDatas, 
         reqAddAccountDetailDatas, 
         reqGetAccountDetailDatas,
         reqGetServiceLineDatas,
         reqGetBaseDatas, _reqGetTaskDatas } from '../../api/index'
import storageUtils from '../../utils/storageUtils'
const { RangePicker } = DatePicker;
const itemLayout = { 
  labelCol:{span:7},
  wrapperCol:{span:15} 
}
const { Option } = Select;

const Account = () => {
  const [ modalType, setModalType ] = useState(0)
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ isModalOpen1, setIsModalOpen1 ] = useState(false)
  const [ isModalOpen2, setIsModalOpen2 ] = useState(false)
  const [ data, setData ] = useState([])
  const [ detail_data, setDetailData ] = useState([])
  const [ table_loading, setTableLoading ] = useState(true)
  const [ id, setId ] = useState(0)
  const [ account_detail_id, setAccountDetailId ] = useState(0)
  const [ item_settlement_type, setItemSettlementType ] = useState('')
  const [ item_detail, setItemDetail ] = useState({})
  const [ baseData, setBaseData ] = useState([])
  const [ service_lineData, setServiceLineDataData ] = useState([])
  const [ taskData, setTaskData ] = useState([])
  const [ aaa, setAaa ] = useState(false)
  const [ bbb, setBbb ] = useState(false)
  const [ form ] = Form.useForm();
  const [ form_add ] = Form.useForm();
  const [ form_detail ] = Form.useForm();
  const [ form_detail2 ] = Form.useForm();
  const [ messageApi, contextHolder ] = message.useMessage();

  useEffect(() => {
    getTableData()
    getBaseData()
    const getOptions = async () => {
      const baseData = await getBaseData(); 
      const serviceLineData = await getServiceLineData();
      if(baseData.length === 0){
        setBbb(true)
      }
      if(serviceLineData.length === 0){
        setAaa(true)
      }
      setBaseData(baseData)
      setServiceLineDataData(serviceLineData)
      if (baseData.length > 0 || serviceLineData.length > 0) {
        form.setFieldsValue({ base : baseData[0]?.name, service_line : serviceLineData[0]?.name });
        getTableData(baseData[0]?.name, serviceLineData[0]?.name); // 获取数据
      }
    };
    getOptions();
  },[form])

  const getTableData = async () => {
    const reqData = await reqGetAccountDatas()
      setData(reqData.data)
      setTableLoading(false)
  }

  const getServiceLineData = async () => {
    const reqData = await reqGetServiceLineDatas()
    return new Promise((resolve) => {
      setTimeout(() => resolve(reqData.data), 100);
    });
  }

  const getBaseData = async () => {
    const reqData = await reqGetBaseDatas()
    return new Promise((resolve) => {
      setTimeout(() => resolve(reqData.data), 100);
    });
  }

  const getAccountDetailData = async (e) => {
    const reqData = await reqGetAccountDetailDatas(e)
    setDetailData(reqData.data)
  }
  
  const handClink = async (type,rowData) => {
    if(type === 'add'){
      setIsModalOpen(!isModalOpen)
      setModalType(0)
    }else{
      setId(rowData.id)
      setItemSettlementType(rowData.item_settlement_type)
      getAccountDetailData({id:rowData.id})
      setItemDetail(rowData)
      const reqData = await _reqGetTaskDatas({item_name:rowData.item_name})
      setTaskData(reqData.data)
      if(rowData.item_settlement_type === '计件'){
        setIsModalOpen1(!isModalOpen1)
      }else{
        setIsModalOpen2(!isModalOpen2)
      }
    }
  }

  const handleOk = () => {
    form_add.validateFields().then( async (val)=>{
        const result = await reqAddAccountDatas(val)
        if(result.status === 1){
          setIsModalOpen(false)
          form_add.resetFields()
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
      val.item_settlement_type = item_settlement_type
      val.items = item_detail
      const result = await reqAddAccountDetailDatas(val)
      if(result.status === 1){
        form_detail.resetFields()
        getAccountDetailData({id:id})
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

  const handleOk2 = () => {
    form_detail2.validateFields().then( async (val)=>{
      val.account_id = id
      val.item_settlement_type = item_settlement_type
      val.items = item_detail
      const result = await reqAddAccountDetailDatas(val)
      if(result.status === 1){
        form_detail.resetFields()
        getAccountDetailData({id:id})
        message.info('新增成功...')
      }else{
        message.error('新增失败...')
      }
   }).catch(()=>{
     messageApi.error('参数有误...请检查!!!')
  })
  }

  const handleCancle2 = () => {
    setIsModalOpen2(false)
    form_detail2.resetFields()
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
        messageApi.error('请确认项目ID')
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
  
  const handUploadClink = (e) => {
    setAccountDetailId(e.id)
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
      title: '业务负责人',
      dataIndex: 'business_leader',
    },
    {
      title: '项目经理',
      dataIndex: 'item_manager',
    },
    {
      title: '组长',
      dataIndex: 'group_manager',
    },
    {
      title: '培训师',
      dataIndex: 'trainer',
    },
    {
      title: '项目周期(天)',
      dataIndex: 'item_day',
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
      title: '结算类型',
      dataIndex: 'item_settlement_type',
    },
    {
      title: '结算周期(天)',
      dataIndex: 'item_settlement_day'
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
    // {
    //   title: '结算状态',
    //   dataIndex: 'item_settlement_status'
    // },
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
              <Button onClick={()=> handClink('detail',rowData)}>详情</Button>
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
      },
      fixed: 'left'
    },
    {
      title: '对账周期',
      dataIndex: 'account_period',
      fixed: 'left'
    },
    {
      title: '结算状态',
      dataIndex: 'settlement_status',
    },
    {
      title: '回款状态',
      dataIndex: 'refund_status',
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
      title: '单价(元)',
      dataIndex: 'price'
    },
    {
      title: '总计(元)',
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
      dataIndex: 'attachment',
      render:(attachment)=>{
        return (
          <div style={{ margin: '10px 0' }}>
            <a 
              href={ BASE + attachment} 
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
      render:(rowData)=>{
          return (
            <div>
              <Upload  
                  showUploadList={false} 
                  {...props}
                >
                  <Button style={{width:'100px'}} icon={<UploadOutlined />} onClick={()=> handUploadClink(rowData)}>导入</Button>
              </Upload>
            </div>
          )
      }
    }
  ];

  const account_detail_column2 = [
    {
      title: '对账日期',
      dataIndex: 'account_day',
      render:(account_day)=>{
        return (
          dayjs(account_day).format('YYYY-MM-DD')
        )
      },
      fixed: 'left'
    },
    {
      title: '对账周期',
      dataIndex: 'account_period',
      fixed: 'left'
    },
    {
      title: '结算状态',
      dataIndex: 'settlement_status',
    },
    {
      title: '回款状态',
      dataIndex: 'refund_status',
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
      title: '正常工时',
      dataIndex: 'normal_hour',
    },
    {
      title: '工作日加班工时',
      dataIndex: 'normal_overtime_hour',
    },
    {
      title: '周六日加班工时',
      dataIndex: 'week_overtime_hour',
    },
    {
      title: '法定节假日加班工时',
      dataIndex: 'holidays_overtime_hour',
    },
    {
      title: '1.5倍工时',
      dataIndex: 'times_overtime_hour15',
    },
    {
      title: '2倍工时',
      dataIndex: 'times_overtime_hour2',
    },
    {
      title: '3倍工时',
      dataIndex: 'times_overtime_hour3',
    },
    {
      title: '单价(元)',
      dataIndex: 'price'
    },
    {
      title: '总计(元)',
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
      dataIndex: 'attachment',
      render:(attachment)=>{
        return (
          <div style={{ margin: '10px 0' }}>
            <a 
              href={ BASE + attachment} 
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
      render:(rowData)=>{
          return (
            <div>
              <Upload  
                  showUploadList={false} 
                  {...props}
                >
                  <Button style={{width:'100px'}} icon={<UploadOutlined />} onClick={()=> handUploadClink(rowData)}>导入</Button>
              </Upload>
            </div>
          )
      }
    }
  ];

  const props = {
    name: 'file',
    action: `${BASE}/items/account/detail/upload?id=${account_detail_id}`,
    headers: {
      authorization: 'authorization-text',
      'token': storageUtils.getToken()
    },
    onChange(info) {
      if (info.file.status === 'done') {
        if(info.file.response.status === 1){
          getAccountDetailData({id:id})
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
          initialValues={{
            base : '', //初始值默认为空
            service_line : ''
          }}
        >
          <Row>
            <Col span={6}>
              <Form.Item name="service_line" label="业务线" {...itemLayout}>
                <Select
                  placeholder="请输入业务线"
                  style={{textAlign:'left'}}
                  allowClear={true}
                  disabled={aaa}
                >
                  {
                    service_lineData?.map((option)=>(
                      <Option key={option.id} value={option.name}>
                        {option.name}
                      </Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item 
                name = "base"
                label="基地" 
                {...itemLayout}
              >
                <Select
                  placeholder='请输入基地'
                  style={{textAlign:'left'}}
                  disabled={bbb}
                >
                {
                  baseData?.map((option)=>(
                    <Option key={option.id} value={option.name}>
                      {option.name}
                    </Option>
                  ))
                }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="item_name" label="项目名称" {...itemLayout}>
                <Input placeholder='请输入项目名称'/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="status" label="项目状态" {...itemLayout}>
              <Select
                  placeholder='请输入项目状态'
                  style={{textAlign:'left'}}
                  allowClear={true}
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
              <Form.Item name="delivery_status" label="结算状态" {...itemLayout}>
              <Select
                  placeholder='请输入结算状态'
                  style={{textAlign:'left'}}
                  allowClear={true}
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
                  allowClear={true}
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
              <Form.Item name="reconciler" label="对账人" {...itemLayout}>
                <Input placeholder='请输入对账人'/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item  >
                <Button onClick={() => handClink('add')} icon={<PlusOutlined />} style={{backgroundColor: "#000000",color:'white',marginLeft:'1%'}}> 新增 </Button>&nbsp;&nbsp;
                <Button onClick={ handReset } type='primary'  icon={<RedoOutlined />} style={{backgroundColor: "#808080",color:'white'}}> 重置 </Button>&nbsp;&nbsp;
                <Button onClick={ handSearch } type='primary'  icon={<SearchOutlined />}> 查询 </Button>
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
            label='业务负责人'
            name="business_leader"
          >
            <Input disabled={true}/>
          </Form.Item>
          <Form.Item
            label='项目经理'
            name="item_manager"
          >
            <Input disabled={true}/>
          </Form.Item>
          <Form.Item
            label='组长'
            name="group_manager"
          >
            <Input disabled={true}/>
          </Form.Item>
          <Form.Item
            label='培训师'
            name="trainer"
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
            label='结算状态'
            name="settlement_status"
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
        width={'85%'}
        footer={null}
      >
        <Form
          form={form_detail}
          labelCol={{span:3}} 
          wrapperCol={{span:8}} 
          style={{marginTop:'30px'}}
        >
          <Form.Item
            label='对账日期'
            name="account_day"
            rules={[{required:true,message:'请输入对账日期'}]}
          >
            <DatePicker
              placeholder={['请选择对账日期']}
              style={{width:'300px'}}
            />
          </Form.Item>
          <Form.Item
            label='对账周期'
            name="account_period"
            rules={[{required:true,message:'请输入对账周期'}]}
          >
             <RangePicker     
                placeholder={['开始日期', '结束日期']}
                style={{width:'300px'}}
             />
          </Form.Item>
          <Form.Item
            label='任务包'
            name="tasks"
            rules={[{required:true,message:'请输入任务包'}]}
          >
            <Select
                placeholder='请输入任务包'
                style={{textAlign:'left'}}
                allowClear={true}
                mode="multiple"
              >
              {
                taskData?.map((option)=>(
                  <Option key={option.id} value={option.name}>
                    {option.name}
                  </Option>
                ))
              }
           </Select>
          </Form.Item>
          <Form.Item
            label='结算比例'
            name="settlement_scale"
            rules={[{required:true,message:'请输入结算比例 如:0.85'}]}
            initialValue={0}
          >
            <InputNumber max={1} min={0} style={{width:'200px'}}/>
          </Form.Item>
          <Form.Item
            label='数量级'
            name="amount"
            rules={[{required:true,message:'请输入数量级'}]}
            initialValue={0}
          >
            <InputNumber min={0} style={{width:'200px'}}/>
          </Form.Item>
          <Form.Item
            label='单价(元)'
            name="price"
            rules={[{required:true,message:'请输入单价'}]}
            initialValue={0}
          >
            <InputNumber min={0} style={{width:'200px'}}/>
          </Form.Item>
          <Form.Item
            label='总金额(元)'
            name="sum"
            rules={[{required:true,message:'请输入总金额'}]}
            initialValue={0}
          >
            <InputNumber min={0} style={{width:'200px'}}/>
          </Form.Item>
          <Form.Item
            label='甲方是否验收'
            name="is_accept"
            rules={[{required:true,message:'请输入甲方是否验收'}]}
          >
            <Select
              placeholder='请输入甲方是否验收'
              style={{width:'300px'}}
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
            <Button style={{marginLeft:'38%'}} onClick={ handleOk1 } type='primary' > + 新增 </Button>
          </Form.Item>
        </Form>
        <div style={{ width: '100%', height: '85%', overflow:'auto'}}>
          <Table 
            columns={ account_detail_column } 
            dataSource={ detail_data } 
            rowKey={ data => data.id }  
            scroll={{x: 'max-content'}}
            pagination={false}
          />
      </div>
      </Modal>
      <Modal
        open={isModalOpen2}
        title={ '对账明细' }
        onOk={handleOk2}
        onCancel={handleCancle2}
        okText='确定'
        cancelText='取消'
        maskClosable={false}
        width={'85%'}
        footer={null}
      >
        <Form
          form={form_detail2}
          labelCol={{span:3}} 
          wrapperCol={{span:8}} 
          style={{marginTop:'30px'}}
        >
          <Form.Item
            label='对账日期'
            name="account_day"
            rules={[{required:true,message:'请输入对账日期'}]}
          >
            <DatePicker
              placeholder={['请选择对账日期']}
              style={{width:'60%'}}
            />
          </Form.Item>
          <Form.Item
            label='对账周期'
            name="account_period"
            rules={[{required:true,message:'请输入对账周期'}]}
          >
             <RangePicker     
                placeholder={['开始日期', '结束日期']}
                style={{width:'60%'}}
             />
          </Form.Item>
          <Form.Item
            label='任务包'
            name="tasks"
            rules={[{required:true,message:'请输入任务包'}]}
          >
           <Select
                placeholder='请输入任务包'
                style={{textAlign:'left'}}
                allowClear={true}
                mode="multiple"
              >
              {
                taskData?.map((option)=>(
                  <Option key={option.id} value={option.name}>
                    {option.name}
                  </Option>
                ))
              }
           </Select>
          </Form.Item>
          <Form.Item
            label='结算比例'
            name="settlement_scale"
            initialValue={0}
            rules={[{required:true,message:'请输入结算比例 如:0.85'}]}
          >
            <InputNumber max={1} min={0} style={{width:'200px'}}/>
          </Form.Item>
          <Form.Item
            label='正常工时'
            name="normal_hour"
            initialValue={0}
            rules={[{required:true,message:'请输入正常工时'}]}
          >
            <InputNumber min={0} style={{width:'200px'}}/>
          </Form.Item>
          <Form.Item
            label='工作日加班工时'
            name="normal_overtime_hour"
            initialValue={0}
          >
            <InputNumber min={0} style={{width:'200px'}}/>
          </Form.Item>
          <Form.Item
            label='周六日加班工时'
            name="week_overtime_hour"
            initialValue={0}
          >
            <InputNumber min={0} style={{width:'200px'}}/>
          </Form.Item>
          <Form.Item
            label='法定节假日加班工时'
            name="holidays_overtime_hour"
            initialValue={0}
          >
            <InputNumber min={0} style={{width:'200px'}}/>
          </Form.Item>
          <Form.Item
            label='1.5倍工时'
            name="times_overtime_hour15"
            initialValue={0}
          >
            <InputNumber min={0} style={{width:'200px'}}/>
          </Form.Item>
          <Form.Item
            label='2倍工时'
            name="times_overtime_hour2"
            initialValue={0}
          >
            <InputNumber min={0} style={{width:'200px'}}/>
          </Form.Item>
          <Form.Item
            label='3倍工时'
            name="times_overtime_hour3"
            initialValue={0}
          >
            <InputNumber min={0} style={{width:'200px'}}/>
          </Form.Item>
          <Form.Item
            label='单价(元)'
            name="price"
            rules={[{required:true,message:'请输入单价'}]}
            initialValue={0}
          >
            <InputNumber min={0} style={{width:'200px'}}/>
          </Form.Item>
          <Form.Item
            label='总金额(元)'
            name="sum"
            rules={[{required:true,message:'请输入总金额'}]}
            initialValue={0}
          >
            <InputNumber min={0} style={{width:'200px'}}/>
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
          >
              <Button style={{ marginLeft:'38%' }} onClick={ handleOk2 } type='primary' > + 新增 </Button>
          </Form.Item>
        </Form>
        <div style={{ width: '100%', height: '85%', overflow:'auto'}}>
          <Table 
            columns={ account_detail_column2 } 
            dataSource={ detail_data } 
            rowKey={ data => data.id }  
            scroll={{x: 'max-content'}}
            pagination={false}
          />
      </div>
      </Modal>
    </div>
  )
}

export default Account;