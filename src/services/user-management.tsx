import axiosInstance from "../axios";

class UserManagmentService {
  userRoleList = async (queryParams?: any) => {
    return await axiosInstance.get(`/userRole/popup?${queryParams}`);
  };

  userRoleSave = async (data: any) => {
    return await axiosInstance.post("/userRole/save", data);
  }
}

const UserManagmentServices = new UserManagmentService();
export default UserManagmentServices;