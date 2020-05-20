import React from 'react';
import * as PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

export default function PickCharacters({charA, charB, charList, formError, handleCharacterCompare, handleCharacterSelection}) {
  const classes = useStyles();

  return (
      <>
        <FormControl className={classes.formControl}>
          <InputLabel id="starWars-characterA-inputLabel">Character A</InputLabel>
          <Select
              id="starWars-characterA-select"
              value={charA}
              onChange={event => handleCharacterSelection(event,"A")}
          >
            {charList.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="starWars-characterB-inputLabel">Character B</InputLabel>
          <Select
              id="starWars-characterB-select"
              value={charB}
              onChange={event => handleCharacterSelection(event,"B")}
          >
            {charList.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)}
          </Select>
        </FormControl>
        <Button className={classes.button} onClick={() => handleCharacterCompare()} size="large" variant="outlined" color="primary">
          Find Relationships
        </Button>
        <p>{formError}</p>
      </>
  );
};

PickCharacters.propTypes = {
  charA: PropTypes.string,
  charB: PropTypes.string,
  charList: PropTypes.array.isRequired,
  formError: PropTypes.string,
  handleCharacterCompare: PropTypes.func.isRequired,
  handleCharacterSelection: PropTypes.func.isRequired
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(2)
  }
}));
