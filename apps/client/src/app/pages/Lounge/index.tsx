import { Session, User } from "@icebreaker/shared-types";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlayerComponent from "../../components/Player";
import { UserContext } from "../../contexts/user";
import ShareComponent from "./share";

const useStyles = makeStyles(() => ({
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
      textAlign: "center"
    }
  },
  button: {
    marginTop: "1.5rem !important",
    width: "50% !important",
  },
  middleContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
}));

export default function Lounge() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { code } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [session, setSession] = useState<Session>();
  const [error, setError] = useState("");
  const [isHost, setHost] = useState<boolean>(false);

  useEffect(() => {
    axios.get<Session>(process.env['NX_API_URL'] + '/sessions/' + code)
      .then(async (res) => {
        setSession(res.data);
        setHost(res.data && (res.data.players[0].id === user.id || res.data.players[0].id === localStorage.getItem('id')))
      })
      .catch((err) => {
        console.log(err)
        setError(`Error occurs when trying to join the room with code: ${code}. Please check the code and join again.`)
      })
  }, [])

  const handlePlay = () => {
    if (isHost) {
      return navigate(`/room/${code}/setting`)
    } else {
      return navigate(`/room/${code}/play`)
    }
  }

  return (
    <div className={`container ${classes.main}`}>
      {session && code ?
        <>
          <h1>
            <span>Your icebreaking room is set up!</span> 🎰
          </h1>
          <h1>Waiting for more players...</h1>
          <p>When your game is chosen by host, refresh page and get started!</p>
          <ShareComponent code={code} />
          <div className={classes.middleContent}>
            {session.players.map((player: User) => {
              return (
                <PlayerComponent key={player.id} player={player} />
              )
            })}
          </div>
          <Button
            onClick={handlePlay}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
            size="large"
            disabled={isHost ? false : session.questions.length === 0}
          >
            START
          </Button>
        </>
        : <h1 style={{ color: "#d32f2f"}}>{error}</h1>
      }
    </div>
  );
}
