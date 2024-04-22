import { Box } from "@mui/material";
import NormalCard from "../components/Card/NormalCard";
import { useNavigate, useParams } from "react-router-dom";
import { useAppData } from "../context/AppContext";
import { Spinner } from "../components";

export const RestaurantsPage = () => {
  const navigate = useNavigate();
  const { branchId } = useParams();

  const { appData } = useAppData();

  const restaurants = appData.restaurants.filter(
    (item) => item.branch_id === branchId
  );

  const handleClick = (restaurantId) => {
    navigate(`${restaurantId}`);
  };

  if (!appData) return <Spinner />;

  return (
    <Box>
      {restaurants.map((restaurant) => (
        <NormalCard
          title={restaurant.name}
          description={`Địa chỉ: ${restaurant.address}`}
          bottomRightContent={`Số điện thoại: ${restaurant.phone}`}
          image={restaurant.image}
          handleClick={() => handleClick(restaurant._id)}
        />
      ))}
    </Box>
  );
};
