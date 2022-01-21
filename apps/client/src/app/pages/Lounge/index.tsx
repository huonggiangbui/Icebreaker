import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ShareComponent from "./share";

const useStyles = makeStyles(() => ({
  main: {
    marginTop: "2rem",
    "& h1": {
      fontSize: "2.5rem",
      fontWeight: "300",
      letterSpacing: "-0.025em",
      lineHeight: "1",
      marginBottom: "3rem",
      textAlign: "center"
    },
    "& p": {
      marginTop: "1.5rem",
      textAlign: "center",
      color: "#d32f2f"
    }
  },
  button: {
    marginTop: "1.5rem !important",
  },
}));

export default function Lounge() {
  const classes = useStyles();
  const { code } = useParams();
  const [session, setSession] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(process.env['NX_API_URL'] + '/sessions/' + code)
      .then((res) => {
        setSession(res.data);
      })
      .catch((err) => {
        console.log(err)
        setError(`Error occurs when trying to join the room with code: ${code}. Please check the code and try again`)
      })
  }, [])

  return (
    <div className={`container ${classes.main}`}>
      {session && code ?
        <>
          <h1>
            <span>Your icebreaking room is set up!</span> 🎰
          </h1>
          <h1>Waiting for more players...</h1>
          <ShareComponent code={code} />
          {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
            size="large"
          >
            START
          </Button> */}
        </>
        : <h1 style={{ color: "#d32f2f"}}>{error}</h1>
      }
    </div>
  );
}
