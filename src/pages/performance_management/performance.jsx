/*
 * @Description: 绩效源数据
 * @Author: wangyonghong
 * @Date: 2024-09-30 20:40:13
 * @LastEditTime: 2025-05-12 14:15:42
 */
import React, { useEffect, useState } from 'react'
import { SearchOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import { Button, Form, Table, Col, Row, Tabs, DatePicker, Select } from 'antd'
import dayjs from 'dayjs';
import { BASE } from '../../utils/networkUrl'
import storageUtils from '../../utils/storageUtils'
import { reqGetBaseDatas, reqGetTaskItemTimeDatas } from '../../api/index'
const { Option } = Select;
const itemLayout = { labelCol:{span:4},wrapperCol:{span:15} }

const Performance = () => {
  const [ table_loading, setTableLoading ] = useState(true)
  const [ baseData, setBaseData ] = useState([])
  const [ tableData, setData ] = useState([])
  const [ form ] = Form.useForm();
  
  useEffect(() => {
    const getOptions = async () => {
      const baseData = await getBaseData(); 
      setBaseData(baseData)
      if(baseData.length > 0) {
        getTableData(baseData[0]?.name); //获取数据
      }
    };
    getOptions();
  },[])

  const getBaseData = async () => {
    const reqData = await reqGetBaseDatas()
    return new Promise((resolve) => {
      setTimeout(() => resolve(reqData.data), 100);
    });
  }

  const getTableData = async (base) => {
    const formattedMonth = dayjs().format('YYYY-MM')
    if(base === '全部'){
      base = ''
    }
    const reqData = await reqGetTaskItemTimeDatas({ years:formattedMonth, base:base })
    setData(reqData.data)
    setTableLoading(false)
  }

  const handSearch = () => {
    form.validateFields().then( async (val)=>{
      val.years = dayjs(val.years).format('YYYY-MM')
      if(val.base === '全部'){
        val.base = ''
      }
      const reqData = await reqGetTaskItemTimeDatas(val)
      setData(reqData.data)
      setTableLoading(false)
    })
  }
  
  const handDownexcelItemTime = async () => {
    form.validateFields().then( async (val)=>{
      val.years = dayjs(val.years).format('YYYY-MM')
      if(val.base === '全部'){
        val.base = ''
      }
      const params = new URLSearchParams(val);
      const response = await fetch(`${BASE}/tasks/task/item_time_down?${params}`,{
        method: "GET", 
        headers: {
          authorization : 'authorization-text',
          'token' : storageUtils.getToken(),
          "Content-Type" : "application/json", 
        }
      })
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "项目工时数据.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    })
  }
  
  const handDownexcelItemAmount = async () => {
    form.validateFields().then( async (val)=>{
      val.years = dayjs(val.years).format('YYYY-MM')
      if(val.base === '全部'){
        val.base = ''
      }
      const params = new URLSearchParams(val);
      const response = await fetch(`${BASE}/tasks/task/item_amount_down?${params}`,{
        method: "GET", 
        headers: {
          authorization : 'authorization-text',
          'token' : storageUtils.getToken(),
          "Content-Type" : "application/json", 
        }
      })
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "项目量级数据.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    })
  }

  const handDownexcel = async () => {
    form.validateFields().then( async (val)=>{
      val.years = dayjs(val.years).format('YYYY-MM')
      if(val.base === '全部'){
        val.base = ''
      }
      const params = new URLSearchParams(val);
      const response = await fetch(`${BASE}/tasks/task/item_accuracy_down?${params}`,{
        method: "GET", 
        headers: {
          authorization : 'authorization-text',
          'token' : storageUtils.getToken(),
          "Content-Type" : "application/json", 
        }
      })
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "项目正确率数据.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    })
  }

  const time_column = [
    {
      title: '日期',
      dataIndex: 'date'
    },
    {
      title: '时间段',
      dataIndex: 'time_frame'
    },
    {
      title: '基地',
      dataIndex: 'base'
    },
    {
      title: '姓名',
      dataIndex: 'worker_name'
    },
    {
      title: '项目名称',
      dataIndex: 'item'
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
    }
  ];

  const count_column = [
    {
      title: '日期',
      dataIndex: 'date'
    },
    {
      title: '时间段',
      dataIndex: 'time_frame'
    },
    {
      title: '基地',
      dataIndex: 'base'
    },
    {
      title: '姓名',
      dataIndex: 'worker_name'
    },
    {
      title: '项目名称',
      dataIndex: 'item'
    },
    {
      title: '项目标准时效',
      dataIndex: 'item_timeliness'
    },
    {
      title: '标注量级',
      dataIndex: 'work_amount'
    },
    {
      title: '质检量级',
      dataIndex: 'quality_amount'
    }
  ];

  const accuracy_column = [
    {
      title: '日期',
      dataIndex: 'date'
    },
    {
      title: '时间段',
      dataIndex: 'time_frame'
    },
    {
      title: '基地',
      dataIndex: 'base'
    },
    {
      title: '姓名',
      dataIndex: 'worker_name'
    },
    {
      title: '项目名称',
      dataIndex: 'item'
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
    }
  ];

  const tabItems = [
    {
      key: '1',
      label: '项目工时',
      children: 
      <div> 
        <div className='flex-box' style={{ height:'100px' }}>
          <Form form={form}
            className='flex-box-form'
            layout='inline'
          >
            <Row style={{ width:'100%' }}>
              <Col span={6}>
                <Form.Item 
                  name="years" 
                  label="年月" 
                  initialValue={dayjs().subtract(0, 'months')}
                  {...itemLayout}
                  rules={[{required:true}]}
                >
                  <DatePicker 
                    picker="month" 
                    style={{width:'200px'}}
                    allowClear={false}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item 
                  name="base" 
                  label="基地" 
                  initialValue={"全部"} //设置第一个选项为默认值
                  {...itemLayout}
                  rules={[{required:true,message:'请选择基地'}]}
                >
                  <Select
                    placeholder='请输入基地'
                    style={{textAlign:'left'}}
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
              <Col span={8}>
                <Form.Item  >
                  <Button onClick={ handDownexcelItemTime } type='primary'  icon={<VerticalAlignBottomOutlined />} style={{backgroundColor: "#555555",color:'white'}}> 下载 </Button>&nbsp;&nbsp;
                  <Button onClick={ handSearch } type='primary' htmlType='submit' icon={<SearchOutlined />}> 查询 </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div style={{ width: '100%', height: '90%',overflow:'auto' }}>
            <Table 
              columns={ time_column } 
              dataSource={ tableData } 
              rowKey={ data => data.id }  
              //scroll={{ x: 'max-content', y: height }}
              loading={ table_loading }
            />
        </div>
      </div>
    },
    {
      key: '2',
      label: '项目量级',
      children: 
      <div> 
        <div className='flex-box' style={{ height:'100px' }}>
          <Form form={form}
            className='flex-box-form'
            layout='inline'
          >
            <Row style={{ width:'100%' }}>
              <Col span={6}>
                <Form.Item 
                  name="years" 
                  label="年月" 
                  initialValue={dayjs().subtract(0, 'months')}
                  {...itemLayout}
                  rules={[{required:true}]}
                >
                  <DatePicker 
                    picker="month" 
                    style={{width:'200px'}}
                    allowClear={false}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item 
                  name="base" 
                  label="基地" 
                  initialValue={"全部"} //设置第一个选项为默认值
                  {...itemLayout}
                  rules={[{required:true,message:'请选择基地'}]}
                >
                  <Select
                    placeholder='请输入基地'
                    style={{textAlign:'left'}}
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
              <Col span={8}>
                <Form.Item  >
                  <Button onClick={ handDownexcelItemAmount } type='primary'  icon={<VerticalAlignBottomOutlined />} style={{backgroundColor: "#555555",color:'white'}}> 下载 </Button>&nbsp;&nbsp;
                  <Button onClick={ handSearch } type='primary' htmlType='submit' icon={<SearchOutlined />}> 查询 </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div style={{ width: '100%', height: '90%',overflow:'auto' }}>
          <Table 
            columns={ count_column } 
            dataSource={ tableData } 
            rowKey={ data => data.id }  
            // scroll={{ x: 'max-content', y: height }}
            loading={ table_loading }
          />
        </div>
      </div>
    },
    {
      key: '3',
      label: '项目正确率',
      children: 
      <div> 
        <div className='flex-box' style={{ height:'100px' }}>
          <Form form={form}
            className='flex-box-form'
            layout='inline'
          >
            <Row style={{ width:'100%' }}>
              <Col span={6}>
                <Form.Item 
                  name="years" 
                  label="年月" 
                  initialValue={dayjs().subtract(0, 'months')}
                  {...itemLayout}
                  rules={[{required:true}]}
                >
                  <DatePicker 
                    picker="month" 
                    style={{width:'200px'}}
                    allowClear={false}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item 
                  name="base" 
                  label="基地" 
                  initialValue={"全部"} //设置第一个选项为默认值
                  {...itemLayout}
                  rules={[{required:true,message:'请选择基地'}]}
                >
                  <Select
                    placeholder='请输入基地'
                    style={{textAlign:'left'}}
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
              <Col span={8}>
                <Form.Item  >
                  <Button onClick={ handDownexcel } type='primary'  icon={<VerticalAlignBottomOutlined />} style={{backgroundColor: "#555555",color:'white'}}> 下载 </Button>&nbsp;&nbsp;
                  <Button onClick={ handSearch } type='primary' htmlType='submit' icon={<SearchOutlined />}> 查询 </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div style={{ width: '100%', height: '90%',overflow:'auto' }}>
          <Table 
            columns={ accuracy_column } 
            dataSource={ tableData } 
            rowKey={ data => data.id }  
            // scroll={{ x: 'max-content', y: height }}
            loading={ table_loading }
          />
        </div>
      </div>
    },
  ];

  return (
    <div className='style' style={{ backgroundColor:'white' }}>
      <Tabs type="card" items={tabItems} />
    </div>
  )
}

export default Performance;