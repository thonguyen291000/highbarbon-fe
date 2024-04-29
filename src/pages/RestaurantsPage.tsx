import { Box, Typography, TextField } from "@mui/material";
import NormalCard from "../components/Card/NormalCard";
import { useNavigate, useParams } from "react-router-dom";
import { useAppData } from "../context/AppContext";
import { Spinner } from "../components";
import { WarningOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { theme } from "../theme";
import { useIntl } from "react-intl";
import useTrack from "../track/hooks/useTrack";
import { TRACK_EVENT_NAMES } from "../track/const";
import { useState } from "react";
import { toast } from "react-toastify";
import { cities } from "./BranchesPage";

export const RestaurantsPage = () => {
  const navigate = useNavigate();
  const { branchId } = useParams();
  const { formatMessage } = useIntl();
  const { triggerTrackApiCall } = useTrack();

  const { appData } = useAppData();
  const [phone, setPhone] = useState("");

  const restaurants = appData.restaurants.filter(
    (item) => item.branch_id === branchId
  );
  const currentBranch = appData.branches.find((b) => b._id === branchId);

  const handleClick = (restaurantId) => {
    navigate(`${restaurantId}`);
  };

  const handleClickOnButton = () => {
    const regex = /^\d{10}$/;

    if (phone !== "" && !regex.test(phone)) {
      toast.error(formatMessage({ id: "phone.validation" }));

      return;
    }

    triggerTrackApiCall({
      eventName: TRACK_EVENT_NAMES.TRACK_CLICK_ON_BRANCH(currentBranch.name),
      metadata: {},
    });

    if (currentBranch.city === cities[0])
      navigate("/branches/6623faf03d5996c4a9de7453");
    else navigate("/branches");
  };

  if (!appData) return <Spinner />;

  return (
    <Box>
      {restaurants.length > 0 ? (
        restaurants.map((restaurant) => (
          <NormalCard
            title={restaurant.name}
            description={`Địa chỉ: ${restaurant.address}`}
            bottomRightContent={`Số điện thoại: ${restaurant.phone}`}
            image={restaurant.image}
            handleClick={() => handleClick(restaurant._id)}
          />
        ))
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: theme.spacing(3),
          }}
        >
          <WarningOutlined fontSize="large" />
          <Typography
            fontFamily={theme.fonts[500]}
            fontSize={theme.typography.body1.fontSize}
          >
            {formatMessage({ id: "empty.branch" })}
          </Typography>
          <Typography
            fontFamily={theme.fonts[500]}
            fontSize={theme.typography.body1.fontSize}
          >
            {formatMessage({ id: "phone.recall" })}
          </Typography>
          <TextField
            placeholder={formatMessage({ id: "phone.placeholder" })}
            sx={{
              marginTop: theme.spacing(3),
            }}
            size="small"
            onChange={(e) => setPhone(e.target.value)}
          />
          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            loading={false}
            size="small"
            sx={{
              marginTop: theme.spacing(3),
            }}
            onClick={handleClickOnButton}
          >
            {currentBranch.city === cities[0]
              ? formatMessage({ id: "go.active.branch" })
              : formatMessage({ id: "go.back" })}
          </LoadingButton>
        </Box>
      )}
    </Box>
  );
};
