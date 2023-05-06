import React from "react";
import "./management.scss";
import { Tabs } from "antd";
import AddProduct from "../../../components/AddProduct";
import ListTour from "../../../components/ListTour";
const { TabPane } = Tabs;

function Management() {
  function callback(key) {
    console.log(key);
  }
  return (
    <div className="management">
      <div className=" min-h-screen flex flex-col">
        <div className="bg-white shadow-lg">
          <div className="container mx-auto">
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Add Tour" key="1">
                <AddProduct />
              </TabPane>
              <TabPane tab="Quan Ly Tour" key="2">
                <ListTour />
              </TabPane>
              <TabPane tab="Quan Ly User" key="3">
                Nội dung liên hệ
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Management;
