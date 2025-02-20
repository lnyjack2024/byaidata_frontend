/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-09-30 14:50:24
 * @LastEditTime: 2025-02-20 13:38:35
 */
import React, { useEffect, useState } from 'react'
import { SearchOutlined, RedoOutlined } from '@ant-design/icons';
import { Button, Form, Input, Table, Select, Col, Row } from 'antd'
import dayjs from 'dayjs';
import '../common_css/style.css'
import { reqGetDimissionDatas,
         reqGetDepartmentDatas,
         reqGetServiceLineDatas,reqGetBaseDatas } from '../../api/index'
// const { RangePicker } = DatePicker;
const itemLayout = { labelCol:{span:5},wrapperCol:{span:18} }
const { Option } = Select;

const Dimission = () => {
  const [ data, setData ] = useState([])
  const [ table_loading, setTableLoading ] = useState(true)
  const [ departmentData, setDepartmentData ] = useState([])
  const [ service_lineData, setServiceLineData ] = useState([])
  const [ baseData, setBaseData ] = useState([])
  const [ form ] = Form.useForm();

  useEffect(() => {
    getTableData()
    getDepartmentData() //获取部门数据
    getServiceLineData() //获取业务线数据
    getBaseData()
  },[])

  const getDepartmentData = async () => {
    const reqDepartmentData = await reqGetDepartmentDatas()
    setDepartmentData(reqDepartmentData.data)
  }

  const getServiceLineData = async () => {
    const reqServiceLineData = await reqGetServiceLineDatas()
    setServiceLineData(reqServiceLineData.data)
  }

  const getBaseData = async () => {
    const reqData = await reqGetBaseDatas()
    setBaseData(reqData.data)
  }

  const getTableData = async () => {
    const reqData = await reqGetDimissionDatas()
      setData(reqData.data)
      setTableLoading(false)
  }

  const handSearch = () => {
    form.validateFields().then( async (val)=>{
      const reqData = await reqGetDimissionDatas(val)
      setData(reqData.data)
      setTableLoading(false)
    })
  }

  const handReset = () => {
    form.resetFields()
  }
  
  const maskIdCard = (idCard) => {
    if (idCard && idCard.length === 18) {
      return idCard.replace(/(\d{6})\d{8}(\d{4})/, "$1********$2");
    }
    return idCard;
  };
  
  const maskPhoneNumber = (phone) => {
    if (phone && phone.length === 11) {
      return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    }
    return phone;
  };

  const maskAddress = (address) => {
    if (address && address.length > 6) {
      return address.replace(/(.{3}).+(.{3})/, "$1***$2");
    }
    return address;
  };

  const maskName = (name) => {
    if (name && name.length > 1) {
      return name.length === 2
        ? name.replace(/(.)./, "$1*")
        : name.replace(/(.).+(.)/, "$1*$2");
    }
    return name;
  };

  const maskBankCard = (card) => {
    if (card && card.length > 8) {
      return card.replace(/(\d{4})\d+(\d{4})/, "$1 **** **** $2");
    }
    return card;
  };
  
  const column = [
    {
      title: '姓名',
      dataIndex: 'name',
      fixed: 'left'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      fixed: 'left'
    },
    {
      title: '基地',
      dataIndex: 'base',
      fixed: 'left'
    },
    {
      title: '部门',
      dataIndex: 'department',
    },
    {
      title: '职场',
      dataIndex: 'workplace',
    },
    {
      title: '职务信息',
      dataIndex: 'role',
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
      title: '社保缴纳主体',
      dataIndex: 'social_insurance_name',
    },
    {
      title: '社保缴纳日期',
      dataIndex: 'social_insurance_date',
      render:(social_insurance_date)=>{
        return (
          social_insurance_date ? dayjs(social_insurance_date).format('YYYY-MM-DD') : ''
        )
      }
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
      render:(id_card)=>{
        return (
          maskIdCard(id_card)
        )
      }
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
      title: '籍贯',
      dataIndex: 'family_name',
    },
    {
      title: '婚姻状况',
      dataIndex: 'marital_status',
    },
    {
      title: '手机号码',
      dataIndex: 'number',
      render:(number)=>{
        return (
          maskPhoneNumber(number)
        )
      }
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '户籍所在地',
      dataIndex: 'domicile',
      render:(domicile)=>{
        return (
          maskAddress(domicile)
        )
      }
    },
    {
      title: '现居住地',
      dataIndex: 'urrent_address',
      render:(urrent_address)=>{
        return (
          maskAddress(urrent_address)
        )
      }
    },
    {
      title: '紧急联系人',
      dataIndex: 'emergency_contact',
      render:(emergency_contact)=>{
        return (
          maskName(emergency_contact)
        )
      }
    },
    {
      title: '与紧急联系人关系',
      dataIndex: 'emergency_contact_relation',
    },
    {
      title: '紧急联系人手机号',
      dataIndex: 'emergency_contact_number',
      render:(emergency_contact_number)=>{
        return (
          maskPhoneNumber(emergency_contact_number)
        )
      }
    },
    {
      title: '银行卡卡',
      dataIndex: 'bank_card',
      render:(emergency_contact)=>{
        return (
          maskBankCard(emergency_contact)
        )
      }
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
                <Input placeholder='请输入姓名' style={{width:'250px'}}/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="role" label="职位角色" {...itemLayout}>
                <Select
                  placeholder='请输入职位角色'
                  style={{textAlign:'left',width:'250px'}}
                  allowClear={true}
                  options={[
                    {
                      value: '管理层',
                      label: '管理层',
                    },
                    {
                      value: '财务总监',
                      label: '财务总监',
                    },
                    {
                      value: '财务经理',
                      label: '财务经理',
                    },
                    {
                      value: '财务专员',
                      label: '财务专员',
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
                      value: '人力资源总监',
                      label: '人力资源总监',
                    },
                    {
                      value: '人事经理或主管',
                      label: '人事经理或主管',
                    },
                    {
                      value: '人事专员',
                      label: '人事专员',
                    },
                    {
                      value: '开发负责人',
                      label: '开发负责人',
                    },
                    {
                      value: '开发人员',
                      label: '开发人员',
                    },
                    {
                      value: '产品经理',
                      label: '产品经理',
                    },
                    {
                      value: '业务负责人',
                      label: '业务负责人',
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
                      value: '小组长',
                      label: '小组长',
                    },
                    {
                      value: '培训师',
                      label: '培训师',
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
            <Col span={6}>
              <Form.Item name="department" label="部门" {...itemLayout}>
                <Select
                    placeholder='请输入部门'
                    style={{textAlign:'left',width:'250px'}}
                    allowClear={true}
                  >
                  {
                    departmentData?.map((option)=>(
                      <Option key={option.id} value={option.name}>
                        {option.name}
                      </Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="base" label="基地" {...itemLayout}>
                <Select
                    placeholder='请输入基地'
                    style={{textAlign:'left',width:'250px'}}
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
            {/* <Col span={6}>
              <Form.Item name="entry_date" label="入职日期" {...itemLayout}>
                <RangePicker     
                  placeholder={['开始日期', '结束日期']}
                  onChange={onChange} 
                  style={{width:'250px'}}
                />
              </Form.Item>
            </Col> */}
            {/* <Col span={2}>
              <Form.Item  >
                <Upload  
                  showUploadList={false} 
                  {...props}
                >
                  <Button icon={<UploadOutlined />}>导入</Button>
                </Upload>
              </Form.Item>
            </Col> */}
            <Col span={8} >
              <Form.Item  >
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
    </div>
  )
}

export default Dimission;

