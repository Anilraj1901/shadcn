import axiosInstance from "../axios";

class MasterService {
  vehicleTypeList = async () => {
    return await axiosInstance.get("/SpringJOAS/container/ContainerPrint?contAakno=0");
  };

  vehicleTypeSave = async (data: any) => {
    return await axiosInstance.post("/SpringJOAS/container/save", data);
  }
}

const MasterServices = new MasterService();
export default MasterServices;