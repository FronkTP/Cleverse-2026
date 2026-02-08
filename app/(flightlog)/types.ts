export type LogType = "departure" | "arrival";

export type LogEntry = {
  id: string;
  passengerName: string;
  airport: string;
  timestamp: number;
  type: LogType;
};

export type AveragesMapValue = {
  count: number;
  totalMs: number;
};

export type LogFormData = {
  passengerName: string;
  airport: string;
  timestamp: string;
};

export type LogEntryInput = LogFormData & {
  type: LogType;
};

export type LogFormSubmit = (entry: LogEntryInput) => void;

export type LogItemProps = {
  item: LogEntry;
};

export type LogCardProps = {
  data: LogEntry[];
};

export type LogFormProps = {
  type: LogType;
  onSubmit: LogFormSubmit;
};
