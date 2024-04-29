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

      const hours = Object.keys(prototype)
        .map((hour) => Number(hour))
        .filter((hour) => !dataTemplate[hour]);
      const maxNumber = Math.max(...hours);
      const minNumber = Math.min(...hours);

      for (let index = minNumber; index <= maxNumber; index++) {
        prototype[index] = dataTemplate[index] ? false : true;
      }

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
              <Box
                sx={{
                  position: "relative",
                  background: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><path d='M100 0 L0 100 ' stroke='black' stroke-width='2'/><path d='M0 0 L100 100 ' stroke='black' stroke-width='2'/></svg>")`,
                  backgroundRepeat: "noRepeat",
                  backgroundPosition: "center",
                  backgroundSize: "100% 100%, auto",
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
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default TimeCalendar;
