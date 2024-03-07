import { hookstate } from "@hookstate/core";
import { handleUserInfo } from "../utility/userInfo";

const data = handleUserInfo();
export const userToEdit = hookstate({
  id: "",
  user_name: "",
  type_user: "",
  email: "",
});
export const userInfo = (data);
