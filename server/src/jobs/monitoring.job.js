import { parentPort } from "worker_threads";
import osu from "node-os-utils";
import { MONITORING } from "../constants/job.js";

if (parentPort) {
  parentPort.once("message", (message) => {
    if (message === "cancel") {
      parentPort.postMessage("cancelled");
    }
  });
}

const main = async () => {
  const cpu = osu.cpu;
  const mem = osu.mem;
  const cpuUsage = await cpu.usage();
  const usedMem = await mem.used();
  const { totalMemMb, usedMemMb } = usedMem;
  const memUsage = parseFloat(((usedMemMb / totalMemMb) * 100).toFixed(2));

  parentPort.postMessage({
    data: { cpuUsage, memUsage, timestamp: new Date().valueOf() },
    type: MONITORING,
  });
  parentPort.postMessage("done");
};

main();
