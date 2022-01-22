import { makeStyles } from "@mui/styles";
import { SportsKabaddiOutlined, PlayCircleFilled, Casino, PanTool, Scale, SentimentSatisfied, Favorite } from '@mui/icons-material';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Question, Session } from "@icebreaker/shared-types";
import { authHeader } from "../../services/auth.service";

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: "3rem",
    fontWeight: "500",
    letterSpacing: "-0.025em",
    lineHeight: "1"
  },
  intro: {
    marginTop: "2.5rem",
    "& p": {
      marginTop: "1.5rem"
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
    marginTop: "1rem",
    ["@media screen and (min-width: 768px)"]: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))"
    },
  },
  card: {
    padding: "2.5rem 2rem",
    display: "flex",
    textAlign: "center",
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

export function Setting() {
  const classes = useStyles();
  const { code } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string>();

  useEffect(() => {
    axios.get<Session>(process.env['NX_API_URL'] + '/sessions/' + code)
      .then(async (res) => {
        if (res.data.players[0].id !== localStorage.getItem('id')) {
          setError(`You are not the host of room with code: ${code} and are not permitted to change the room setting.`)
        }
      })
      .catch((err) => {
        console.log(err)
        setError(`Error occurs when trying to join the room with code: ${code}. Please check the code and join again.`)
      })
  }, [code])

  const handleGame = (e: React.MouseEvent<HTMLDivElement>) => {
    const type = e.currentTarget.title;
    axios.put<Session>(process.env['NX_API_URL'] + '/sessions/' + code, { type }, {
      headers: authHeader(),
    })
      .then(async (res) => {
        navigate(`/room/${code}/play`)
      })
      .catch((err) => {
        console.log(err)
        setError(`Error occurs when trying to join the room with code: ${code}. Please check the code and join again.`)
      })
  }

  if (error) {
    return (
      <div className="container">
        <div className={classes.intro}>
          <h1 className={classes.heading} style={{ color: "#d32f2f" }}>{error}</h1>
        </div>
      </div>
    )
  }
 
  return (
    <div className="container">
      <div className={classes.intro}>
        <h1 className={classes.heading}>
          <span> Ready to start? </span>
          Let's choose the game! 🎱
        </h1>
        <p>Please note that only 2 first games (Truth or Dare & Card Drawing) are supported. Other games are demo.</p>
      </div>
      <div className={classes.middleContent}>
        <div title="truth_or_dare" className={`rounded shadow ${classes.card}`} onClick={handleGame}>
          <SportsKabaddiOutlined />
          <span>
            Truth Or Dare
            <span> Tell a truth or take challenge </span>
          </span>
          <PlayCircleFilled />
        </div>
        <div title="card_drawing" className={`rounded shadow ${classes.card}`} onClick={handleGame}>
          <Casino />
          <span>
            Card Drawing
            <span>Draw a card for random perks</span>
          </span>
          <PlayCircleFilled />
        </div>
        <div title="have_you_ever" className={`rounded shadow ${classes.card}`} onClick={handleGame}>
          <PanTool />
          <span>
            Have you ever
            <span>Explore group common things</span>
          </span>
          <PlayCircleFilled />
        </div>
        <div title="would_you_rather" className={`rounded shadow ${classes.card}`} onClick={handleGame}>
          <Scale />
          <span>
            Would you rather
            <span>This or that?</span>
          </span>
          <PlayCircleFilled />
        </div>
        <div title="mood_guess" className={`rounded shadow ${classes.card}`} onClick={handleGame}>
          <SentimentSatisfied />
          <span>
            Mood Guess
            <span>Can you guess the feeling?</span>
          </span>
          <PlayCircleFilled />
        </div>
        <div title="love_bomb" className={`rounded shadow ${classes.card}`} onClick={handleGame}>
          <Favorite />
          <span>
            Love Bomb
            <span>Sending love with nice notes</span>
          </span>
          <PlayCircleFilled />
        </div>
      </div>
    </div>
  );
}

export default Setting;
