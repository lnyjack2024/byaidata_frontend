/*
 * @Description: 小红书绩效
 * @Author: wangyonghong
 * @Date: 2024-09-30 20:40:13
 * @LastEditTime: 2024-11-25 14:18:13
 */
import React, { useRef, useEffect, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Form, Table, Col, Row, Tabs, DatePicker, message } from 'antd'
import dayjs from 'dayjs';
import { HotTable } from "@handsontable/react";
import { addClassesToRows } from "../handsontable/hooksCallbacks.ts";
import 'handsontable/dist/handsontable.full.min.css';
import '../common_css/style.css'
import { reqAddClockingDatas } from '../../api/index'
const itemLayout = { labelCol:{span:4},wrapperCol:{span:15} }

const Performance_xhs = () => {
  const hotRef = useRef(null);
  const [ table_loading, setTableLoading ] = useState(true)
  const [ height, setHeight ] = useState(0);
  const [ form ] = Form.useForm();
  
  useEffect(() => {
    getTableData();
    setHeight(window.innerHeight * 0.7); //动态设置表格高度为屏幕的高度（例如：80%）
  },[])

  const getTableData = async () => {
    setTableLoading(false)
  }

  const handSearch = () => {
    form.validateFields().then( async (val)=>{
      val.years = dayjs(val.years).format('YYYY-MM')
      if(val.name === ''){
        val.name = undefined
      }
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

  const column = [
    {
      title: '姓名',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: '业务',
      dataIndex: 'years',
      width: 90,
    },
    {
      title: '质量得分',
      dataIndex: 'base',
      width: 90,
    },
    {
      title: '效率得分',
      dataIndex: 'department',
      width: 120,
    },
    {
      title: '执行力得分',
      dataIndex: 'day_1',
      width: 90
    },
    {
      title: '投入度得分',
      dataIndex: 'day_2',
      width: 90
    },
    {
      title: '绩效总分数',
      dataIndex: 'day_3',
      width: 90
    },
    {
      title: '绩效总排名',
      dataIndex: 'day_4',
      width: 90
    },
    {
      title: '绩效等级',
      dataIndex: 'day_6',
      width: 90
    },
    {
      title: '备注',
      dataIndex: 'day_5',
      width: 90
    }
  ];

  const tabItems = [
    {
      key: '1',
      label: '汇总表',
      children: 
        <div style={{ width: '100%', height: '90%',overflow:'auto' }}>
            <Table 
              columns={ column } 
              dataSource={ [] } 
              rowKey={ data => data.id }  
              scroll={{ x: 'max-content', y: height }}
              loading={ table_loading }
            />
        </div>
    },
    {
      key: '2',
      label: '工作量明细',
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
                { title: "职场", width: 100 },      
                { title: "项目", width: 100 },      
                { title: "姓名", width: 100 },    
                { title: "工作日期", width: 100 },      
                { title: "标注工时", width: 100 },      
                { title: "标注工作量", width: 100 }, 
                { title: "加班-标注工时", width: 150 }, 
                { title: "加班-标注工作量", width: 150 },
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
      label: '标注组-质量表',
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
            { title: "职场", width: 100 },      
            { title: "日期", width: 100 },      
            { title: "姓名", width: 100 },    
            { title: "打分一致数", width: 100 },      
            { title: "打分总数", width: 100 },      
            { title: "排序一致数", width: 100 }, 
            { title: "排序总数", width: 100 }, 
            { title: "标签全部数", width: 100 },
            { title: "标签正确数", width: 100 },
            { title: "标签遗漏数", width: 100 },
            { title: "打分一致率", width: 100 },
            { title: "排序一致率", width: 100 },
            { title: "错误标签准确率", width: 100 },
            { title: "错误标签召回率", width: 100 }
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
      key: '4',
      label: '质检组-质量表',
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
                { title: "质检人", width: 100 },      
                { title: "周期", width: 100 },      
                { title: "准确率", width: 100 },    
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
      key: '5',
      label: '业务数据汇总表',
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
            { title: "个人总产出量", width: 100 },      
            { title: "个人生产工时", width: 100 },    
            { title: "目标效率", width: 100 },      
            { title: "效率得分", width: 100 },      
            { title: "排序个人准确", width: 100 }, 
            { title: "目标质量-排序个人准确", width: 150 }, 
            { title: "标签正确率", width: 100 },
            { title: "目标质量-标签正确率", width: 150 },
            { title: "打分个人准确率", width: 100 },
            { title: "目标质量-打分个人准确率", width: 150 },
            { title: "标签召回率", width: 100 },
            { title: "目标质量-标签召回率", width: 150 },
            { title: "质量得分", width: 100 },
            { title: "质效分数", width: 100 },
            { title: "执行力分数", width: 100 },
            { title: "投入度分数", width: 100 },
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
      key: '6',
      label: '执行力',
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
                { title: "项目", width: 100 },      
                { title: "姓名", width: 100 },    
                { title: "减分项目", width: 100 },      
                { title: "减分", width: 100 },      
                { title: "加分项目", width: 100 }, 
                { title: "加分", width: 150 }, 
                { title: "备注", width: 150 },
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
      key: '7',
      label: '考勤数据',
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
                { title: "业务", width: 100 },      
                { title: "姓名", width: 100 },    
                { title: "员工状态", width: 100 },      
                { title: "实际出勤工时", width: 100 },      
                { title: "事假工时", width: 100 }
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

export default Performance_xhs;