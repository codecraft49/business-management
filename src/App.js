import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import routes from "routes/routes";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import PageNotFound from "layouts/pageNotFound/pageNotFound";
import axios from "axios";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const { layout, openConfigurator, sidenavColor, transparentSidenav, whiteSidenav, darkMode } =
    controller;
  const { pathname } = useLocation();

  // --- User role state for sidebar filtering ---
  const [role, setRole] = useState(null); // null = not loaded, number = loaded
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/verify-token", {
          withCredentials: true,
        });
        if (!ignore && res.data.valid) {
          setRole(Number(res.data.user.user_role));
        } else if (!ignore) {
          setRole(null);
        }
      } catch {
        if (!ignore) setRole(null);
      } finally {
        if (!ignore) setRoleLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
      return null;
    });

  // --- Filter routes for sidebar based on user role ---
  const filteredRoutes = useMemo(() => {
    if (role == null) return [];
    return routes.filter((route) => {
      // Only filter sidebar (type: 'collapse') routes
      if (route.type !== "collapse") return false;
      // If route uses ProtectedRoute, check allowedRoles
      if (route.component && route.component.props && route.component.props.allowedRoles) {
        return route.component.props.allowedRoles.includes(role);
      }
      // Otherwise, show (shouldn't happen for sidebar)
      return true;
    });
  }, [role]);

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && !roleLoading && role != null && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="Business Management"
            routes={filteredRoutes}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/authentication/sign-in" replace />} />
        {getRoutes(routes)}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ThemeProvider>
  );
}
