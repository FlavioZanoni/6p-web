import { Router } from "express";
import { AuthController } from './controllers/AuthController'
import { ProductController } from "./controllers/ProductController";
import { SupplierController } from "./controllers/SupplierController";
import { ClientController } from "./controllers/ClientController";
import { authMiddleware } from "./middlewares/auth";
import { OrderController } from "./controllers/OrderController";

const router = Router()
const authController = new AuthController()
const clientController = new ClientController()
const supplierController = new SupplierController()
const productController = new ProductController()

router.post('/register', authController.register)
router.post('/login', authController.login)

router.use(authMiddleware)

router.get('/clients', clientController.index.bind(clientController))
router.get('/clients/:id', clientController.show.bind(clientController))
router.post('/clients', clientController.store.bind(clientController))
router.put('/clients/:id', clientController.update.bind(clientController))

router.get('/suppliers', supplierController.index.bind(supplierController))
router.get('/suppliers/:id', supplierController.show.bind(supplierController))
router.post('/suppliers', supplierController.store.bind(supplierController))
router.put('/suppliers/:id', supplierController.update.bind(supplierController))

router.get('/products', productController.index.bind(productController))
router.get('/products/:id', productController.show.bind(productController))
router.post('/products', productController.store.bind(productController))
router.put('/products/:id', productController.update.bind(productController))

router.post('/orders', OrderController.createOrder);
router.put('/orders/:id', OrderController.updateOrder);
router.delete('/orders/:id', OrderController.deleteOrder);
router.get('/orders/:id', OrderController.getOrderById);
router.get('/orders', OrderController.listOrders);

router.get('/transactions', OrderController.listTransactions);
router.get('/transactions/:id', OrderController.getTransactionById);

export { router }