import { useEffect } from "react";
import { useState } from "react";
import { Container, Grid } from "@mui/material";
import moment from "moment";

import { ServerAPI } from "src/api";
import Loader from "src/components/Loader";
import Page from "src/components/Page";
import { useSocketIO } from "src/hooks";

import BiosBox from "./components/BiosBox";
import CPUBox from "./components/CPUIBox";
import GraphicBox from "./components/GraphicBox";
import HardwareBox from "./components/HardwareBox";
import MemBox from "./components/MemBox";
import Monitoring from "./components/Monitoring";
import OSBox from "./components/OSBox";

const Management = () => {
  const { socket } = useSocketIO();

  const [serverInfo, setServerInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState([]);

  const loadData = () => {
    setIsLoading(true);
    ServerAPI.getInformation()
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.data;
          setServerInfo(data);
        }
      })
      .catch((err) => err)
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    socket.emit("monitoring/start");
    socket.on("monitoring/data", (payload) => {
      setChartData((prev) => {
        if (prev.length > 15) {
          prev.shift();
          return prev;
        }
        return [
          ...prev,
          {
            ...payload,
            timestamp: moment(payload.timestamp).format("HH:mm:ss"),
          },
        ];
      });
    });
  }, [socket]);

  return (
    <Page title="Server Status">
      <Container maxWidth="lg">
        <Grid container spacing={2} alignItems="stretch">
          <Grid item lg={12} sm={12}>
            <Monitoring data={chartData} />
          </Grid>
          {isLoading && <Loader />}
          {!isLoading && serverInfo && (
            <>
              <Grid item lg={4} sm={12}>
                <OSBox serverInfo={serverInfo} />
              </Grid>
              <Grid item lg={4} sm={12}>
                <CPUBox serverInfo={serverInfo} />
              </Grid>
              <Grid item lg={4} sm={12}>
                <MemBox serverInfo={serverInfo} />
              </Grid>
              <Grid item lg={4} sm={12}>
                <GraphicBox serverInfo={serverInfo} />
              </Grid>
              <Grid item lg={4} sm={12}>
                <HardwareBox serverInfo={serverInfo} />
              </Grid>
              <Grid item lg={4} sm={12}>
                <BiosBox serverInfo={serverInfo} />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </Page>
  );
};

export default Management;
