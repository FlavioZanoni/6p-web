import { BaseController } from './BaseController'
import { Client } from '../entities/Client'

export class ClientController extends BaseController<Client> {
    constructor() {
        super(Client)
    }
}