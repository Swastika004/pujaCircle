import { Router } from 'express';
import { addressController } from '../controllers/address.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createAddressValidation } from '../validations/address.validation.js';

const router = Router();

router.get('/', addressController.getAddresses);
router.post('/', validate(createAddressValidation), addressController.createAddress);
router.put('/:id', addressController.updateAddress);
router.delete('/:id', addressController.deleteAddress);
router.patch('/:id/default', addressController.setDefaultAddress);

export default router;
