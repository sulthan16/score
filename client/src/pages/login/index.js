import React from 'react';
import clsx from 'clsx';
import {
	Avatar, Button, CssBaseline, FormControlLabel, Checkbox, Link, Grid,
	Box, Typography, Container, makeStyles, CircularProgress
} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import './style.css';
import Copyright from 'components/Copyright';
import Snackbars from 'components/snackbars';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import authStore from './store';

const useStyles = makeStyles(theme => ({
	'@global': {
		body: {
			backgroundColor: theme.palette.common.white,
		},
	},
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
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	wrapper: {
		margin: theme.spacing(3, 0, 2),
	},
	buttonSuccess: {
		backgroundColor: green[500],
		'&:hover': {
			backgroundColor: green[700],
		},
	},
	buttonError: {
		backgroundColor: red[500],
		'&:hover': {
			backgroundColor: red[700],
		},
	},
	buttonProgress: {
		color: green[500],
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
}));

export default function Login() {
	const classes = useStyles();
	const [authState, authActions] = authStore();
	const [state, setState] = React.useState({
		formData: { email: '', password: '' }
	})

	const { isLoading, status } = authState;
	const buttonClassname = clsx({
		[classes.buttonSuccess]: status === 200,
		[classes.buttonError]: status !== 200,
	});

	const handleChange = (event) => {
		const { formData } = state;
		formData[event.target.name] = event.target.value;
		setState({ formData });
	}
	const onShowSnackbar = () => {
		let title = 'Check Your Credential Correctly !!!';
		return <Snackbars open msg={title} />
	}

	const handleOnSubmit = (event) => {
		event.preventDefault();
		const { email, password } = state.formData;
		authActions.onSubmitLogin(email, password);
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			{status !== 200
				? onShowSnackbar()
				: null}

			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
        		</Typography>
				<ValidatorForm
					className={classes.form}
					onSubmit={(e) => { handleOnSubmit(e) }}
				>
					<TextValidator
						id="email"
						label="Email"
						name="email"
						margin="normal"
						fullWidth
						variant="outlined"
						value={state.formData.email}
						validators={['required', 'isEmail']}
						errorMessages={['email is required', 'email is not valid']}
						onChange={handleChange}
						autoFocus
					/>
					<TextValidator
						id="password"
						label="Password"
						name="password"
						fullWidth
						margin="normal"
						value={state.formData.password}
						variant="outlined"
						validators={['required']}
						errorMessages={['password is required']}
						type="password"
						onChange={handleChange}
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<div className={classes.wrapper}>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							type="submit"
							className={buttonClassname}
							disabled={isLoading}
						>
							Sign In
        				</Button>
						{isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
					</div>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
              				</Link>
						</Grid>
						<Grid item>
							<Link href="#" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</ValidatorForm>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}