import React, { useEffect, useState } from "react";

import "./tour-section.scss";
import TravelCard from "../../TravelCard";
import Sale7 from "../../../public/images/sale-slider/sale-7.jpg";
import Sale8 from "../../../public/images/sale-slider/sale-8.jpg";
import Sale9 from "../../../public/images/sale-slider/sale-9.jpg";
import Loading from "../../Loading";
import { axiosAuth } from "../../../app/utils/axios.util";

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
