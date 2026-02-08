"use client";

import { useCallback, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import styles from "./Home.module.css";
import { FlightLogService } from "../(flightlog)/fightlog.service";
import LogCard from "../(flightlog)/LogCard";
import LogForm from "../(flightlog)/LogForm";
import type {
  AveragesMapValue,
  LogEntry,
  LogEntryInput,
} from "../(flightlog)/types";
// import BoardingPassCard from "../(boardingpass)/BoardingPassCard";

const flightLogService = new FlightLogService();

const buildRouteAverages = (
  logs: LogEntry[]
): Map<string, AveragesMapValue> => {
  const sortedLogs = [...logs].sort((a, b) => a.timestamp - b.timestamp);
  const lastDepartureByPassenger = new Map<string, LogEntry>();
  const averages = new Map<string, AveragesMapValue>();

  sortedLogs.forEach((log) => {
    if (log.type === "departure") {
      lastDepartureByPassenger.set(log.passengerName, log);
      return;
    }

    const departure = lastDepartureByPassenger.get(log.passengerName);
    if (!departure) {
      return;
    }

    const durationMs = log.timestamp - departure.timestamp;
    if (durationMs < 0) {
      return;
    }

    const routeKey = `${departure.airport} to ${log.airport}`;
    const current = averages.get(routeKey) ?? { count: 0, totalMs: 0 };
    averages.set(routeKey, {
      count: current.count + 1,
      totalMs: current.totalMs + durationMs,
    });

    lastDepartureByPassenger.delete(log.passengerName);
  });

  return averages;
};

const formatDuration = (ms: number): string => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));

  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  let totalDays = Math.floor(totalHours / 24);

  const years = Math.floor(totalDays / 365);
  totalDays = totalDays % 365;
  const months = Math.floor(totalDays / 30);
  const days = totalDays % 30;

  const parts: string[] = [];
  if (years) parts.push(`${years}y`);
  if (months) parts.push(`${months}mo`);
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  if (seconds) parts.push(`${seconds}s`);

  if (parts.length === 0) return "0s";
  return parts.join(" ");
};

export default function Home() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const routeAverages = useMemo(() => buildRouteAverages(logs), [logs]);

  const handleAddLog = useCallback((log: LogEntryInput) => {
    const parsedTimestamp = Date.parse(log.timestamp);
    const nextLog: LogEntry = {
      id: `log-${Date.now()}`,
      passengerName: log.passengerName,
      airport: log.airport,
      timestamp: Number.isNaN(parsedTimestamp)
        ? Date.now()
        : parsedTimestamp,
      type: log.type,
    };

    setLogs((prev) => [...prev, nextLog]);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const data = await flightLogService.getLogs();
      setLogs(data);
    };

    fetch();
  }, []);

  const handlePrintAverages = useCallback(() => {
    if (routeAverages.size === 0) {
      console.log("No completed trips to average yet.");
      return;
    }

    console.log("Average travel time per route:");
    routeAverages.forEach((value, route) => {
      const avgMs = value.totalMs / value.count;
      console.log(
        `${route}: ${formatDuration(avgMs)}`
      );
    });
  }, [routeAverages]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next Airline!</a>
        </h1>
        {/* <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>app/(home)/page.tsx</code>
        </p> */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className={styles.avgButton} onClick={handlePrintAverages}>
            Print route average time (to console)
          </button>
        </div>
        <div
          className={`${styles.card} ${styles.logCard}`}
          style={{ margin: 16, width: "100%" }}
        >
          <h2>Flight Logs</h2>
          <LogCard data={logs}></LogCard>
        </div>
        <div className={styles.logFormGrid}>
          <div className={`${styles.card} ${styles.logFormCard}`}>
            <h2>Departure Logging</h2>
            <LogForm type={"departure"} onSubmit={handleAddLog}></LogForm>
          </div>
          <div className={`${styles.card} ${styles.logFormCard}`}>
            <h2>Arrival Logging</h2>
            <LogForm type={"arrival"} onSubmit={handleAddLog}></LogForm>
          </div>
        </div>
        {/* Render boarding pass here */}
        {/* {[].map((_, i) => ( */}
        {/*   <BoardingPassCard key={i} /> */}
        {/* ))} */}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
