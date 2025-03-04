/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-09-30 20:33:58
 * @LastEditTime: 2025-03-04 11:43:31
 */
import React, { useEffect, useState } from 'react'
import { SearchOutlined, RedoOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Table, Select, message, Col, Row, DatePicker, InputNumber, Popconfirm } from 'antd'
import storageUtils from '../../utils/storageUtils'
import dayjs from 'dayjs';
import '../common_css/style.css'
import { reqGetItemDatas, 
         reqAddItemDatas, 
         reqEditItemDatas, 
         reqDeleteItemDatas, 
         reqGetBaseDatas, 
         reqGetBaseDatas_,
         reqGetServiceLineDatas,
         reqGetServiceLineDatas_,
         reqGetSettlementTypeDatas,
         reqItemManagerDatas,
         reqGroupManagerDatas,
         reqGetTrainersDatas,
         reqGetOvertimeTypeDatas } from '../../api/index'
const { TextArea } = Input;
// const { RangePicker } = DatePicker;
const itemLayout = { labelCol:{span:7},wrapperCol:{span:15} }
const { Option } = Select;

const Item = () => {
  const [ form ] = Form.useForm();
  const [ form_add ] = Form.useForm();
  const [ modalType, setModalType ] = useState(0)
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ data, setData ] = useState([])
  const [ id, setId ] = useState(0)
  const [ _disable, setDisable ] = useState(false)
  const [ table_loading, setTableLoading ] = useState(true)
  const [ delay_date_status, setDelayDateStatus ] = useState(true)
  const [ baseData, setBaseData ] = useState([])
  const [ _baseData, _setBaseData ] = useState([])
  const [ service_lineData, setServiceLineDataData ] = useState([])
  const [ _service_lineData, _setServiceLineDataData ] = useState([])
  const [ settlement_type, setSettlementTypeData ] = useState([])
  const [ overtime_type, setOvertimeTypeData ] = useState([])
  const [ aaa, setAaa ] = useState(false)
  const [ bbb, setBbb ] = useState(false)
  const [ item_manager_arr, setItemManagerArr ] = useState([])
  const [ group_manager_arr, setGroupManagerArr ] = useState([])
  const [ trainer_arr, settTainerArr ] = useState([])
  const [ messageApi, contextHolder ] = message.useMessage();
  
  useEffect(() => {
    // getTableData()
    _getBaseData()
    _getServiceLineData()
    getSettlementTypeData()
    getOvertimeTypeData()
    getItemManagerData()
    getGroupManagerData()
    getTainerArrData()
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

  const getTableData = async (base,serviceLine) => {
    if(base === '全部'){
      base = ''
    }
    if(serviceLine === '全部'){
      serviceLine = ''
    }
    const reqData = await reqGetItemDatas({ base:base, service_line:serviceLine })
    setData(reqData.data)
    setTableLoading(false)
  }

  const getBaseData = async () => {
    const reqData = await reqGetBaseDatas()
    return new Promise((resolve) => {
      setTimeout(() => resolve(reqData.data), 100);
    });
  }

  const  _getBaseData = async () => {
    const reqData = await reqGetBaseDatas_()
    _setBaseData(reqData.data)
  }

  const getItemManagerData = async () => {
    const reqData = await reqItemManagerDatas()
    setItemManagerArr(reqData.data)
  }

  const getGroupManagerData = async () => {
    const reqData = await reqGroupManagerDatas()
    setGroupManagerArr(reqData.data)
  }

  const getTainerArrData = async () => {
    const reqData = await reqGetTrainersDatas()
    settTainerArr(reqData.data)
  }

  const getServiceLineData = async () => {
    const reqData = await reqGetServiceLineDatas()
    return new Promise((resolve) => {
      setTimeout(() => resolve(reqData.data), 100);
    });
  }

  const _getServiceLineData = async () => {
    const reqData = await reqGetServiceLineDatas_()
    _setServiceLineDataData(reqData.data)
  }

  const getSettlementTypeData = async () => {
    const reqData = await reqGetSettlementTypeDatas()
    setSettlementTypeData(reqData.data)
  }

  const getOvertimeTypeData = async () => {
    const reqData = await reqGetOvertimeTypeDatas()
    setOvertimeTypeData(reqData.data)
  }

  const handClink = (type,rowData) => {
    setIsModalOpen(!isModalOpen)
    if(type === 'add'){
      setModalType(0)
      setDisable(false)
      setDelayDateStatus(true)
      setId(rowData?rowData.id:'')
    }else{ 
      setModalType(1)
      setDisable(true)
      setDelayDateStatus(false)
      const cloneData = JSON.parse(JSON.stringify(rowData))
      cloneData.start_date = dayjs(cloneData.start_date)
      cloneData.delivery_date = cloneData.delivery_date ? dayjs(cloneData.delivery_date) : ''
      cloneData.delay_date = cloneData.delay_date ? dayjs(cloneData.delay_date) : ''
      cloneData.base = (cloneData.base).split(",")
      cloneData.item_manager = (cloneData.item_manager).split(",")
      cloneData.group_manager = (cloneData.group_manager).split(",")
      cloneData.trainer = (cloneData.trainer).split(",")
      setId(cloneData.id)
      form_add.setFieldsValue(cloneData)
    }
  }

  const handleOk = () => {
    form_add.validateFields().then( async (val)=>{
        val.start_date    = dayjs(val.start_date).format('YYYY-MM-DD')
        val.delivery_date = val.delivery_date ? dayjs(val.delivery_date).format('YYYY-MM-DD') : ''
        if(modalType === 0){
          val.parent_id     = id
          const result = await reqAddItemDatas(val)
          if(result.status === 1){
            setIsModalOpen(false)
            form_add.resetFields()
            getTableData()
            message.info('新增成功...')
          }else{
            message.error('新增失败...')
          }
        }else{
          val.edit_id = id
          val.delay_date    = val.delay_date ? dayjs(val.delay_date).format('YYYY-MM-DD') : ''
          const result = await reqEditItemDatas(val)
          if(result.status === 1){
            setIsModalOpen(false)
            form_add.resetFields()
            getTableData()
            message.info('编辑成功...')
          }else{
            message.error('编辑失败...')
          }
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
      // if(val.delivery_date){
      //    val.delivery_date_start = dayjs(val.delivery_date[0]).format('YYYY-MM-DD')
      //    val.delivery_date_end   = dayjs(val.delivery_date[1]).format('YYYY-MM-DD')
      // }
      // if(val.create_time){
      //    val.create_time_start = dayjs(val.create_time[0]).format('YYYY-MM-DD')
      //    val.create_time_end   = dayjs(val.create_time[1]).format('YYYY-MM-DD')
      // }
      // delete(val.delivery_date)
      // delete(val.create_time)
      if(val.base === '全部'){
        val.base = ''
      }
      const reqData = await reqGetItemDatas(val)
      setData(reqData.data)
      setTableLoading(false)
    })
  }

  const handReset = () => {
    form.resetFields(['name','status','settlement_status'])
  }
  
  const handDelete = async (e) => {
    const result = await reqDeleteItemDatas(e)
    if(result.status === 1){
      getTableData()
      message.info('删除成功...')
    }else{
      message.error('删除失败...')
    }
  }

  const column = [
    {
      title: 'ID',
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
      dataIndex: 'service_line',
      fixed: 'left'
    },
    {
      title: '基地',
      dataIndex: 'base',
      fixed: 'left'
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
      title: '周期(天)',
      dataIndex: 'day',
      render:(day)=>{
        if(day === '0'){
          return (
            <>长期</>
          )
        }else{
          return (
            <>{ day }</>
          )
        }
      }
    },
    {
      title: '结算周期(天)',
      dataIndex: 'settlement_day'
    },
    {
      title: '标注团队',
      dataIndex: 'work_team',
    },
    {
      title: '团队作业人数',
      dataIndex: 'number_workers',
    },
    {
      title: '结算类型',
      dataIndex: 'settlement_type',
    },
    {
      title: '数量级',
      dataIndex: 'amount',
    },
    {
      title: '作业日期',
      dataIndex: 'start_date',
      render:(start_date)=>{
        return (
          dayjs(start_date).format('YYYY-MM-DD')
        )
      }
    },
    {
      title: '交付日期',
      dataIndex: 'delivery_date',
    },
    {
      title: '延期日期',
      dataIndex: 'delay_date',
      render:(delay_date)=>{
        if(delay_date){
          return (
            dayjs(delay_date).format('YYYY-MM-DD')
          )
        }else{
          return <></>
        }
      }
    },
    // {
    //   title: '项目进度',
    //   dataIndex: '',
    //   render:()=>{
    //     return (
    //       <Progress percent={70} />
    //     )
    //   }
    // },
    {
      title: '项目状态',
      dataIndex: 'status',
    },
    {
      title: '结算状态',
      dataIndex: 'settlement_status',
    },
    {
      title: '交付状态',
      dataIndex: 'delivery_status',
    },
    {
      title: '创建日期',
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
        if(rowData.children){
          return (
            <div>
              {/* <Button onClick={()=> handClink('detail',rowData)}>详情</Button>&nbsp;&nbsp; */}
              <Button onClick={()=> handClink('add',rowData)}>新增子项目</Button>&nbsp;&nbsp;
              { storageUtils.getRoleName() === '组长' ? <></> : <Button onClick={()=> handClink('edit',rowData)}>编辑</Button> } &nbsp;&nbsp;
              {/* <Button onClick={()=> handClink('edit',rowData)}>生产报告</Button> */}
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
        }else{
          return (
            <div>
              {/* <Button onClick={()=> handClink('detail',rowData)}>详情</Button>&nbsp;&nbsp; */}
              <Button onClick={()=> handClink('edit',rowData)}>编辑</Button>&nbsp;&nbsp;
              {/* <Button onClick={()=> handClink('edit',rowData)}>生产报告</Button> */}
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
    }
  ];
 
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
              <Form.Item name="name" label="项目名称" {...itemLayout}>
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
              <Form.Item name="settlement_status" label="结算状态" {...itemLayout}>
              <Select
                  placeholder='请输入结算状态'
                  style={{textAlign:'left'}}
                  allowClear={true}
                  options={[
                    {
                      value: '未开始',
                      label: '未开始',
                    },
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
            {/* <Col span={6}>
              <Form.Item name="delivery_date" label="交付日期" {...itemLayout}>
                <RangePicker     
                  placeholder={['开始日期', '结束日期']}
                  // onChange={onChange} 
                  style={{width:'250px'}}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="create_time" label="创建日期" {...itemLayout}>
                <RangePicker     
                  placeholder={['开始日期', '结束日期']}
                  style={{width:'250px'}}
                />
              </Form.Item>
            </Col> */}
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
        title={ modalType ? '编辑' : '新建'}
        onOk={handleOk}
        onCancel={handleCancle}
        okText='确定'
        cancelText='取消'
        maskClosable={false}
        width={'75%'}
      >
        <Form
          form={form_add}
          labelCol={{span:5}} 
          wrapperCol={{span:10}} 
          style={{marginTop:'50px'}}
        >
           <Form.Item
            label='项目名称'
            name="name"
            rules={[{required:true,message:'请输入项目名称'}]}
          >
            <Input placeholder='请输入项目名称' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='业务线'
            name="service_line"
            rules={[{required:true,message:'业务线'}]}
          >
            <Select
              placeholder="请输入业务线"
              style={{textAlign:'left'}}
              disabled={_disable}
              allowClear={true}
            >
              {_service_lineData?.filter((option) => option.name !== "全部")
                  ?.map((option) => (
                    <Option key={option.id} value={option.name}>
                      {option.name}
                    </Option>
                  ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            label='基地'
            name="base"
            rules={[{required:true,message:'请输入基地'}]}
          >
            <Select
              mode="multiple"
              placeholder='请输入基地'
              style={{textAlign:'left'}}
              disabled={_disable}
            >
              {_baseData?.filter((option) => option.name !== "全部")
                  ?.map((option) => (
                    <Option key={option.id} value={option.name}>
                      {option.name}
                    </Option>
                  ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            label='业务负责人'
            name="business_leader"
            rules={[{required:true,message:'请输入业务负责人'}]}
          >
            <Input placeholder='请输入业务负责人' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='项目经理'
            name="item_manager"
            rules={[{required:true,message:'请输入项目经理'}]}
          >
            <Select
              mode="multiple"
              placeholder="请输入项目经理"
              style={{textAlign:'left'}}
              disabled={_disable}
            >
              {
                item_manager_arr?.map((option)=>(
                  <Option key={option.id} value={option.name}>
                    {option.name}
                  </Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            label='组长'
            name="group_manager"
            rules={[{required:true,message:'请输入组长'}]}
          >
            <Select
              mode="multiple"
              placeholder="请输入组长"
              style={{textAlign:'left'}}
              disabled={_disable}
            >
              {
                group_manager_arr?.map((option)=>(
                  <Option key={option.id} value={option.name}>
                    {option.name}
                  </Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            label='培训师'
            name="trainer"
            rules={[{required:true,message:'请输入培训师'}]}
          >
             <Select
              mode="multiple"
              placeholder="请输入培训师"
              style={{textAlign:'left'}}
              disabled={_disable}
            >
              {
                trainer_arr?.map((option)=>(
                  <Option key={option.id} value={option.name}>
                    {option.name}
                  </Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            label='标注团队'
            name="work_team"
            rules={[{required:true,message:'请输入标注团队'}]}
          >
            <Input placeholder='如: xxx团队'/>
          </Form.Item>
          <Form.Item
            label='团队作业人数(个)'
            name="number_workers"
            initialValue={0}
            rules={[{required:true,message:'请输入团队作业人数'}]}
          >
            <InputNumber placeholder='请输入团队作业人数' min={0}/>
          </Form.Item>
          <Form.Item
            label='结算类型'
            name="settlement_type"
            rules={[{required:true,message:'请输入结算类型'}]}
          >
            <Select
              placeholder="请输入结算类型"
              style={{textAlign:'left'}}
              allowClear={true}
              disabled={_disable}
            >
              {
                settlement_type?.map((option)=>(
                  <Option key={option.id} value={option.name}>
                    {option.name}
                  </Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            label='单价(元)'
            name="price"
            initialValue={0}
            rules={[{required:true,message:'请输入单价'}]}
          >
            <InputNumber placeholder='请输入单价' min={0} disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='数量级'
            name="amount"
            initialValue={0}
          >
            <InputNumber min={0} disabled={_disable}/>
            {/* <span style={{color:'red',marginLeft:'10px'}}>长期项目不填</span> */}
          </Form.Item>
          <Form.Item
            label='作业日期'
            name="start_date"
            rules={[{required:true,message:'请输入作业日期'}]}
          >
            <DatePicker
              placeholder={['请选择时间']}
              style={{width:'200px'}}
              disabled={_disable}
            />
          </Form.Item>
          <Form.Item
            label='交付日期(*长期不填)'
            name="delivery_date"
          >
            <DatePicker placeholder={['请选择时间']} style={{width:'200px'}} disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='延期日期'
            name="delay_date"
            hidden={delay_date_status}
          >
            <DatePicker placeholder={['请选择时间']} style={{width:'200px'}}/>
          </Form.Item>
          <Form.Item
            label='周期(天)(*长期不填)'
            name="day"
            initialValue={0}
          >
            <InputNumber min={0} disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='结算周期(天)'
            name="settlement_day"
            initialValue={0}
            rules={[{required:true,message:'请输入结算周期'}]}
          >
            <InputNumber placeholder='请输入结算周期' min={0} disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='加班类型'
            name="overtime_type"
            rules={[{required:true,message:'请输入加班类型'}]}
          >
            <Select
              placeholder="请输入加班类型"
              style={{textAlign:'left'}}
              allowClear={true}
              disabled={_disable}
            >
              {
                overtime_type?.map((option)=>(
                  <Option key={option.id} value={option.name}>
                    {option.name}
                  </Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            label='备注'
            name="detail"
            initialValue=''
          >
            <TextArea placeholder='请输入项目简介' rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Item;

