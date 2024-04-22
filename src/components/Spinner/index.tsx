import { Box, CircularProgress } from "@mui/material";

export const Spinner = () => {
  return (
    <Box className="flex justify-center min-h-[200px] items-center">
      <CircularProgress sx={{ color: (theme) => theme.palette.primary.main }} />
    </Box>
  );
};
