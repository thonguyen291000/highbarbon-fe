import { Box } from "@mui/material";
import VerticalCard from "../components/Card/VerticalCard";
import TimeCalendar from "../components/Calendar/TimeCalendar";
import { useNavigate, useParams } from "react-router-dom";
import { useAppData } from "../context/AppContext";
import { Spinner } from "../components";
import { formatDayMonthYearDate } from "../utils";

export const TablesPage = () => {
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const { appData } = useAppData();

  const tables = appData.tables.filter(
    (item) => item.restaurant_id === restaurantId
  );

  const handleClick = (tableId) => {
    navigate(`${tableId}`);
  };

  if (!appData) return <Spinner />;

  return (
    <Box>
      {tables.map((table) => (
        <VerticalCard
          title={`${table.name} (${table.fee}k / ${table.fee_unit})`}
          description={table.description}
          bottomRightContent={`Lượt đặt: ${table.amount_of_booked}`}
          image={
            <>
              <TimeCalendar
                currentData={
                  table.calendar?.[formatDayMonthYearDate(new Date())]
                }
              />
              <br />
            </>
          }
          handleClick={() => handleClick(table._id)}
        />
      ))}
    </Box>
  );
};
