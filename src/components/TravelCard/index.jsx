import { Card, Button } from "antd";
import { HiOutlineTicket } from "react-icons/hi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Utils } from "../../app/utils";

import "./travel-card.scss";
import { useNavigate } from "react-router-dom";
const TravelCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="w-[420px] max-h-[600px] shadow-lg"
      hoverable
      cover={
        <img
          alt={data.tourName}
          src={data.image}
          style={{
            width: "100%",
            height: "100%",
            maxHeight: "280px",
            objectFit: "cover",
          }}
        />
      }
    >
      <Card.Meta
        className="max-h-[200px]"
        title={
          <h3
            style={{ whiteSpace: "normal" }}
            className="hover:text-primary-100 text-lg"
          >
            {data.tourName}
          </h3>
        }
        description={<div className="line-clamp-6">{data.description}</div>}
      />
      <div className="mt-4">
        <div className="flex items-center">
          <i className="mt-1 mr-1">
            <HiOutlineTicket />
          </i>
          Nơi khởi hành: {data.startPlace}
        </div>
        <span className="text-gray-500 line-through mr-3">
          {Utils.formatPrice(data.price * 1.2)}
        </span>
        <span
          style={{ fontWeight: "bold", marginRight: "1rem" }}
          className="text-red-500 text-xl"
        >
          {Utils.formatPrice(data.price)}
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
