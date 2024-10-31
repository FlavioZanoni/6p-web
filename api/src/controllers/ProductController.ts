import { BaseController } from './BaseController'
import { Product } from '../entities/Product'

export class ProductController extends BaseController<Product> {
    constructor() {
        super(Product)
    }
}