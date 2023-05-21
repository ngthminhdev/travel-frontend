import React from "react";
import "./management.scss";
import { Tabs } from "antd";
import AddProduct from "../../../components/AddProduct";
import ListTour from "../../../components/ListTour";
import UserManagement from "../../../components/UserManagement";
import LisOrderTour from "../../../components/ListOrderTour";
const { TabPane } = Tabs;

function Management() {
  return (
    <div className="management">
      <div className=" min-h-screen flex flex-col">
        <div className="bg-white">
          <div className="container mx-auto">
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="Add Tour" key="1">
                <AddProduct />
              </TabPane>
              <TabPane tab="Quản lý Tour" key="2">
                <ListTour />
              </TabPane>
              <TabPane tab="Quản lý Order Tour" key="3">
                <LisOrderTour />
              </TabPane>
              <TabPane tab="Quản lý User" key="4">
                <UserManagement />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Management;
