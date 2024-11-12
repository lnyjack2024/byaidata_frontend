/*
 * @Description: 人员花名册
 * @Author: wangyonghong
 * @Date: 2024-09-29 16:00:53
 * @LastEditTime: 2024-11-12 11:21:25
 */

import React, { useEffect, useState } from 'react'
import { SearchOutlined, RedoOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Table, Select, message, Col, Row, DatePicker, Upload, Popconfirm } from 'antd'
import dayjs from 'dayjs';
import '../common_css/style.css'
import { reqGetRosterDatas, reqAddRosterDatas, reqEditRosterDatas, reqGetDepartmentDatas, reqGetRoleDatas, reqGetServiceLineDatas, reqDeleteRosterDatas } from '../../api/index'
import storageUtils from '../../utils/storageUtils'
const { TextArea } = Input;
const itemLayout = { labelCol:{span:5},wrapperCol:{span:15} }
const { Option } = Select;

const Roster = () => {
  const [ modalType, setModalType ] = useState(0)
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ data, setData ] = useState([])
  const [ id, setId ] = useState(0)
  const [ dimission_status, setDimissionStatus ] = useState(true)
  const [ _disable, setDisable ] = useState(false)
  const [ table_loading, setTableLoading ] = useState(true)
  const [ departmentData, setDepartmentData ] = useState([])
  const [ roleData, setRoleData ] = useState([])
  const [ service_lineData, setServiceLineData ] = useState([])
  const [ form ] = Form.useForm();
  const [ form_add ] = Form.useForm();
  const [ messageApi, contextHolder ] = message.useMessage();
  
  useEffect(() => {
    getTableData() //获取列表数据
    getDepartmentData() //获取部门数据
    getRoleData() //获取角色数据
    getServiceLineData() //获取业务线数据
  },[])

  const getDepartmentData = async () => {
    const reqDepartmentData = await reqGetDepartmentDatas()
    setDepartmentData(reqDepartmentData.data)
  }

  const getRoleData = async () => {
    const reqRoleData = await reqGetRoleDatas()
    setRoleData(reqRoleData.data)
  }

  const getServiceLineData = async () => {
    const reqServiceLineData = await reqGetServiceLineDatas()
    setServiceLineData(reqServiceLineData.data)
  }

  const getTableData = async () => {
    const reqData = await reqGetRosterDatas()
    setData(reqData.data)
    setTableLoading(false)
  }

  const handClink = (type,rowData) => {
    setIsModalOpen(!isModalOpen)
    if(type === 'add'){
      setModalType(0)
      setDimissionStatus(true)
      setDisable(false)
    }else{ 
      setModalType(1)
      setDimissionStatus(false)
      setDisable(true)
      const cloneData = JSON.parse(JSON.stringify(rowData))
      cloneData.entry_date = dayjs(cloneData.entry_date)
      cloneData.become_date = dayjs(cloneData.become_date)
      cloneData.graduation_time = dayjs(cloneData.graduation_time)
      cloneData.birthday = dayjs(cloneData.birthday)
      cloneData.dimission_date = dayjs(cloneData.dimission_date)
      setId(cloneData.id)
      form_add.setFieldsValue(cloneData)
    }
  }

  const handleOk = () => {
    form_add.validateFields().then( async (val)=>{
        val.entry_date = dayjs(val.entry_date).format('YYYY-MM-DD')
        val.become_date = dayjs(val.become_date).format('YYYY-MM-DD')
        val.graduation_time = dayjs(val.graduation_time).format('YYYY-MM-DD')
        val.birthday = dayjs(val.birthday).format('YYYY-MM-DD')
        if(modalType === 0){
          const result = await reqAddRosterDatas(val)
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
          const result = await reqEditRosterDatas(val)
          if(result.status === 1){
            getTableData()
            setIsModalOpen(false)
            form_add.resetFields()
            message.info('编辑成功...')
          }else{
            message.error('编辑失败...')
          }
        }
     }).catch((e)=>{
      console.log(e)
       messageApi.error('参数有误...请检查!!!')
    })
  }

  const props = {
    name: 'file',
    action: 'http://localhost:3003/person/roster/upload',
    headers: {
      authorization: 'authorization-text',
      'token': storageUtils.getToken()
    },
    onChange(info) {
      setTableLoading(true)
      if (info.file.status === 'done') {
        if(info.file.response.status === 1){
          message.success(`文件${info.file.name}导入成功`);
          getTableData()
          setTableLoading(false)
        }else if(info.file.response.status === 0){
          message.error(`文件${info.file.name}导入失败`);
          setTableLoading(false)
        }else if(info.file.response.status === 3){
          message.error(info.file.response.msg);
          setTableLoading(false)
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name}上传失败`);
        setTableLoading(false)
      }
    },
  };

  const handleCancle = () => {
    setIsModalOpen(false)
    form_add.resetFields()
  }

  const handSearch = () => {
    form.validateFields().then( async (val)=>{
      const reqData = await reqGetRosterDatas(val)
      setData(reqData.data)
      setTableLoading(false)
    })
  }

  const handReset = () => {
    form.resetFields()
  }

  const handDelete = async (e) => {
    const result = await reqDeleteRosterDatas(e)
    if(result.status === 1){
      getTableData()
      message.info('删除成功...')
    }else{
      message.error('删除失败...')
    }
  }
  
  const column = [
    {
      title: '姓名',
      dataIndex: 'name',
      fixed: 'left'
    },
    {
      title: '性别',
      dataIndex: 'sex',
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
      title: '直属上级',
      dataIndex: 'immediate_superior',
    },
    {
      title: '入职日期',
      dataIndex: 'entry_date',
      render:(entry_date)=>{
        return (
          dayjs(entry_date).format('YYYY-MM-DD')
        )
      }
    },
    {
      title: '转正日期',
      dataIndex: 'become_date',
      render:(become_date)=>{
        return (
          dayjs(become_date).format('YYYY-MM-DD')
        )
      }
    },
    {
      title: '合同类型',
      dataIndex: 'contract_type',
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
      title: '项目类型',
      dataIndex: 'item_type',
    },
    {
      title: '职级',
      dataIndex: 'position_level',
    },
    {
      title: '是否签约发薪平台',
      dataIndex: 'is_payment',
    },
    {
      title: '是否购买雇主责任',
      dataIndex: 'is_employer',
    },
    {
      title: '是否缴纳社保',
      dataIndex: 'is_social_security',
    },
    {
      title: '出生年月日',
      dataIndex: 'birthday',
      render:(birthday)=>{
        return (
          dayjs(birthday).format('YYYY-MM-DD')
        )
      }
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '身份证',
      dataIndex: 'id_card',
    },
    {
      title: '身份证有效期',
      dataIndex: 'id_card_time',
    },
    {
      title: '政治面貌',
      dataIndex: 'politics_status',
    },
    {
      title: '名族',
      dataIndex: 'family_name',
    },
    {
      title: '婚姻状况',
      dataIndex: 'marital_status',
    },
    {
      title: '手机号码',
      dataIndex: 'number',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '户籍所在地',
      dataIndex: 'domicile',
    },
    {
      title: '现居住地',
      dataIndex: 'urrent_address',
    },
    {
      title: '紧急联系人',
      dataIndex: 'emergency_contact',
    },
    {
      title: '与紧急联系人关系',
      dataIndex: 'emergency_contact_relation',
    },
    {
      title: '紧急联系人手机号',
      dataIndex: 'emergency_contact_number',
    },
    {
      title: '银行卡卡',
      dataIndex: 'bank_card',
    },
    {
      title: '银行卡开户行信息',
      dataIndex: 'bank_card_detail',
    },
    {
      title: '是否毕业',
      dataIndex: 'is_graduation',
    },
    {
      title: '是否留学生',
      dataIndex: 'is_overseas_student',
    },
    {
      title: '是否全日制',
      dataIndex: 'is_full_time',
    },
    {
      title: '毕业院校',
      dataIndex: 'school',
    },
    {
      title: '所学专业',
      dataIndex: 'specialty',
    },
    {
      title: '毕业时间',
      dataIndex: 'graduation_time',
      render:(graduation_time)=>{
        return (
          dayjs(graduation_time).format('YYYY-MM-DD')
        )
      }
    },
    {
      title: '最高学历',
      dataIndex: 'education',
    },
    {
      title: '所持证书',
      dataIndex: 'certificate',
    },
    {
      title: '语言能力',
      dataIndex: 'language_competence',
    },
    {
      title: '是否二次入职',
      dataIndex: 'is_two_entry',
    },
    // {
    //   title: '工作经历',
    //   dataIndex: 'work_experience',
    // },
    {
      title: '招聘渠道',
      dataIndex: 'recruitment_channel',
    },
    {
      title: '是否离职',
      dataIndex: 'is_dimission',
    },
    {
      title: '离职日期',
      dataIndex: 'dimission_date',
      render:(dimission_date)=>{
        if(dimission_date === null || dimission_date === ''){
          return <></>
        }else{
          return (
            dayjs(dimission_date).format('YYYY-MM-DD')
          )
        }
      }
    },
    {
      title: '离职类型',
      dataIndex: 'dimission_type',
      render:(dimission_type)=>{
        if(dimission_type === '1'){
          return (
            <>主动离职</>
          )
        }else if(dimission_type === '2'){
          return (
            <>单方解除</>
          )
        }else if(dimission_type === '3'){
          return (
            <>协商解除</>
          )
        }else if(dimission_type === '4'){
          return (
            <>合同到期</>
          )
        }else if(dimission_type === '5'){
          return (
            <>严重违反公司规定损害公司利益</>
          )
        }else if(dimission_type === '6'){
          return (
            <span>影响团队氛围人际关系恶劣</span>
          )
        }
      }
    },
    {
      title: '离职原因',
      dataIndex: 'dimission_reason',
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
          <Row>
            <Col span={6}>
              <Form.Item name="name" label="姓名" {...itemLayout}>
                <Input placeholder='请输入姓名'/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="base" label="基地" {...itemLayout}>
                <Select
                  placeholder='请输入基地'
                  style={{textAlign:'left'}}
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
            </Col>
            <Col span={6}>
              <Form.Item name="department" label="部门" {...itemLayout}>
                <Select
                  style={{textAlign:'left'}}
                  placeholder='请输入部门'
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
              <Form.Item name="contract_type" label="合同类型" {...itemLayout}>
                <Select
                  placeholder='请输入合同类型'
                  style={{textAlign:'left'}}
                  options={[
                    {
                      value: '劳动合同',
                      label: '劳动合同',
                    },
                    {
                      value: '实习合同',
                      label: '实习合同',
                    }
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="role" label="角色" {...itemLayout}>
                <Select
                  placeholder='请输入角色'
                  style={{textAlign:'left'}}
                  options={[
                    {
                      value: '管理者',
                      label: '管理者',
                    },
                    {
                      value: '运营负责人',
                      label: '运营负责人',
                    },
                    {
                      value: '运营人员',
                      label: '运营人员',
                    },
                    {
                      value: '人力总监',
                      label: '人力总监',
                    },
                    {
                      value: '人力经理或主管',
                      label: '人力经理或主管',
                    },
                    {
                      value: '产品经理',
                      label: '产品经理',
                    },
                    {
                      value: '开发人员',
                      label: '开发人员',
                    },
                    {
                      value: '业务负责人',
                      label: '业务负责人',
                    },
                    {
                      value: '项目负责人',
                      label: '项目负责人',
                    },
                    {
                      value: '项目经理',
                      label: '项目经理',
                    },
                    {
                      value: '项目主管',
                      label: '项目主管',
                    },
                    {
                      value: '培训师',
                      label: '培训师',
                    },
                    {
                      value: '小组长',
                      label: '小组长',
                    },
                    {
                      value: '骨干',
                      label: '骨干',
                    },
                    {
                      value: '标注员',
                      label: '标注员',
                    }
                  ]}
            />
              </Form.Item>
            </Col>
            {/* <Col span={6}>
              <Form.Item name="is_dimission" label="是否离职" {...itemLayout}>
                <Select
                  placeholder='请输入是否离职'
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
            </Col> */}
            {/* <Col span={6}>
              <Form.Item name="entry_date" label="入职日期" {...itemLayout}>
                <RangePicker     
                  placeholder={['开始日期', '结束日期']}
                  onChange={onChange} 
                  style={{width:'250px'}}
                />
              </Form.Item>
            </Col> */}
            <Col span={2}>
              <Form.Item  >
                <Upload  
                  showUploadList={false} 
                  {...props}
                >
                  <Button icon={<UploadOutlined />}>导入</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={5} >
              <Form.Item  >
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
        title={ modalType ? '编辑' : '新增'}
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
            label='姓名'
            name="name"
            rules={[{required:true,message:'请输入姓名'}]}
          >
            <Input placeholder='请输入姓名' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='性别'
            name="sex"
            rules={[{required:true,message:'请输入性别'}]}
          >
            <Select
                placeholder='请输入性别'
                disabled={_disable}
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
            label='部门'
            name="department"
            initialValue=''
          >
            <Select
              placeholder='请输入部门'
              disabled={_disable}
            >
              {
                departmentData.map((option)=>(
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
            initialValue=''
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
            label='角色'
            name="role"
            initialValue=''
          >
            <Select
              placeholder='请输入角色'
            > 
             {
                roleData.map((option)=>(
                  <Option key={option.id} value={option.name}>
                    {option.name}
                  </Option>
                ))
              }
            </Select>     
          </Form.Item>
          <Form.Item
            label='直属上级'
            name="immediate_superior"
            initialValue=''
          >
            <Input placeholder='请输入直属上级' />
          </Form.Item>
          <Form.Item
            label='入职日期'
            name="entry_date"
            rules={[{required:true,message:'请输入入职日期'}]}
          >
            <DatePicker
              placeholder={['请选择时间']}
              style={{width:'200px'}}
              disabled={_disable}
              />
          </Form.Item>
          <Form.Item
            label='转正日期'
            name="become_date"
            rules={[{required:true,message:'请输入转正日期'}]}
          >
            <DatePicker placeholder={['请选择时间']} style={{width:'200px'}} disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='合同类型'
            name="contract_type"
            rules={[{required:true,message:'请输入合同类型'}]}
          >
            <Select
              placeholder='请输入合同类型'
              disabled={_disable}
              options={[
                {
                  value: '劳动合同',
                  label: '劳动合同',
                },
                {
                  value: '实习合同',
                  label: '实习合同',
                }
              ]}
            />      
          </Form.Item>
          <Form.Item
            label='业务线'
            name="service_line"
            initialValue=''
          >
            <Select
              placeholder="请输入业务线"
            >
              {
                service_lineData.map((option)=>(
                  <Option key={option.id} value={option.name}>
                    {option.name}
                  </Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            label='项目名称'
            name="item"
            initialValue=''
          >
            <Input placeholder='请输入项目名称' />
          </Form.Item>
          <Form.Item
            label='项目类型'
            name="item_type"
            initialValue=''
          >
              <Select
                  placeholder='请输入项目类型'
                  options={[
                    {
                      value: '计时',
                      label: '计时',
                    },
                    {
                      value: '计件',
                      label: '计件',
                    }
                  ]}
                />
          </Form.Item>
          <Form.Item
            label='职级'
            name="position_level"
            initialValue=''
          >
              <Select
                placeholder='请输入职级'
                disabled={_disable}
                options={[
                  {
                    value: '初级',
                    label: '初级',
                  },
                  {
                    value: '初中级',
                    label: '初中级',
                  },
                  {
                    value: '中级',
                    label: '中级',
                  },
                  {
                    value: '中高级',
                    label: '中高级',
                  },
                  {
                    value: '高级',
                    label: '高级',
                  },
                  {
                    value: '专家',
                    label: '专家',
                  }
                ]}
              />
          </Form.Item>
          <Form.Item
            label='是否签约发薪平台'
            name="is_payment"
            initialValue='是'
          >
             <Select
                placeholder='请输入是否签约发薪平台'
                disabled={_disable}
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
            label='是否购买雇主责任'
            name="is_employer"
            initialValue='是'
          >
            <Select
                placeholder='请输入是否购买雇主责任'
                disabled={_disable}
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
            label='是否缴纳社保'
            name="is_social_security"
            rules={[{required:true,message:'请输入是否缴纳社保'}]}
            initialValue='是'
          >
            <Select
                placeholder='请输入是否缴纳社保'
                disabled={_disable}
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
            label='出生年月日'
            name="birthday"
            rules={[{required:true,message:'请输入出生年月日'}]}
          >
            <DatePicker placeholder={['请选择出生年月日']} style={{width:'200px'}} disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='年龄'
            name="age"
            rules={[{required:true,message:'请输入年龄'}]}
          >
            <Input placeholder='请输入年龄' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='身份证'
            name="id_card"
            rules={[{required:true,message:'请输入身份证'}]}
          >
            <Input placeholder='请输入身份证' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='身份证有效期'
            name="id_card_time"
            rules={[{required:true,message:'请输入身份证有效期'}]}
          >
            <Input placeholder='请输入身份证有效期' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='政治面貌'
            name="politics_status"
            rules={[{required:true,message:'请输入政治面貌'}]}
          >
            <Select
                placeholder='请输入政治面貌'
                disabled={_disable}
                options={[
                  {
                    value: '群众',
                    label: '群众',
                  },
                  {
                    value: '团员',
                    label: '团员',
                  },
                  {
                    value: '预备党员',
                    label: '预备党员',
                  },
                  {
                    value: '党员',
                    label: '党员',
                  }
                ]}
              />
          </Form.Item>
          <Form.Item
            label='名族'
            name="family_name"
            rules={[{required:true,message:'请输入名族'}]}
            initialValue='汉族'
          >
            <Select
                placeholder='请输入名族'
                disabled={_disable}
                options={[
                  {
                    value: '汉族',
                    label: '汉族',
                  },
                  {
                    value: '其他',
                    label: '其他',
                  }
                ]}
              />
          </Form.Item>
          <Form.Item
            label='婚姻状况'
            name="marital_status"
            rules={[{required:true,message:'请输入婚姻状况'}]}
          >
            <Select
                placeholder='请输入婚姻状况'
                disabled={_disable}
                options={[
                  {
                    value: '已婚',
                    label: '已婚',
                  },
                  {
                    value: '未婚',
                    label: '未婚',
                  }
                ]}
              />
          </Form.Item>
          <Form.Item
            label='手机号码'
            name="number"
            rules={[{required:true,message:'请输入手机号码'}]}
          >
            <Input placeholder='请输入手机号码' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='邮箱'
            name="email"
            rules={[{required:true,message:'请输入邮箱'}]}
          >
            <Input placeholder='请输入邮箱' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='户籍所在地'
            name="domicile"
            rules={[{required:true,message:'请输入户籍所在地'}]}
          >
            <Input placeholder='请输入户籍所在地' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='现居住地'
            name="urrent_address"
            rules={[{required:true,message:'请输入现居住地'}]}
          >
            <Input placeholder='请输入现居住地' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='紧急联系人'
            name="emergency_contact"
            rules={[{required:true,message:'请输入紧急联系人'}]}
          >
            <Input placeholder='请输入紧急联系人' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='与紧急联系人关系'
            name="emergency_contact_relation"
            rules={[{required:true,message:'请输入与紧急联系人关系'}]}
          >
            <Input placeholder='请输入与紧急联系人关系' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='紧急联系人手机号'
            name="emergency_contact_number"
            rules={[{required:true,message:'请输入紧急联系人手机号'}]}
          >
            <Input placeholder='请输入紧急联系人手机号' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='银行卡卡号'
            name="bank_card"
            rules={[{required:true,message:'请输入银行卡卡号'}]}
          >
            <Input placeholder='请输入银行卡卡号' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='银行卡开户行信息'
            name="bank_card_detail"
            rules={[{required:true,message:'请输入银行卡开户行信息'}]}
          >
            <Input placeholder='请输入银行卡开户行信息' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='是否毕业'
            name="is_graduation"
            rules={[{required:true,message:'请输入是否毕业'}]}
            initialValue='是'
          >
            <Select
                placeholder='请输入是否毕业'
                disabled={_disable}
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
            label='是否留学生'
            name="is_overseas_student"
            rules={[{required:true,message:'请输入是否留学生'}]}
            initialValue='否'
          >
            <Select
                placeholder='请输入留学生'
                disabled={_disable}
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
            label='是否全日制'
            name="is_full_time"
            rules={[{required:true,message:'请输入是否全日制'}]}
            initialValue='是'
          >
            <Select
                placeholder='请输入是否全日制'
                disabled={_disable}
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
            label='毕业院校'
            name="school"
            rules={[{required:true,message:'请输入毕业院校'}]}
          >
            <Input placeholder='请输入毕业院校' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='所学专业'
            name="specialty"
            rules={[{required:true,message:'请输入所学专业'}]}
          >
            <Input placeholder='请输入所学专业' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='毕业时间'
            name="graduation_time"
            rules={[{required:true,message:'请输入毕业时间'}]}
          >
            <DatePicker placeholder={['请选择时间']} style={{width:'200px'}} disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='最高学历'
            name="education"
            rules={[{required:true,message:'请输入最高学历'}]}
          >
            <Select
                placeholder='请输入最高学历'
                disabled={_disable}
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
            label='所持证书'
            name="certificate"
            initialValue=''
          >
            <Input placeholder='请输入所持证书' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='语言能力'
            name="language_competence"
            initialValue=''
          >
            <Input placeholder='请输入语言能力' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='工具技能'
            name="ability"
            initialValue=''
          >
            <Input placeholder='请输入工具技能' disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='是否二次入职'
            name="is_two_entry"
            initialValue='否'
          >
            <Select
                placeholder='请输入是否二次入职'
                disabled={_disable}
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
            label='工作经历'
            name="work_experience"
            initialValue=''
          >
            <TextArea placeholder='请输入工作经历' rows={4} disabled={_disable}/>
          </Form.Item>
          <Form.Item
            label='招聘渠道'
            name="recruitment_channel"
            rules={[{required:true,message:'请输入招聘渠道'}]}
          >
            <Select
                placeholder='请输入招聘渠道'
                disabled={_disable}
                options={[
                  {
                    value: 'HR招聘',
                    label: 'HR招聘',
                  },
                  {
                    value: '内部推荐',
                    label: '内部推荐',
                  },
                  {
                    value: '猎头推荐',
                    label: '猎头推荐',
                  }
                ]}
              />
          </Form.Item>
          <Form.Item
            label='离职日期'
            name="dimission_date"
            hidden={dimission_status}
            initialValue=''
          >
            <DatePicker placeholder={['请选择时间']} style={{width:'200px'}}/>
          </Form.Item>
          <Form.Item
            label='离职类型'
            name="dimission_type"
            hidden={dimission_status}
            initialValue=''
          >
            <Select
                placeholder='请输入离职类型'
                options={[
                  {
                    value: '1',
                    label: '主动离职',
                  },
                  {
                    value: '2',
                    label: '单方解除',
                  },
                  {
                    value: '3',
                    label: '协商解除',
                  },
                  {
                    value: '4',
                    label: '合同到期',
                  },
                  {
                    value: '5',
                    label: '严重违反公司规定损害公司利益(黑名单)',
                  },
                  {
                    value: '6',
                    label: '影响团队氛围人际关系恶劣(黑名单)',
                  }
                ]}
              />
          </Form.Item>
          <Form.Item
            label='离职原因'
            name="dimission_reason"
            hidden={dimission_status}
            initialValue=''
          >
            <TextArea placeholder='请输入离职原因' rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Roster;
