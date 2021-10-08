import { StatusCode } from "../../constants"

export interface ExportReportState {
  statusCode: StatusCode
}

export interface ModalPageProps {
  statusCode: StatusCode
  clearStatusCode: () => void
  exportData: (value: any) => void
}

export const initialValues = {
  name: "",
  format: "",
  email: "",
  schedule: "",
}

export interface ScheduleDetails {
  date?: string
  time?: string
  day?: string | number | string[]
}

export const WeekDaysValues = [
  { value: "0", label: "Sunday" },
  { value: "1", label: "Monday" },
  { value: "2", label: "Tuesday" },
  { value: "3", label: "Wednesday" },
  { value: "4", label: "Thursday" },
  { value: "5", label: "Friday" },
  { value: "6", label: "Saturday" },
]
