/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-11-18 13:13:51
 * @LastEditTime: 2024-12-02 15:08:40
 */
import React, { useEffect, useState } from 'react'
import { SearchOutlined, RedoOutlined} from '@ant-design/icons';
import { Button, Form, Input, Table, Col, Row } from 'antd'
import dayjs from 'dayjs';
import '../common_css/style.css'
import { reqGetLogsDatas } from '../../api/index'
const itemLayout = { labelCol:{span:5},wrapperCol:{span:15} }
// const { RangePicker } = DatePicker;
// const rangePresets = [
//     {
//       label: '最近7天',
//       value: [dayjs().add(-7, 'd'), dayjs()],
//     },
//     {
//       label: '最近14天',
//       value: [dayjs().add(-14, 'd'), dayjs()],
//     },
//     {
//       label: '最近30天',
//       value: [dayjs().add(-30, 'd'), dayjs()],
//     }
// ];
  
const Logs = () => {
    const [ data, setData ] = useState([])
    const [ table_loading, setTableLoading ] = useState(true)
    const [ form ] = Form.useForm();

    useEffect(() => {
      getTableData()
    },[])
  
    const getTableData = async () => {
      const reqData = await reqGetLogsDatas()
        setData(reqData.data)
        setTableLoading(false)
    }
  
    const handSearch = () => {
      form.validateFields().then( async (val)=>{
        const reqData = await reqGetLogsDatas(val)
        setData(reqData.data)
        setTableLoading(false)
      })
    }
  
    const handReset = () => {
      form.resetFields()
    }
    
    const column = [
      {
        title: '请求URL',
        dataIndex: 'url',
        fixed: 'left'
      },
      {
        title: '操作人',
        dataIndex: 'user',
        fixed: 'left'
      },
      {
        title: '请求数据',
        dataIndex: 'date',
      },
      {
        title: '操作时间',
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
            <Row style={{ width:'100%' }}>
              <Col span={6}>
                <Form.Item name="url" label="请求URL" {...itemLayout}>
                    <Input placeholder='请输入请求URL' />
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
        <div style={{ width: '100%', height: '80%', overflow:'auto' }}>
          <Table 
            columns={ column } 
            dataSource={ data } 
            rowKey={ data => data.id }  
            loading={table_loading}
            scroll={{x: 'max-content'}}
          />
        </div>
      </div>
    )
}
  
export default Logs;