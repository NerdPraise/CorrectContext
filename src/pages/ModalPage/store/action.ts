import { Dispatch } from "redux"

import { API, StatusCode } from "../../../constants"

export enum ActionTypes {
  EXPORT_REPORT = "EXPORT REPORT",
  CLEAR_STATUSCODE = "CLEAR STATUSCODE",
}

export interface ExportReportAction {
  type: ActionTypes.EXPORT_REPORT
  payload: { statusCode: StatusCode }
}

export interface ClearStatusCodeAction {
  type: ActionTypes.CLEAR_STATUSCODE
}

export type Actions = ExportReportAction | ClearStatusCodeAction

export const exportReport = (values: any) => (dispatch: Dispatch) => {
  API.post("post/", values)
    .then((response) => {
      dispatch({
        type: ActionTypes.EXPORT_REPORT,
        payload: {
          statusCode: response.status,
        },
      })
    })
    .catch((err) => {
      dispatch({
        type: ActionTypes.EXPORT_REPORT,
        payload: {
          statusCode: err.response
            ? err.response.status
            : StatusCode.BAD_REQUEST,
        },
      })
    })
}

export const clearStatusCode = () => (dispatch: Dispatch) => {
  dispatch({
    type: ActionTypes.CLEAR_STATUSCODE,
  })
}
