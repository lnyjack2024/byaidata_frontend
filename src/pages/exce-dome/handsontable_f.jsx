/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-09-23 10:22:54
 * @LastEditTime: 2024-09-26 16:03:54
 */
import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { Button } from 'antd';
import { HotTable } from "@handsontable/react";
// import { data } from "./constants";
import { addClassesToRows } from "./hooksCallbacks.ts";
import { reqHandsontableDatas } from '../../api/index'

import 'handsontable/dist/handsontable.full.min.css';

export default function HotInstance_f() {
    const hotRef = useRef(null);
    const [data, setData ] = useState([])
    useEffect(()=>{
      const fetchData = async () => {
        const reqData = await reqHandsontableDatas()
        console.log(333,reqData)
        setData(reqData)
        };
      fetchData();
    },[])
    const saveClickCallback = (event) => {
        const hot = hotRef.current?.hotInstance;
        fetch('https://handsontable.com/docs/scripts/json/save.json', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: hot?.getData() }),
        }).then(() => {
          console.log(555,hot?.getData());
        });
    };

  return (
    <div>
       <div style={{marginTop:'50px',marginBottom:'10px',marginLeft:'10px'}}>
          <Button type="primary" onClick={saveClickCallback}>
            提交
          </Button>
          </div>
          <HotTable
              ref={hotRef}
              data={data}
              rowHeaders={true}
              colHeaders={["ID","项目名称","任务包","日期","人员","基地","正常工时","非正常工时","加班时长","非正常工时内容","实际工时","数量级","每小时标注效率","任务完成率"]}
              height="auto"
              dropdownMenu={true}
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
              minSpareRows={1}
              persistentState={true} //开启本地保存
            
              licenseKey="non-commercial-and-evaluation"
          />
    </div>
  )
}
