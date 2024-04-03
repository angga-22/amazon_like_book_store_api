import { Router } from "express";

// controllers
import ControllerAuthUser from "../../modules/user/user-auth.controller";
import ControllerBook from "../../modules/book/book.controller";
// services
import ServiceAuth from "../../modules/user/auth.services";
import ServiceUser from "../../modules/user/user.services";
import ServiceBook from "../../modules/book/book.services";
// middlewares
import MiddlewareAuth from "../../middlewares/Auth";
// repositories
import RepoUser from "../../modules/user/user.repository";
import RepoBook from "../../modules/book/book.repository";
import RepoOrder from "../../modules/order/order.repository";
import ServiceOrder from "../../modules/order/order.services";
import ControllerOrder from "../../modules/order/order.controller";

const router = Router();

const middlewareAuth = new MiddlewareAuth();

// Auth
const repoUser = new RepoUser();
const serviceAuth = new ServiceAuth(repoUser);
const serviceUser = new ServiceUser(repoUser);
const controllerAuthUser = new ControllerAuthUser(serviceAuth, serviceUser);

// Book
const repoBook = new RepoBook();
const serviceBook = new ServiceBook(repoBook);
const controllerBook = new ControllerBook(serviceBook);

// Order
const repoOrder = new RepoOrder();
const serviceOrder = new ServiceOrder(repoOrder, repoBook, repoUser);
const controllerOrder = new ControllerOrder(serviceOrder);

// router auth
router.post("/auth/login", controllerAuthUser.login());
router.post("/auth/register", controllerAuthUser.register());
router.get("/users", controllerAuthUser.getAllUser());
router.get("/users/:id", controllerAuthUser.getUserById());
router.get("/users/:id/books", controllerAuthUser.getOrderedBooksByUserId());

// router book
router.post("/books", controllerBook.insertBook());
router.put("/books/:id", controllerBook.updateBook());
router.delete("/books/:id", controllerBook.deleteBook());
router.get("/books", controllerBook.getAllBook());
router.get("/books/title", controllerBook.getBookByTitle());

//router order
router.post("/orders", controllerOrder.insertOrder());
router.get("/orders", controllerOrder.getAllOrder());
router.get("/orders/:id", controllerOrder.getOrderById());
router.put("/orders/:id", controllerOrder.updateOrder());
router.delete("/orders/:id", controllerOrder.deleteOrder());

export default router;
