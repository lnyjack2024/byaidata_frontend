/*
 * @Description: 考勤数据查询
 * @Author: wangyonghong
 * @Date: 2025-03-19 15:51:34
 * @LastEditTime: 2025-03-20 16:16:55
 */
import React, { useEffect, useState } from 'react'
import { SearchOutlined, VerticalAlignBottomOutlined, RedoOutlined } from '@ant-design/icons';
import { Button, Form, Input, Table, Col, Row, DatePicker } from 'antd'
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
      title: '姓名',
      dataIndex: 'name',
      fixed: 'left'
    },
    {
      title: '年月',
      dataIndex: 'years',
      fixed: 'left'
    },
    {
      title: '项目-任务包',
      dataIndex: 'item_task',
      fixed: 'left'
    },
    {
      title: '1号',
      dataIndex: 'day_1',
      width: 80
    },
    {
      title: '2号',
      dataIndex: 'day_2',
      width: 80
    },
    {
      title: '3号',
      dataIndex: 'day_3',
      width: 80
    },
    {
      title: '4号',
      dataIndex: 'day_4',
      width: 80
    },
    {
      title: '5号',
      dataIndex: 'day_5',
      width: 80
    },
    {
      title: '6号',
      dataIndex: 'day_6',
      width: 80
    },
    {
      title: '7号',
      dataIndex: 'day_7',
      width: 90
    },
    {
      title: '8号',
      dataIndex: 'day_8',
      width: 80
    },
    {
      title: '9号',
      dataIndex: 'day_9',
      width: 80
    },
    {
      title: '10号',
      dataIndex: 'day_10',
      width: 80
    },
    {
      title: '11号',
      dataIndex: 'day_11',
      width: 80
    },
    {
      title: '12号',
      dataIndex: 'day_12',
      width: 80
    },
    {
      title: '13号',
      dataIndex: 'day_13',
      width: 80
    },
    {
      title: '14号',
      dataIndex: 'day_14',
      width: 80
    },
    {
      title: '15号',
      dataIndex: 'day_15',
      width: 80
    },
    {
      title: '16号',
      dataIndex: 'day_16',
      width: 80
    },
    {
      title: '17号',
      dataIndex: 'day_17',
      width: 80
    },
    {
      title: '18号',
      dataIndex: 'day_18',
      width: 80
    },
    {
      title: '19号',
      dataIndex: 'day_19',
      width: 80
    },
    {
      title: '20号',
      dataIndex: 'day_20',
      width: 80
    },
    {
      title: '21号',
      dataIndex: 'day_21',
      width: 80
    },
    {
      title: '22号',
      dataIndex: 'day_22',
      width: 80
    },
    {
      title: '23号',
      dataIndex: 'day_23',
      width: 80
    },
    {
      title: '24号',
      dataIndex: 'day_24',
      width: 80
    },
    {
      title: '25号',
      dataIndex: 'day_25',
      width: 80
    },
    {
      title: '26号',
      dataIndex: 'day_26',
      width: 80
    },
    {
      title: '27号',
      dataIndex: 'day_27',
      width: 80
    },
    {
      title: '28号',
      dataIndex: 'day_28',
      width: 80
    },
    {
      title: '29号',
      dataIndex: 'day_29',
      width: 80
    },
    {
      title: '30号',
      dataIndex: 'day_30',
      width: 80
    },
    {
      title: '31号',
      dataIndex: 'day_31',
      width: 80
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
