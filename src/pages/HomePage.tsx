import { Box, Typography, styled } from "@mui/material";
import HomePageBgImage from "../assets/images/home-page-bg.jpg";
import { theme } from "../theme";
import NormalButton from "../components/Button/NormalButton";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/branches");
  };

  return (
    <HomePageWrapper>
      <Box mt={theme.spacing(4)}>
        <Typography
          color={"white"}
          fontFamily={theme.fonts[700]}
          fontSize={theme.typography.h1.fontSize}
          textAlign={"center"}
        >
          {formatMessage({ id: "welcome" })}
        </Typography>
        <GroupButton>
          <NormalButton
            label={"header.menu.first"}
            handleClick={handleButtonClick}
          />
          {/* <NormalButton label={"header.menu.second"} /> */}
        </GroupButton>
      </Box>
    </HomePageWrapper>
  );
};

const HomePageWrapper = styled(Box)`
  background-image: url("${HomePageBgImage}");
  background-repeat: no-repeat;
  background-size: cover;

  height: calc(100vh - 80px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const GroupButton = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(3)};
  margin-top: ${theme.spacing(3)};
`;
