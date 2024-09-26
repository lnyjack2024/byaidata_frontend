/*
 * @Description: 
 * @Author: wangyonghong
 * @Date: 2024-09-20 15:15:52
 * @LastEditTime: 2024-09-24 17:05:53
 */
import React, { Component } from 'react'
import { HotTable } from "@handsontable/react";
import { data } from "./constants";
import { addClassesToRows } from "./hooksCallbacks.ts";

import 'handsontable/dist/handsontable.full.min.css';

export default class handsontable extends Component {
  render() {
    return (
      <div>
          <HotTable
              data={data}
              rowHeaders={true}
              colHeaders={["Company name","Name","Sell date","In stock","Qty","Order ID","Country"]}
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
              // persistentState={true}
              licenseKey="non-commercial-and-evaluation"
              afterChange={ ( change ) => {
                fetch('https://handsontable.com/docs/scripts/json/save.json', {
                  method: 'POST',
                  mode: 'no-cors',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ data: change }),
                }).then(() => {
                  console.log(444,change);
                });
              }}
          />
      </div>
    )
  }
}
