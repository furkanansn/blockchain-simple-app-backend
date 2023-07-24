//packages
import AxiosHelper, { AxiosMethods } from "../util/axios-helper";

class AddressService {
  async getAddress(addressId: string) {
    return new AxiosHelper().call(AxiosMethods.GET, `address/${addressId}`);
  }
  
}

export default new AddressService();
