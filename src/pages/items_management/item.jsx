/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-09-30 20:33:58
 * @LastEditTime: 2024-10-21 15:44:15
 */
import React, { useEffect, useState } from 'react'
import { SearchOutlined, RedoOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Table, Select, message, Col, Row, DatePicker, Popconfirm, InputNumber } from 'antd'
import dayjs from 'dayjs';
import './item.css'
import { reqGetItemDatas, reqAddItemDatas, reqEditItemDatas, reqDeleteItemDatas } from '../../api/index'
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const itemLayout = { 
  labelCol:{span:7},
  wrapperCol:{span:15} 
}

const Item = () => {
  const [ modalType, setModalType ] = useState(0)
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ data, setData ] = useState([])
  const [ id, setId ] = useState(0)
  const [ _disable, setDisable ] = useState(false)
  const [ table_loading, setTableLoading ] = useState(true)
  const [ form ] = Form.useForm();
  const [ form_add ] = Form.useForm();
  const [ messageApi, contextHolder ] = message.useMessage();

  useEffect(() => {
    getTableData()
  },[])

  const getTableData = async () => {
    const reqData = await reqGetItemDatas()
      setData(reqData.data)
      setTableLoading(false)
  }

  const handClink = (type,rowData) => {
    setIsModalOpen(!isModalOpen)
    if(type === 'add'){
      setModalType(0)
      setDisable(false)
    }else{ 
      setModalType(1)
      setDisable(true)
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
          const result = await reqAddItemDatas(val)
          if(result.status === 1){
            reqGetItemDatas()
            setIsModalOpen(false)
            form.resetFields()
            message.info('新增成功...')
          }else{
            message.error('新增失败...')
          }
        }else{
          val.edit_id = id
          const result = await reqEditItemDatas(val)
          if(result.status === 1){
            reqGetItemDatas()
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
    },
    {
      title: '项目名称',
      dataIndex: 'sex',
    },
    {
      title: '业务线',
      dataIndex: 'entry_date',
    },
    {
      title: '周期',
      dataIndex: 'contract_type',
    },
    {
      title: '项目负责人',
      dataIndex: 'service_line',
    },
    {
      title: '项目进度',
      dataIndex: 'item',
    },
    {
      title: '是否交付',
      dataIndex: 'item_type',
    },
    {
      title: '结算状态',
      dataIndex: 'position_level',
    },
    {
      title: '结算时间',
      dataIndex: 'pasbank_card_detail',
    },
    {
      title: '交付时间',
      dataIndex: 'is_graduation',
    },
    {
      title: '状态',
      dataIndex: 'is_overseas_student',
    },
    {
      title: '创建时间',
      dataIndex: 'is_full_time',
    },
    {
      title: '操作',
      render:(rowData)=>{
        return (
          <div>
            <Button onClick={()=> handClink('edit',rowData)}>详情</Button>
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
    <div className='item'>
      <div className='flex-box'>
        <Form form={form}
          className='flex-box-form'
          layout='inline'
          onFinish={hangFinish}
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
              <Form.Item name="service_line" label="状态" {...itemLayout}>
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
              <Form.Item name="service_line" label="结算状态" {...itemLayout}>
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
              <Form.Item name="entry_date" label="交付日期" {...itemLayout}>
                <RangePicker     
                  placeholder={['开始日期', '结束日期']}
                  // onChange={onChange} 
                  style={{width:'280px'}}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="entry_date" label="创建日期" {...itemLayout}>
                <RangePicker     
                  placeholder={['开始日期', '结束日期']}
                  // onChange={onChange} 
                  style={{width:'280px'}}
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
              placeholder='请输入业务线'
              disabled={_disable}
              style={{textAlign:'left'}}
              options={[
                {
                  value: '1',
                  label: '混元',
                },
                {
                  value: '2',
                  label: '百度',
                },
                {
                  value: '3',
                  label: '字节',
                },
                {
                  value: '4',
                  label: '小红书',
                },
                {
                  value: '5',
                  label: '文远',
                },
                {
                  value: '6',
                  label: '众包类(兼职)',
                }
              ]}
            />
          </Form.Item>
          <Form.Item
            label='基地'
            name="base"
            initialValue=''
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
            name="project_leader"
            initialValue=''
            rules={[{required:true,message:'请输入项目负责人'}]}
          >
            <Input placeholder='请输入项目负责人' disabled={_disable}/>
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
                    value: 'day',
                    label: '包天',
                  },
                  {
                    value: 'month',
                    label: '包月',
                  },
                  {
                    value: 'count',
                    label: '计件',
                  }
                ]}
              />
          </Form.Item>
          <Form.Item
            label='周期'
            name="day"
            initialValue=''
            rules={[{required:true,message:'请输入项目周期'}]}
          >
            <InputNumber placeholder='请输入项目周期' disabled={_disable} defaultValue={0}/>
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
            rules={[{required:true,message:'请输入延期日期'}]}
          >
            <DatePicker placeholder={['请选择时间']} style={{width:'200px'}}/>
          </Form.Item>
          <Form.Item
            label='单价'
            name="price"
            initialValue=''
            rules={[{required:true,message:'请输入单价'}]}
          >
            <InputNumber placeholder='请输入单价' disabled={_disable} defaultValue={0}/>
          </Form.Item>
          <Form.Item
            label='标注员人数'
            name="number_people"
            rules={[{required:true,message:'请输入标注员人数'}]}
          >
            <InputNumber placeholder='请输入标注员人数' disabled={_disable} defaultValue={0}/>
          </Form.Item>
          <Form.Item
            label='标注团队'
            name="team"
            rules={[{required:true,message:'请输入标注团队'}]}
          >
            <Input placeholder='请输入标注团队' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='审核员'
            name="auditor"
          >
            <Input placeholder='请输入审核员'/>
          </Form.Item>
          <Form.Item
            label='结算周期'
            name="settlement_day"
            rules={[{required:true,message:'请输入结算周期'}]}
          >
            <InputNumber placeholder='请输入结算周期' disabled={_disable} defaultValue={0}/>
          </Form.Item>
        
          <Form.Item
            label='加班类型'
            name="overtime_type"
            rules={[{required:true,message:'请输入加班类型'}]}
          >
            <Select
                placeholder='请输入加班类型'
                disabled={_disable}
                options={[
                  {
                    value: '1',
                    label: '工作日加班',
                  },
                  {
                    value: '2',
                    label: '周六日加班',
                  },
                  {
                    value: '3',
                    label: '法定节假日加班',
                  },
                  {
                    value: '4',
                    label: '固定值加班费',
                  },
                  {
                    value: '5',
                    label: '1.5倍',
                  },
                  {
                    value: '6',
                    label: '2倍',
                  },
                  {
                    value: '7',
                    label: '3倍',
                  }
                ]}
              />
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

