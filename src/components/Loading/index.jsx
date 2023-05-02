import React from 'react';
import {Spin} from "antd";

const Loading = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <Spin size="default" />
        </div>
    );
};

export default Loading;