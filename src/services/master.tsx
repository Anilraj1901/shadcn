import axiosInstance from "../axios";

class MasterService {
  vehicleTypeList = async (queryParams?: any) => {
    return await axiosInstance.get(`/container/popup?${queryParams}`);
  };

  vehicleTypeSave = async (data: any) => {
    return await axiosInstance.post("/container/save", data);
  }
}

const MasterServices = new MasterService();
export default MasterServices;