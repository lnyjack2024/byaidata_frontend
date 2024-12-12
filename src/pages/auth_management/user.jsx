/*
 * @Description: 操作员列表
 * @Author: wangyonghong
 * @Date: 2024-09-30 20:42:03
 * @LastEditTime: 2024-12-12 17:03:56
 */
import React, { useEffect, useState } from 'react'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Popconfirm, Table, Select, message } from 'antd'
import moment from 'moment';
import './user.css'
import { reqGetUserDatas, reqAddUserDatas, reqDeleteUserDatas } from '../../api/index'

const User = () => {
  const [ modalType, setModalType ] = useState(0)
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ data, setData ] = useState([])
  const [ table_loading, setTableLoading ] = useState(true)
  const [ form ] = Form.useForm();
  const [ form_ ] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getTableData()
  },[])

  const getTableData = async () => {
    const reqData = await reqGetUserDatas()
      setData(reqData.data)
      setTableLoading(false)
  }

  const handClink = (type,rowData) => {
    setIsModalOpen(!isModalOpen)
    if(type === 'add'){
      setModalType(0)
    }else{ 
      setModalType(1)
    }
  }

  const handDelete = async (e) => {
    const result = await reqDeleteUserDatas(e)
    if(result.status === 1){
      getTableData()
      message.info('删除成功...')
    }else{
      message.error('删除失败...')
    }
  }

  const handSearch = () => {
    form_.validateFields().then( async (val)=>{
      const reqData = await reqGetUserDatas(val)
      setData(reqData.data)
      setTableLoading(false)
    })
  }

  const handleOk = () => {
    form.validateFields().then( async (val)=>{
    if(val.base === undefined){
      val.base = ''
    }
    if(val.department === undefined){
      val.department = ''
    }
    const result = await reqAddUserDatas(val)
    if(result.status === 1){
      getTableData()
      setIsModalOpen(false)
      form.resetFields()
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
    form.resetFields()
  }

  const column = [
    {
      title: '账号',
      dataIndex: 'account',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '部门',
      dataIndex: 'department',
    },
    {
      title: '基地',
      dataIndex: 'base',
    },
    {
      title: '角色',
      dataIndex: 'role',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      render:(create_time)=>{
        return (
          moment(create_time).format('YYYY-MM-DD HH:mm:ss')
        )
      }
    },
    // {
    //   title: '更新时间',
    //   dataIndex: 'update_time', render:(update_time)=>{
    //     return (
    //       moment(update_time).format('YYYY-MM-DD HH:mm:ss')
    //     )
    //   }
    // },
    {
      title: '操作',
      render:(rowData)=>{
        return (
          <div>
            {/* <Button onClick={()=> handClink('edit',rowData)}>编辑</Button> */}
            <Popconfirm
              // title='提示'
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
    <div className='user'>
      <div className='flex-box'>
        <Button onClick={() => handClink('add')} icon={<PlusOutlined />} style={{backgroundColor: "#000000",color:'white',marginLeft:'1%'}}> 新增 </Button>
        <Form
          form={form_}
          layout='inline'
        >
          <Form.Item name="name">
            <Input placeholder='请输入姓名'/>
          </Form.Item>
          <Form.Item>
            <Button onClick={ handSearch } type='primary' htmlType='submit' icon={<SearchOutlined />}> 查询 </Button>
          </Form.Item>
        </Form>
      </div>
      <div style={{ width: '100%', height: '85%', overflow:'auto'}}>
        <Table 
          columns={ column } 
          dataSource={ data } 
          rowKey={ data => data.id }
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
        centered={true}
        maskClosable={false}
        width={'60%'}
      >
        <Form
          form={form}
          labelCol={{span:3}} 
          wrapperCol={{span:10}} 
          style={{marginTop:'40px',marginBottom:'40px'}}
        >
          <Form.Item
            label='账号'
            name="account"
            rules={[{required:true,message:'请输入账号'}]}
          >
            <Input placeholder='请输入账号' />
          </Form.Item>
          <Form.Item
            label='姓名'
            name="name"
            rules={[{required:true,message:'请输入姓名'}]}
          >
            <Input placeholder='请输入姓名' />
          </Form.Item>
          <Form.Item
            label='密码'
            name="password"
            rules={[{required:true,message:'请输入密码'}]}
          >
            <Input placeholder='请输入密码' />
          </Form.Item>
          <Form.Item
            label='基地'
            name="base"
            rules={[{message:'请输入基地'}]}
          >
            <Select
              placeholder='请输入基地'
              // onChange={handleChange}
              options={[
                {
                  value: '上海',
                  label: '上海',
                },
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
            label='部门'
            name="department"
            rules={[{message:'请输入部门'}]}
          >
            <Select
              placeholder='请输入部门'
              // onChange={handleChange}
              options={[
                {
                  value: '总经办',
                  label: '总经办',
                },
                {
                  value: '财务部',
                  label: '财务部',
                },
                {
                  value: '技术部',
                  label: '技术部',
                },
                {
                  value: '法务部',
                  label: '法务部',
                },
                {
                  value: '行政人事部',
                  label: '行政人事部',
                },
                {
                  value: '政府合作部',
                  label: '政府合作部',
                },
                {
                  value: '商务拓展部',
                  label: '商务拓展部',
                },
                {
                  value: '运营分析部',
                  label: '运营分析部',
                },
                {
                  value: '业务管理中心',
                  label: '业务管理中心',
                }
              ]}
            />
          </Form.Item>
          <Form.Item
            label='角色'
            name="role"
            rules={[{required:true,message:'请输入角色'}]}
          >
            <Select
              placeholder='请输入角色'
              // onChange={handleChange}
              options={[
                {
                  value: '管理层-1',
                  label: '管理层',
                },
                {
                  value: '财务总监-2',
                  label: '财务总监',
                },
                {
                  value: '财务经理-2',
                  label: '财务经理',
                },
                {
                  value: '财务专员-2',
                  label: '财务专员',
                },
                {
                  value: '运营负责人-3',
                  label: '运营负责人',
                },
                {
                  value: '运营人员-3',
                  label: '运营人员',
                },
                {
                  value: '人力资源总监-4',
                  label: '人力资源总监',
                },
                {
                  value: '人事经理或主管-4',
                  label: '人事经理或主管',
                },
                {
                  value: '人事专员-4',
                  label: '人事专员',
                },
                {
                  value: '开发负责人-5',
                  label: '开发负责人',
                },
                {
                  value: '开发人员-6',
                  label: '开发人员',
                },
                {
                  value: '产品经理-6',
                  label: '产品经理',
                },
                {
                  value: '业务负责人-7',
                  label: '业务负责人',
                },
                {
                  value: '项目经理-7',
                  label: '项目经理',
                },
                {
                  value: '项目主管-7',
                  label: '项目主管',
                },
                {
                  value: '小组长-8',
                  label: '小组长',
                },
                {
                  value: '培训师-9',
                  label: '培训师',
                },
                {
                  value: '骨干-10',
                  label: '骨干',
                },
                {
                  value: '标注员-10',
                  label: '标注员',
                }
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default User;
