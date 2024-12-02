/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-09-30 14:55:23
 * @LastEditTime: 2024-12-02 14:15:46
 */
import React, { useRef, useEffect, useState } from 'react'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Table, Select, Col, Row, Tabs, DatePicker, message } from 'antd'
import dayjs from 'dayjs';
import { HotTable } from "@handsontable/react";
import { addClassesToRows } from "../handsontable/hooksCallbacks.ts";
import 'handsontable/dist/handsontable.full.min.css';
import '../common_css/style.css'
import { reqGetClockingDatas, reqAddClockingDatas, reqEditClockingDatas, reqDeleteClockingDatas, reqGetBaseDatas } from '../../api/index'
const itemLayout = { labelCol:{span:4},wrapperCol:{span:15} }
const { Option } = Select;

const Clocking = () => {
  const hotRef = useRef(null);
  const hotRef1 = useRef(null);
  const [ data, setData ] = useState([])
  const [ table_loading, setTableLoading ] = useState(true)
  const [ height, setHeight ] = useState(0);
  const [ baseData, setBaseData ] = useState([])
  const [ form ] = Form.useForm();
  
  useEffect(() => {
    getTableData();
    getBaseData()
    setHeight(window.innerHeight * 0.7); //动态设置表格高度为屏幕的高度（例如：80%）
  },[])

  const getBaseData = async () => {
    const reqData = await reqGetBaseDatas()
    setBaseData(reqData.data)
  }

  const getTableData = async () => {
    const reqData = await reqGetClockingDatas()
    setData(reqData.data)
    setTableLoading(false)
  }

  const handSearch = () => {
    form.validateFields().then( async (val)=>{
      val.years = dayjs(val.years).format('YYYY-MM')
      if(val.name === ''){
        val.name = undefined
      }
      const reqData = await reqGetClockingDatas(val)
      setData(reqData.data)
      setTableLoading(false)
    })
  }
  
  const saveClickCallback = async () => {
    const hot = hotRef.current?.hotInstance;
    const result = await reqAddClockingDatas(hot?.getData())
    if(result.status === 1){
      getTableData();
      message.info('新增成功...')
      hot.loadData([])
    }else{
      message.error('新增失败...')
    }
  };

  const changDatas =  ( changes ) => {
      changes?.forEach( async ([row, prop, oldValue, newValue]) => {
        var rowData = hotRef1.current?.hotInstance.getDataAtRow(row);
        let val   = {}
        val.id    = rowData[0]
        val.field = prop
        val.value = newValue
        const result = await reqEditClockingDatas(val)
        if(result.status === 1){
          getTableData();
          message.info('修改成功...')
        }else{
          message.error('修改失败...')
        }
      })
  }

  const deleteDatas = async (index) => {
    var rowData = hotRef1.current?.hotInstance.getDataAtRow(index);
    let val   = {}
    val.id    = rowData[0]
    const result = await reqDeleteClockingDatas(val)
    if(result.status === 1){
      getTableData();
      message.info('删除成功...')
    }else{
      message.error('删除失败...')
    }
  }

  const column = [
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
      fixed: 'left'
    },
    {
      title: '年月',
      dataIndex: 'years',
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
      title: '1号',
      dataIndex: 'day_1',
      width: 90
    },
    {
      title: '2号',
      dataIndex: 'day_2',
      width: 90
    },
    {
      title: '3号',
      dataIndex: 'day_3',
      width: 90
    },
    {
      title: '4号',
      dataIndex: 'day_4',
      width: 90
    },
    {
      title: '5号',
      dataIndex: 'day_5',
      width: 90
    },
    {
      title: '6号',
      dataIndex: 'day_6',
      width: 90
    },
    {
      title: '7号',
      dataIndex: 'day_7',
      width: 90
    },
    {
      title: '8号',
      dataIndex: 'day_8',
      width: 90
    },
    {
      title: '9号',
      dataIndex: 'day_9',
      width: 90
    },
    {
      title: '10号',
      dataIndex: 'day_10',
      width: 90
    },
    {
      title: '11号',
      dataIndex: 'day_11',
      width: 90
    },
    {
      title: '12号',
      dataIndex: 'day_12',
      width: 90
    },
    {
      title: '13号',
      dataIndex: 'day_13',
      width: 90
    },
    {
      title: '14号',
      dataIndex: 'day_14',
      width: 90
    },
    {
      title: '15号',
      dataIndex: 'day_15',
      width: 90
    },
    {
      title: '16号',
      dataIndex: 'day_16',
      width: 90
    },
    {
      title: '17号',
      dataIndex: 'day_17',
      width: 90
    },
    {
      title: '18号',
      dataIndex: 'day_18',
      width: 90
    },
    {
      title: '19号',
      dataIndex: 'day_19',
      width: 90
    },
    {
      title: '20号',
      dataIndex: 'day_20',
      width: 90
    },
    {
      title: '21号',
      dataIndex: 'day_21',
      width: 90
    },
    {
      title: '22号',
      dataIndex: 'day_22',
      width: 90
    },
    {
      title: '23号',
      dataIndex: 'day_23',
      width: 90
    },
    {
      title: '24号',
      dataIndex: 'day_24',
      width: 90
    },
    {
      title: '25号',
      dataIndex: 'day_25',
      width: 90
    },
    {
      title: '26号',
      dataIndex: 'day_26',
      width: 90
    },
    {
      title: '27号',
      dataIndex: 'day_27',
      width: 90
    },
    {
      title: '28号',
      dataIndex: 'day_28',
      width: 90
    },
    {
      title: '29号',
      dataIndex: 'day_29',
      width: 90
    },
    {
      title: '30号',
      dataIndex: 'day_30',
      width: 90
    },
    {
      title: '31号',
      dataIndex: 'day_31',
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
            <Button type="primary" icon={<PlusOutlined />} style={{backgroundColor: "#000000",color:'white'}}
            onClick={saveClickCallback}>
              新增
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
              headerClassName="htCenter htMiddle"
              beforeRenderer={addClassesToRows}
              manualRowMove={true}
              navigableHeaders={true}
              minSpareRows={50}
              // persistentState={true}
              licenseKey="non-commercial-and-evaluation"
          />
        </div>
    },
    {
      key: '3',
      label: '考勤数据修改',
      children: 
        <div>
            <HotTable
              ref={hotRef1}
              data={data}
              colHeaders={["ID","姓名","年月","基地","部门","1号","2号","3号",
              "4号","5号","6号","7号","8号","9号","10号","11号","12号",
              "13号","14号","15号","16号","17号","18号","19号","20号",
              "21号","22号","23号","24号","25号","26号","27号","28号",
              "29号","30号","31号"]}
              // rowHeaders={true}
              height={height}
              scrollable={true}
              hiddenColumns={{
                indicators: true
              }}
              contextMenu={true}
              multiColumnSorting={true}
              filters={true}
              autoWrapRow={true}
              autoWrapCol={true}
              headerClassName="htCenter htMiddle"
              beforeRenderer={addClassesToRows}
              manualRowMove={true}
              navigableHeaders={true}
              // persistentState={true}
              licenseKey="non-commercial-and-evaluation"
              afterChange={(changes) => changDatas(changes)} //行修改
              // afterRemoveRow={(index) => deleteDatas(index)} //删除行
              beforeRemoveRow={(index) => deleteDatas(index)}
            />
        </div>
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
                name="years" 
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
              <Form.Item name="name" label="姓名" {...itemLayout}>
                <Input placeholder='请输入姓名' />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item  >
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