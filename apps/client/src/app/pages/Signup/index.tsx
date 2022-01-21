import { Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

export default function SignUp() {
  const classes = useStyles();
  const { code } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const signup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post(process.env['NX_API_URL'] + '/users', {code, name})
      .then((res) => {
        localStorage.setItem("refresh_token", res.data.refresh_token);
        localStorage.setItem("access_token", res.data.access_token);
        navigate(`../room/${code}`)
      })
      .catch((err) => {
        console.log(err)
        setError("Error occurs when trying to join as a player. Please try again")
      })
  }

  return (
    <div className={`container ${classes.main}`}>
      <h1>
        <span>Welcome to Icebreaking Room!</span> Let's get started! 🎯
      </h1>
      <form onSubmit={signup} className={classes.form}>
        <TextField required autoFocus fullWidth id="outlined-basic" label="Player Name" variant="outlined" placeholder="Enter your name to play" value={name} onChange={handleChange} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={name.length === 0}
          size="large"
        >
          PLAY!
        </Button>
      </form>
      <p>{error}</p>
    </div>
  );
}
