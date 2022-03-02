import React, { memo } from 'react';
import { TextField, TextFieldProps, Theme } from '@mui/material';
import { withStyles, WithStyles, createStyles } from '@mui/styles';

const styles = (theme: Theme) => {
  return createStyles({
    root: {
      width: '100%',
      margin: theme.spacing(2, 0),
      '& .MuiOutlinedInput-input': {
        padding: '10px 0.5rem !important',
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.secondary.dark,
        opacity: 38,
      },
      '&:hover': {
        borderColor: theme.palette.secondary.dark,
        opacity: 38,
      },
      '& .MuiFormLabel-root.Mui-focused': {
        color: theme.palette.secondary.dark,
      },
      '& .MuiFormHelperText-contained': {
        position: 'absolute',
        bottom: -20,
      },
      // '& legend': {
      //   width: '0 !important',
      // },
    },
  });
};

export interface ITextFieldProps
  extends WithStyles<TextFieldProps & typeof styles> {
  id?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  value?: unknown;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  error?: boolean;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  autoFocus?: boolean;
}

export const TextFieldComponent: React.FC<ITextFieldProps> = ({
  classes,
  id,
  label,
  placeholder,
  value,
  onChange,
  onKeyDown,
  onBlur,
  type = 'text',
  helperText = '',
  error = false,
  disabled = false,
  required = false,
  autoFocus = false,
  ...otherProps
}: ITextFieldProps) => {
  return (
    <TextField
      {...otherProps}
      id={id}
      variant="outlined"
      label={label}
      placeholder={placeholder}
      className={classes.root}
      onChange={onChange}
      value={value}
      type={type}
      helperText={error && helperText}
      error={error}
      disabled={disabled}
      required={required}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      autoFocus={autoFocus}
      size="small"
    />
  );
};

export default memo(withStyles(styles)(TextFieldComponent));
