import { FC } from "react"
import { Modal as AntdModal, ModalProps as AntdModalProps } from "antd"

import "./Modal.css"

interface ModalProps extends AntdModalProps {}

export const Modal: FC<ModalProps> = ({ ...props }) => {
  return (
    <AntdModal className="custom-modal" {...props} closable={false}></AntdModal>
  )
}
