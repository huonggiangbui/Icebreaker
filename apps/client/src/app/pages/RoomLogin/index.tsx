import { Button, FormHelperText, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  main: {
    marginTop: "2.5rem",
    "& h1": {
      fontSize: "3rem",
      fontWeight: "500",
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
  form: {
    width: "50%",
    margin: "auto"
  },
  button: {
    marginTop: "1.5rem !important",
  },
}));

export default function RoomLogin() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomCode(event.target.value);
  };

  const valid = useMemo(() => {
    const codeRegex = /^[a-z0-9]{6}$/
    return codeRegex.test(roomCode) || roomCode.length === 0;
  }, [roomCode]);

  const joinRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.get(process.env['NX_API_URL'] + '/sessions/' + roomCode)
      .then((res) => {
        navigate(`../room/${roomCode}/signup`);
      })
      .catch((err) => {
        console.log(err)
        setError("Error occurs when trying to join the room. Please check the code and try again")
      })
  }

  return (
    <div className={`container ${classes.main}`}>
      <h1>
        <span>Join the room to play icebreaking games with your friends</span> 🎲
      </h1>
      <form onSubmit={joinRoom} className={classes.form}>
        <TextField required autoFocus fullWidth id="outlined-basic" label="Room Code" variant="outlined" placeholder="Enter your room code here" value={roomCode} onChange={handleChange} error={!valid}/>
        <FormHelperText style={{ marginTop: "8px", color: "#d32f2f"}}>
          {!valid && "Room code must be 6 alphanumeric characters"}
        </FormHelperText>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={!valid || roomCode.length === 0}
          size="large"
        >
          START
        </Button>
      </form>
      <p>{error}</p>
    </div>
  );
}
