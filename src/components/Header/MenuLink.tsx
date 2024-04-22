import { styled } from "@mui/material";
import { NavLink } from "react-router-dom";

export const MenuLink = ({ label, to }: { label: string; to?: string }) => {
  return <MenuLinkStyle to={to}>{label}</MenuLinkStyle>;
};

const MenuLinkStyle = styled(NavLink)`
  font-family: ${(props) => props.theme.fonts[700]};
  color: ${(props) => props.theme.palette.common.black};
`;
