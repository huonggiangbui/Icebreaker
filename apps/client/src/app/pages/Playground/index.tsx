import { Session, User } from "@icebreaker/shared-types";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardDrawing from "../../components/Game/CardDrawing";
import TruthOrDare from "../../components/Game/TruthOrDare";
import { UserContext } from "../../contexts/user";

const useStyles = makeStyles(() => ({
  main: {
    marginTop: "2rem",
    "& p": {
      marginTop: "1.5rem",
      textAlign: "center"
    },
  },
  heading: {
    marginTop: "2rem",
    fontSize: "3rem",
    fontWeight: "500",
    letterSpacing: "-0.025em",
    lineHeight: "1",
  },
  button: {
    marginTop: "1.5rem !important",
  },
  middleContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
}));

export default function Playground() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { code } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [session, setSession] = useState<Session>();
  const [error, setError] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    axios.get<Session>(process.env['NX_API_URL'] + '/sessions/' + code)
      .then(async (res) => {
        setSession(res.data);
        setType(res.data.questions[0].type);
      })
      .catch((err) => {
        console.log(err)
        setError(`Error occurs when trying to join the room with code: ${code}. Please check the code and join again.`)
      })
  }, [])

  if (error || !session) {
    return (
      <div className={`container ${classes.main}`}>
        <h1 className={classes.heading} style={{ color: "#d32f2f" }}>{error}</h1>
      </div>
    )
  }

  return (
    <div className={`container ${classes.main}`}>
      <h1 className={classes.heading}>
        <span>Playing {type.split("_").join(" ")}...</span>🎳
      </h1>
      <h1 className={classes.heading} style={{ fontSize: "1rem"}}>Host will manage the room by choose next random player. Stay tuned. Refresh the page after host done.</h1>
      <div className={classes.middleContent}>
        {type === "truth_or_dare" ? <TruthOrDare session={session} /> : null}
        {type === "card_drawing" ? <CardDrawing session={session} /> : null}
      </div>
    </div>
  );
}
