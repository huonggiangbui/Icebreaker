import { Button, Tooltip, Typography, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";

const useStyles = makeStyles(() => ({
  subheading: {
    color: "black !important",
    fontSize: useTheme().typography.pxToRem(15),
    fontWeight: useTheme().typography.fontWeightRegular,
  },
}));

export default function ShareComponent({code}: {code: string}) {
  const classes = useStyles();
  const sharedLink = `${window.location.origin}/room/${code}/signup`;
  const [copiedText, setCopiedText] = useState<string>();

  const onCopy = () => {
    setCopiedText(sharedLink)
    navigator.clipboard.writeText(sharedLink)
  }

  return (
    <Typography className={classes.subheading} style={{ margin: "16px" }}>
      Your room code is
      <Tooltip
        title={
          copiedText === sharedLink
            ? "Copied!"
            : "Copy Invite Link"
        }
        placement="top"
      >
        <Button onClick={onCopy}>
          {code}
        </Button>
      </Tooltip>
      Let's share to your friends to play together!
    </Typography>
  )
}