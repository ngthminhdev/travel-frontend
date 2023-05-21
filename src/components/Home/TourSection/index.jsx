import React, { useEffect, useState } from "react";

import { axiosAuth } from "../../../app/utils/axios.util";
import Loading from "../../Loading";
import TravelCard from "../../TravelCard";
import "./tour-section.scss";
import { message } from "antd";

const TourSection = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetch = () => {
      axiosAuth
        .get("/travel/get-all-tour")
        .then((res) => setData(res.data.data))
        .catch((e) => message.error(e.response.data.message));
    };

    fetch();
  }, []);

  if (!data) return <Loading />;

  return (
    <div className="tour-section flex justify-between items-center flex-wrap">
      {data.map((tour) => (
        <TravelCard
          key={tour.id}
          data={{
            id: tour.id,
            tourName: tour.tourName,
            description: tour.description,
            image: tour.image,
            price: tour.price,
            rating: tour.rating,
            startPlace: tour.startPlace,
          }}
        />
      ))}
    </div>
  );
};

export default TourSection;
