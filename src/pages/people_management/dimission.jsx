/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-09-30 14:50:24
 * @LastEditTime: 2024-11-12 11:13:46
 */
import React, { useEffect, useState } from 'react'
import { SearchOutlined, RedoOutlined} from '@ant-design/icons';
import { Button, Form, Input, Table, Select, Col, Row } from 'antd'
import dayjs from 'dayjs';
import '../common_css/style.css'
import { reqGetDimissionDatas } from '../../api/index'
// const { RangePicker } = DatePicker;
const itemLayout = { labelCol:{span:5},wrapperCol:{span:15} }

const Dimission = () => {
  const [ data, setData ] = useState([])
  const [ table_loading, setTableLoading ] = useState(true)
  const [ form ] = Form.useForm();
  useEffect(() => {
    getTableData()
  },[])

  const getTableData = async () => {
    const reqData = await reqGetDimissionDatas()
      setData(reqData.data)
      setTableLoading(false)
  }

  const hangFinish = (e) => {

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
      dataIndex: 'pasbank_card_detail',
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
    {
      title: '工作经历',
      dataIndex: 'work_experience',
    },
    {
      title: '招聘渠道',
      dataIndex: 'recruitment_channel',
    },
    {
      title: '离职日期',
      dataIndex: 'dimission_date',
      render:(dimission_date)=>{
        if(dimission_date === null){
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
          onFinish={hangFinish}
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
              <Form.Item name="entry_date" label="离职日期" {...itemLayout}>
                <RangePicker     
                  placeholder={['开始日期', '结束日期']}
                  onChange={onChange} 
                  style={{width:'250px'}}
                />
              </Form.Item>
            </Col> */}
            <Col span={6}>
              <Form.Item  >
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
    </div>
  )
}

export default Dimission;

