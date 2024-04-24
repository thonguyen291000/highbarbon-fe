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
    flexDirection: "row", // change to 'column' for a vertical layout
    alignItems: "flex-start",
    margin: "1rem",
    backgroundColor: theme.palette.success[400],
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
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
  content: {
    marginLeft: "1rem",
  },
});

export default function NormalCard({
  image,
  title,
  description,
  bottomRightContent,
  handleClick,
}: {
  image: string;
  title: string;
  description: string;
  bottomRightContent?: string;
  handleClick?: any;
}) {
  const classes = useStyles();

  return (
    <Card className={classes.card} onClick={handleClick}>
      {!image ||
        (image === "" && (
          <CardMedia
            className={classes.media}
            image={image}
            title="card media"
          />
        ))}
      <CardContent className={classes.content}>
        <Typography variant="body1">{title}</Typography>
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
