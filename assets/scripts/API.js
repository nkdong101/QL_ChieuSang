var linkAPI = "http://demo.quanlynoibo.com:8120/";

export default {
  Account_MobileLogin: linkAPI + "Account/MobileLogin",
  Account_ResetPassword: linkAPI + "Account/ResetPassword",
  Account_ChangePassword: linkAPI + "Account/ChangePassword",
  Login_User: linkAPI + "Account/Login_User",
  APP_Zalo_Login: linkAPI + "Account/APP_Zalo_Login",
  Login_Email: linkAPI + "Account/Login_Email",
  Login: linkAPI + "Account/Login",
  Logout: linkAPI + "Account/Logout",

  GetUserInfo: linkAPI + "Account/GetUserInfo",
  UpdateProfile: linkAPI + "Account/UpdateProfile",
  Account: linkAPI + "Account",
  Get_User_QLTS: linkAPI + "Account/Get_User_QLTS",

  GroupPermission: linkAPI + "GroupPermission",
  Menu: linkAPI + "Menu",
  Menu_Add: linkAPI + "Menu/Add",
  Menu_Edit: linkAPI + "Menu/Edit",
  Menu_Delete: linkAPI + "Menu/Delete",

  MenuButton: linkAPI + "MenuButton/",
  MenuButton_Add: linkAPI + "MenuButton/Add",
  MenuButton_Edit: linkAPI + "MenuButton/Edit",
  MenuButton_Delete: linkAPI + "MenuButton/Delete",
};

export var ServerAPI = {
  APISaveFileToServer: "/API/SaveFileToServer",
};
