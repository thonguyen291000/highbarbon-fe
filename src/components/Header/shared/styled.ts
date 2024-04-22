import { Box, styled } from "@mui/material";

export const ImageContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: 150px;
  height: 80px;
  left: 25px;
  top: 5px;

  &:hover {
    cursor: pointer;
  }
`;
