/*
 * @Description: 考勤数据查询
 * @Author: wangyonghong
 * @Date: 2025-03-19 15:51:34
 * @LastEditTime: 2025-03-21 15:37:52
 */
import React, { useEffect, useState } from 'react'
import { SearchOutlined, VerticalAlignBottomOutlined, RedoOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Table, Col, Row, DatePicker, Tooltip } from 'antd'
import dayjs from 'dayjs';
import '../common_css/style.css'
import { BASE } from '../../utils/networkUrl'
import storageUtils from '../../utils/storageUtils'
import { reqGetClockingDatas } from '../../api/index'
const itemLayout = { labelCol:{span:4},wrapperCol:{span:15} }

const ClockinSearch = () => {
  const [ data, setData ] = useState([])
  const [ table_loading, setTableLoading ] = useState(true)
  const [ form ] = Form.useForm();

  useEffect(() => {
    const getTableData = async () => {
      form.validateFields().then( async (val)=>{
        val.years = dayjs(val.years).format('YYYY-MM')
        const reqData = await reqGetClockingDatas(val)
        setData(reqData.data)
        setTableLoading(false)
      })
    }
    getTableData();
  },[form])

  const handSearch = () => {
    form.validateFields().then( async (val)=>{
      val.years = dayjs(val.years).format('YYYY-MM')
      const reqData = await reqGetClockingDatas(val)
      setData(reqData.data)
      setTableLoading(false)
    })
  }
  
  const handReset = () => {
    form.resetFields()
  }

  const handDownexcel = async () => {
    form.validateFields().then( async (val)=>{
      val.years = dayjs(val.years).format('YYYY-MM')
      const params = new URLSearchParams(val);
      const response = await fetch(`${BASE}/person/clocking/down?${params}`,{
        method: "GET", 
        headers: {
          authorization : 'authorization-text',
          'token' : storageUtils.getToken(),
          "Content-Type" : "application/json", //根据需要添加
        }
      })
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "人员考勤数据.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    })
  }

  const column = [
    {
      title: '年月',
      dataIndex: 'years',
      fixed: 'left'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      fixed: 'left'
    },
    {
      title: '基地',
      dataIndex: 'base',
    },
    {
      title: '组长',
      dataIndex: 'group_manager',
    },
    {
      title: '项目-任务包',
      dataIndex: 'item_task',
    },
    {
      title: '应出勤天数',
      dataIndex: 'planned_work_days',
    },
    {
      title: '实际出勤天数',
      dataIndex: 'planned_work_days',
    },
    {
      title: '请假调休天数',
      dataIndex: 'planned_work_days',
    },
    {
      title: '加班总工时',
      dataIndex: 'planned_work_days',
    },
    {
      title: '培训期天数',
      dataIndex: 'planned_work_days',
    },
    {
      title: (
        <span>
          <Tooltip title="非入职和已离职的天数总和">
            <InfoCircleOutlined />
          </Tooltip>
          &nbsp;在项天数
        </span>
      ),
      dataIndex: 'planned_work_days',
    },
    {
      title: '1号',
      dataIndex: 'day_1',
    },
    {
      title: '2号',
      dataIndex: 'day_2',
    },
    {
      title: '3号',
      dataIndex: 'day_3',
    },
    {
      title: '4号',
      dataIndex: 'day_4',
    },
    {
      title: '5号',
      dataIndex: 'day_5',
    },
    {
      title: '6号',
      dataIndex: 'day_6',
    },
    {
      title: '7号',
      dataIndex: 'day_7',
    },
    {
      title: '8号',
      dataIndex: 'day_8',
    },
    {
      title: '9号',
      dataIndex: 'day_9',
    },
    {
      title: '10号',
      dataIndex: 'day_10',
    },
    {
      title: '11号',
      dataIndex: 'day_11',
    },
    {
      title: '12号',
      dataIndex: 'day_12',
    },
    {
      title: '13号',
      dataIndex: 'day_13',
    },
    {
      title: '14号',
      dataIndex: 'day_14',
    },
    {
      title: '15号',
      dataIndex: 'day_15',
    },
    {
      title: '16号',
      dataIndex: 'day_16',
    },
    {
      title: '17号',
      dataIndex: 'day_17',
    },
    {
      title: '18号',
      dataIndex: 'day_18',
    },
    {
      title: '19号',
      dataIndex: 'day_19',
    },
    {
      title: '20号',
      dataIndex: 'day_20',
    },
    {
      title: '21号',
      dataIndex: 'day_21',
    },
    {
      title: '22号',
      dataIndex: 'day_22',
    },
    {
      title: '23号',
      dataIndex: 'day_23',
    },
    {
      title: '24号',
      dataIndex: 'day_24',
    },
    {
      title: '25号',
      dataIndex: 'day_25',
    },
    {
      title: '26号',
      dataIndex: 'day_26',
    },
    {
      title: '27号',
      dataIndex: 'day_27',
    },
    {
      title: '28号',
      dataIndex: 'day_28',
    },
    {
      title: '29号',
      dataIndex: 'day_29',
    },
    {
      title: '30号',
      dataIndex: 'day_30',
    },
    {
      title: '31号',
      dataIndex: 'day_31',
    }
  ];

  return (
    <div className='style' style={{ backgroundColor:'white' }}>
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
              <Form.Item name="name" label="姓名" {...itemLayout}>
                <Input placeholder='请输入姓名' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item  >
                <Button onClick={ handDownexcel } type='primary'  icon={<VerticalAlignBottomOutlined />} style={{backgroundColor: "#555555",color:'white'}}> 下载 </Button>&nbsp;&nbsp;
                <Button onClick={ handReset } type='primary'  icon={<RedoOutlined />} style={{backgroundColor: "#808080",color:'white'}}> 重置 </Button>&nbsp;&nbsp;
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
    </div>
  )
}

export default ClockinSearch;
