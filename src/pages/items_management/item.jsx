/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-09-30 20:33:58
 * @LastEditTime: 2024-12-02 14:17:18
 */
import React, { useEffect, useState } from 'react'
import { SearchOutlined, RedoOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Table, Select, message, Col, Row, DatePicker, InputNumber, Popconfirm } from 'antd'
import dayjs from 'dayjs';
import '../common_css/style.css'
import { reqGetItemDatas, 
         reqAddItemDatas, 
         reqEditItemDatas, 
         reqDeleteItemDatas, 
         reqGetBaseDatas, 
         reqGetServiceLineDatas,
         reqGetSettlementTypeDatas,
         reqGetOvertimeTypeDatas } from '../../api/index'
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const itemLayout = { labelCol:{span:7},wrapperCol:{span:15} }
const { Option } = Select;

const Item = () => {
  const [ modalType, setModalType ] = useState(0)
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ data, setData ] = useState([])
  const [ id, setId ] = useState(0)
  const [ _disable, setDisable ] = useState(false)
  const [ table_loading, setTableLoading ] = useState(true)
  const [ delay_date_status, setDelayDateStatus ] = useState(true)
  const [ baseData, setBaseData ] = useState([])
  const [ service_lineData, setServiceLineDataData ] = useState([])
  const [ settlement_type, setSettlementTypeData ] = useState([])
  const [ overtime_type, setOvertimeTypeData ] = useState([])
  const [ form ] = Form.useForm();
  const [ form_add ] = Form.useForm();
  const [ messageApi, contextHolder ] = message.useMessage();

  useEffect(() => {
    getTableData()
    getBaseData()
    getServiceLineData()
    getSettlementTypeData()
    getOvertimeTypeData()
  },[])

  const getTableData = async () => {
    const reqData = await reqGetItemDatas()
      setData(reqData.data)
      setTableLoading(false)
  }

  const getBaseData = async () => {
    const reqData = await reqGetBaseDatas()
    setBaseData(reqData.data)
  }

  const getServiceLineData = async () => {
    const reqData = await reqGetServiceLineDatas()
    setServiceLineDataData(reqData.data)
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
      cloneData.delivery_date = dayjs(cloneData.delivery_date)
      cloneData.delay_date = cloneData.delay_date ? dayjs(cloneData.delay_date) : ''
      setId(cloneData.id)
      form_add.setFieldsValue(cloneData)
    }
  }

  const handleOk = () => {
    form_add.validateFields().then( async (val)=>{
        val.start_date    = dayjs(val.start_date).format('YYYY-MM-DD')
        val.delivery_date = dayjs(val.delivery_date).format('YYYY-MM-DD')
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
      const reqData = await reqGetItemDatas(val)
      setData(reqData.data)
      setTableLoading(false)
    })
  }

  const handReset = () => {
    form.resetFields()
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
      title: '基地',
      dataIndex: 'base',
    },
    {
      title: '业务线',
      dataIndex: 'service_line',
    },
    {
      title: '结算类型',
      dataIndex: 'settlement_type',
    },
    {
      title: '结算状态',
      dataIndex: 'settlement_status',
    },
    {
      title: '项目周期',
      dataIndex: 'day',
    },
    {
      title: '结算周期',
      dataIndex: 'settlement_day'
    },
    {
      title: '项目负责人',
      dataIndex: 'item_leader',
    },
    {
      title: '标注团队',
      dataIndex: 'work_team',
    },
    {
      title: '标注员人数',
      dataIndex: 'number_workers',
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
      title: '交付状态',
      dataIndex: 'delivery_status',
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
        >
          <Row>
            <Col span={6}>
              <Form.Item name="name" label="项目名称" {...itemLayout}>
                <Input placeholder='请输入项目名称'/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="base" label="基地" {...itemLayout}>
                <Select
                  placeholder='请输入基地'
                  style={{textAlign:'left'}}
                  allowClear={true}
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
              <Form.Item name="service_line" label="业务线" {...itemLayout}>
                <Select
                  placeholder="请输入业务线"
                  style={{textAlign:'left'}}
                  allowClear={true}
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
            <Col span={6}>
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
            label='项目名称'
            name="name"
            rules={[{required:true,message:'请输入项目名称'}]}
          >
            <Input placeholder='请输入姓名' disabled={_disable}/>
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
              {
                service_lineData?.map((option)=>(
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
              placeholder='请输入基地'
              style={{textAlign:'left'}}
              allowClear={true}
              disabled={_disable}
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
          <Form.Item
            label='项目负责人'
            name="item_leader"
            rules={[{required:true,message:'请输入项目负责人'}]}
          >
            <Input placeholder='请输入项目负责人' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='标注团队'
            name="work_team"
            rules={[{required:true,message:'请输入标注团队'}]}
          >
            <Input placeholder='请输入标注团队'/>
          </Form.Item>
          <Form.Item
            label='标注员人数'
            name="number_workers"
            initialValue={0}
            rules={[{required:true,message:'请输入标注员人数'}]}
          >
            <InputNumber placeholder='请输入标注员人数' min={0}/>
          </Form.Item>
          <Form.Item
            label='审核员'
            name="auditor"
          >
            <Input placeholder='请输入审核员'/>
          </Form.Item>
          <Form.Item
            label='单价'
            name="price"
            initialValue={0}
            rules={[{required:true,message:'请输入单价'}]}
          >
            <InputNumber placeholder='请输入单价' min={0} disabled={_disable}/>
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
            label='交付日期'
            name="delivery_date"
            rules={[{required:true,message:'请输入交付日期'}]}
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
            label='项目周期'
            name="day"
            initialValue={0}
          >
            <InputNumber placeholder='请输入项目周期' min={0} disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='结算周期'
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
            label='项目简介'
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

