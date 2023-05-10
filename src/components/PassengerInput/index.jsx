import { Input, InputNumber } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

const PassengerInput = () => {
  return (
    <div className="flex items-center">
      <label className="mr-4">Hành Khách:</label>
      <div className="border rounded-md flex">
        <InputNumber
          min={0}
          defaultValue={0}
          className="w-16 border-none focus:outline-none"
        />
        <Input.Group>
          <Input
            readOnly
            className="w-16 bg-white border-l border-r focus:outline-none"
          />
          <Input.GroupAddon>
            <MinusCircleOutlined className="text-gray-500 hover:text-gray-700 cursor-pointer" />
          </Input.GroupAddon>
          <Input.GroupAddon>
            <PlusCircleOutlined className="text-gray-500 hover:text-gray-700 cursor-pointer" />
          </Input.GroupAddon>
        </Input.Group>
      </div>
    </div>
  );
};

export default PassengerInput;
