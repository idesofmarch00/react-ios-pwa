
const Message = ({ notification }: { notification: { image?: string; title: string; body: string } }) => {
  return (
    <>
      <div id="notificationHeader">
        {/* image is optional */}
        {notification.image && (
          <div id="imageContainer">
            <img src={notification.image} width={100} alt="" />
          </div>
        )}
        <span>{notification.title}</span>
      </div>
      <div id="notificationBody">{notification.body}</div>
    </>
  );
};

export default Message;