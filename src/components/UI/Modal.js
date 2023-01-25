import ReactDOM from 'react-dom'
import styles from './Modal.module.css'
import { Fragment } from 'react'

const Backdrop = (props) => {
  return <div className={styles.backdrop}></div>
}

const ModalOverlay = (props) => {
  return <div className={styles.modal}>{props.children}</div>
}

const portalElement = document.getElementById('overlay')

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  )
}

export default Modal
