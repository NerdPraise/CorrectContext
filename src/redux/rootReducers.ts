import { combineReducers } from "redux"

import { ExportReportState } from "../pages/ModalPage/models"
import { exportReducer } from "../pages/ModalPage/store/reducers"

export const rootReducer = combineReducers({
  iExport: exportReducer,
})

export interface AppState {
  iExport: ExportReportState
}
