import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link, useNavigate } from "react-router-dom";
import createRoom from "../../utils/createRoom";
import Sidebar from "../Sidebar";

const useStyles = makeStyles(() => ({
  navlinks: {
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: useTheme().spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <img src="https://img.icons8.com/color/48/000000/ice-icon.png" alt="Logo" />
        <Typography variant="h4" className={classes.logo}>
          Icebreaker
        </Typography>
        {isMobile ? (
          <Sidebar />
        ) : (
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/about" className={classes.link}>
              About
            </Link>
            <Link to="" onClick={() => createRoom(navigate)} className={classes.link}>
              Create a Room
            </Link>
            <Link to="/join" className={classes.link}>
              Join a Room
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;