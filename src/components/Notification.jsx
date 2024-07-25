import { notification } from "antd";

const openNotification = (message, description, type) => {
  notification.open({
    message: message,
    description: description,
    type: type,
    duration: 3,
  });
};

export { openNotification };
