import { makeStyles } from "@mui/styles";
import { User } from "@icebreaker/shared-types";

const useStyles = makeStyles(() => ({
  card: {
    padding: "1.5rem",
    textAlign: "center",
    display: "flex",
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
  }
}));

export function PlayerComponent({player} : {player: User}) {
  const classes = useStyles();

  return (
    <div style={{ padding: "1rem"}}>
      <div className={`rounded shadow ${classes.card}`}>
        <span>
          {player.name}
        </span>
      </div>
    </div>
  );
}

export default PlayerComponent;
