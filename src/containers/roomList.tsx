import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display: "flex",
    height: "100vh",
    alignItems: "center",
  },
  card: {
    flex: "0 0 360px",
    margin: "auto",
  },
});

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>유리 구현</CardContent>
      </Card>
    </div>
  );
};
