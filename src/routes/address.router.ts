import { Router } from "express";
import AddressController from "../controllers/address.controller";

export const AddressRouter = Router();

AddressRouter.get("/:addressId",AddressController.get);