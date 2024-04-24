import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import NormalCard from "../components/Card/NormalCard";
import { useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useAppData } from "../context/AppContext";
import { Spinner } from "../components";
import { theme } from "../theme";
import { useIntl } from "react-intl";
import useTrack from "../track/hooks/useTrack";
import { TRACK_EVENT_NAMES } from "../track/const";

const cities = ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ"];

export const BranchesPage = () => {
  const navigate = useNavigate();
  const { appData } = useAppData();
  const { formatMessage } = useIntl();
  const { triggerTrackApiCall } = useTrack();

  const handleClick = async (branchId, branchName) => {
    await triggerTrackApiCall({
      eventName: TRACK_EVENT_NAMES.TRACK_CLICK_ON_BRANCH(branchName),
      metadata: {},
    });

    navigate(`${branchId}`);
  };

  const handleTrackCityClickOn = async (city) => {
    await triggerTrackApiCall({
      eventName: TRACK_EVENT_NAMES.TRACK_CLICK_ON_CITY(city),
      metadata: {},
    });
  };

  if (!appData) return <Spinner />;

  return (
    <Box>
      {cities.map((city) => {
        const currentBranches = appData.branches.filter(
          (branch) => branch.city === city
        );

        return (
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              onClick={handleTrackCityClickOn}
            >
              <Typography>{city}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Grid container>
                  {currentBranches.length > 0 ? (
                    currentBranches.map((branch) => (
                      <Grid item xs={6} md={3} lg={2}>
                        <NormalCard
                          title={branch.name}
                          description={branch.description}
                          // bottomRightContent={`${branch.restaurants.length} Quán`}
                          image={branch.image}
                          handleClick={() =>
                            handleClick(branch._id, branch.name)
                          }
                        />
                      </Grid>
                    ))
                  ) : (
                    <Typography
                      fontFamily={theme.fonts[500]}
                      fontSize={theme.typography.body1.fontSize}
                    >
                      {formatMessage({ id: "empty.city" })}
                    </Typography>
                  )}
                </Grid>
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};
