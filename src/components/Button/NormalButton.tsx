import { Button, styled } from "@mui/material";
import { useIntl } from "react-intl";
import { theme } from "../../theme";

const NormalButton = ({
  label,
  handleClick,
}: {
  label: string;
  handleClick?: () => void;
}) => {
  const { formatMessage } = useIntl();

  return (
    <StyledButton variant="contained" onClick={handleClick}>
      {formatMessage({ id: label })}
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  background-color: ${theme.palette.primary[800]};
  color: ${theme.palette.common.white};
`;

export default NormalButton;
