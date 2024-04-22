import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Stack,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  Grid,
  styled,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo/logo.png";
import MobileMenu from "./MobileMenu";
import { ImageContainer } from "./shared/styled";

export const Header = () => {
  const navigate = useNavigate();

  const [language, setLanguage] = React.useState("10");

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  return (
    <MenuContainer>
      <MobileMenu />
      <AppBar
        position="fixed"
        sx={{ background: "#FFFFFF" }}
        className="desktop-menu"
      >
        <Toolbar>
          <ImageContainer onClick={() => navigate("/")}>
            <img src={Logo} alt="Logo" width="50" height="50" />
          </ImageContainer>

          <nav>
            <Stack
              direction={"row"}
              spacing={6}
              position="relative"
              sx={{ ml: 8 }}
            >
              {/* <MenuLink label={formatMessage({ id: "header.menu.first" })} /> */}
              {/* <MenuLink label={formatMessage({ id: "header.menu.second" })} /> */}
            </Stack>
          </nav>
          <Grid item xs></Grid>
          <FormControl variant="standard" sx={{ mb: 2, mr: 2, minWidth: 45 }}>
            <InputLabel id="language-selector-label"></InputLabel>
            <Select
              labelId="language-selector-label"
              id="language-selector"
              value={language}
              onChange={handleChange}
              label="language"
            >
              {/* <LanguageOption value={10}>Vie</LanguageOption> */}
              <LanguageOption value={10}>VIE</LanguageOption>
              {/* <LanguageOption value={30}>Cns</LanguageOption> */}
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
    </MenuContainer>
  );
};

const MenuContainer = styled(Box)`
  .desktop-menu {
    display: block;
  }

  .mobile-menu {
    display: none;
  }

  @media (max-width: 768px) {
    .desktop-menu {
      display: none;
    }
    .mobile-menu {
      display: block;
    }
  }
`;

const LanguageOption = styled(MenuItem)`
  color: ${(props) => props.theme.palette.common.black};
`;
