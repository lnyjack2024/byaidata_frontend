/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-09-30 14:55:23
 * @LastEditTime: 2024-10-16 10:16:58
 */
import React, { useEffect, useState } from 'react'
import { SearchOutlined, RedoOutlined} from '@ant-design/icons';
import { Button, Form, Input, Table, Select, Col, Row } from 'antd'
// import dayjs from 'dayjs';
import './clocking.css'
import { reqGetClockingDatas } from '../../api/index'
const itemLayout = { labelCol:{span:5},wrapperCol:{span:15} }

const Clocking = () => {
  const [ data, setData ] = useState([])
  const [ table_loading, setTableLoading ] = useState(true)
  const [ form ] = Form.useForm();
  useEffect(() => {
    getTableData()
  },[])

  const getTableData = async () => {
    const reqData = await reqGetClockingDatas()
      setData(reqData.data)
      setTableLoading(false)
  }

  const handSearch = () => {
    form.validateFields().then( async (val)=>{
      const reqData = await reqGetClockingDatas(val)
      setData(reqData.data)
      setTableLoading(false)
    })
  }

  const handReset = () => {
    form.resetFields()
  }
  
  const column = [
    {
      title: '年月',
      dataIndex: 'date'
    },
    {
      title: '基地',
      dataIndex: 'base'
    },
    {
      title: '部门',
      dataIndex: 'department'
    },
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '1号',
      dataIndex: 'day1'
    },
    {
      title: '2号',
      dataIndex: 'day2'
    },
    {
      title: '3号',
      dataIndex: 'day3'
    },
    {
      title: '4号',
      dataIndex: 'day4'
    },
    {
      title: '5号',
      dataIndex: 'day5'
    },
    {
      title: '6号',
      dataIndex: 'day6'
    },
    {
      title: '7号',
      dataIndex: 'day7'
    },
    {
      title: '8号',
      dataIndex: 'day8'
    },
    {
      title: '9号',
      dataIndex: 'day9'
    },
    {
      title: '10号',
      dataIndex: 'day10'
    },
    {
      title: '11号',
      dataIndex: 'day11'
    },
    {
      title: '12号',
      dataIndex: 'day12'
    },
    {
      title: '13号',
      dataIndex: 'day13'
    },
    {
      title: '14号',
      dataIndex: 'day14'
    },
    {
      title: '15号',
      dataIndex: 'day15'
    },
    {
      title: '16号',
      dataIndex: 'day16'
    },
    {
      title: '17号',
      dataIndex: 'day17'
    },
    {
      title: '18号',
      dataIndex: 'day18'
    },
    {
      title: '19号',
      dataIndex: 'day19'
    },
    {
      title: '20号',
      dataIndex: 'day20'
    },
    {
      title: '21号',
      dataIndex: 'day21'
    },
    {
      title: '22号',
      dataIndex: 'day22'
    },
    {
      title: '23号',
      dataIndex: 'day23'
    },
    {
      title: '24号',
      dataIndex: 'day24'
    },
    {
      title: '25号',
      dataIndex: 'day25'
    },
    {
      title: '26号',
      dataIndex: 'day26'
    },
    {
      title: '27号',
      dataIndex: 'day27'
    },
    {
      title: '28号',
      dataIndex: 'day28'
    },
    {
      title: '29号',
      dataIndex: 'day29'
    },
    {
      title: '30号',
      dataIndex: 'day30'
    },
    {
      title: '31号',
      dataIndex: 'day31'
    }
  ];
 
  return (
    <div className='clocking'>
      <div className='flex-box'>
        <Form form={form}
          className='flex-box-form'
          layout='inline'
        >
          <Row style={{ width:'100%' }}>
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
              <Form.Item name="name" label="姓名" {...itemLayout}>
                <Input placeholder='请输入姓名' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item  >
                <Button onClick={ handReset } type='primary' htmlType='button' icon={<RedoOutlined />}> 重置 </Button>&nbsp;
                <Button onClick={ handSearch } type='primary' htmlType='submit' icon={<SearchOutlined />}> 查询 </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div style={{ width: '100%', height: '90%',overflow:'auto' }}>
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

export default Clocking;