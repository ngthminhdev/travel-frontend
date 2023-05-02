import React, {useState} from 'react';
import {TabType} from "../../app/enum";
import "./tabs.scss";
import {Controller, useForm} from "react-hook-form";
import {Button, DatePicker, Select} from "antd";
import {CiCalendar, CiLocationOn} from "react-icons/ci";
import {TbArrowsRightLeft} from "react-icons/tb";
import {AiOutlineSearch} from "react-icons/ai";
// import 'antd/dist/antd.css';tbtb


const Tour = () => {
    const [activeTab, setActiveTab] = useState(TabType.Tour);
    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
    };
    const {register, control, handleSubmit} = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <div className="tour">
            <div>
                <ul className="flex">
                    <li className={`${activeTab === TabType.Tour
                        ? 'border-l border-t border-r rounded-t bg-white' : 'border-b'}`}>
                        <div
                            className={`${
                                activeTab === TabType.Tour ? 'text-primary-100' :
                                    'text-primary-200 hover:text-primary-100 hover:bg-white hover:border-2 '
                            } py-2 px-4`}
                            onClick={() => handleTabClick(TabType.Tour)}
                        >
                            Tour trọn gói
                        </div>
                    </li>
                    <li className={`${activeTab === TabType.Hotel
                        ? 'border-l border-t border-r rounded-t bg-white' : 'border-b'}`}>
                        <div
                            className={`${
                                activeTab === TabType.Hotel ? 'text-primary-100' : 'text-primary-200 hover:text-primary-100 hover:bg-white'
                            } py-2 px-4`}
                            onClick={() => handleTabClick(TabType.Hotel)}
                        >
                            Điểm đến
                        </div>
                    </li>
                </ul>
                <div className="line h-0.5 w-full bg-bg-color"></div>
                <div className="tab-contents p-6 bg-white ">
                    {activeTab === TabType.Tour &&
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-row w-full justify-between items-center">
                                <div className="start flex justify-center items-center">
                                    <div className="mr-3"><i><CiLocationOn className="scale-200"/></i></div>
                                    <div>
                                        <div>
                                            Điểm đi
                                        </div>
                                        <div>
                                            <Controller
                                                control={control}
                                                name="startPlace"
                                                defaultValue="Chọn điểm khởi hành"
                                                rules={{required: true}}
                                                render={({field: {onChange, onBlur, value, name}}) => (
                                                    <Select
                                                        className="min-w-[200px]"
                                                        onChange={(val) => onChange(val)}
                                                        value={value}
                                                    >
                                                        <Select.Option value="option1">Option 1</Select.Option>
                                                        <Select.Option value="option2">Option 2</Select.Option>
                                                        <Select.Option value="option3">Option 3</Select.Option>
                                                    </Select>
                                                )}
                                            />

                                        </div>
                                    </div>
                                </div>
                                <div className="arrow flex justify-center items-center ml-8 mr-8">
                                    <i><TbArrowsRightLeft/></i>
                                </div>
                                <div className="middle flex justify-center items-center">
                                    <div className="mr-3"><i><CiLocationOn className="scale-200"/></i></div>
                                    <div>
                                        <div>
                                            Điểm đến
                                        </div>
                                        <div>
                                            <Controller
                                                control={control}
                                                name="endPlace"
                                                defaultValue="Chọn điểm đến"
                                                rules={{required: true}}
                                                render={({field: {onChange, onBlur, value, name}}) => (
                                                    <Select
                                                        className="min-w-[200px]"
                                                        onChange={(val) => onChange(val)}
                                                        value={value}
                                                    >
                                                        <Select.Option value="option1">Option 1</Select.Option>
                                                        <Select.Option value="option2">Option 2</Select.Option>
                                                        <Select.Option value="option3">Option 3</Select.Option>
                                                    </Select>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="date-picker flex justify-center items-center">
                                    <div className="mr-3"><i><CiCalendar className="scale-200"/></i></div>
                                    <div>
                                        <div>
                                            Điểm đến
                                        </div>
                                        <div>
                                            <Controller
                                                name="datePicker"
                                                control={control}
                                                defaultValue={null}
                                                rules={{required: true}}
                                                render={({field: {onChange, value}}) => (
                                                    <DatePicker
                                                        className="min-w-[200px]"
                                                        onChange={onChange} value={value}/>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Button type="primary" htmlType="submit"
                                        className="text-yl-100 bg-gray-100 font-bold min-h-[88px] min-w-[88px]">
                                    <i><AiOutlineSearch className="scale-250"/></i>
                                </Button>
                            </div>
                        </form>}
                    {activeTab === TabType.Hotel && <p>Content for Tab 2</p>}
                </div>
            </div>
        </div>
    );
};

export default Tour;