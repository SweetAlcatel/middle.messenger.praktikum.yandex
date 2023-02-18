export enum NotificationTypes {
  Success = "success",
  Warning = "warning",
}

export const showNotification = (
  text = "Успешно!",
  type = NotificationTypes.Success
) => {
  const notification = document.getElementById("notification");
  const div = document.createElement("div");
  div.classList.add(type);

  div.innerText = text;

  notification!.append(div);

  setTimeout(() => {
    notification!.innerHTML = "";
  }, 3000);
};
