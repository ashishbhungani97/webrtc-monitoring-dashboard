/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState } from 'react';
import { Alert, Grid } from '@mui/material';
import clsx from 'clsx';
import { PasswordTextField, TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { useAppSelector } from '../../app/hooks';
import { selectConfig } from './incomingConnections.slice';

const renderResponseMessage = ({
  responseStatus,
  config,
  classes,
  setSaveButtonClicked,
}: {
  responseStatus: string;
  config: any;
  classes: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setSaveButtonClicked: Function;
}) => {
  // if (responseMessage) {
  if (responseStatus && config) {
    return (
      <div>
        <Alert
          severity="success"
          id="forgot_password_success_alert"
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onClose={() => setSaveButtonClicked(false)}
          className={classes.alert}
        >
          ICE server configurations saved successfully!
        </Alert>
      </div>
    );
  }
  if (!responseStatus) {
    return (
      <Alert
        severity="error"
        id="forgot_password_error_alert"
        className={classes.alert}
      >
        ICE server configurations could not save successfully!
      </Alert>
    );
  }
  // }
  return null;
};
export const URLFetchComponent = ({
  classes,
  actions,
  token,
  type,
}: {
  classes: any;
  actions: any;
  token: string;
  type: string;
}) => {
  const iceServerConfig = useAppSelector(selectConfig);
  const { config, responseStatus } = iceServerConfig;
  const [url, setURL] = useState('');
  const [saveButtonClicked, setSaveButtonClicked] = useState(false);

  useEffect(() => {
    if (config && config !== null) {
      if (config.mode === 'url' && config.pluginId === token) {
        setURL(config.url);
      }
    }
  }, [config]);

  return (
    <div>
      <Grid container spacing={2} className={classes.inputWrapper}>
        {type === 'url-fetch' && (
          <>
            <Grid item sm={5} lg={5}>
              <div className={classes.paperTextDark}>URL</div>
            </Grid>
            <Grid item sm={7} lg={7}>
              <TextField
                value={url}
                onChange={(e) => setURL(e.target.value)}
                customStyles={clsx(classes.textField, classes.textFieldWidth)}
              />
              <Button
                id="url-save-settings"
                label="Save settings"
                variant="contained"
                fullWidth
                customStyles={classes.settingsSaveButton}
                onClick={() => {
                  if (url && url.length > 0) {
                    actions.setICEServerConfig({
                      id: token,
                      data: {
                        mode: 'url',
                        url,
                      },
                    });
                    setSaveButtonClicked(true);
                  }
                }}
              />
            </Grid>
          </>
        )}
      </Grid>
      <div>
        {saveButtonClicked &&
          renderResponseMessage({
            responseStatus,
            config,
            classes,
            setSaveButtonClicked,
          })}
      </div>
    </div>
  );
};

// Component for static ICE server config mode
export const StaticICEServerComponent = ({
  classes,
  actions,
  token,
  type,
}: {
  classes: any;
  actions: any;
  token: string;
  type: string;
}) => {
  const iceServerConfig = useAppSelector(selectConfig);
  const { config, responseStatus } = iceServerConfig;
  const [staticInput, setStaticInput] = useState('');
  const [saveButtonClicked, setSaveButtonClicked] = useState(false);
  useEffect(() => {
    if (config && config !== null) {
      if (config.mode === 'static' && config.pluginId === token) {
        setStaticInput(JSON.stringify(config.iceServers));
      }
    }
  }, [config]);

  const [jsonValue, setjsonValue] = useState(null);

  useEffect(() => {
    if (staticInput && staticInput.length > 0) {
      try {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setjsonValue(JSON.parse(staticInput));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('Input value is not a valid JSON string');
      }
    }
  }, [staticInput]);

  return (
    <>
      <Grid container spacing={2}>
        {type === 'static-ICE-servers' && (
          <>
            <Grid item sm={5} lg={5}>
              <div className={classes.paperTextDark}>Username</div>
            </Grid>
            <Grid item sm={7} lg={7}>
              <TextField
                value={staticInput}
                onChange={(e) => setStaticInput(e.target.value)}
                customStyles={clsx(classes.textField, classes.textFieldWidth)}
                multipleLine
                rows={6}
              />
              <Button
                id="static-save-settings"
                label="Save settings"
                variant="contained"
                fullWidth
                customStyles={classes.settingsSaveButton}
                onClick={() => {
                  if (jsonValue && jsonValue !== null) {
                    actions.setICEServerConfig({
                      id: token,
                      data: {
                        mode: 'static',
                        iceServers: jsonValue,
                      },
                    });
                    setSaveButtonClicked(true);
                  }
                }}
              />
            </Grid>
          </>
        )}
      </Grid>

      {saveButtonClicked &&
        renderResponseMessage({
          responseStatus,
          config,
          classes,
          setSaveButtonClicked,
        })}
    </>
  );
};

// Component for shared secret ICE server config mode
export const SharedSecretComponent = ({
  classes,
  actions,
  token,
  type,
}: {
  classes: any;
  actions: any;
  token: string;
  type: string;
}) => {
  const iceServerConfig = useAppSelector(selectConfig);
  const { config, responseStatus } = iceServerConfig;
  const [uri, setURI] = useState('');
  const [secret, setSecret] = useState('');
  const [saveButtonClicked, setSaveButtonClicked] = useState(false);
  useEffect(() => {
    if (config && config !== null) {
      if (config.mode === 'shared-secret' && config.pluginId === token) {
        setURI(config.uri);
        setSecret(config.secret);
      }
    }
  }, [config]);

  return (
    <>
      {type === 'shared-secret' && (
        <>
          <Grid container spacing={2}>
            <Grid item sm={5} lg={5}>
              <div className={classes.paperTextDark}>TURN URI</div>
            </Grid>
            <Grid item sm={7} lg={7}>
              <TextField
                id="shared-secret-uri"
                value={uri}
                onChange={(e) => setURI(e.target.value)}
                customStyles={clsx(classes.textField, classes.textFieldWidth)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ paddingTop: '15px' }}>
            <Grid item sm={5} lg={5}>
              <div className={classes.paperTextDark}>Shared Secret</div>
            </Grid>
            <Grid item sm={7} lg={7}>
              <PasswordTextField
                id="shared-secret"
                onChange={(e) => setSecret(e.target.value)}
                customStyles={clsx(
                  classes.textField,
                  classes.passwordTextField
                )}
              />
              <Button
                id="shared-secret-save-settings"
                label="Save settings"
                variant="contained"
                fullWidth
                customStyles={classes.settingsSaveButton}
                onClick={() => {
                  if (uri && uri.length > 0 && secret && secret.length) {
                    actions.setICEServerConfig({
                      id: token,
                      data: {
                        mode: 'shared-secret',
                        uri,
                        secret,
                      },
                    });
                    setSaveButtonClicked(true);
                  }
                }}
              />
            </Grid>
          </Grid>
        </>
      )}

      {saveButtonClicked &&
        renderResponseMessage({
          responseStatus,
          config,
          classes,
          setSaveButtonClicked,
        })}
    </>
  );
};
