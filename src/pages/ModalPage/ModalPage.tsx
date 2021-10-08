import { FC, useEffect, useState } from "react"
import { Button, message, Select } from "antd"
import { ErrorMessage, Field, Formik, Form } from "formik"
import { connect } from "react-redux"

import { Modal } from "./components/Modal/Modal"
import {
  clearStatusCode as clearStatusCodeAction,
  exportReport as exportReportAction,
} from "./store/action"
import { bindActionCreators, Dispatch } from "redux"
import { AppState } from "../../redux/rootReducers"
import { validateEmail, validateName, StatusCode } from "../../constants"
import {
  initialValues,
  ModalPageProps,
  ScheduleDetails,
  WeekDaysValues,
} from "./models"
import "./ModalPage.css"

const { Option } = Select

export const ModalPageContent: FC<ModalPageProps> = ({
  statusCode,
  clearStatusCode,
  exportData,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [schedule, setSchedule] = useState<ScheduleDetails>({})

  useEffect(() => {
    if (statusCode === StatusCode.OK) {
      message.success("Successful")
      setIsVisible(false)
    } else if (statusCode >= StatusCode.BAD_REQUEST) {
      message.error("Form Submission failed")
    }
    clearStatusCode()
  }, [statusCode, clearStatusCode])

  const handleSubmit = (values: any) => {
    clearStatusCode()
    const data = { ...values, ...schedule }
    exportData(data)
  }

  const handleCancel = (resetForm: () => void) => {
    resetForm()
    setIsVisible(false)
  }

  return (
    <div className="modal-page-wrapper">
      <Button onClick={() => setIsVisible(true)}> Click me</Button>
      <Modal
        centered
        visible={isVisible}
        title={"Export Report"}
        footer={false}
      >
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, resetForm }) => (
            <Form>
              <div className="justify">
                <label>Report name</label>
                <div className="fields">
                  <Field name="name" validate={validateName} />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>

              <div className="justify">
                <label>Format</label>
                <div className="radio-group">
                  <label>
                    <Field type="radio" name="format" value="Excel" />
                    Excel
                  </label>
                  <label>
                    <Field type="radio" name="format" value="CSV" />
                    CSV
                  </label>
                </div>
              </div>

              <div className="justify">
                <label>E-mail to</label>
                <div className="fields">
                  <Field type="email" name="email" validate={validateEmail} />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>

              <div className="justify">
                <label>Schedule</label>
                <div className="radio-group">
                  <label>
                    <Field type="radio" name="schedule" value="NoRepeat" />
                    No Repeat
                  </label>
                  <label>
                    <Field type="radio" name="schedule" value="Specific" />
                    Specific Date
                  </label>
                  <label>
                    <Field type="radio" name="schedule" value="Daily" />
                    Daily
                  </label>
                  <label>
                    <Field type="radio" name="schedule" value="Weekly" />
                    Weekly
                  </label>
                </div>
              </div>

              <div className="justify">
                {values.schedule === "Specific" && (
                  <>
                    <label>Date</label>
                    <div className="dates-input">
                      <input
                        type="date"
                        className="input-schedule"
                        onChange={(e) =>
                          setSchedule({
                            time: schedule.time,
                            date: e.target.value,
                          })
                        }
                        required
                      />
                      <span>at</span>
                      <input
                        type="time"
                        className="input-schedule"
                        onChange={(e) =>
                          setSchedule({
                            date: schedule.date,
                            time: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </>
                )}

                {values.schedule === "Daily" && (
                  <>
                    <label>Everyday at</label>
                    <div className="dates-input">
                      <input
                        type="time"
                        onChange={(e) => setSchedule({ time: e.target.value })}
                        required
                      />
                    </div>
                  </>
                )}

                {values.schedule === "Weekly" && (
                  <>
                    <label>Day</label>
                    <div className="dates-input">
                      <Select
                        onChange={(value) =>
                          setSchedule({ ...schedule, day: value as string[] })
                        }
                      >
                        {WeekDaysValues.map((data) => (
                          <Option key={data.value} value={data.value}>
                            {data.label}
                          </Option>
                        ))}
                      </Select>
                      <span>at</span>
                      <input
                        type="time"
                        onChange={(e) => setSchedule({ ...schedule })}
                        required
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="modal-btn">
                <Button onClick={() => handleCancel(resetForm)}>Cancel</Button>
                <Button htmlType="submit" className="submit">
                  OK
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  )
}

const mapStateToProps = ({ iExport }: AppState) => ({
  statusCode: iExport.statusCode,
})

const mapDispatchToProps = (dispatch: Dispatch) => {
  const neededAction = {
    exportData: exportReportAction,
    clearStatusCode: clearStatusCodeAction,
  }

  return bindActionCreators(neededAction, dispatch)
}

export const ModalPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalPageContent)
