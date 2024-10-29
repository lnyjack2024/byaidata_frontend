/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-09-30 20:37:02
 * @LastEditTime: 2024-10-29 14:31:29
 */
import React, { useEffect, useState } from 'react'
import { SearchOutlined, RedoOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Table, Select, message, Col, Row, DatePicker, InputNumber, Progress, Popconfirm, Divider, Upload } from 'antd'
import dayjs from 'dayjs';
import '../common_css/style.css'
import storageUtils from '../../utils/storageUtils'
import { reqGetTaskDatas,
         reqAddTaskDatas,    
         reqEditTaskDatas, 
         reqDeleteTaskDatas 
       } from '../../api/index'
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const itemLayout = { 
  labelCol:{span:7},
  wrapperCol:{span:15} 
}

const Task = () => {
  const [ modalType, setModalType ] = useState(0)
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ isEffectModalOpen, setIsEffectModalOpen ] = useState(false)
  const [ data, setData ] = useState([])
  const [ id, setId ] = useState(0)
  const [ _disable, setDisable ] = useState(false)
  const [ table_loading, setTableLoading ] = useState(true)
  const [ delay_date_status, setDelayDateStatus ] = useState(true)
  const [ form ] = Form.useForm();
  const [ form_add ] = Form.useForm();
  const [ form_effect ] = Form.useForm();
  const [ messageApi, contextHolder ] = message.useMessage();

  useEffect(() => {
    getTableData()
  },[])

  const getTableData = async () => {
    const reqData = await reqGetTaskDatas()
      setData(reqData.data)
      setTableLoading(false)
  }

  const handClink = (type,rowData) => {
    if(type === 'add'){
      setIsModalOpen(!isModalOpen)
      setModalType(0)
      setDisable(false)
      setDelayDateStatus(true)
      setId(rowData?rowData.id:'')
    }else if(type === 'effect'){
      setIsEffectModalOpen(!isEffectModalOpen)
      form_effect.setFieldsValue(rowData)
    }else{ 
      setIsModalOpen(!isModalOpen)
      setModalType(1)
      setDisable(true)
      setDelayDateStatus(false)
      const cloneData = JSON.parse(JSON.stringify(rowData))
      cloneData.start_date = dayjs(cloneData.start_date)
      cloneData.delivery_date = dayjs(cloneData.delivery_date)
      cloneData.end_date = dayjs(cloneData.end_date)
      setId(cloneData.id)
      form_add.setFieldsValue(cloneData)
    }
  }

  const handleOk = () => {
    form_add.validateFields().then( async (val)=>{
        val.start_date    = dayjs(val.start_date).format('YYYY-MM-DD')
        val.delivery_date = dayjs(val.delivery_date).format('YYYY-MM-DD')
        val.end_date    = dayjs(val.end_date).format('YYYY-MM-DD')
        if(modalType === 0){
          const result = await reqAddTaskDatas(val)
          if(result.status === 1){
            reqGetTaskDatas()
            setIsModalOpen(false)
            form.resetFields()
            getTableData()
            message.info('新增成功...')
          }else{
            message.error('新增失败...')
          }
        }else{
          val.edit_id = id
          const result = await reqEditTaskDatas(val)
          if(result.status === 1){
            reqGetTaskDatas()
            setIsModalOpen(false)
            form.resetFields()
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
  
  const handDelete = async (e) => {
    const result = await reqDeleteTaskDatas(e)
    if(result.status === 1){
      getTableData()
      message.info('删除成功...')
    }else{
      message.error('删除失败...')
    }
  }

  const handUploadClink = () => {

  }

  const column = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      fixed: 'left'
    },
    {
      title: '任务包名称',
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
      title: '所属项目',
      dataIndex: 'service_line',
    },
    {
      title: '任务包状态',
      dataIndex: 'settlement_type',
      // render:(text,record,index)=>{
      //   if(text === 'day'){
      //      return '包天'
      //   }else if(text === 'month'){
      //     return '包月'
      //   }else{
      //     return '计件'
      //   }
      // }
    },
    {
      title: '任务包数据量',
      dataIndex: 'day',
    },
    {
      title: '任务包周期',
      dataIndex: 'day',
    },
    {
      title: '任务包进度',
      dataIndex: '',
      render:()=>{
        return (
          <Progress percent={70} />
        )
      }
    },
    {
      title: '是否延期',
      dataIndex: '',
    },
    {
      title: '是否交付',
      dataIndex: '',
    },
    {
      title: '交付要求',
      dataIndex: '',
    },
    {
      title: '结算方式',
      dataIndex: 'delivery_status',
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
      title: '结束日期',
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
          return (
            <div>
              <Button onClick={()=> handClink('detail',rowData)}>详情</Button>&nbsp;&nbsp;
              <Button onClick={()=> handClink('effect',rowData)}>人效</Button>&nbsp;&nbsp;
              <Button onClick={()=> handClink('edit',rowData)}>编辑</Button>&nbsp;&nbsp;
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

  const effect_column = [
    {
      title: '日期',
      dataIndex: 'base',
    },
    {
      title: '姓名',
      dataIndex: 'service_line',
    },
    {
      title: '工号',
      dataIndex: 'service_line',
    },
    {
      title: '时段',
      dataIndex: 'day',
    },
    {
      title: '标注量',
      dataIndex: 'day',
    },
    {
      title: '完成量',
      dataIndex: '',
    },
    {
      title: '正确率',
      dataIndex: '',
    },
    {
      title: '错误量',
      dataIndex: '',
    },
    {
      title: '质检量',
      dataIndex: 'delivery_status',
    },
    {
      title: '返修量',
      dataIndex: 'delivery_status',
    },
    {
      title: '任务工时',
      dataIndex: 'delivery_status',
    },
    {
      title: '非任务工时',
      dataIndex: 'delivery_status',
    },
    {
      title: '操作日期',
      dataIndex: 'delivery_date',
      render:(delivery_date)=>{
        return (
          dayjs(delivery_date).format('YYYY-MM-DD')
        )
      }
    }
  ];

  const attachment = ''
  const props = {
    name: 'file',
    action: `http://localhost:3003/items/account/detail/upload?id=`,
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
  return (
    <div className='style'>
      <div className='flex-box'>
        <Form form={form}
          className='flex-box-form'
          layout='inline'
        >
          <Row>
            <Col span={6}>
              <Form.Item name="name" label="任务包名称" {...itemLayout}>
                <Input placeholder='请输入任务包名称'/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="item" label="所属项目" {...itemLayout}>
                <Input placeholder='请输入所属项目'/>
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
              <Form.Item name="status" label="任务包状态" {...itemLayout}>
              <Select
                  placeholder='请输入任务包状态'
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
              <Form.Item name="is_delivery" label="是否交付" {...itemLayout}>
              <Select
                  placeholder='请输入是否交付'
                  style={{textAlign:'left'}}
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
          style={{marginTop:'50px'}}
        >
           <Form.Item
            label='任务包名称'
            name="name"
            rules={[{required:true,message:'请输入任务包名称'}]}
          >
            <Input placeholder='请输入任务包名称' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='所属项目'
            name="item"
            rules={[{required:true,message:'所属项目'}]}
          >
            <Select
              placeholder='请输入所属项目'
              disabled={_disable}
              style={{textAlign:'left'}}
              options={[
                {
                  value: 'xxx',
                  label: 'xxx',
                },
                {
                  value: 'vvv',
                  label: 'vvv',
                }
              ]}
            />
          </Form.Item>
          <Form.Item
            label='业务线'
            name="service_line"
            rules={[{required:true,message:'请输入业务线'}]}
          >
           <Select
              placeholder='请输入业务线'
              disabled={_disable}
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
          <Form.Item
            label='基地'
            name="base"
            rules={[{required:true,message:'请输入基地'}]}
          >
              <Select
                placeholder='请输入基地'
                disabled={_disable}
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
          <Form.Item
            label='项目负责人'
            name="item_leader"
            initialValue=''
            rules={[{required:true,message:'请输入项目负责人'}]}
          >
            <Input placeholder='请输入项目负责人' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='业务负责人'
            name="business_leader"
            initialValue=''
            rules={[{required:true,message:'请输入业务负责人'}]}
          >
            <Input placeholder='请输入业务负责人' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='项目经理'
            name="item_manager"
            initialValue=''
            rules={[{required:true,message:'请输入项目经理'}]}
          >
            <Input placeholder='请输入项目经理' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='项目主管'
            name="item_supervisor"
            initialValue=''
            rules={[{required:true,message:'请输入项目主管'}]}
          >
            <Input placeholder='请输入项目主管' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='小组长'
            name="group_manager"
            initialValue=''
            rules={[{required:true,message:'请输入小组长'}]}
          >
            <Input placeholder='请输入小组长' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='培训师'
            name="trainer"
            initialValue=''
          >
            <Input placeholder='请输入培训师' disabled={_disable}/>
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
            label='标注员'
            name="workers"
            initialValue=''
            rules={[{required:true,message:'请输入标注员'}]}
          >
            <Input placeholder='请输入标注员'/>
          </Form.Item>
          <Form.Item
            label='审核员'
            name="auditor"
            initialValue=''
          >
            <Input placeholder='请输入审核员' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='任务包数量'
            name="amount"
            initialValue={0}
            rules={[{required:true,message:'请输入任务包数量'}]}
          >
            <InputNumber placeholder='请输入任务包数量' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='交付要求'
            name="delivery_requirement"
            rules={[{required:true,message:'请输入交付要求'}]}
          >
            <Select
                placeholder='请输入交付要求'
                disabled={_disable}
                options={[
                  {
                    value: '正确率',
                    label: '正确率',
                  },
                  {
                    value: 'xxx',
                    label: 'xxx',
                  }
                ]}
              />
          </Form.Item>
          <Form.Item
            label='结算类型'
            name="settlement_type"
            rules={[{required:true,message:'请输入结算类型'}]}
          >
            <Select
                placeholder='请输入结算类型'
                disabled={_disable}
                options={[
                  {
                    value: '包天',
                    label: '包天',
                  },
                  {
                    value: '包月',
                    label: '包月',
                  },
                  {
                    value: '计件',
                    label: '计件',
                  }
                ]}
              />
          </Form.Item>
          <Form.Item
            label='商务单价'
            name="business_price"
            initialValue={0}
            rules={[{required:true,message:'请输入商务单价'}]}
          >
            <InputNumber placeholder='请输入商务单价' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='下方单价'
            name="price"
            initialValue={0}
            rules={[{required:true,message:'请输入下方单价'}]}
          >
            <InputNumber placeholder='请输入下方单价' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='任务包周期'
            name="day"
            initialValue={0}
            rules={[{required:true,message:'请输入任务包周期'}]}
          >
            <InputNumber placeholder='请输入任务包周期' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='出勤要求'
            name="attendance_type"
            rules={[{required:true,message:'请输入出勤要求'}]}
          >
            <Select
                placeholder='请输入出勤要求'
                disabled={_disable}
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
              disabled={_disable}
              />
          </Form.Item>
          <Form.Item
            label='完成日期'
            name="end_date"
          >
            <DatePicker
              placeholder={['请选择时间']}
              style={{width:'200px'}}
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
            label='领取日期'
            name="get_task_date"
            hidden={delay_date_status}
          >
            <DatePicker placeholder={['请选择时间']} style={{width:'200px'}}/>
          </Form.Item>
          <Form.Item
            label='延期日期'
            name="delay_date"
            hidden={delay_date_status}
          >
            <DatePicker placeholder={['请选择时间']} style={{width:'200px'}}/>
          </Form.Item>
          <Form.Item
            label='内部人员薪资结构'
            name="salary_structure"
            initialValue=''
          >
            <Input placeholder='如:底薪3000、全勤500、加班费1.5倍'/>
          </Form.Item>
          <Form.Item
            label='甲方任务包链接'
            name="attachment"
            hidden={delay_date_status}
          >
            <Input placeholder='请输入甲方任务包链接'/>
          </Form.Item>
          <Form.Item
            label='任务包简介'
            name="detail"
            initialValue=''
          >
            <TextArea placeholder='请输入任务包简介' rows={4} />
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
        width={'70%'}
        footer={null}
      >
        <Form
          form={form_effect}
          labelCol={{span:10}} 
          wrapperCol={{span:20}} 
          layout='inline'
          style={{marginTop:'20px',marginBottom:'50px'}}
        >
           <Form.Item
            label='项目负责人'
            name="item_leader"
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
            label='项目主管'
            name="item_supervisor"
           >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
           <Form.Item
            label='小组长'
            name="group_manager"
           >
            <Input variant="borderless" disabled={true}/>
          </Form.Item>
        </Form>
        <Divider style={{color:'#1677ff'}}>标注员每日作业数据</Divider>
        <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
            <div>
              <Upload
                  showUploadList={false} 
                  {...props}
                >
                  <Button style={{width:'200px'}} icon={<UploadOutlined />} onClick={()=> handUploadClink()}>导入</Button>
              </Upload>
            </div>
            <div style={{marginLeft:'50px'}}>
              <a 
                  href={'http://localhost:3003' + attachment} 
                  download={'附件'} 
                  style={{ color: '#007bff' }}
                >
                { `📎 模板` }
              </a>
              <span style={{color:'red',marginLeft:'50px'}}>数据导入之前请慎重核验数据…</span>
            </div>
        </div>
        <div style={{ width: '100%', height: '85%', overflow:'auto',marginTop:'10px'}}>
          <Table 
            columns={ effect_column } 
            dataSource={ data } 
            rowKey={ data => data.id }  
            pagination={false}
          />
        </div>
      </Modal>
    </div>
  )
}

export default Task;

