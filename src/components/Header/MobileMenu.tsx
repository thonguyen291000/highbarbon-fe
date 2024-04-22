import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { MenuLink } from "./MenuLink";
import { useIntl } from "react-intl";
import { ImageContainer } from "./shared/styled";
import Logo from "../../assets/images/logo/logo.png";
import { useNavigate } from "react-router-dom";

const MobileMenu = () => {
  const navigate = useNavigate();

  const [menuShow, setMenuShow] = useState(false);
  const { formatMessage } = useIntl();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setMenuShow(open);
    };

  return (
    <>
      <AppBar
        position="static"
        className="mobile-menu"
        sx={{ background: "rgba(255, 255, 255, 0.80)" }}
      >
        <Toolbar className="justify-between">
          <ImageContainer onClick={() => navigate("/")}>
            <img src={Logo} alt="Logo" width="50" height="50" />
          </ImageContainer>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={menuShow} onClose={toggleDrawer(false)}>
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {[
              {
                text: formatMessage({ id: "header.menu.first" }),
                to: "/branches",
              },
              // {
              //   text: formatMessage({ id: "header.menu.second" }),
              //   to: "/careerCoaching",
              // },
            ].map(({ text, to }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <MenuLink label={text} to={to} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileMenu;
