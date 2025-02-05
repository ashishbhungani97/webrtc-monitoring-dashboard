/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo } from 'react';
import { WithStyles, withStyles } from '@mui/styles';

import {
  Paper,
  Stack,
  Breadcrumbs,
  Tabs,
  Tab,
  Box,
  // Link,
} from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './callStatsMoreInfo.styles';
import { Typography } from '../../components/Typography';
import Chart from '../../components/Chart';
import GeneralLogs from './components/generalLogs';
import {
  useGetReportQuery,
  useGetConnectionInfoQuery,
  useGetOtherInfoQuery,
  useGetMediaInfoQuery,
} from '../../services/apiService/endpoints/reportEndpoints';
import { getUrlParams } from '../../utils/urlUtils';
import {
  mockConnectionStatus,
  mockMediaInfo,
  mockOtherInfo,
  mockReport,
} from '../../mocks/report';
import SdpComponent from './components/sdpComponent';

type ICallStatsMoreInfoView = WithStyles<typeof styles>;

interface TabPanelProps {
  children: React.ReactNode;
  index: number;
  value: number;
}

const a11yProps = (index: number) => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
};

const SampleChartData = [
  { argument: 1, value: 10 },
  { argument: 2, value: 20 },
  { argument: 3, value: 30 },
];

const CallStatsMoreInfo: React.FC<ICallStatsMoreInfoView> = ({
  classes,
}: ICallStatsMoreInfoView) => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (
    event: React.SyntheticEvent,
    newSelectedTab: number
  ): void => {
    setSelectedTab(newSelectedTab);
  };

  const { clientId, domain, mockStats } = getUrlParams();

  const { data, error, isLoading } = useGetReportQuery({
    domain: 'meetrix.io',
    clientId: clientId || '1234',
  });

  const data2 = useGetConnectionInfoQuery({
    domain: 'meetrix.io',
    clientId: clientId || '1234',
  });

  const data3 = useGetOtherInfoQuery({
    domain: 'meetrix.io',
    clientId: clientId || '1234',
  });

  const data4 = useGetMediaInfoQuery({
    domain: 'meetrix.io',
    clientId: clientId || '1234',
  });

  const report = mockStats ? mockReport : data;
  const connectionStatus = mockStats ? mockConnectionStatus : data2.data;
  const otherInfo = mockStats ? mockOtherInfo : data3.data;
  const mediaInfo = mockStats ? mockMediaInfo : data4.data;

  const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        sx={{ flexGrow: 1, overflow: 'auto' }}
        {...other}
      >
        {value === index && children}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100% - 16px)',
        width: 'calc(100% - 16px)',
      }}
    >
      <Stack spacing={2}>
        <Breadcrumbs
          separator="›"
          aria-label="breadcrumb"
          sx={{
            color: '#00000061',
            fontWeight: 900,
            '& .MuiBreadcrumbs-separator': {
              fontSize: '2rem',
            },
            '& .MuiTypography-root': {
              fontWeight: 'bold',
            },
          }}
        >
          <Link
            to="/dashboard/call-stat-monitoring"
            style={{
              textDecoration: 'none',
            }}
          >
            <Typography variant="h6" color="GrayText">
              Call stat monitoring
            </Typography>
          </Link>
          <Typography variant="h6" color="black">
            807930-8329
          </Typography>
        </Breadcrumbs>
      </Stack>
      <Paper
        elevation={0}
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          marginTop: '1vh',
        }}
      >
        <Box
          sx={{
            width: 'calc(100% - 32px)',
            p: 2,
            height: 'calc(100% - 32px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={selectedTab} onChange={handleChange}>
              <Tab label="GENERAL LOGS" {...a11yProps(0)} />
              <Tab label="METRICS" {...a11yProps(1)} />
              <Tab label="SDPs" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={selectedTab} index={0}>
            <GeneralLogs
              report={report}
              connectionStatus={connectionStatus}
              otherInfo={otherInfo}
              mediaInfo={mediaInfo}
            />
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            <Chart data={SampleChartData} />
          </TabPanel>
          <TabPanel value={selectedTab} index={2}>
            <SdpComponent report={report} />
          </TabPanel>
        </Box>
      </Paper>
    </Box>
  );
};

export default memo(withStyles(styles)(CallStatsMoreInfo));
