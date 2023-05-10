import { Card, Button } from "antd";
import { HiOutlineTicket } from "react-icons/hi";
import { AiOutlineShoppingCart } from "react-icons/ai";

import "./travel-card.scss";
import { useNavigate } from "react-router-dom";
const TravelCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="w-[400px] max-h-[600px] shadow-lg"
      hoverable
      cover={
        <img
          alt={data.tourName}
          src={data.image}
          style={{
            maxWidth: "400px",
            maxHeight: "250px",
            objectFit: "cover",
          }}
        />
      }
    >
      <Card.Meta
        className="max-h-[200px] "
        title={
          <h3
            style={{ whiteSpace: "normal" }}
            className="hover:text-primary-100 text-lg"
          >
            {data.name}
          </h3>
        }
        description={data.description}
      />
      <div className="mt-4">
        <div className="flex items-center">
          <i className="mt-1 mr-1">
            <HiOutlineTicket />
          </i>
          Nơi khởi hành: {data.startPlace}
        </div>
        <span className="text-gray-500 line-through mr-3">{data.price}</span>
        <span
          style={{ fontWeight: "bold", marginRight: "1rem" }}
          className="text-red-500 text-xl"
        >
          {data.price}
        </span>
        <Button
          type="primary"
          size="large"
          onClick={() => navigate(`/tour-detail/${data.id}`)}
        >
          <div className="flex items-center">
            <i className="mt-1 mr-2">
              <AiOutlineShoppingCart />
            </i>
            Đặt ngay
          </div>
        </Button>
      </div>
    </Card>
  );
};

export default TravelCard;
