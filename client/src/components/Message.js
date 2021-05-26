const Message = ({ error, message }) => {
  const classes = error ? "message error" : "message";

  return <div className={classes}>{message}</div>;
};

export default Message;
