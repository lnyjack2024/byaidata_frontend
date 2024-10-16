/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-09-30 14:47:08
 * @LastEditTime: 2024-10-15 17:07:20
 */
import React, { useEffect, useState } from 'react'
import { SearchOutlined, RedoOutlined} from '@ant-design/icons';
import { Button, Form, Input, Modal, Table, Select, message, Col, Row } from 'antd'
import dayjs from 'dayjs';
import './portrait.css'
import { reqGetPortraitDatas, reqAddPortraitDatas, reqEditPortraitDatas } from '../../api/index'
const itemLayout = { labelCol:{span:5},wrapperCol:{span:15} }
const { TextArea } = Input;

const Portrait = () => {
  const [ modalType, setModalType ] = useState(0)
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ data, setData ] = useState([])
  const [ id, setId ] = useState(0)
  const [ table_loading, setTableLoading ] = useState(true)
  const [ form ] = Form.useForm();
  const [ form_add ] = Form.useForm();
  const [ messageApi, contextHolder ] = message.useMessage();
  useEffect(() => {
    getTableData()
  },[])

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
      cloneData.entry_date = dayjs(cloneData.entry_date)
      cloneData.become_date = dayjs(cloneData.become_date)
      cloneData.graduation_time = dayjs(cloneData.graduation_time)
      cloneData.birthday = dayjs(cloneData.birthday)
      setId(cloneData.id)
      form_add.setFieldsValue(cloneData)
    }
  }

  const hangFinish = (e) => {

  }

  const handleOk = () => {
    form_add.validateFields().then( async (val)=>{
     val.entry_date = dayjs(val.entry_date).format('YYYY-MM-DD')
     val.become_date = dayjs(val.become_date).format('YYYY-MM-DD')
     val.graduation_time = dayjs(val.graduation_time).format('YYYY-MM-DD')
     val.birthday = dayjs(val.birthday).format('YYYY-MM-DD')
     if(modalType === 0){
      const result = await reqAddPortraitDatas(val)
      if(result.status === 1){
        getTableData()
        setIsModalOpen(false)
        form.resetFields()
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
        form.resetFields()
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
  
  const column = [
    {
      title: '业务线',
      dataIndex: 'service_line',
    },
    {
      title: '项目',
      dataIndex: 'item',
    },
    {
      title: '性别',
      dataIndex: 'sex',
    },
    {
      title: '年龄',
      dataIndex: 'age',
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
      render:(rowData)=>{
        return (
          <div>
            <Button onClick={()=> handClink('edit',rowData)}>编辑</Button>
            {/* <Popconfirm
              description='是否删除?'
              okText='确认'
              cancelText='取消'
              onConfirm={ () => handDelete(rowData)}
            >
              <Button type='primary' danger style={{marginLeft:'15px'}}>删除</Button>
            </Popconfirm> */}
          </div>
        )
      }
    }
  ];
 
  return (
    <div className='portrait'>
      <div className='flex-box'>
        <Form form={form}
          className='flex-box-form'
          layout='inline'
          onFinish={hangFinish}
        >
          <Row style={{ width:'100%' }}>
            <Col span={6}>
              <Form.Item name="name" label="业务线" {...itemLayout}>
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
              <Form.Item name="base" label="项目" {...itemLayout}>
                <Input placeholder='请输入项目' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item  >
                <Button onClick={() => handClink('add')} > + 新增 </Button>&nbsp;
                <Button onClick={ handReset } type='primary' htmlType='button' icon={<RedoOutlined />}> 重置 </Button>&nbsp;
                <Button onClick={ handSearch } type='primary' htmlType='submit' icon={<SearchOutlined />}> 查询 </Button>
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
            label='业务线'
            name="service_line"
            initialValue=''
            rules={[{required:true,message:'请输入业务线'}]}
          >
              <Select
                  placeholder='请输入业务线'
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
            label='项目'
            name="item"
            initialValue=''
            rules={[{required:true,message:'请输入项目'}]}
          >
            <Input placeholder='请输入项目' />
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
                  }
                ]}
            />
          </Form.Item>
          <Form.Item
            label='年龄'
            name="age"
            initialValue=''
            rules={[{required:true,message:'请输入年龄'}]}
          >
            <Input placeholder='请输入年龄' />
          </Form.Item>
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
                    value: '1',
                    label: '博士',
                  },
                  {
                    value: '2',
                    label: '硕士',
                  },
                  {
                    value: '3',
                    label: '本科',
                  },
                  {
                    value: '4',
                    label: '专科',
                  },
                  {
                    value: '5',
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
        </Form>
      </Modal>
    </div>
  )
}

export default Portrait;