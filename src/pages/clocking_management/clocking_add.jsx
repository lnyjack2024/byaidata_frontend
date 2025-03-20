/*
 * @Description: 考勤数据录入
 * @Author: wangyonghong
 * @Date: 2025-03-19 15:53:17
 * @LastEditTime: 2025-03-20 14:22:40
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
  return (
    <div className='style' style={{ backgroundColor:'white' }}>
        <HotTable
            ref={hotRef}
            rowHeaders={true}
            columns={[
              { title: "姓名", width: 100 },      
              { title: "年月", width: 100 },      
              { title: "项目-任务包", width: 400 },      
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
            minSpareRows={100}
            // persistentState={true}
            licenseKey="non-commercial-and-evaluation"
        />
        <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{marginLeft:'10px'}}>
            年月格式: 2025-01
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
