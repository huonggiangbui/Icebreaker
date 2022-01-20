import { makeStyles } from "@mui/styles";
import { SportsEsportsOutlined, SportsKabaddiOutlined } from '@mui/icons-material';
import { ReactComponent as ArrowIcon } from "../../../assets/arrow.svg";
import { Link, useNavigate } from "react-router-dom";
import createRoom from "../../utils/createRoom";

const useStyles = makeStyles(() => ({
  welcome: {
    marginTop: "2.5rem",
    "& h1": {
      fontSize: "3rem",
      fontWeight: "500",
      letterSpacing: "-0.025em",
      lineHeight: "1"
    },
    "& span": {
      display: "block",
      fontSize: "1.875rem",
      fontWeight: "300",
      lineHeight: "2.25rem",
      marginBottom: "0.5rem"
    }
  },
  middleContent: {
    alignItems: "flex-start",
    display: "grid",
    gap: "4rem",
    gridTemplateColumns: "1fr",
    marginTop: "3.5rem",
    ["@media screen and (min-width: 768px)"]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))"
    },
  },
  card: {
    padding: "2.5rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: "1rem",
    width: "100%",
    cursor: "pointer",
    transitionProperty: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '150ms',
    "& span": {
      fontWeight: "500",
      fontSize: "1.25rem",
      letterSpacing: "-0.025em",
      lineHeight: "1.75rem",
      paddingLeft: "1rem",
      paddingRight: "1rem",
      "& span": {
        color: "rgba(107, 114, 128, 1)",
        display: "block",
        flexGrow: 1,
        fontSize: "0.75rem",
        fontWeight: "400",
        lineHeight: "1rem",
        transitionProperty: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '150ms',
      },
    },
    "& svg:first-child": {
      marginRight: "1rem",
      width: "1.5rem",
      height: "1.5rem",
      transitionProperty: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDuration: '150ms',
    },
    "& svg:last-child": {
      width: "1rem",
      height: "1rem",
      transitionProperty: 'all',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      transitionDuration: '150ms',
    },
    "&:hover": {
      color: "rgba(255, 255, 255, 1)",
      backgroundColor: "hsla(162, 47%, 50%, 1)",
      "& span>span": {
        color: "rgba(243, 244, 246, 1)"
      },
      "& svg:last-child": {
        transform: "translateX(0.25rem)"
      }
    }
  }
}));

export function Home() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className={classes.welcome}>
        <h1>
          <span> Hello there, </span>
          Welcome to Icebreaker! 👋
        </h1>
      </div>
      <div className={classes.middleContent}>
        <div className={`rounded shadow ${classes.card}`} onClick={() => createRoom(navigate)}>
          <SportsEsportsOutlined />
          <span>
            Want to play games?
            <span> Create a room for your group </span>
          </span>
          <ArrowIcon />
        </div>
        <Link to="/join">
          <div className={`rounded shadow ${classes.card}`}>
            <SportsKabaddiOutlined />
            <span>
              Join your friends?
              <span> Go to your group's room </span>
            </span>
            <ArrowIcon />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
