/*
 * @Description: 考勤数据录入
 * @Author: wangyonghong
 * @Date: 2025-03-19 15:53:17
 * @LastEditTime: 2025-03-21 13:39:33
 */
import React, { useRef, useState, useEffect } from 'react'
import { Button, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { HotTable } from "@handsontable/react";
import { addClassesToRows } from "../handsontable/hooksCallbacks.ts";
import 'handsontable/dist/handsontable.full.min.css';
import '../common_css/style.css'
import { reqAddClockingDatas } from '../../api/index'

export default function ClockingAdd() {
  const hotRef = useRef(null);
  const [ height, setHeight ] = useState(0);

  useEffect(() => {
    setHeight(window.innerHeight * 0.7); //动态设置表格高度为屏幕的高度（例如：80%）
  },[])
  
  const saveClickCallback = async () => {
    const hot = hotRef.current?.hotInstance;
    const result = await reqAddClockingDatas(hot?.getData())
    if(result.status === 1){
      message.info('新增成功...')
      hot.loadData([])
    }else{
      message.error('新增失败...')
    }
  };

   //定义1号到31号的列配置
   const dateColumns = Array.from({ length: 31 }, (_, index) => ({
    title: `${index + 1}号`,
    width: 100,
    type: 'dropdown',
    source: [
      '正常班', '正常休', '培训期', '全天假', '调休假', '假(上0.5天)', 
      '假(下0.5天)', '上午假', '下午假', '加班', '加班半天假', 
      '加班上午假', '加班下午假', '未入职', '已离职'
    ]
  }));

  const yearMonthOptions = [
    '2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06',
    '2025-07', '2025-08', '2025-09', '2025-10', '2025-11', '2025-12'
  ];

  const baseOptions = [
    '郑州', '成都', '长沙', '商丘', 
    '邯郸', '宿迁','濮阳', '新乡'];
  
  // 完整的列配置
  const columns = [
    { 
      title: "年月", 
      width: 100,
      type: 'dropdown',
      source: yearMonthOptions 
    },
    { title: "姓名", width: 100 },
    { 
      title: "基地", 
      width: 100,
      type: 'dropdown',
      source: baseOptions 
    },
    { title: "组长", width: 100 },
    { title: "项目-任务包", width: 400 },
    { title: "应出勤天数", width: 100 },
    ...dateColumns //将1号到31号的列配置展开
  ];
  
  return (
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
            <span style={{color:'blue'}}>请填写:姓名、基地、组长、项目-任务包、应出勤天数、1-31号出勤值</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1-31号的出勤值也可在 考勤数据修改 录入
          </div>
          <div style={{marginRight:'10px'}}>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={saveClickCallback}>
              新增
            </Button>
          </div>
        </div>
    </div>
  )
}
