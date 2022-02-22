const alertTimed = (alertDispatch, action) => {
  alertDispatch(action)
  setTimeout(5000, () => alertDispatch('CLOSE_ALERT'))
}

export default alertTimed
