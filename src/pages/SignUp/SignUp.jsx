import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { ValidationSchema } from '../../helper';
import { MyContext } from '../../contexts';
// import callApi from '../../lib/utils/api';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const customStyle = {
    "fontSize": "12px",
    "color": "red",
    "marginLeft": "17px"
  };
  const classes = useStyles();
  const [state, setState] = React.useState({
    name: "",
    email: "",
    address: "",
    dob: "",
    role: "",
    password: "",
    confirmPassword: "",
    isValid: false,
    loader: false,
    allErrors: {},
    touch: {
      Email: true,
      Password: true,
      Name: true,
      Address: true,
      Dob: true,
      Role: true,
      ConfirmPassword: true,
    },
  })

  async function handleChange(evt) {
    const value = evt.target.value;
    await setState({
      ...state,
      [evt.target.name]: value
    });
  }

  async function toggler() {
    await setState({
      ...state,
      loader: true,
      isValid: false,
    });
  }

  async function handleLoader(signUpUser, openSnackBar) {
      await toggler();
      try {
        const { email, password, name, address, dob, role } = state;
        const { history } = props;
        const response = await signUpUser({ variables: { name, email, password, address, dob, role } });
        console.log('value of resposne', response);
        const { data: { signUpUser: signUp } } = response;
        if(signUp) {
          openSnackBar('Sign Up successful', 'success');
        }
        setState({ ...state, loader: false, isValid: true });
        history.push('/login');
      } catch (error) {
        toggler();
        openSnackBar('This is an Error!', 'error');
      }
  }

   function hasError(field) {
    const {
      allErrors, touch, email, password, name, address, dob, role, confirmPassword,
    } = state;
    ValidationSchema.validateAt(field, {
      Email: email,
      Password: password,
      Name: name,
      Address: address,
      Dob: dob,
      Role: role,
      ConfirmPassword: confirmPassword,
    }).then(() => {
      if (allErrors[field] && !touch[field]) {
        delete allErrors[field];
        setState({
          ...state,
          allErrors
        });
      }
      return false;
    }).catch((error) => {
      if (allErrors[field] !== error.message && !touch[field]) {
        setState({
          ...state,
          allErrors: {
            ...allErrors,
            [field]: error.message,
          },
        });
      }
      return true;
    });
  }

  function getError(field) {
    const {
      touch, allErrors, isValid,
    } = state;
    hasError(field);
    if (!Object.keys(touch).length && !Object.keys(allErrors).length && !isValid) {
      setState({
        ...state,
        isValid: true
      });
      return allErrors[field];
    }
    if ((Object.keys(touch).length || Object.keys(allErrors).length) && isValid) {
      setState({
        ...state,
        isValid: false
      });
    }
    return allErrors[field];
  }

  function isTouched(value) {
    const { touch } = state;
    delete touch[value];
    setState({
      ...state,
      touch
    });
  }

  const {
    loader,
    isValid,
  } = state;
  const { signUpUser } = props;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label="Name"
                value={state.name}
                error={!!getError('Name')}
                helperText={getError('Name')}
                onChange={handleChange}
                onBlur={() => isTouched('Name')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="dob"
                label="DOB"
                value={state.dob}
                name="dob"
                error={!!getError('Dob')}
                helperText={getError('Dob')}
                onChange={handleChange}
                onBlur={() => isTouched('Dob')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                value={state.email}
                name="email"
                error={!!getError('Email')}
                helperText={getError('Email')}
                onChange={handleChange}
                onBlur={() => isTouched('Email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Address"
                value={state.address}
                name="address"
                error={!!getError('Address')}
                helperText={getError('Address')}
                onChange={handleChange}
                onBlur={() => isTouched('Address')}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="demo-simple-select-helper-label">Role*</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={state.role}
                onChange={handleChange}
                fullWidth
                name="role"
                onBlur={() => isTouched('Role')} 
                error={!!getError('Role')}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="product-manager">Product Manager</MenuItem>
              </Select>
              <p style={customStyle}>{getError('Role')}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={state.password}
                id="password"
                error={!!getError('Password')}
                helperText={getError('Password')}
                onChange={handleChange}
                onBlur={() => isTouched('Password')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={state.confirmPassword}
                id="confirmPassword"
                error={!!getError('ConfirmPassword')}
                helperText={getError('ConfirmPassword')}
                onChange={handleChange}
                onBlur={() => isTouched('ConfirmPassword')}
              />
            </Grid>
          </Grid>
          <MyContext.Consumer>
            {(value) => (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!isValid}
                onClick={async () => {
                  handleLoader(signUpUser, value.openSnackBar);
                }}
              >
                <span>{loader ? <CircularProgress size={20} /> : ''}</span>
                Sign Up
              </Button>
            )}
          </MyContext.Consumer>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

SignUp.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};