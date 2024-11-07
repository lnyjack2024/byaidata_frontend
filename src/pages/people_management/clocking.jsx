/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-09-30 14:55:23
 * @LastEditTime: 2024-11-07 17:47:48
 */
import React, { useRef, useEffect, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Table, Select, Col, Row, Tabs, DatePicker, message } from 'antd'
import dayjs from 'dayjs';
import { HotTable } from "@handsontable/react";
import { addClassesToRows } from "../excel-dome/hooksCallbacks.ts";
import 'handsontable/dist/handsontable.full.min.css';
import '../common_css/style.css'
import { reqGetClockingDatas, reqAddClockingDatas } from '../../api/index'
const itemLayout = { labelCol:{span:4},wrapperCol:{span:15} }

const Clocking = () => {
  const hotRef = useRef(null);
  const [ data, setData ] = useState([])
  const [ table_loading, setTableLoading ] = useState(true)
  const [ height, setHeight ] = useState(0);
  const [ form ] = Form.useForm();
  useEffect(() => {
    getTableData();
     // 动态设置表格高度为屏幕的高度（例如：80%）
     setHeight(window.innerHeight * 0.6);
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
  
  const saveClickCallback = async () => {
    const hot = hotRef.current?.hotInstance;
    const result = await reqAddClockingDatas(hot?.getData())
    if(result.status === 1){
      message.info('新增成功...')
    }else{
      message.error('新增失败...')
    }
  };

  const column = [
    {
      title: '年月',
      dataIndex: 'date',
      width: 90,
      fixed: 'left'
    },
    {
      title: '基地',
      dataIndex: 'base',
      width: 90,
      fixed: 'left'
    },
    {
      title: '部门',
      dataIndex: 'department',
      width: 120,
      fixed: 'left'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
      fixed: 'left'
    },
    {
      title: '1号',
      dataIndex: 'day1',
      width: 90
    },
    {
      title: '2号',
      dataIndex: 'day2',
      width: 90
    },
    {
      title: '3号',
      dataIndex: 'day3',
      width: 90
    },
    {
      title: '4号',
      dataIndex: 'day4',
      width: 90
    },
    {
      title: '5号',
      dataIndex: 'day5',
      width: 90
    },
    {
      title: '6号',
      dataIndex: 'day6',
      width: 90
    },
    {
      title: '7号',
      dataIndex: 'day7',
      width: 90
    },
    {
      title: '8号',
      dataIndex: 'day8',
      width: 90
    },
    {
      title: '9号',
      dataIndex: 'day9',
      width: 90
    },
    {
      title: '10号',
      dataIndex: 'day10',
      width: 90
    },
    {
      title: '11号',
      dataIndex: 'day11',
      width: 90
    },
    {
      title: '12号',
      dataIndex: 'day12',
      width: 90
    },
    {
      title: '13号',
      dataIndex: 'day13',
      width: 90
    },
    {
      title: '14号',
      dataIndex: 'day14',
      width: 90
    },
    {
      title: '15号',
      dataIndex: 'day15',
      width: 90
    },
    {
      title: '16号',
      dataIndex: 'day16',
      width: 90
    },
    {
      title: '17号',
      dataIndex: 'day17',
      width: 90
    },
    {
      title: '18号',
      dataIndex: 'day18',
      width: 90
    },
    {
      title: '19号',
      dataIndex: 'day19',
      width: 90
    },
    {
      title: '20号',
      dataIndex: 'day20',
      width: 90
    },
    {
      title: '21号',
      dataIndex: 'day21',
      width: 90
    },
    {
      title: '22号',
      dataIndex: 'day22',
      width: 90
    },
    {
      title: '23号',
      dataIndex: 'day23',
      width: 90
    },
    {
      title: '24号',
      dataIndex: 'day24',
      width: 90
    },
    {
      title: '25号',
      dataIndex: 'day25',
      width: 90
    },
    {
      title: '26号',
      dataIndex: 'day26',
      width: 90
    },
    {
      title: '27号',
      dataIndex: 'day27',
      width: 90
    },
    {
      title: '28号',
      dataIndex: 'day28',
      width: 90
    },
    {
      title: '29号',
      dataIndex: 'day29',
      width: 90
    },
    {
      title: '30号',
      dataIndex: 'day30',
      width: 90
    },
    {
      title: '31号',
      dataIndex: 'day31',
      width: 90
    }
  ];

  const tabItems = [
    {
      key: '1',
      label: '考勤数据列表',
      children: 
        <div style={{ width: '100%', height: '90%',overflow:'auto' }}>
            <Table 
              columns={ column } 
              dataSource={ data } 
              rowKey={ data => data.id }  
              scroll={{ x: 'max-content', y: height }}
              loading={ table_loading }
            />
        </div>
    },
    {
      key: '2',
      label: '考勤数据录入',
      children: 
        <div>
          <div style={{marginLeft:'5px', marginTop:'0px',marginBottom:'10px',display:'flex',alignItems:'center',justifyContent:'flex-start'}}>
            <Button type="primary" onClick={saveClickCallback}>
              + 新增
            </Button>
          </div>
          <HotTable
              ref={hotRef}
              rowHeaders={true}
              columns={[
                { title: "姓名", width: 100 },      
                { title: "年月", width: 100 },      
                { title: "基地", width: 100 },    
                { title: "部门", width: 200 },      
                { title: "1号", width: 70 },      
                { title: "2号", width: 70 },      
                { title: "3号", width: 70 },      
                { title: "4号", width: 70 },      
                { title: "5号", width: 70 },      
                { title: "6号", width: 70 },      
                { title: "7号", width: 70 },      
                { title: "8号", width: 70 },      
                { title: "9号", width: 70 },      
                { title: "10号", width: 70 },      
                { title: "11号", width: 70 },      
                { title: "12号", width: 70 },      
                { title: "13号", width: 70 },      
                { title: "14号", width: 70 },      
                { title: "15号", width: 70 },      
                { title: "16号", width: 70 },      
                { title: "17号", width: 70 },      
                { title: "18号", width: 70 },      
                { title: "19号", width: 70 },      
                { title: "20号", width: 70 },      
                { title: "21号", width: 70 },      
                { title: "22号", width: 70 },      
                { title: "23号", width: 70 },      
                { title: "24号", width: 70 },      
                { title: "25号", width: 70 },      
                { title: "26号", width: 70 },      
                { title: "27号", width: 70 },      
                { title: "28号", width: 70 },      
                { title: "29号", width: 70 },      
                { title: "30号", width: 70 },      
                { title: "31号", width: 70 }  
              ]}
              height={height}
              scrollable={true}
              // dropdownMenu={true}
              hiddenColumns={{
                indicators: true
              }}
              contextMenu={true}
              multiColumnSorting={true}
              filters={true}
              autoWrapRow={true}
              autoWrapCol={true}
              headerClassName="htLeft"
              beforeRenderer={addClassesToRows}
              manualRowMove={true}
              navigableHeaders={true}
              minSpareRows={50}
              // persistentState={true}
              licenseKey="non-commercial-and-evaluation"
              // afterChange={ ( change ) => {
              //   fetch('https://handsontable.com/docs/scripts/json/save.json', {
              //     method: 'POST',
              //     mode: 'no-cors',
              //     headers: {
              //       'Content-Type': 'application/json',
              //     },
              //     body: JSON.stringify({ data: change }),
              //   }).then(() => {
              //     console.log(444,change);
              //   });
              // }}
          />
        </div>
    },
    {
      key: '3',
      label: '考勤数据修改',
      children: <div>Tab 3 Content</div>,
    },
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
                name="date" 
                label="年月" 
                initialValue={dayjs().subtract(1, 'months')}
                {...itemLayout}
                rules={[{required:true}]}
              >
                <DatePicker 
                  picker="month" 
                  style={{width:'200px'}}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item 
                name="base" 
                label="基地" 
                initialValue={'上海'}
                {...itemLayout}
                rules={[{required:true}]}
              >
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
            <Col span={3}>
              <Form.Item  >
                {/* <Button onClick={ handReset } type='primary' htmlType='button' icon={<RedoOutlined />}> 重置 </Button>&nbsp; */}
                <Button onClick={ handSearch } type='primary' htmlType='submit' icon={<SearchOutlined />}> 查询 </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <Tabs type="card" items={tabItems} />
    </div>
  )
}

export default Clocking;