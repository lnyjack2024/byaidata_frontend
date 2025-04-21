/*
 * @Description: 行为分
 * @Author: wangyonghong
 * @Date: 2025-03-19 16:01:42
 * @LastEditTime: 2025-04-21 13:51:33
 */
import React, { useRef, useEffect, useState } from 'react'
import { SearchOutlined, VerticalAlignBottomOutlined, RedoOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Select, Table, Col, Row, DatePicker, Tabs, message } from 'antd'
import dayjs from 'dayjs';
import { HotTable } from "@handsontable/react";
import { addClassesToRows } from "../handsontable/hooksCallbacks.ts";
import 'handsontable/dist/handsontable.full.min.css';
import '../common_css/style.css'
import { BASE } from '../../utils/networkUrl'
import storageUtils from '../../utils/storageUtils'
import { reqGetBehaviorDatas, reqGetBaseDatas, reqAddBehaviorDatas } from '../../api/index'
const itemLayout = { labelCol:{span:4},wrapperCol:{span:15} }
const { Option } = Select;

const Behavior = () => {
  const hotRef = useRef(null);
  const [ data, setData ] = useState([])
  const [ baseData, setBaseData ] = useState([])
  const [ table_loading, setTableLoading ] = useState(true)
  const [ height, setHeight ] = useState(0);
  const [ form ] = Form.useForm();

  useEffect(() => {
    getBaseData()
    const getTableData = async () => {
      form.validateFields().then( async (val)=>{
        val.day = dayjs(val.day).format('YYYY-MM')
        const reqData = await reqGetBehaviorDatas(val)
        setData(reqData.data)
        setTableLoading(false)
      })
    }
    getTableData();
    setHeight(window.innerHeight * 0.7); //动态设置表格高度为屏幕的高度（例如：80%）
  },[form])

  const getBaseData = async () => {
    const reqData = await reqGetBaseDatas()
    setBaseData(reqData.data)
  }

  const handSearch = () => {
    form.validateFields().then( async (val)=>{
      val.day = dayjs(val.day).format('YYYY-MM')
      const reqData = await reqGetBehaviorDatas(val)
      setData(reqData.data)
      setTableLoading(false)
    })
  }
  
  const handReset = () => {
    form.resetFields()
  }

  const handDownexcel = async () => {
    form.validateFields().then( async (val)=>{
      if(!val.base){
        alert("请输入基地!!!") 
        return;
      }
      val.day = dayjs(val.day).format('YYYY-MM')
      const params = new URLSearchParams(val);
      const response = await fetch(`${BASE}/items/behavior/down?${params}`,{
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
      a.download = "数据.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    })
  }

  const column = [
    {
      title: '日期',
      dataIndex: 'day',
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
      fixed: 'left'
    },
    {
      title: '项目',
      dataIndex: 'item',
    },
    {
      title: '维度',
      dataIndex: 'dimensionality',
    },
    {
      title: '赋分',
      dataIndex: 'point',
    }
  ];
  
  const yearMonthOptions = [
    '2025-04-01', '2025-04-02', '2025-04-03', '2025-04-04', '2025-04-05', '2025-04-06',
    '2025-04-07', '2025-04-08', '2025-04-09', '2025-04-10', '2025-04-11', '2025-04-12',
    '2025-04-13', '2025-04-14', '2025-04-15', '2025-04-16', '2025-04-17', '2025-04-18',
    '2025-04-19', '2025-04-20', '2025-04-21', '2025-04-22', '2025-04-23', '2025-04-24',
    '2025-04-25', '2025-04-26', '2025-04-27', '2025-04-28', '2025-04-29', '2025-04-30'
  ];

  const baseOptions = ['郑州', '商丘', '新乡', '成都', '长沙', '邯郸', '宿迁','濮阳'];
  
  // 完整的列配置
  const columns = [
    { 
      title: "日期", 
      width: 200,
      type: 'dropdown',
      source: yearMonthOptions 
    },
    { title: "姓名", width: 200 },
    { 
      title: "基地", 
      width: 100,
      type: 'dropdown',
      source: baseOptions 
    },
    { title: "项目名称", width: 500 },
    { title: "维度", width: 200 },
    { title: "赋分", width: 200 },
  ];

  const saveClickCallback = async () => {
    const hot = hotRef.current?.hotInstance;
    const result = await reqAddBehaviorDatas(hot?.getData())
    if(result.status === 1){
      message.info('新增成功...')
      hot.loadData([])
    }else{
      message.error('新增失败...')
    }
  };

  const handleTabChange = (key) => {
    if(key === '1'){
      handSearch();
    }
  };

  const tabItems = [
    {
      key: '1',
      label: '行为分列表',
      children: 
      <div style={{ width: '100%', height: '85%', overflow:'auto'}}>
        <Table 
          columns={ column } 
          dataSource={ data } 
          rowKey={ data => data.id }  
          scroll={{x: 'max-content'}}
          loading={table_loading}
        />
    </div>
    },
    {
      key: '2',
      label: '行为分录入',
      children: 
      <div className='style' style={{ backgroundColor:'white' }}>
      <HotTable
          ref={hotRef}
          rowHeaders={true}
          columns={columns}
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
          minSpareRows={100}
          // persistentState={true}
          licenseKey="non-commercial-and-evaluation"
      />
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{marginLeft:'10px'}}>
        </div>
        <div style={{marginRight:'25px',marginTop:'20px'}}>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={saveClickCallback}>
            提交
          </Button>
        </div>
      </div>
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
                name="day" 
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
              <Form.Item name="base" label="基地" {...itemLayout}>
                <Select
                  placeholder='请输入基地'
                  style={{textAlign:'left'}}
                >
                {baseData?.filter((option) => option.name !== "全部")
                  ?.map((option) => (
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
                <Button onClick={ handDownexcel } type='primary'  icon={<VerticalAlignBottomOutlined />} style={{backgroundColor: "#555555",color:'white'}}> 下载汇总数据 </Button>&nbsp;&nbsp;
                <Button onClick={ handReset } type='primary'  icon={<RedoOutlined />} style={{backgroundColor: "#808080",color:'white'}}> 重置 </Button>&nbsp;&nbsp;
                <Button onClick={ handSearch } type='primary' htmlType='submit' icon={<SearchOutlined />}> 查询 </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <Tabs type="card" items={tabItems} onChange={handleTabChange} />
    </div>
  )
}

export default Behavior;