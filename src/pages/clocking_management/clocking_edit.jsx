/*
 * @Description: 考勤数据修改
 * @Author: wangyonghong
 * @Date: 2025-03-19 15:54:03
 * @LastEditTime: 2025-03-21 14:41:09
 */
import React, { useRef, useState, useEffect } from 'react'
import { Form, DatePicker, message, Col, Row } from 'antd'
import dayjs from 'dayjs';
import { HotTable } from "@handsontable/react";
import { addClassesToRows } from "../handsontable/hooksCallbacks.ts";
import 'handsontable/dist/handsontable.full.min.css';
import '../common_css/style.css'
import { reqGetClockingDatas, 
         reqEditClockingDatas, 
         reqDeleteClockingDatas } from '../../api/index'
const itemLayout = { labelCol:{ span:4 }, wrapperCol:{ span:15 } }

export default function ClockingEdit() {
  const hotRef = useRef(null);
  const [ data, setData ] = useState([])
  const [ height, setHeight ] = useState(0);
  const [ form ] = Form.useForm();

  useEffect(() => {
    const getTableData = async () => {
      form.validateFields().then( async (val)=>{
        val.years = dayjs(val.years).format('YYYY-MM')
        const reqData = await reqGetClockingDatas(val)
        setData(reqData.data)
      })
    }

    getTableData();
    setHeight(window.innerHeight * 0.7); //动态设置表格高度为屏幕的高度（例如：80%）
  },[form])

  const changDatas =  ( changes ) => {
    changes?.forEach( async ([row, prop, oldValue, newValue]) => {
      var rowData = hotRef.current?.hotInstance.getDataAtRow(row);
      let val   = {}
      val.id    = rowData[0]
      val.field = prop
      val.value = newValue
      const result = await reqEditClockingDatas(val)
      if(result.status === 1){
        message.info('修改成功...')
      }else{
        message.error('修改失败...')
      }
    })
}

  const deleteDatas = async (index) => {
    var rowData = hotRef.current?.hotInstance.getDataAtRow(index);
    let val   = {}
    val.id    = rowData[0]
    const result = await reqDeleteClockingDatas(val)
    if(result.status === 1){
      message.info('删除成功...')
    }else{
      message.error('删除失败...')
    }
  }

  const handleDateChange = (date) => {
    form.validateFields().then( async (val)=>{
      val.years = dayjs(date).format('YYYY-MM')
      const reqData = await reqGetClockingDatas(val)
      setData(reqData.data)
    })
  };
  
    //定义1号到31号的列配置
    const dateColumns = Array.from({ length: 31 }, (_, index) => ({
    title: `${index + 1}号`,
    data: `day_${index + 1}`,
    width: 100,
    type: 'dropdown',
    source: [
      '正常班', '正常休', '培训期', '全天假', '调休假', '假(上0.5天)', 
      '假(下0.5天)', '上午假', '下午假', '加班', '加班半天假', 
      '加班上午假', '加班下午假', '未入职', '已离职'
    ]
  }));

  //完整的列配置
  const columns = [
    { title: "ID", data: "id", width: 100 },
    { title: "年月", data: "years", width: 100 },
    { title: "姓名", data: "name", width: 100 },
    { title: "基地", data: "base", width: 100 },
    { title: "组长", data: "group_manager", width: 100 },
    { title: "项目-任务包", data: "item_task", width: 400 },
    { title: "应出勤天数", data: "planned_work_days", width: 100 },
    ...dateColumns //将1号到31号的列配置展开
  ];

  return (
    <div className='style' style={{ backgroundColor:'white' }}>
      <div className='flex-box' style={{ height:'100px' }}>
        <Form form={form} className='flex-box-form' layout='inline'>
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
                  onChange={ handleDateChange }
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div>
          <HotTable
            ref={hotRef}
            data={data}
            rowHeaders={false}
            colHeaders={true}
            columns={columns}
            // colHeaders={["ID","年月","姓名","基地","组长","项目-任务包","应出勤天数","1号","2号","3号",
            // "4号","5号","6号","7号","8号","9号","10号","11号","12号",
            // "13号","14号","15号","16号","17号","18号","19号","20号",
            // "21号","22号","23号","24号","25号","26号","27号","28号",
            // "29号","30号","31号"]}
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
            licenseKey="non-commercial-and-evaluation"
            afterChange={(changes) => changDatas(changes)} //行修改
            beforeRemoveRow={(index) => deleteDatas(index)}
          />
      </div>
    </div>
  )
}
