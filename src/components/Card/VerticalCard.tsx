import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { theme } from "../../theme";

const useStyles = makeStyles({
  card: {
    position: "relative",
    display: "flex",
    alignItems: "flex-start",
    margin: "1rem",
    backgroundColor: theme.palette.success[400],
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      margin: "1rem 0",
    },
  },
  media: {
    height: 140,
    width: 140,
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: 200,
    },
  },
  bottomRightContent: {
    position: "absolute",
    right: 20,
    bottom: 10,
    [theme.breakpoints.down("sm")]: {
      position: "static",
    },
  },
  content: {},
});

export default function VerticalCard({
  image,
  title,
  description,
  bottomRightContent,
  handleClick,
}: {
  image: string | ReactNode;
  title: string;
  description: string;
  bottomRightContent: string;
  handleClick?: any;
}) {
  const classes = useStyles();

  return (
    <Card className={classes.card} onClick={handleClick}>
      {typeof image === "string" && (
        <CardMedia className={classes.media} image={image} title="card media" />
      )}
      <CardContent className={classes.content}>
        {typeof image !== "string" && image}
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.bottomRightContent}
        >
          {bottomRightContent}
        </Typography>
      </CardContent>
    </Card>
  );
}
