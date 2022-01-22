import { makeStyles } from "@mui/styles";
import { Question, Session, User } from "@icebreaker/shared-types";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

const useStyles = makeStyles(() => ({
  main: {
    marginTop: "4rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& p": {
      marginTop: "1.5rem",
      textAlign: "center"
    },
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "500",
    letterSpacing: "-0.025em",
    lineHeight: "1",
  },
  button: {
    marginTop: "1.5rem !important",
  },
  card: {
    margin: "2rem 0",
    padding: "1.5rem",
    textAlign: "center",
    display: "flex",
    width: "max-content",
    transitionProperty: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transition: 'all .3s',
    "& span": {
      fontWeight: "500",
      fontSize: "1.25rem",
      letterSpacing: "-0.025em",
      lineHeight: "1.75rem",
      paddingLeft: "1rem",
      paddingRight: "1rem",
    },
    "&:hover": {
      color: "rgba(255, 255, 255, 1)",
      backgroundColor: "hsla(162, 47%, 50%, 1)",
      transform: "translateY(-5px)"
    }
  },
  action: {
    display: "flex",
    "& button": {
      margin: "1rem"
    }
  }
}));

export function CardDrawing({ session }: { session: Session }) {
  const classes = useStyles();
  const [isHost, setHost] = useState<boolean>(false);
  const [chosenPlayer, setChosenPlayer] = useState<User>();
  const [chosenQuestion, setChosenQuestion] = useState<Question>();

  const chooseRandomPlayer = () => {
    const numOfPlayers = session.players.length
    const ran_index = Math.floor(Math.random() * numOfPlayers)
    setChosenPlayer(session.players[ran_index])
    setChosenQuestion(undefined)
  }

  useEffect(() => {
    chooseRandomPlayer();
    setHost(session.players[0].id === localStorage.getItem('id'))
  }, [])

  const chooseRandomCard = () => {
    const ran_index = Math.floor(Math.random() * session.questions.length)
    setChosenQuestion(session.questions[ran_index])
  }

  return (
    <div className={classes.main}>
      {chosenPlayer && chosenPlayer.id === localStorage.getItem('id') ? <>
        {!chosenQuestion ? <div>
          <h1 className={classes.heading}>It is your turn!</h1>
          <Button
            onClick={chooseRandomCard}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
            size="large"
          >
            Draw a card
          </Button>
        </div> : 
        <>
          <h1 className={classes.heading}>Your magic card is</h1>
          <div className={`rounded shadow ${classes.card}`}>
            <span>
              {chosenQuestion.content}
            </span>
          </div>
        </>
        }
        {chosenQuestion ? chosenQuestion.choices : null}
      </>
        : "Waiting for someone to choose their card..."}
      {isHost ?
        <Button
          onClick={chooseRandomPlayer}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.button}
          size="large"
        >
          NEXT
        </Button>
        : null}
    </div>
  );
}

export default CardDrawing;
