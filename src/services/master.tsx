import axiosInstance from "../axios";

class MasterService {
  vehicleTypeList = async () => {
    return await axiosInstance.get("/SpringJOAS/container/ContainerPrint?contAakno=0");
  };
}

const MasterServices = new MasterService();
export default MasterServices;