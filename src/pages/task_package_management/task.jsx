/*
 * @Description: 任务包管理
 * @Author: wangyonghong
 * @Date: 2024-09-30 20:37:02
 * @LastEditTime: 2025-05-12 13:38:36
 */
import React, { useRef, useEffect, useState } from 'react'
import { SearchOutlined, RedoOutlined, PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Table, Select, message, Col, Row, DatePicker, InputNumber, Divider, Tooltip, Tabs } from 'antd'
import dayjs from 'dayjs';
// import { BASE } from '../../utils/networkUrl'
import '../common_css/style.css'
import { HotTable } from "@handsontable/react";
import { addClassesToRows } from "../handsontable/hooksCallbacks.ts";
import 'handsontable/dist/handsontable.full.min.css';
import storageUtils from '../../utils/storageUtils'
import { reqGetTaskDatas,
         reqAddTaskDatas,    
         reqEditTaskDatas, 
        //  reqDeleteTaskDatas,
         reqGetTaskEffectDetailDatas,
         reqGetCheckDatas,
         reqAddCheckDatas,
         reqGetDetailDatas,
         reqGetSettlementTypeDatas,
         reqGetDeliveryRequirementDatas,
         reqGetItemsDatas,
         reqGetBaseDatas,
         reqGetServiceLineDatas,
         reqGetServiceLineDatas_,reqAddTaskDayDatas
       } from '../../api/index'
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const itemLayout = { 
  labelCol:{span:7},
  wrapperCol:{span:16} 
}
const { Option } = Select;

const Task = () => {
  const hotRef = useRef(null);
  const [ height, setHeight ] = useState(0);
  const [ modalType, setModalType ] = useState(0)
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ isEffectModalOpen, setIsEffectModalOpen ] = useState(false)
  const [ isModalDetailOpen, setIsModalDetailOpen ] = useState(false)
  const [ isModalCheckOpen, setIsModalCheckOpen ] = useState(false)
  const [ data, setData ] = useState([])
  const [ effect_detail_data, setEffectDetailData ] = useState([])
  const [ check_data, setCheckDatas ] = useState([])
  const [ id, setId ] = useState(0)
  const [ task_id, setTaskId ] = useState(0)
  const [ _item, setItem ] = useState('')
  const [ _base, setBase ] = useState('')
  const [ table_loading, setTableLoading ] = useState(true)
  const [ delay_date_status, setDelayDateStatus ] = useState(true)
  const [ settlement_type, setSettlementTypeData ] = useState([])
  const [ delivery_requirement, setDeliveryRequirementData ] = useState([])
  const [ itemData, setItemData ] = useState([])
  const [ baseData, setBaseData ] = useState([])
  const [ service_lineData, setServiceLineDataData ] = useState([])
  const [ _service_lineData, _setServiceLineDataData ] = useState([])
  const [ aaa, setAaa ] = useState(false)
  const [ bbb, setBbb ] = useState(false)
  const [ task_day_status, setTaskDayStatus ] = useState(true)
  const [ task_hour_status, setTaskHourStatus ] = useState(true)
  const [ task_month_status, setTaskMonthStatus ] = useState(true)
  const [ form ] = Form.useForm();
  const [ form_add ] = Form.useForm();
  const [ form_effect ] = Form.useForm();
  const [ form_detail ] = Form.useForm();
  const [ form_check ] = Form.useForm();
  const [ messageApi, contextHolder ] = message.useMessage();

  useEffect(() => {
    setHeight(window.innerHeight * 0.5); //动态设置表格高度为屏幕的高度（例如：80%）
    getSettlementTypeData()
    getDeliveryRequirementData()
    _getServiceLineData()
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

  const getBaseData = async () => {
    const reqData = await reqGetBaseDatas()
    return new Promise((resolve) => {
      setTimeout(() => resolve(reqData.data), 100);
    });
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

  // const getTableData = async () => {
  //   const reqData = await reqGetTaskDatas()
  //   setData(reqData.data)
  //   setTableLoading(false)
  // }

  const getTableData = async (base,serviceLine) => {
    if(base === '全部'){
      base = ''
    }
    if(serviceLine === '全部'){
      serviceLine = ''
    }
    const reqData = await reqGetTaskDatas({ base:base, service_line:serviceLine })
    setData(reqData.data)
    setTableLoading(false)
  }

  const getSettlementTypeData = async () => {
    const reqData = await reqGetSettlementTypeDatas()
    setSettlementTypeData(reqData.data)
  }

  const getDeliveryRequirementData = async () => {
    const reqData = await reqGetDeliveryRequirementDatas()
    setDeliveryRequirementData(reqData.data)
  }

  // const getItemsData = async () => {
  //   const reqData = await reqGetItemsDatas()
  //   setItemData(reqData.data)
  // }
  
  // const getTaskProgressData = async () => {
  //   const reqData = await reqTaskProgressDatas()
  //   setNum(reqData.data)
  // }

  const reqGetEffectDetailDatas = async (id) => {
    const reqData = await reqGetTaskEffectDetailDatas(id)
    setEffectDetailData(reqData.data)
  }

  const getCheckDatas = async (id) => {
    const reqData = await reqGetCheckDatas(id)
    setCheckDatas(reqData.data)
  }

  const getDetailDatas = async (id) => {
    const reqData = await reqGetDetailDatas(id)
    reqData.data[0].recently_push_date = reqData.data[0].recently_push_date === '' ? '' : dayjs(reqData.data[0].recently_push_date).format('YYYY-MM-DD HH:mm:ss')
    reqData.data[0].frist_push_date = reqData.data[0].frist_push_date === '' ? '' : dayjs(reqData.data[0].frist_push_date).format('YYYY-MM-DD HH:mm:ss')
    reqData.data[0].start_date = dayjs(reqData.data[0].start_date).format('YYYY-MM-DD')
    reqData.data[0].end_date = reqData.data[0].end_date ? dayjs(reqData.data[0].end_date).format('YYYY-MM-DD') : ''
    reqData.data[0].delivery_date = reqData.data[0].delivery_date ? dayjs(reqData.data[0].delivery_date).format('YYYY-MM-DD') : ''
    form_detail.setFieldsValue(reqData.data[0])
  }

  const handClink = (type,rowData) => {
    if(type === 'add'){
      setIsModalOpen(!isModalOpen)
      setModalType(0)
      setDelayDateStatus(true)
      setTaskMonthStatus(true)
      setTaskDayStatus(true)
      setTaskHourStatus(true)
      setId(rowData?rowData.id:'')
    }else if(type === 'effect'){
      setTaskId(rowData.id)
      setItem(rowData.item)
      setBase(rowData.base)
      setIsEffectModalOpen(!isEffectModalOpen)
      form_effect.setFieldsValue(rowData)
      reqGetEffectDetailDatas({id:rowData.id})
    }else if(type === 'edit'){ 
      setIsModalOpen(!isModalOpen)
      setModalType(1)
      setDelayDateStatus(false)
      const cloneData = JSON.parse(JSON.stringify(rowData))
      const settlement_type = cloneData.settlement_type
      if(settlement_type === '包月'){
        setTaskMonthStatus(false)
        setTaskDayStatus(true)
        setTaskHourStatus(true)
      }else if(settlement_type === '包天'){
        setTaskMonthStatus(true)
        setTaskDayStatus(false)
        setTaskHourStatus(true)
      }else if(settlement_type === '包时'){
        setTaskMonthStatus(true)
        setTaskDayStatus(true)
        setTaskHourStatus(false)
      }else{
        setTaskMonthStatus(true)
        setTaskDayStatus(true)
        setTaskHourStatus(true)
      }
      cloneData.start_date    = dayjs(cloneData.start_date)
      cloneData.delivery_date = cloneData.delivery_date ? dayjs(cloneData.delivery_date) : ''
      cloneData.end_date      = cloneData.end_date ? dayjs(cloneData.end_date) : ''
      cloneData.get_task_date = cloneData.get_task_date ? dayjs(cloneData.get_task_date) : ''
      cloneData.delay_date    = cloneData.delay_date ? dayjs(cloneData.delay_date) : ''
      setId(cloneData.id)
      form_add.setFieldsValue(cloneData)
    }else if(type === 'check'){
      setTaskId(rowData.id)
      setIsModalCheckOpen(!isModalCheckOpen)
      getCheckDatas({id:rowData.id})
    }else{
      getDetailDatas({id:rowData.id})
      setIsModalDetailOpen(!isModalDetailOpen)
    }
  }

  const handleDetailCancle = () => {
    form_detail.resetFields()
    setIsModalDetailOpen(!isModalDetailOpen)
  } 

  const handleOk = () => {
    form_add.validateFields().then( async (val)=>{
        val.start_date    = dayjs(val.start_date).format('YYYY-MM-DD')
        val.delivery_date = val.delivery_date ? dayjs(val.delivery_date).format('YYYY-MM-DD') : ''
        val.end_date      = val.end_date ? dayjs(val.end_date).format('YYYY-MM-DD') : ''
        if(modalType === 0){
          const result = await reqAddTaskDatas(val)
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
          val.get_task_date = val.get_task_date ? dayjs(val.get_task_date).format('YYYY-MM-DD') : ''
          val.delay_date = val.delay_date ? dayjs(val.delay_date).format('YYYY-MM-DD') : ''
          const result = await reqEditTaskDatas(val)
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

  const handleEffectCancle = () => {
    setIsEffectModalOpen(!isEffectModalOpen)
    form_effect.resetFields()
  }

  const handSearch = () => {
    form.validateFields().then( async (val)=>{
      const reqData = await reqGetTaskDatas(val)
      setData(reqData.data)
      setTableLoading(false)
    })
  }

  const handReset = () => {
    form.resetFields()
  }
  
  // const handDelete = async (e) => {
  //   const result = await reqDeleteTaskDatas(e)
  //   if(result.status === 1){
  //     getTableData()
  //     message.info('已暂停...')
  //   }else{
  //     message.error('暂停失败...')
  //   }
  // }

  const handleCheckCancle = () => {
    setIsModalCheckOpen(false)
  }

  const handleCheck = () => {
    form_check.validateFields().then( async (val)=>{
        val.task_id = task_id
        val.date    = dayjs(val.date).format('YYYY-MM-DD')
        const result = await reqAddCheckDatas(val)
        if(result.status === 1){
          form_check.resetFields()
          getCheckDatas({id:task_id})
          message.info('新增成功...')
        }else{
          message.error('新增失败...')
        }
    }).catch(()=>{
      messageApi.error('参数有误...请检查!!!')
    }
    )
  }

  const selectHandle = async (e) => {
    const reqData = await reqGetItemsDatas({service_line:e})
    setItemData(reqData.data)
  }
  
  const selectItemHandle = async (e) => {
    const reqData = await reqGetItemsDatas({name:e})
    // form_add.setFieldValue(reqData.data[0])
    const cloneData = JSON.parse(JSON.stringify(reqData.data))
    form_add.setFieldsValue(cloneData[0])
  }
  
  const selectSettlementTypeHandle = (e) => {
    if(e === '包月'){
      setTaskMonthStatus(false)
      setTaskDayStatus(true)
      setTaskHourStatus(true)
    }else if(e === '包天'){
      setTaskMonthStatus(true)
      setTaskDayStatus(false)
      setTaskHourStatus(true)
    }else if(e === '包时'){
      setTaskMonthStatus(true)
      setTaskDayStatus(true)
      setTaskHourStatus(false)
    }else{
      setTaskMonthStatus(true)
      setTaskDayStatus(true)
      setTaskHourStatus(true)
    }
  }
  
  const saveClickCallback = async () => {
    const hot = hotRef.current?.hotInstance;
    const item = _item
    const base = _base
    const _task_id = task_id
    const result = await reqAddTaskDayDatas({
      data:hot?.getData(),
      item:item,
      base:base,
      task_id:_task_id
    })
    if(result.status === 1){
      message.info('新增成功...')
      hot.loadData([])
    }else{
      message.error('新增失败...')
    }
  };

  const handleTabChange = (key) => {
    if(key === '1'){
      reqGetEffectDetailDatas({id:task_id})
    }
  };

  //当月的日期
  const yearMonthOptions = generateCurrentMonthOptions();
  
  function generateCurrentMonthOptions() {
    const options = [];
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 注意：getMonth() 是 0~11，0代表1月
  
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 当月天数
  
    for (let day = 2; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const formatted = date.toISOString().split('T')[0]; // 格式化成 'YYYY-MM-DD'
      options.push(formatted);
    }
  
    return options;
  }
  
  const effect_column = [
    {
      title: '日期',
      dataIndex: 'date',
      type: 'dropdown',
      width: 120,
      source: yearMonthOptions 
    },
    {
      title: '时间段',
      dataIndex: 'time_frame',
      width: 150
    },
    {
      title: '姓名',
      dataIndex: 'worker_name',
      width: 110
    },
    {
      title: '标注量级',
      dataIndex: 'work_amount'
    },
    {
      title: '完成量级',
      dataIndex: 'completed_amount'
    },
    {
      title: '质检量级',
      dataIndex: 'quality_amount'
    },
    {
      title: '抽检总量',
      dataIndex: 'spot_check_amount'
    },
    {
      title: '错误总量',
      dataIndex: 'error_amount'
    },
    {
      title: '正确率',
      dataIndex: 'accuracy'
    },
    {
      title: '生产工时',
      dataIndex: 'task_hour'
    },
    {
      title: '非生产工时',
      dataIndex: 'task_no_hour'
    },
    {
      title: '非生产工时备注',
      dataIndex: 'task_no_hour_detail'
    },
    {
      title: '加班工时',
      dataIndex: 'overtime'
    },
    {
      title: '项目标准时效',
      dataIndex: 'item_timeliness'
    }
  ];

  const check_column = [
    {
      title: '质检日期',
      dataIndex: 'date',
      render:(date)=>{
        return (
          dayjs(date).format('YYYY-MM-DD')
        )
      }
    },
    {
      title: '质检类型',
      dataIndex: 'check_type',
    },
    {
      title: '质检是否通过',
      dataIndex: 'is_check',
    },
    {
      title: '质检人',
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
  ];

  // const props = {
  //   name: 'file',
  //   accept: ".xls,.xlsx",
  //   action: `${BASE}/tasks/task/upload?task_id=${task_id}`,
  //   headers: {
  //     authorization: 'authorization-text',
  //     'token': storageUtils.getToken()
  //   },
  //   onChange(info) {
  //     if (info.file.status === 'done') {
  //       if(info.file.response.status === 1){
  //         message.success(`文件${info.file.name}导入成功`);
  //         reqGetEffectDetailDatas({id:task_id})
  //       }else if(info.file.response.status === 0){
  //         message.error(`文件${info.file.name}导入失败`);
  //       }else if(info.file.response.status === 3){
  //         message.error(info.file.response.msg);
  //       }
  //     } else if (info.file.status === 'error') {
  //       message.error(`${info.file.name}上传失败`);
  //     }
  //   },
  // };
  
  // const attachment = '/excel/task_detail_daily.xlsx'

  const column = [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left'
    },
    {
      title: '任务包名称',
      dataIndex: 'name',
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
      title: '所属项目',
      dataIndex: 'item',
    },
    {
      title: '任务包数量级',
      dataIndex: 'amount',
    },
    // {
    //   title: '任务包进度',
    //   render:(e)=>{
    //     return (
    //       <Progress percent={e.task_progress} />
    //     )
    //   }
    // },
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
      title: '标注团队',
      dataIndex: 'work_team',
    },
    {
      title: '任务包状态',
      dataIndex: 'status',
    },
    {
      title: '结算类型',
      dataIndex: 'settlement_type',
    },
    {
      title: '交付要求',
      dataIndex: 'delivery_requirement',
    },
    {
      title: '是否交付',
      dataIndex: 'is_delivery',
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
      render:(delivery_date)=>{
        if(!delivery_date){
          return (
            <>长期</>
          )
        }else{
          return (
            dayjs(delivery_date).format('YYYY-MM-DD')
          )
        }
      }
    },
    {
      title: '完成日期',
      dataIndex: 'end_date',
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
      // fixed: 'right',
      render:(rowData)=>{
          return (
            <div>
              <Button onClick={()=> handClink('effect',rowData)}>每日作业数据</Button>&nbsp;&nbsp;
              { storageUtils.getRoleName() === '组长' ? <></> : <Button onClick={()=> handClink('edit',rowData)}>编辑</Button> } &nbsp;&nbsp;
              <Button onClick={()=> handClink('check',rowData)}>质检</Button>&nbsp;&nbsp;
              {/* { storageUtils.getRoleName() === '组长' ? <></> : <Button onClick={()=> handClink('detail',rowData)}>生产报告</Button> } */}
              {/* <Popconfirm
                description='是否暂停?'
                okText='确认'
                cancelText='取消'
                onConfirm={ () => handDelete(rowData)}
              >
                {rowData.status === '已暂停' ? '' : <Button style={{marginLeft:'15px'}}>暂停</Button>}
              </Popconfirm> */}
            </div>
          )
      }
    }
  ];

  const tabItems = [
    {
      key: '1',
      label: '数据列表',
      children: 
      <div> 
        <div style={{ width: '100%', height: '90%',overflow:'auto' }}>
            <Table 
              columns={ effect_column } 
              dataSource={ effect_detail_data } 
              rowKey={ data => data.id }  
              // scroll={{ x: 'max-content', y: height }}
              // loading={ table_loading }
            />
        </div>
      </div>
    },
    {
      key: '2',
      label: '数据录入',
      children: 
      <div> 
         <HotTable
            ref={hotRef}
            rowHeaders={true}
            columns={effect_column}
            height={height}
            scrollable={true}
            // dropdownMenu={true}
            hiddenColumns={{
              indicators: true
            }}
            contextMenu={true}
            multiColumnSorting={true}
            filters={true}
            autoWrapRow={true}
            autoWrapCol={true}
            headerClassName="htCenter htMiddle"
            beforeRenderer={addClassesToRows}
            manualRowMove={true}
            navigableHeaders={true}
            minSpareRows={100}
            // persistentState={true}
            licenseKey="non-commercial-and-evaluation"
        />
        <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{marginLeft:'10px', marginTop:'20px'}}>
            <span style={{color:'blue'}}>时间段 输入格式为: 09:00-12:00 或者 13:30-18:00</span>
          </div>
          <div style={{marginRight:'50px', marginTop:'20px'}}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={saveClickCallback}>
              提交数据
            </Button>
          </div>
        </div>
      </div>
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
              <Form.Item name="name" label="任务包名称" {...itemLayout}>
                <Input placeholder='请输入任务包名称'/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="status" label="任务包状态" {...itemLayout}>
              <Select
                  placeholder='请输入任务包状态'
                  style={{textAlign:'left'}}
                  allowClear={true}
                  options={[
                    {
                      value: '未完成',
                      label: '未完成',
                    },
                    {
                      value: '已完成',
                      label: '已完成',
                    },
                    // {
                    //   value: '待验收',
                    //   label: '待验收',
                    // },
                    {
                      value: '已暂停',
                      label: '已暂停',
                    }
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="is_delivery" label="是否交付" {...itemLayout}>
              <Select
                  placeholder='请输入是否交付'
                  style={{textAlign:'left'}}
                  allowClear={true}
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
                <Button onClick={() => handClink('add')} icon={<PlusOutlined />} style={{backgroundColor: "#000000",color:'white'}}> 新增 </Button>&nbsp;&nbsp;
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
        width={'70%'}
      >
        <Form
          form={form_add}
          labelCol={{span:5}} 
          wrapperCol={{span:10}} 
          style={{marginTop:'20px'}}
        >
          <Form.Item
            label='任务包名称'
            name="name"
            rules={[{required:true,message:'请输入任务包名称'}]}
          >
            <Input placeholder='请输入任务包名称'/>
          </Form.Item>
          <Form.Item
            label='业务线'
            name="service_line"
            rules={[{required:true,message:'请输入业务线'}]}
          >
            <Select
              placeholder="请输入业务线"
              style={{textAlign:'left'}}
              onChange={ (e) => selectHandle(e) }
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
            label='所属项目'
            name="item"
            rules={[{required:true,message:'所属项目'}]}
          >
           <Select
                style={{textAlign:'left'}}
                onChange={ (e) => selectItemHandle(e) }
              >
              {
                itemData?.map((option)=>(
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
            <Input />
          </Form.Item>
          <Form.Item
            label='业务负责人'
            name="business_leader"
            initialValue=''
            rules={[{required:true,message:'请输入业务负责人'}]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='项目经理'
            name="item_manager"
            initialValue=''
            rules={[{required:true,message:'请输入项目经理'}]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='组长'
            name="group_manager"
            initialValue=''
            rules={[{required:true,message:'请输入小组长'}]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='标注团队'
            name="work_team"
            initialValue=''
            rules={[{required:true,message:'请输入标注团队'}]}
          >
            <Input placeholder='请输入标注团队'/>
          </Form.Item>
          <Form.Item
            label={
              <span>
                团队作业人员
                <Tooltip title="请输入所有任务包作业人员姓名 请勿换行 输入形式如：李华、张强">
                  <InfoCircleOutlined style={{ marginLeft: 4, color: '#999' }} />
                </Tooltip>
              </span>
            }
            name="workers"
            initialValue=''
            rules={[{required:true,message:'请输入标注员'}]}
          >
            <TextArea placeholder='请输入标注员' rows={6} />
          </Form.Item>
          <Form.Item
            label='任务包数量级(条、个、件)'
            name="amount"
            initialValue={0}
            rules={[{required:true,message:'请输入任务包数量'}]}
          >
            <InputNumber placeholder='请输入任务包数量' min={0}/>
          </Form.Item>
          <Form.Item
            label='交付要求'
            name="delivery_requirement"
            rules={[{required:true,message:'请输入交付要求'}]}
          >
              <Select
              placeholder="请输入交付要求"
              style={{textAlign:'left'}}
              allowClear={true}
            >
              {
                delivery_requirement?.map((option)=>(
                  <Option key={option.id} value={option.name}>
                    {option.name}
                  </Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            label={
              <span>
                商务单价 (元) 
                <Tooltip title="商务单价是指公司拿到的项目价格">
                  <InfoCircleOutlined style={{ marginLeft: 4, color: '#999' }} />
                </Tooltip>
              </span>
            }
            name="business_price"
            initialValue={0}
            rules={[{required:true,message:'请输入商务单价'}]}
          >
            <InputNumber min={0} />
            {/* <div style={{ display: 'flex', alignItems: 'center' }}>
              <InputNumber 
                defaultValue={0}
                min={0} 
                onChange={(value) => form_add.setFieldsValue({ business_price: value })}
              />
              <span style={{ marginLeft: 8, color:'red' }}>公司拿到的项目价格</span>
            </div> */}
          </Form.Item>
          <Form.Item
            label={
              <span>
                下放单价 (元) 
                <Tooltip title="下放单价是指员工拿到的项目价格">
                  <InfoCircleOutlined style={{ marginLeft: 4, color: '#999' }} />
                </Tooltip>
              </span>
            }
            name="price"
            initialValue={0}
            rules={[{required:true,message:'请输入下放单价'}]}
          >
            <InputNumber min={0} />
            {/* <div style={{ display: 'flex', alignItems: 'center' }}>
              <InputNumber
                // defaultValue={0}
                value={form_add.getFieldValue('price')} 
                min={0} 
                onChange={(value) => form_add.setFieldsValue({ price: value })}
               />
              <span style={{ marginLeft: 8, color:'red' }}>员工拿到的项目价格</span>
            </div> */}
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
              onChange={ (e) => selectSettlementTypeHandle(e) }
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
            label='任务包周期(月)'
            name="month"
            initialValue={0}
            hidden={task_month_status}
          >
            <InputNumber placeholder='请输入任务包周期' min={0}/>
          </Form.Item>
          <Form.Item
            label='任务包周期(天)'
            name="day"
            initialValue={0}
            hidden={task_day_status}
          >
            <InputNumber placeholder='请输入任务包周期' min={0}/>
          </Form.Item>
          <Form.Item
            label='任务包周期(时)'
            name="hour"
            initialValue={0}
            hidden={task_hour_status}
          >
            <InputNumber placeholder='请输入任务包周期' min={0}/>
          </Form.Item>
          <Form.Item
            label='出勤要求'
            name="attendance_type"
            rules={[{required:true,message:'请输入出勤要求'}]}
          >
            <Select
                placeholder='请输入出勤要求'
                options={[
                  {
                    value: '双休',
                    label: '双休',
                  },
                  {
                    value: '大小周',
                    label: '大小周',
                  },
                  {
                    value: '排班制',
                    label: '排班制',
                  },
                  {
                    value: '无',
                    label: '无',
                  }
                ]}
              />
          </Form.Item>
          <Form.Item
            label='作业日期'
            name="start_date"
            rules={[{required:true,message:'请输入作业日期'}]}
          >
            <DatePicker
              placeholder={['请选择时间']}
              style={{width:'200px'}}
              />
          </Form.Item>
          <Form.Item
          label={
            <span>
              交付日期
              <Tooltip title="长期项目不需要填写">
                <InfoCircleOutlined style={{ marginLeft: 4, color: '#999' }} />
              </Tooltip>
            </span>
          }
            name="delivery_date"
          >
            <DatePicker 
                placeholder={['请选择时间']} 
                style={{width:'200px'}}
            />
            {/* <div style={{ display: 'flex', alignItems: 'center' }}>
              <DatePicker 
                placeholder={['请选择时间']} 
                style={{width:'200px'}}
                onChange={(date) => form_add.setFieldsValue({ delivery_date: date })}
              />
              <span style={{ marginLeft: 8, color:'red' }}>长期项目不填</span>
            </div> */}
          </Form.Item>
          <Form.Item
            label={
              <span>
                完成日期
                <Tooltip title="任务包预计实际完成的日期">
                  <InfoCircleOutlined style={{ marginLeft: 4, color: '#999' }} />
                </Tooltip>
              </span>
            }
            name="end_date"
          >
            <DatePicker 
              placeholder={['请选择时间']} 
              style={{width:'200px'}}
            />
             {/* <div style={{ display: 'flex', alignItems: 'center' }}>
              <DatePicker 
                placeholder={['请选择时间']} 
                style={{width:'200px'}}
                onChange={(date) => form_add.setFieldsValue({ end_date: date })}
              />
              <span style={{ marginLeft: 8, color:'red' }}>项目预计完成日期、长期项目不填</span>
            </div> */}
          </Form.Item>
          <Form.Item
            label='内部人员薪资结构'
            name="salary_structure"
            initialValue=''
          >
            <Input placeholder='如:底薪3000、全勤500、加班费1.5倍'/>
          </Form.Item>
          <Form.Item
            label='备注'
            name="detail"
            initialValue=''
          >
            <TextArea placeholder='请输入任务包简介' rows={4} />
          </Form.Item>
          <Form.Item
            label={
              <span>
                领取日期
                <Tooltip title="指任务包的领取日期、具体哪天拿到的任务包数据">
                  <InfoCircleOutlined style={{ marginLeft: 4, color: '#999' }} />
                </Tooltip>
              </span>
            }
            name="get_task_date"
            hidden={delay_date_status}
          >
            <DatePicker placeholder={['请选择时间']} style={{width:'200px'}}/>
          </Form.Item>
          <Form.Item
            label={
              <span>
                延期日期
                <Tooltip title="指任务包未按预期日期完成、延期至那天完成">
                  <InfoCircleOutlined style={{ marginLeft: 4, color: '#999' }} />
                </Tooltip>
              </span>
            }
            name="delay_date"
            hidden={delay_date_status}
          >
            <DatePicker placeholder={['请选择时间']} style={{width:'200px'}}/>
          </Form.Item>
          <Form.Item
            label={
              <span>
                是否完成交付
                <Tooltip title="完成交付给甲方的日期">
                  <InfoCircleOutlined style={{ marginLeft: 4, color: '#999' }} />
                </Tooltip>
              </span>
            }
            name="is_delivery"
            hidden={delay_date_status}
          >
              <Select
                options={[
                  {
                    value: '否',
                    label: '否',
                  },
                  {
                    value: '是',
                    label: '是',
                  }
                ]}
              />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={isEffectModalOpen}
        title={''}
        onCancel={handleEffectCancle}
        okText='确定'
        cancelText='取消'
        maskClosable={false}
        width={'90%'}
        footer={null}
      >
        <Form
          form={form_effect}
          labelCol={{span:10}} 
          wrapperCol={{span:20}} 
          layout='inline'
          style={{marginTop:'30px',marginBottom:'30px'}}
        >
            <Form.Item
            label='业务负责人'
            name="business_leader"
           >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
           <Form.Item
            label='项目经理'
            name="item_manager"
           >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
           <Form.Item
            label='组长'
            name="group_manager"
           >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
        </Form>
        <Divider style={{color:'#1677ff',fontWeight:'bold'}}>作业人员每日作业数据</Divider>
        {/* <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
            <div>
              <Upload
                  showUploadList={false} 
                  {...props}
                >
                  <Button style={{width:'100px'}} icon={<UploadOutlined />}>导入</Button>
              </Upload>
            </div>
            <div style={{marginLeft:'50px'}}>
              <a 
                  href={ BASE + attachment} 
                  download={'附件'} 
                  style={{ color: '#007bff' }}
                >
                { `📎 人效作业数据模板` }
              </a>
              <span style={{color:'red',marginLeft:'50px'}}>导入之前请慎重核验数据格式、导入异常联系王永红...</span>
            </div>
        </div>
        <div style={{ width: '100%', height: '85%', overflow:'auto',marginTop:'10px'}}>
          <Table 
            columns={ effect_column } 
            dataSource={ effect_detail_data } 
            rowKey={ data => data.id }  
            scroll={{x: 'max-content'}}
          />
        </div> */}
        <Tabs type="card" items={tabItems} onChange={handleTabChange} />
      </Modal>
      <Modal
        open={isModalDetailOpen}
        title={''}
        onCancel={handleDetailCancle}
        maskClosable={false}
        width={'75%'}
        footer={null}
      >
        <Form
          form={form_detail}
          labelCol={{span:5}} 
          wrapperCol={{span:10}} 
          style={{marginTop:'50px'}}
        >
           <Form.Item
            label='任务包名称'
            name="name"
          >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
          <Form.Item
            label='所属项目'
            name="item"
          >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
          <Form.Item
            label='状态'
            name="item"
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
            label='业务负责人'
            name="business_leader"
          >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
          <Form.Item
            label='项目经理'
            name="item_manager"
          >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
          <Form.Item
            label='小组长'
            name="group_manager"
          >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
          <Form.Item
            label='标注团队'
            name="work_team"
          >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
          <Form.Item
            label='团队作业人员'
            name="workers"
          >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
          <Form.Item
            label='任务包数量级'
            name="amount"
          >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
          <Form.Item
            label='交付要求'
            name="delivery_requirement"
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
            label='商务单价'
            name="business_price"
          >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
          <Form.Item
            label='下放单价'
            name="price"
          >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
          <Form.Item
            label='任务包周期'
            name="day"
          >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
          <Form.Item
            label='出勤要求'
            name="attendance_type"
          >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
          <Form.Item
            label='质检驳回次数'
            name="quality_rejected_number"
          >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
          <Form.Item
            label='验收驳回次数'
            name="acceptance_rejected_number"
          >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
          <Form.Item
            label='最近提交时间'
            name="recently_push_date"
          >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
          <Form.Item
            label='首次提交时间'
            name="frist_push_date"
          >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
          <Form.Item
            label='作业日期'
            name="start_date"
          >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
          <Form.Item
            label='完成日期'
            name="end_date"
          >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
          <Form.Item
            label='交付日期'
            name="delivery_date"
          >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
          <Form.Item
            label='领取日期'
            name="get_task_date"
          >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
          <Form.Item
            label='延期日期'
            name="delay_date"
          >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
          <Form.Item
            label='内部人员薪资结构'
            name="salary_structure"
          >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
          {/* <Form.Item
            label='甲方任务包链接'
            name="attachment"
          >
            <Input variant="borderless" disabled={true}/>
          </Form.Item> */}
          <Form.Item
            label='任务包简介'
            name="detail"
          >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={isModalCheckOpen}
        title={'质检信息'}
        onCancel={handleCheckCancle}
        maskClosable={false}
        width={'75%'}
        footer={null}
      >
        <Form
          form={form_check}
          labelCol={{span:5}} 
          wrapperCol={{span:10}} 
          style={{marginTop:'20px'}}
        >
          <Form.Item
            label='质检日期'
            name="date"
            rules={[{required:true,message:'请输入质检日期'}]}
          >
            <DatePicker
              placeholder={['请输入质检日期']}
              style={{width:'330px'}}
            />
          </Form.Item>
          <Form.Item
            label='质检类型'
            name="check_type"
            rules={[{required:true,message:'请输入质检类型'}]}
          >
            <Select
                placeholder='请输入质检类型'
                style={{width:'330px'}}
                options={[
                  {
                    value: '内部质检',
                    label: '内部质检',
                  },
                  {
                    value: '业务方质检',
                    label: '业务方质检',
                  }
                ]}
              />
          </Form.Item>
          <Form.Item
             label='质检是否通过'
             name="is_check"
             rules={[{required:true,message:'请输入质检是否通过'}]}
          >
            <Select
              placeholder='请输入质检是否通过'
              style={{width:'330px'}}
              options={[
                {
                  value: '通过',
                  label: '通过',
                },
                {
                  value: '不通过',
                  label: '不通过',
                }
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button style={{marginLeft:'50%'}} onClick={ handleCheck } type='primary' htmlType='submit'> + 新增 </Button>
          </Form.Item>
        </Form>
        <div style={{ width: '100%', height: '85%', overflow:'auto',marginTop:'10px'}}>
          <Table 
            columns={ check_column } 
            dataSource={ check_data } 
            rowKey={ data => data.id }  
            pagination={false}
          />
        </div>
      </Modal>
    </div>
  )
}

export default Task;

