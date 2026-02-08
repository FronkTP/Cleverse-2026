import type { LogEntry } from "./types";

export class FlightLogService {
  initialData: LogEntry[] = [
    {
      id: "log-1",
      passengerName: "cherprang",
      airport: "bangkok",
      timestamp: 1630454400 * 1000,
      type: "departure",
    },
    {
      id: "log-2",
      passengerName: "sita",
      airport: "chiangmai",
      timestamp: 1630627200 * 1000,
      type: "departure",
    },
    {
      id: "log-3",
      passengerName: "cherprang",
      airport: "tokyo",
      timestamp: 1630454405 * 1000,
      type: "arrival",
    },
  ];

  getLogs(): Promise<LogEntry[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.initialData || []);
      }, 2000);
    });
  }
}
