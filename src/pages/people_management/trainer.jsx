/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-09-30 14:57:12
 * @LastEditTime: 2024-11-20 13:43:35
 */
import React, { useEffect, useState } from 'react'
import { SearchOutlined, RedoOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Table, Select, message, Col, Row, Popconfirm, DatePicker, Upload, Divider } from 'antd'
import dayjs from 'dayjs';
import '../common_css/style.css'
import storageUtils from '../../utils/storageUtils'
import { reqGetTrainerDatas, reqAddTrainerDatas } from '../../api/index'
import { BASE } from '../../utils/networkUrl'
const itemLayout = { labelCol:{span:5},wrapperCol:{span:16} }

const Trainer = () => {
  const [ modalType, setModalType ] = useState(0)
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ isDetailModalOpen, setIisDetailModalOpen ] = useState(false)
  const [ data, setData ] = useState([])
  const [ table_loading, setTableLoading ] = useState(true)
  const [ document_url, setDocumentUrl ] = useState(null)
  const [ answer_url, setAnswerUrl ] = useState(null)
  const [ check_url, setCheckUrl ] = useState(null)
  const [ id, setId ] = useState(0)
  const [ type, setType ] = useState(0)
  const [ form ] = Form.useForm();
  const [ form_add ] = Form.useForm();
  const [ _form ] = Form.useForm();
  const [ messageApi, contextHolder ] = message.useMessage();
  
  useEffect(() => {
    getTableData()
  },[])

  const getTableData = async () => {
    const reqData = await reqGetTrainerDatas()
      setData(reqData.data)
      setTableLoading(false)
  }

  const handClink = (type,rowData) => {
    if(type === 'add'){
      setIsModalOpen(!isModalOpen)
      setModalType(0)
    }else{
      setId(rowData.id)
      setIisDetailModalOpen(!isDetailModalOpen)
      setDocumentUrl(rowData.document_url)
      setAnswerUrl(rowData.answer_url)
      setCheckUrl(rowData.check_url)
    }
  }

  const handleOk = () => {
    form_add.validateFields().then( async (val)=>{
     val.start_time = dayjs(val.start_time).format('YYYY-MM-DD')
      if(modalType === 0){
        const result = await reqAddTrainerDatas(val)
          if(result.status === 1){
            getTableData()
            setIsModalOpen(false)
            form.resetFields()
            form_add.resetFields()
            message.info('新增成功...')
          }else{
            message.error('新增失败...')
          }
        }else{
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
      const reqData = await reqGetTrainerDatas(val)
      setData(reqData.data)
      setTableLoading(false)
    })
  }

  const handReset = () => {
    form.resetFields()
  }
  
  const handDelete = () => {
  }

  const handleDetailCancle = () => {
    setIisDetailModalOpen(false)
  }

  const arr = (e) => {
    setType(e)
  }

  const props = {
    name: 'file',
    action: `${BASE}/person/trainer/upload?id=${id}&type=${type}`,
    headers: {
      authorization: 'authorization-text',
      'token': storageUtils.getToken()
    },
    onChange(info) {
      if (info.file.status === 'done') {
        if(info.file.response.status === 1){
          message.success(`文件${info.file.name}导入成功`);
          setIisDetailModalOpen(false)
          _form.resetFields()
          getTableData()
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

  const column = [
    {
      title: '培训师',
      dataIndex: 'user',
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
      title: '项目名称',
      dataIndex: 'item',
    },
    {
      title: '规则文档链接',
      dataIndex: 'document_url',
      render:(document_url)=>{
        return (
          <div style={{ margin: '10px 0' }}>
            <a 
              href={ BASE + document_url} 
              download={'规则文档'} 
              style={{ textDecoration: 'none', color: '#007bff' }}
            >
            { document_url ? `📎 规则文档` : '' }
            </a>
          </div>
        );
      }
    },
    {
      title: '过程答疑链接',
      dataIndex: 'answer_url',
      render:(answer_url)=>{
        return (
          <div style={{ margin: '10px 0' }}>
            <a 
              href={ BASE + answer_url} 
              download={'过程答疑'} 
              style={{ textDecoration: 'none', color: '#007bff' }}
            >
            { answer_url ? `📎 过程答疑` : '' }
            </a>
          </div>
        );
      }
    },
    {
      title: '抽检明细链接',
      dataIndex: 'check_url',
      render:(check_url)=>{
        return (
          <div style={{ margin: '10px 0' }}>
            <a 
              href={ BASE + check_url} 
              download={'抽检明细'} 
              style={{ textDecoration: 'none', color: '#007bff' }}
            >
            { check_url ? `📎 抽检明细` : '' }
            </a>
          </div>
        );
      }
    },
    {
      title: '培训时间',
      dataIndex: 'start_time',
      render:(start_time)=>{
        return (
          dayjs(start_time).format('YYYY-MM-DD')
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
      render:(rowData)=>{
        return (
          <div>
            <Button onClick={()=> handClink('edit',rowData)}>详情</Button>
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
              <Form.Item name="user" label="培训师" {...itemLayout}>
                <Input placeholder='请输入培训师' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="item" label="项目名称" {...itemLayout}>
                <Input placeholder='请输入项目名称' />
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
        title={ ''}
        onOk={handleOk}
        onCancel={handleCancle}
        okText='确定'
        cancelText='取消'
        maskClosable={false}
        width={'60%'}
      >
        <Form
          form={form_add}
          labelCol={{span:5}} 
          wrapperCol={{span:8}} 
          style={{marginTop:'50px'}}
        >
          <Form.Item
              label='基地'
              name="base"
              rules={[{required:true,message:'请输入基地'}]}
            >
              <Select
                placeholder='请输入基地'
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
            label='业务线'
            name="service_line"
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
            label='项目名称'
            name="item"
            rules={[{required:true,message:'请输入项目名称'}]}
          >
            <Input placeholder='请输入项目名称' />
          </Form.Item>
          <Form.Item
            label='培训时间'
            name="start_time"
            rules={[{required:true,message:'请输入培训时间'}]}
          >
            <DatePicker placeholder={['请选择时间']} style={{width:'320px'}}/>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={isDetailModalOpen}
        title={ ''}
        onCancel={handleDetailCancle}
        maskClosable={false}
        width={'60%'}
        footer={null}
        centered={true}
      >
        <Form
          form={_form}
          labelCol={{span:4}} 
          wrapperCol={{span:8}} 
          style={{marginTop:'70px',marginBottom:'100px'}}
        >
        <Divider style={{color:'#1677ff'}} />
          <Form.Item
              label='规则文档'
              name="document_url"
            >
            <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
              <div>
                { document_url === null ? 
                  <Upload
                    showUploadList={false} 
                    {...props}
                  >
                    <Button style={{width:'100px'}} icon={<UploadOutlined />} onClick={()=>arr(1)} >导入</Button>
                  </Upload>
                 : ''}
              </div>
              <div style={{marginLeft:'50px'}}>
                  { document_url === null ? '未上传' : `已上传`}
              </div>
            </div>
          </Form.Item>
          <Form.Item
            label='过程答疑'
            name="answer_url"
          >
            <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
              <div>
              { answer_url === null ? 
                  <Upload
                    showUploadList={false} 
                    {...props}
                  >
                    <Button style={{width:'100px'}} icon={<UploadOutlined /> } onClick={()=>arr(2)} >导入</Button>
                  </Upload>
                 : ''}
              </div>
              <div style={{marginLeft:'50px'}}>
                  { answer_url === null ? '未上传' : `已上传`}
              </div>
            </div>
          </Form.Item>
          <Form.Item
            label='抽检明细'
            name="check_url"
          >
            <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
              <div>
              { check_url === null ? 
                  <Upload
                    showUploadList={false} 
                    {...props}
                  >
                    <Button style={{width:'100px'}} icon={<UploadOutlined />} onClick={()=>arr(3)} >导入</Button>
                  </Upload>
                 : ''}
              </div>
              <div style={{marginLeft:'50px'}}>
                  { check_url === null ? '未上传' : `已上传`}
              </div>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Trainer;