import { Card, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import './travel-card.scss'
const TravelCard = ({ data }) => {
    return (
        <Card
            className="w-[400px] max-h-[600px] shadow-lg"
            hoverable
            cover={<img alt={data.name} src={data.image}
                        style={{ maxWidth: '400px', maxHeight: '250px', objectFit: 'cover' }}/>}

        >
            <Card.Meta
                className="max-h-[200px] "
                title={<h3 style={{ whiteSpace: 'normal' }} className="hover:text-primary-100 text-lg">{data.name}</h3>}
                description={data.description}
            />
            <div className="mt-4">
                <span style={{ fontWeight: 'bold', marginRight: '1rem' }} className="text-red-500">{data.price}</span>
                <Button type="primary" icon={<PlusCircleOutlined />} size="large">
                    Xem thêm
                </Button>
            </div>
        </Card>
    );
};

export default TravelCard;
