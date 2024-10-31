import { BaseController } from './BaseController'
import { Supplier } from '../entities/Supplier'

export class SupplierController extends BaseController<Supplier> {
    constructor() {
        super(Supplier)
    }
}