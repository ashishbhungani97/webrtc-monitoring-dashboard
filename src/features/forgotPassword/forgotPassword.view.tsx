/* eslint-disable @typescript-eslint/ban-types */
import React, { memo, useState } from 'react';
import { WithStyles, withStyles } from '@mui/styles';

import { Grid, Alert, Paper } from '@mui/material';
import { LinearProgress } from '../../components/Progress';
import { TextField } from '../../components/TextField';
import { Button2 } from '../../components/Button2';
import { validateEmail } from '../../helper/validation';

import backgrounImage from '../../assets/login/forgotpassword_background.png';
import styles from './forgotPassword.styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  forgotPasswordAsync,
  selectForgotPassword,
} from './forgotPassword.slice';
import { LoginLayout } from '../../components/layout';

type IForgotPasswordView = WithStyles<typeof styles>;

const ForgotPassword: React.FC<IForgotPasswordView> = ({
  classes,
}: IForgotPasswordView) => {
  const forgotPassword = useAppSelector(selectForgotPassword);
  const { loading, responseStatus, responseMessage } = forgotPassword;
  const dispatch = useAppDispatch();

  const handleForgotPassword = (data: any) => {
    dispatch<any>(forgotPasswordAsync(data));
  };

  const [email, setEmail] = useState({
    value: '',
    isError: false,
  });

  const emailOnChange = (event: { target: { value: string } }) => {
    const isError = validateEmail(event.target.value);
    setEmail({ value: event.target.value, isError });
  };

  const submitButtonOnClick = () => {
    if (!email.value) {
      setEmail({ value: '', isError: true });
    } else if (!email.isError) {
      handleForgotPassword({ email: email.value });
    }
  };
  const renderResponseMessage = () => {
    if (responseMessage) {
      if (responseStatus === 'true') {
        return (
          <div>
            <Alert severity="success" id="forgot_password_success_alert">
              {responseMessage}
            </Alert>
          </div>
        );
      }
      if (responseStatus === 'false') {
        return (
          <Alert severity="error" id="forgot_password_error_alert">
            Email Address not found in our system. Please{' '}
            <a href="signup" className={classes.alertLink}>
              signup
            </a>{' '}
            to enjoy Webrtc-monitor{' '}
          </Alert>
        );
      }
    }
    return null;
  };
  return (
    <LoginLayout>
      <div className={classes.forgotText}>Find Your Account</div>
      <div className={classes.longText}>
        Enter the email address you used when you joined and we’ll Send you
        instructions to reset your password
      </div>
      <div className={classes.responseText}>{renderResponseMessage()}</div>
      <div className={classes.textField} id="forgotPasswordField">
        <TextField
          id="forgotPasswordEmail"
          label="Email"
          value={email.value}
          error={email.isError}
          onChange={emailOnChange}
          required
          helperText="Please enter valid email address"
        />
      </div>
      {loading && <LinearProgress />}
      <div className={classes.buttonWrapper}>
        <Button2
          id="send-reset"
          align="right"
          variant="contained"
          label="Send Reset Instructions"
          onClick={() => submitButtonOnClick()}
          disabled={email.isError}
        />
      </div>
    </LoginLayout>
  );
};

export default memo(withStyles(styles)(ForgotPassword));
