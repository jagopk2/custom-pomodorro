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
import { defaultTimerValue } from "../App";

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

  const handleClearStorage = () => {
    // Clear the localStorage data for timer values
    localStorage.removeItem("timerValues");
    // Reset the timerValues state to the default values
    setTimerValues(defaultTimerValue);
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
        style={{
          height: "100%",
          alignItems: "top",
          textAlign: "left",
          marginTop: "10px",
        }}
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
              size="small"
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
              size="small"
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
              size="small"
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
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={timerValues.bell}
                  onChange={() => handleToggleChange("bell")}
                  size="small"
                />
              }
              label="Enable Bell"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={timerValues.quotes}
                  onChange={() => handleToggleChange("quotes")}
                  size="small"
                />
              }
              label="Enable Quotes"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={timerValues.preventSleep}
                  onChange={() => handleToggleChange("preventSleep")}
                  size="small"
                />
              }
              label="Prevent Sleep"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={timerValues.notification}
                  onChange={() => handleToggleChange("notification")}
                  size="small"
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
                  size="small"
                />
              }
              label="Enable White Noise"
            />
            <TextField
              type="number"
              label="White Noise Volume (1-100)"
              value={timerValues.whiteNoiseVolume}
              onChange={(e) =>
                handleValueChange("whiteNoiseVolume", parseInt(e.target.value))
              }
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={timerValues.whiteNoiseRevision}
                  onChange={() => handleToggleChange("whiteNoiseRevision")}
                  size="small"
                />
              }
              label="Enable White Noise for Revision"
            />
            <TextField
              type="number"
              label="White Noise Revision Volume (1-100)"
              value={timerValues.whiteNoiseRevisionVolume}
              onChange={(e) =>
                handleValueChange(
                  "whiteNoiseRevisionVolume",
                  parseInt(e.target.value)
                )
              }
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={timerValues.motivation}
                  onChange={() => handleToggleChange("motivation")}
                  size="small"
                />
              }
              label="Enable Motivation Music"
            />
            <TextField
              type="number"
              label="Motivation Music Volume (1-100)"
              value={timerValues.motivationVolume}
              onChange={(e) =>
                handleValueChange("motivationVolume", parseInt(e.target.value))
              }
              fullWidth
              size="small"
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          fullWidth
          size="small"
          style={{ marginTop: "16px" }}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          size="small"
          style={{ marginTop: "16px" }}
          component={Link}
          to="/"
        >
          Go back to Main
        </Button>
        <Button
          variant="contained"
          color="error"
          fullWidth
          size="small"
          style={{ marginTop: "16px" }}
          onClick={handleClearStorage}
        >
          Clear Storage
        </Button>
      </Container>
    </div>
  );
};

export default SettingsPage;
