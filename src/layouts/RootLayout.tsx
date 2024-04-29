import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header, Spinner } from "../components";
import { scrollToTop } from "../utils";
import {
  Box,
  Breadcrumbs,
  styled,
  Link as MaterialLink,
  Divider,
} from "@mui/material";
import { theme } from "../theme";
import { useIntl } from "react-intl";
import { uniqWith } from "lodash";
import isEqual from "lodash/fp/isEqual";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useAppData } from "../context/AppContext";
import useApi from "../axios/hooks/useApi";
import { IBranch, IRestaurant, ITable } from "../pages/types";
import { axiosPublic } from "../axios";

const RootLayout = () => {
  const { pathname } = useLocation();
  const { tableId, branchId, restaurantId } = useParams();
  const { formatMessage } = useIntl();
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const { setAppData, appData } = useAppData();

  const { data, loading, triggerApiCall } = useApi<
    null,
    {
      branches: IBranch[];
      restaurants: IRestaurant[];
      tables: ITable[];
    }
  >({
    callFunction: async (): Promise<{
      branches: IBranch[];
      restaurants: IRestaurant[];
      tables: ITable[];
    }> => {
      const branchesResponse = await axiosPublic.get("/api/branches");
      const restaurantsResponse = await axiosPublic.get("/api/restaurants");
      const tablesResponse = await axiosPublic.get("/api/tables");

      return {
        branches: branchesResponse.data,
        restaurants: restaurantsResponse.data,
        tables: tablesResponse.data,
      };
    },
    onComplete: (data) => {
      setAppData((prev) => ({
        ...prev,
        ...data,
      }));
    },
  });

  useEffect(() => {
    scrollToTop();

    if (pathname.includes("branches")) {
      setBreadcrumbs([
        {
          name: formatMessage({ id: "branches" }),
          to: "/branches",
        },
      ]);
    }

    if (branchId && appData.branches.length > 0) {
      setBreadcrumbs((prev) => {
        const array = prev.length > 1 ? [prev[0]] : prev;

        return uniqWith(
          [
            ...array,
            {
              name: appData.branches.find((item) => item._id === branchId).name,
              to: "/branches/" + branchId,
            },
          ],
          isEqual
        );
      });
    }

    if (restaurantId && appData.restaurants.length > 0) {
      setBreadcrumbs((prev) => {
        const array = prev.length > 2 ? [prev[0], prev[1]] : prev;

        return uniqWith(
          [
            ...array,
            {
              name: appData.restaurants.find(
                (item) => item._id === restaurantId
              ).name,
              to: `/branches/${branchId}/${restaurantId}`,
            },
          ],
          isEqual
        );
      });
    }

    if (tableId && appData.tables.length > 0) {
      setBreadcrumbs((prev) => {
        const array = prev.length > 3 ? [prev[0], prev[1], prev[3]] : prev;

        return uniqWith(
          [
            ...array,
            {
              name: appData.tables.find((item) => item._id === tableId).name,
              to: `/branches/${branchId}/${restaurantId}/${tableId}`,
            },
          ],
          isEqual
        );
      });
    }
  }, [formatMessage, pathname, appData]);

  useEffect(() => {
    if (!data) {
      triggerApiCall();
    }
  }, []);

  return (
    <div>
      <Header />
      <div
        style={{
          margin: "0 auto",
          height: "auto",
        }}
      >
        {pathname === "/" ? (
          <Outlet />
        ) : loading ? (
          <CommonLayout>
            <Spinner />
          </CommonLayout>
        ) : (
          <CommonLayout>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
              {breadcrumbs.map((breadcrumb) => (
                <Link
                  to={breadcrumb.to}
                  onClick={() => {
                    setBreadcrumbs([]);
                  }}
                >
                  <MaterialLink
                    fontFamily={theme.fonts[600]}
                    fontSize={theme.typography.h6.fontSize}
                    underline="hover"
                    key={breadcrumb}
                    color="inherit"
                  >
                    {breadcrumb.name}
                  </MaterialLink>
                </Link>
              ))}
            </Breadcrumbs>
            <Divider />
            <Outlet />
          </CommonLayout>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

const CommonLayout = styled(Box)`
  padding: ${theme.spacing(10)};
  padding-top: 120px;

  @media (max-width: 768px) {
    padding: ${theme.spacing(4)};
  }

  @media (max-width: 500px) {
    padding: ${theme.spacing(4)} 0;
  }
`;

export default RootLayout;
