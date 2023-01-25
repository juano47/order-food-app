import styles from './Input.module.css'

const Input = (props) => {
  const classes = styles.input + ' ' + props.className
  return (
    <div className={classes}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />
    </div>
  )
}

export default Input
