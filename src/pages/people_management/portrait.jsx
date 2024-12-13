/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-09-30 14:47:08
 * @LastEditTime: 2024-12-12 15:44:28
 */
import React, { useEffect, useState } from 'react'
import { SearchOutlined, RedoOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Table, Select, message, Col, Row, Popconfirm, DatePicker, InputNumber, Slider } from 'antd'
import dayjs from 'dayjs';
import '../common_css/style.css'
import { reqGetPortraitDatas, 
         reqAddPortraitDatas, 
         reqEditPortraitDatas,reqGetServiceLineDatas,reqDeletePortraitDatas } from '../../api/index'
const itemLayout = { labelCol:{span:5},wrapperCol:{span:18} }
const { TextArea } = Input;
const { Option } = Select;

const Portrait = () => {
  const [ modalType, setModalType ] = useState(0)
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ data, setData ] = useState([])
  const [ id, setId ] = useState(0)
  const [ table_loading, setTableLoading ] = useState(true)
  const [ service_lineData, setServiceLineData ] = useState([])
  const [ ageRange, setAgeRange ] = useState([20, 30]); // 默认区间为18-40岁
  const [ form ] = Form.useForm();
  const [ form_add ] = Form.useForm();
  const [ messageApi, contextHolder ] = message.useMessage();
  useEffect(() => {
    getTableData()
    getServiceLineData() //获取业务线数据
  },[])

  const getServiceLineData = async () => {
    const reqServiceLineData = await reqGetServiceLineDatas()
    setServiceLineData(reqServiceLineData.data)
  }

  const getTableData = async () => {
    const reqData = await reqGetPortraitDatas()
      setData(reqData.data)
      setTableLoading(false)
  }

  const handClink = (type,rowData) => {
    setIsModalOpen(!isModalOpen)
    if(type === 'add'){
      setModalType(0)
    }else{ 
      setModalType(1)
      const cloneData = JSON.parse(JSON.stringify(rowData))
      cloneData.age = (cloneData.age).split(",").map(Number)
      cloneData.inter_time = dayjs(cloneData.inter_time)
      setId(cloneData.id)
      setAgeRange(cloneData.age)
      form_add.setFieldsValue(cloneData)
    }
  }

  const handleOk = () => {
    form_add.validateFields().then( async (val)=>{
     val.inter_time = dayjs(val.inter_time).format('YYYY-MM-DD')
     if(modalType === 0){
      const result = await reqAddPortraitDatas(val)
      if(result.status === 1){
        getTableData()
        setIsModalOpen(false)
        form_add.resetFields()
        message.info('新增成功...')
      }else{
        message.error('新增失败...')
      }
     }else{
      val.edit_id = id
      const result = await reqEditPortraitDatas(val)
      if(result.status === 1){
        getTableData()
        setIsModalOpen(false)
        form_add.resetFields()
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
      const reqData = await reqGetPortraitDatas(val)
      setData(reqData.data)
      setTableLoading(false)
    })
  }

  const handReset = () => {
    form.resetFields()
  }
  
  const handDelete = async (e) => {
    const result = await reqDeletePortraitDatas(e)
    if(result.status === 1){
      getTableData()
      message.info('删除成功...')
    }else{
      message.error('删除失败...')
    }
  }

  const onChange1 = (value) => {
    setAgeRange(value);
  }

  const column = [
    {
      title: '业务线',
      dataIndex: 'service_line',
      fixed: 'left'
    },
    {
      title: '项目',
      dataIndex: 'item',
      fixed: 'left'
    },
    {
      title: '性别',
      dataIndex: 'sex',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      render:(age)=>{
        return (
          <>{age.split(',')[0] + ' ~ ' + age.split(',')[1]}</>
        )
      }
    },
    {
      title: '专业',
      dataIndex: 'specialty',
    },
    {
      title: '学历',
      dataIndex: 'education',
    },
    {
      title: '技能证书',
      dataIndex: 'certificate',
    },
    {
      title: '语言能力',
      dataIndex: 'language_competence',
    },
    {
      title: '工具技能',
      dataIndex: 'ability',
    },
    {
      title: '工作经历',
      dataIndex: 'work_experience',
    },
    {
      title: '大模型经历',
      dataIndex: 'model_experience',
    },
    {
      title: '爱好',
      dataIndex: 'likes',
    },
    {
      title: '性格特点',
      dataIndex: 'characters',
    },
    {
      title: '业务负责人',
      dataIndex: 'business_leader',
    },
    {
      title: '操作人',
      dataIndex: 'user',
    },
    {
      title: '指派人事负责人',
      dataIndex: 'personnel',
    },
    {
      title: '招聘人数',
      dataIndex: 'number',
    },
    {
      title: '到岗时间',
      dataIndex: 'inter_time',
      render:(inter_time)=>{
        return (
          dayjs(inter_time).format('YYYY-MM-DD')
        )
      }
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      render:(create_time)=>{
        return (
          dayjs(create_time).format('YYYY-MM-DD HH:mm:ss')
        )
      }
    },
    {
      title: '操作',
      fixed: 'right',
      render:(rowData)=>{
        return (
          <div>
            <Button onClick={()=> handClink('edit',rowData)}>编辑</Button>
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
    <div className='style'>
      <div className='flex-box'>
        <Form form={form}
          className='flex-box-form'
          layout='inline'
        >
          <Row style={{ width:'100%' }}>
            <Col span={6}>
              <Form.Item name="name" label="业务线" {...itemLayout}>
              <Select
                  placeholder="请输入业务线"
                  style={{textAlign:'left',width:'250px'}}
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
              <Form.Item name="base" label="项目" {...itemLayout}>
                <Input placeholder='请输入项目' />
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
      <div style={{ width: '100%', height: '90%', overflow:'auto' }}>
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
        title={ modalType ? '编辑' : '新增'}
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
            label='业务线'
            name="service_line"
            rules={[{required:true,message:'请输入业务线'}]}
          >
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
          <Form.Item
            label='项目'
            name="item"
            initialValue=''
            rules={[{required:true,message:'请输入项目'}]}
          >
            <Input placeholder='请输入项目' />
          </Form.Item>
          <Form.Item
            label='业务负责人'
            name="business_leader"
            initialValue=''
            rules={[{required:true,message:'请输入业务负责人'}]}
          >
            <Input placeholder='请输入业务负责人' />
          </Form.Item>
          <Form.Item
            label='性别'
            name="sex"
            rules={[{required:true,message:'请输入性别'}]}
          >
            <Select
                placeholder='请输入性别'
                options={[
                  {
                    value: '男',
                    label: '男',
                  },
                  {
                    value: '女',
                    label: '女',
                  },
                  {
                    value: '无限制',
                    label: '无限制',
                  }
                ]}
            />
          </Form.Item>
          <Form.Item
            label='年龄区段'
            name="age"
            initialValue={ageRange}
            rules={[{required:true,message:'请输入年龄'}]}
          >
            <Slider
              range
              min={0}
              max={50}
              onChange={onChange1}
              marks={{
                0: "0岁",
                20: "20岁",
                30: "30岁",
                50: "50岁",
              }}
            />
          </Form.Item>
          <p style={{marginLeft:'20%'}}>当前选择区间: {ageRange[0]} 岁 - {ageRange[1]} 岁</p>
<br/>
          <Form.Item
            label='专业'
            name="specialty"
            rules={[{required:true,message:'请输入所学专业'}]}
          >
            <Input placeholder='请输入所学专业'/>
          </Form.Item>
          <Form.Item
            label='学历'
            name="education"
            rules={[{required:true,message:'请输入学历'}]}
          >
            <Select
                placeholder='请输入最高学历'
                options={[
                  {
                    value: '博士',
                    label: '博士',
                  },
                  {
                    value: '硕士',
                    label: '硕士',
                  },
                  {
                    value: '本科',
                    label: '本科',
                  },
                  {
                    value: '专科',
                    label: '专科',
                  },
                  {
                    value: '其他',
                    label: '其他',
                  }
                ]}
              />
          </Form.Item>
          <Form.Item
            label='技能证书'
            name="certificate"
            initialValue=''
            rules={[{required:true,message:'请输入技能证书'}]}
          >
            <Input placeholder='请输入技能证书'/>
          </Form.Item>
          <Form.Item
            label='语言能力'
            name="language_competence"
            initialValue=''
            rules={[{required:true,message:'请输入语言能力'}]}
          >
            <Input placeholder='请输入语言能力' />
          </Form.Item>
          <Form.Item
            label='工具技能'
            name="ability"
            initialValue=''
            rules={[{required:true,message:'请输入工具技能'}]}
          >
            <Input placeholder='请输入工具技能' />
          </Form.Item>
          <Form.Item
            label='工作经历'
            name="work_experience"
            initialValue=''
            rules={[{required:true,message:'请输入工作经历'}]}
          >
            <TextArea placeholder='请输入工作经历' rows={4} />
          </Form.Item>
          <Form.Item
            label='大模型经历'
            name="model_experience"
            initialValue=''
            rules={[{required:true,message:'请输入大模型经历'}]}
          >
            <TextArea placeholder='请输入大模型经历' rows={4} />
          </Form.Item>
          <Form.Item
            label='爱好'
            name="likes"
            initialValue=''
            rules={[{required:true,message:'请输入爱好'}]}
          >
            <TextArea placeholder='请输入爱好' rows={4} />
          </Form.Item>
          <Form.Item
            label='性格特点'
            name="characters"
            initialValue=''
            rules={[{required:true,message:'请输入性格特点'}]}
          >
            <Input placeholder='请输入性格特点' />
          </Form.Item>
          <Form.Item
            label='指派人事负责人'
            name="personnel"
            initialValue=''
            rules={[{required:true,message:'请输入指派人事负责人'}]}
          >
            <Input placeholder='请输入指派人事负责人' />
          </Form.Item>
          <Form.Item
            label='招聘人数'
            name="number"
            initialValue={0}
            rules={[{required:true,message:'请输入招聘人数'}]}
          >
            <InputNumber placeholder='请输入招聘人数' min={0}/>
          </Form.Item>
          <Form.Item
            label='到岗时间'
            name="inter_time"
            rules={[{required:true,message:'请输入到岗时间'}]}
          >
            <DatePicker placeholder={['请选择时间']} style={{width:'200px'}}/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Portrait;