import { Box, Grid, Paper, styled } from "@mui/material";
import { theme } from "../../theme";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(1),
  },
  [theme.breakpoints.down("md")]: {
    padding: 0,
  },
}));

const TimeCalendar = ({
  numberItemOneRow = 12,
  currentData,
  selection,
  setSelection,
}: {
  numberItemOneRow?: number;
  currentData?: any;
  selection?: any;
  setSelection?: any;
}) => {
  const canEdit = selection && selection;

  const dataTemplate = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false,
    16: false,
    17: false,
    18: false,
    19: false,
    20: false,
    21: false,
    22: false,
    23: false,
    24: false,
    ...currentData,
  };

  const handleSelect = (key) => {
    setSelection((prev) => {
      const prototype = { ...prev };

      if (prototype[key]) delete prototype[key];
      else prototype[key] = true;

      return prototype;
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 0.5, md: 2 }}>
        {Object.keys(dataTemplate).map((key, index) => {
          const isSelected = Object.values(dataTemplate)[index];
          const isSelecting = selection?.[key];

          return (
            <Grid
              item
              xs={12 / numberItemOneRow}
              key={index}
              onClick={() => {
                if (!isSelected && canEdit) handleSelect(key);
              }}
            >
              <Item
                sx={{
                  backgroundColor: isSelecting
                    ? theme.palette.primary[600]
                    : theme.palette.common.white,
                  color: isSelecting
                    ? theme.palette.common.white
                    : theme.palette.common.black,
                  cursor: !canEdit || isSelected ? "initial" : "pointer",
                  opacity: isSelected && !isSelecting ? 0.5 : 1,
                }}
              >
                {key}
              </Item>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default TimeCalendar;
