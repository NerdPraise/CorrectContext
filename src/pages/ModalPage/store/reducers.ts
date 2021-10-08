import { StatusCode } from "../../../constants"
import { ExportReportState } from "../models"
import { Actions, ActionTypes } from "./action"

const initialValues: ExportReportState = {
  statusCode: StatusCode.INITIAL,
}

export const exportReducer = (
  state = initialValues,
  action: Actions
): ExportReportState => {
  switch (action.type) {
    case ActionTypes.EXPORT_REPORT: {
      const { statusCode } = action.payload

      return { ...state, statusCode }
    }
    case ActionTypes.CLEAR_STATUSCODE: {
      return { ...state, statusCode: StatusCode.INITIAL }
    }
    default:
      return state
  }
}
