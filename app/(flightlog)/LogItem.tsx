import type { LogItemProps } from "./types";

function LogItem(props: LogItemProps) {
  const { item } = props;
  const formattedTimestamp = new Date(item.timestamp).toLocaleString('en-GB', {
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit'
});
  return (
    <div style={{ display: "flex" }}>
      <span style={{ flex: 1 }}>{item.passengerName}</span>
      <span style={{ flex: 1 }}>{item.airport}</span>
      <span style={{ flex: 1 }}>{formattedTimestamp}</span>
      <span style={{ flex: 1 }}>
        {item.type === "departure" ? "Departure" : "Arrival"}
      </span>
    </div>
  );
}

export default LogItem;
