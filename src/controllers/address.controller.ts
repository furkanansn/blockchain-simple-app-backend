//packages
import { Request, Response } from "express";

//services
import AddressService from "../services/address.service";

class AddressController {
  async get(req: Request, res: Response) {
    const addressId = req.params.addressId;
    const address = await AddressService.getAddress(addressId);
    res.json(address);
  }

}

export default new AddressController();
