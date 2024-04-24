import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Grid,
  Container,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useIntl } from "react-intl";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { theme } from "../theme";
import TimeCalendar from "../components/Calendar/TimeCalendar";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import QRcode from "../assets/images/qrcode.png";
import { useAppData } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { Spinner } from "../components";
import useApi from "../axios/hooks/useApi";
import { axiosPublic } from "../axios";
import { LoadingButton } from "@mui/lab";
import { formatDayMonthYearDate } from "../utils";
import { toast } from "react-toastify";

const Payment = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <Typography
        fontFamily={theme.fonts[300]}
        fontSize={theme.typography.h6.fontSize}
      >
        {formatMessage(
          { id: "book.form.reservation" },
          {
            money: 50,
          }
        )}
      </Typography>
      <br />
      <Accordion>
        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
          <Typography>{formatMessage({ id: "book.qrcode.momo" })}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <img src={QRcode} alt="Qr code" width={300} height={300} />
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export const BookPage = () => {
  const { formatMessage } = useIntl();
  const { tableId } = useParams();
  const { appData } = useAppData();

  const [isPayment, setIsPayment] = useState(false);
  const [selection, setSelection] = useState({});

  const currentTable = appData.tables.find((table) => tableId === table._id);
  const currentRestaurant = appData.restaurants.find(
    (restaurant) => currentTable.restaurant_id === restaurant._id
  );

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      amount_of_people: 0,
      date: new Date(),
    },
  });

  const { loading, triggerApiCall } = useApi<
    {
      tableId: string;
      branchId: string;
      restaurantId: string;
      username: string;
      phone: string;
      date: string;
      hours: string[];
      amountOfPeople: number;
    },
    undefined
  >({
    callFunction: async (params): Promise<void> => {
      const payload = {
        table_id: params.tableId,
        branch_id: params.branchId,
        restaurant_id: params.restaurantId,
        username: params.username,
        phone: params.phone,
        reservation_time: {
          [`${params.date}`]: params.hours,
        },
        amount_of_people: params.amountOfPeople,
      };

      await axiosPublic.post("/api/reservation", payload);
    },
    onComplete: () => {
      toast.done(formatMessage({ id: "success" }));
    },
    onFailed: () => {
      // TODO: Thông báo thất bại và reset lại page
      toast.error(formatMessage({ id: "failed.duplicatedBookedTime" }));
    },
  });

  const onSubmit = async (data) => {
    const date = formatDayMonthYearDate(data.date);
    const hours = Object.keys(selection);

    const payload = {
      tableId: currentTable._id,
      restaurantId: currentTable.restaurant_id,
      branchId: currentRestaurant.branch_id,
      username: data.name,
      phone: data.phone,
      amountOfPeople: data.amount_of_people,
      date,
      hours,
    };

    await triggerApiCall(payload);

    setIsPayment(true);
  };

  const selectedDate = watch("date");

  if (!currentTable) return <Spinner />;

  return (
    <Container
      sx={{
        mt: theme.spacing(4),
      }}
    >
      {isPayment ? (
        <Payment />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                rules={{ required: formatMessage({ id: "required" }) }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label={formatMessage({ id: "book.form.nameLabel" })}
                    fullWidth
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : null
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: formatMessage({ id: "required" }),
                  minLength: {
                    value: 10,
                    message: formatMessage({ id: "phone.validation" }),
                  },
                  maxLength: {
                    value: 10,
                    message: formatMessage({ id: "phone.validation" }),
                  },
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: formatMessage({ id: "phone.validation" }),
                  },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label={formatMessage({ id: "book.form.phoneLabel" })}
                    fullWidth
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : null
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="amount_of_people"
                control={control}
                rules={{
                  required: formatMessage({ id: "required" }),
                  validate: (value) =>
                    value > 0 ||
                    formatMessage({ id: "validation.moreThanZero" }),
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label={formatMessage({
                      id: "book.form.numberOfPeopleLabel",
                    })}
                    fullWidth
                    type="number"
                    error={!!fieldState.error}
                    helperText={
                      fieldState.error ? fieldState.error.message : null
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                fontFamily={theme.fonts[500]}
                fontSize={theme.typography.h6.fontSize}
              >
                {formatMessage({ id: "book.form.scheduleLabel" })}
              </Typography>
              <br />
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Controller
                    name="date"
                    control={control}
                    rules={{ required: formatMessage({ id: "required" }) }}
                    render={({ field }) => (
                      <Calendar
                        onChange={field.onChange as any}
                        value={field.value}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TimeCalendar
                      numberItemOneRow={4}
                      currentData={
                        currentTable.calendar?.[
                          formatDayMonthYearDate(selectedDate)
                        ]
                      }
                      selection={selection}
                      setSelection={setSelection}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <LoadingButton
                variant="outlined"
                color="error"
                fullWidth
                onClick={() => reset()}
                loading={loading}
              >
                Xoá Dữ Liệu
              </LoadingButton>
            </Grid>
            <Grid item xs={6}>
              <LoadingButton
                variant="contained"
                color="primary"
                fullWidth
                endIcon={<ShoppingCartIcon />}
                type="submit"
                loading={loading}
              >
                Đặt bàn
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Container>
  );
};
