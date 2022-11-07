import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Collapse,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import axios from "axios";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const userkps: { title: string; gen: (rowData: any) => React.ReactNode }[] = [
  {
    title: "ID",
    gen: (rowData: any) => (
      <TableCell align="center">{rowData.userId}</TableCell>
    ),
  },
  {
    title: "이름",
    gen: (rowData: any) => (
      <TableCell align="center">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {rowData.name}
        </div>
      </TableCell>
    ),
  },
];

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState();
  const [day, setDay] = useState(0);
  const { travelId } = useParams<"travelId">();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://api.dev.travely.guide/v1/admin/travels/" + travelId)
      .then((u) => {
        setValue(u.data);
        setIsLoading(false);
      });
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setDay(newValue);
  };

  if (!value || isLoading) return <div>api fetch fail</div>;
  return (
    <div>
      <Card style={{ margin: "20px" }}>
        <TableContainer
          component={Paper}
          style={{ width: "90%", marginTop: "20px" }}
        >
          <Table size="small" aria-label="a dense table">
            {/* <TableHead>
              <TableRow>
                {kps.map((kp, idx) => (
                  <TableCell key={idx} align="center">
                    {kp.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow key={idx}>
                  {kps.map((kp, idx2) => (
                    <React.Fragment key={idx + idx2}>
                      {kp.gen(row)}
                    </React.Fragment>
                  ))}
                </TableRow>
              ))}
            </TableBody> */}
          </Table>
        </TableContainer>
      </Card>
      <Card style={{ margin: "20px" }}>
        <AppBar
          position="static"
          color="default"
          style={{ width: "calc(100vw - 290px)" }}
        >
          <Tabs
            value={day}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {value.dates.map((date, idx) => (
              <Tab key={idx} label={date.date} {...a11yProps(idx)} />
            ))}
          </Tabs>
        </AppBar>
        {value.dates.map((date, idx) => (
          <TabPanel key={idx} value={day} index={idx}>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell>schedule ID</TableCell>
                    <TableCell>참여자</TableCell>
                    <TableCell align="right">장소</TableCell>
                    <TableCell />
                    <TableCell align="center">시작시간</TableCell>
                    <TableCell align="center">종료시간</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {date.schedules.map((row) => (
                    <Row key={row.scheduleId} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        ))}
      </Card>
    </div>
  );
}

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row({ row }) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  console.log(row);

  return (
    <>
      <TableRow>
        <TableCell align="center">{row.scheduleId}</TableCell>
        <TableCell component="th" scope="row">
          {row.users.map((user) => user.userName).join(", ")}
        </TableCell>
        <TableCell align="right">{row.place.placeName}</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{row.startTime}</TableCell>
        <TableCell align="center">{row.endTime}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">place ID</TableCell>
                    <TableCell align="center">kakao map ID</TableCell>
                    <TableCell align="center">구 주소</TableCell>
                    <TableCell align="center">도로명 주소</TableCell>
                    <TableCell align="center">lat</TableCell>
                    <TableCell align="center">lng</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">{row.place.placeId}</TableCell>
                    <TableCell align="center">{row.place.kakaoMapId}</TableCell>
                    <TableCell align="center">
                      {row.place.addressName}
                    </TableCell>
                    <TableCell align="center">
                      {row.place.addressRoadName}
                    </TableCell>
                    <TableCell align="center">{row.place.lat}</TableCell>
                    <TableCell align="center">{row.place.lng}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}