import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  welcome: {
    marginTop: "2.5rem",
    "& h1": {
      fontSize: "3rem",
      fontWeight: "500",
      letterSpacing: "-0.025em",
      lineHeight: "1"
    },
    "& p": {
      marginTop: "2.5rem",
    },
    "& span": {
      display: "block",
      fontSize: "1.875rem",
      fontWeight: "300",
      lineHeight: "2.25rem",
      marginBottom: "0.5rem"
    }
  },
}));

export function About() {
  const classes = useStyles();

  return (
    <div className="container">
      <div className={classes.welcome}>
        <h1>
          <span>Don't know how to bonding a team? Have awkward silent time at the meeting?</span>
          You have Icebreaker! 🎉
        </h1>
        <p>Icebreaker is a website with popular built-in games that help bring your group together. By creating a room, you are setting up for awesome time and memories among your members. What will be better than playing games together?</p>
        <p>The purpose of this website is to bring real people together with the power of technology. Instead of scrolling through your own phone in the meeting room, now you can have some fun together. The vision of this website is to ease the way people find themselves trying to find bonding/icebreaking games.</p>
        <p>If you have any questions, feel free to contact me at <a style={{color: 'blue'}} href="mailto:bhuonggiang03@gmail.com">bhuonggiang03@gmail.com</a></p>
      </div>
    </div>
  );
}

export default About;
