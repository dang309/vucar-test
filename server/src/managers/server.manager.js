import si from "systeminformation";

class ServerManager {
  async getInformation() {
    const cpuInfo = await si.cpu();
    const osInfo = await si.osInfo();
    const memInfo = await si.mem();
    const graphicInfo = await si.graphics();
    const hardwardInfo = await si.system();
    const biosInfo = await si.bios();
    const networkStats = await si.networkStats();
    const networkConnections = await si.networkConnections();
    const inetChecksite = await si.inetChecksite();
    const inetLatency = await si.inetLatency();
    const dockerInfo = await si.dockerInfo();

    const data = {
      cpu: cpuInfo,
      os: osInfo,
      mem: memInfo,
      graphic: graphicInfo,
      hardware: hardwardInfo,
      bios: biosInfo,
      network: {
        stats: networkStats,
        connections: networkConnections,
        inetChecksite,
        inetLatency,
      },
      docker: dockerInfo,
    };
    return {
      data,
    };
  }
}

export default ServerManager;
