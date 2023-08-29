import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import background from "../images/walpaper.jpg";

const defaultTimerValue = {
  study: 1500,
  short: 300,
  long: 900,
  revise: 301,
  bell: true,
  notification: true,
  whiteNoise: true,
  whiteNoiseRevision: true,
  motivation: true,
  quotes: true,
};

const SettingsPage = () => {
  const savedTimerValues = JSON.parse(localStorage.getItem("timerValues"));
  const initialTimerValue = savedTimerValues || defaultTimerValue;

  const [timerValues, setTimerValues] = useState(initialTimerValue);

  const handleValueChange = (key, value) => {
    setTimerValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleToggleChange = (key) => {
    setTimerValues((prevValues) => ({
      ...prevValues,
      [key]: !prevValues[key],
    }));
  };

  const handleSave = () => {
    localStorage.setItem("timerValues", JSON.stringify(timerValues));
  };

  return (
    <div
    className="main-task-background"
    style={{ backgroundImage: `url(${background})` }}
    >
      <Container
        className="main-task-container"
        style={{ height: "100%", alignItems: "top", textAlign: "left", marginTop:"10px" }}
        maxWidth="sm"
      >
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              type="number"
              label="Study Timer (seconds)"
              value={timerValues.study}
              onChange={(e) =>
                handleValueChange("study", parseInt(e.target.value))
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              label="Short Break Timer (seconds)"
              value={timerValues.short}
              onChange={(e) =>
                handleValueChange("short", parseInt(e.target.value))
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              label="Long Break Timer (seconds)"
              value={timerValues.long}
              onChange={(e) =>
                handleValueChange("long", parseInt(e.target.value))
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              label="Revision Timer (seconds)"
              value={timerValues.revise}
              onChange={(e) =>
                handleValueChange("revise", parseInt(e.target.value))
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={timerValues.bell}
                  onChange={() => handleToggleChange("bell")}
                />
              }
              label="Enable Bell"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={timerValues.notification}
                  onChange={() => handleToggleChange("notification")}
                />
              }
              label="Enable Notifications"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={timerValues.whiteNoise}
                  onChange={() => handleToggleChange("whiteNoise")}
                />
              }
              label="Enable White Noise"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={timerValues.whiteNoiseRevision}
                  onChange={() => handleToggleChange("whiteNoiseRevision")}
                />
              }
              label="Enable White Noise for Revision"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={timerValues.motivation}
                  onChange={() => handleToggleChange("motivation")}
                />
              }
              label="Enable Motivation Music"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={timerValues.quotes}
                  onChange={() => handleToggleChange("quotes")}
                />
              }
              label="Enable Quotes"
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Save
        </Button>
        <Button
        variant="contained"
        color="secondary"
        fullWidth
        style={{ marginTop: "16px" }}
        component={Link}
        to="/"
      >
        Go back to Main
      </Button>
      </Container>
    </div>
  );
};

export default SettingsPage;
