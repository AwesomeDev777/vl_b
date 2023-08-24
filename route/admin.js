const express = require("express");
const auth = require('../middlewares/admin/auth');
const passport = require("passport");

// Staff
const staffController = require('../controller/admin/setting/staff');
const departmentController = require('../controller/admin/setting/support/department');
const roleController = require('../controller/admin/setting/role');

// Client
const clientGroupController = require('../controller/admin/setting/client/group');
const clientController = require('../controller/admin/client');
const clientfieldController = require('../controller/admin/setting/client/field');
const contactController = require('../controller/admin/contact');

// Item
const itemGroupController = require('../controller/admin/setting/item/group');
const itemFieldController = require('../controller/admin/setting/item/field');
const itemController = require('../controller/admin/sales/item');

// Contract
const contractTypeController = require('../controller/admin/setting/contract/type');
const contractController = require('../controller/admin/contract');

// Project
const projectController = require('../controller/admin/project');

// Account
const transactionBankController = require('../controller/admin/account/transactionBank');
const journalentriesController = require('../controller/admin/account/journalEntries');
const transferController = require('../controller/admin/account/transfer');
const accountController = require('../controller/admin/account/account');

// Warehouse
const warehouseController = require('../controller/admin/warehouse/warehouse');

// Warehouse Product
const productController = require('../controller/admin/warehouse/product');

//warehouse good
const goodController = require('../controller/admin/warehouse/good')

//warehouse good quantity
const goodQualityController = require('../controller/admin/warehouse/goodQuality')

// Finance
const currencyController = require('../controller/admin/setting/finance/currency');
const taxController = require('../controller/admin/setting/finance/tax');
const expenseCategoryController = require('../controller/admin/setting/finance/expenseCategory');
const paymentModeController = require('../controller/admin/setting/finance/paymentMode');
// const subscriptionController = require('../controller/admin/subscription');

const router = express.Router();

// Auth Route
router.post("/admin/login", auth.login);
router.get("/admin/current", passport.authenticate('jwt', {session: false}), auth.current);

// Role Route
router.get("/admin/role/:pages/:size", passport.authenticate('jwt', {session: false}), roleController.getAll);
router.get("/admin/role/:id", passport.authenticate('jwt', {session: false}), roleController.getOne);
router.post('/admin/role/', passport.authenticate('jwt', {session: false}), roleController.add);
router.put("/admin/role/:id", passport.authenticate('jwt', {session: false}), roleController.edit);
router.delete("/admin/role/:id", passport.authenticate('jwt', {session: false}),  roleController.delete);

// Department Route
router.get("/admin/department/:pages/:size", departmentController.getAll);
router.get("/admin/department/:id", departmentController.getOne);
router.post('/admin/department/', departmentController.add);
router.put("/admin/department/:id", departmentController.edit);
router.delete("/admin/department/:id",  departmentController.delete);

// Staff Route
router.get("/admin/staff/:pages/:size/:search/:sort", staffController.getAll);
router.get("/admin/staff/:id", staffController.getOne);
router.post('/admin/staff/', staffController.add);
router.put("/admin/staff/:id", staffController.edit);
router.delete("/admin/staff/:id",  staffController.delete);
router.put("/admin/staff/active/:id",  staffController.active);
router.put("/admin/staff/image/:id",  staffController.image);
router.put("/admin/staff/password/:id",  staffController.password);

// ClientGroup Route
router.get("/admin/client/group/:pages/:size", passport.authenticate('jwt', {session: false}), clientGroupController.getAll);
router.post('/admin/client/group/', passport.authenticate('jwt', {session: false}), clientGroupController.add);
router.delete("/admin/client/group/:id", passport.authenticate('jwt', {session: false}),  clientGroupController.delete);

// Client Route
router.get("/admin/client/:pages/:size/:search/:sort", clientController.getAll);
router.get("/admin/client/", clientController.getClient);
router.get("/admin/client/:id", clientController.getOne);
router.post('/admin/client/', clientController.add);
router.put("/admin/client/:id", clientController.edit);
router.delete("/admin/client/:id",  clientController.delete);
router.put("/admin/client/active/:id",  clientController.active);

// Client Field Route
router.get("/admin/client/field/:pages/:size", clientfieldController.getAll);
router.post('/admin/client/field/', clientfieldController.add);
router.delete("/admin/client/field/:id",  clientfieldController.delete);
router.put("/admin/client/field/active/:id",  clientfieldController.active);

// ContractType Route
router.get("/admin/contract/type/:pages/:size", passport.authenticate('jwt', {session: false}), contractTypeController.getAll);
router.post('/admin/contract/type/', passport.authenticate('jwt', {session: false}), contractTypeController.add);
router.delete("/admin/contract/type/:id", passport.authenticate('jwt', {session: false}),  contractTypeController.delete);

// Contract Route
router.get("/admin/contract/:pages/:size", contractController.getAll);
router.get("/admin/contract/:id", contractController.getOne);
router.post('/admin/contract/', contractController.add);
router.put("/admin/contract/:id", contractController.edit);
router.delete("/admin/contract/:id",  contractController.delete);

// Project Route
router.get("/admin/project/:pages/:size", projectController.getAll);
router.get("/admin/project/:id", projectController.getOne);
router.post('/admin/project/', projectController.add);
router.put("/admin/project/:id", projectController.edit);
router.delete("/admin/project/:id",  projectController.delete);

// Account Transaction Bank Route
router.get("/admin/account/transaction/bank/:pages/:size", transactionBankController.getAll);
router.get("/admin/account/transaction/bank/:id", transactionBankController.getOne);
router.post('/admin/account/transaction/bank/', transactionBankController.add);
router.put("/admin/account/transaction/bank/:id", transactionBankController.edit);
router.delete("/admin/account/transaction/bank/:id",  transactionBankController.delete);

// Account Journal Entries Route
router.get("/admin/account/journalentries/:pages/:size", journalentriesController.getAll);
router.get("/admin/account/journalentries/:id", journalentriesController.getOne);
router.post('/admin/account/journalentries/', journalentriesController.add);
router.put("/admin/account/journalentries/:id", journalentriesController.edit);
router.delete("/admin/account/journalentries/:id",  journalentriesController.delete);

// Account Transfer Route
router.get("/admin/account/transfer/:pages/:size", transferController.getAll);
router.get("/admin/account/transfer/:id", transferController.getOne);
router.post('/admin/account/transfer/', transferController.add);
router.put("/admin/account/transfer/:id", transferController.edit);
router.delete("/admin/account/transfer/:id",  transferController.delete);

// Account Route
router.get("/admin/account/:pages/:size", accountController.getAll);
router.get("/admin/account/:id", accountController.getOne);
router.post('/admin/account/', accountController.add);
router.put("/admin/account/:id", accountController.edit);
router.delete("/admin/account/:id",  accountController.delete);
router.put("/admin/account/active/:id",  accountController.active);

// Warehouse Route
router.get("/admin/warehouse/", warehouseController.getAll);
router.get("/admin/warehouse/:id", warehouseController.getOne);
router.post('/admin/warehouse/', warehouseController.add);
router.put("/admin/warehouse/:id", warehouseController.edit);
router.delete("/admin/warehouse/:id",  warehouseController.delete);

// Warehouse Product Route
router.get("/admin/product/:pages/:size/:warehouse/:filterKey/:filterValue/:sortKey/:sort", productController.getAll);
router.get("/admin/product/:id", productController.getOne);
router.post('/admin/product/', productController.add);
router.put("/admin/product/:id", productController.edit);
router.delete("/admin/product/:id",  productController.delete);

// Warehouse Good receipt  Route
router.get("/admin/good/:pages/:size/:filterKey/:filterValue/:sortKey/:sort", goodController.getAll);
router.get("/admin/good/:id", goodController.getOne);
router.post('/admin/good/', goodController.add);
router.put("/admin/good/:id", goodController.edit);
router.delete("/admin/good/:id",  goodController.delete);

// Warehouse Good receipt Quantity  Route
router.get("/admin/goodQauntity/:goodId", goodQualityController.getAll);
router.get("/admin/goodQauntity/:id", goodQualityController.getOne);
router.post('/admin/goodQauntity/', goodQualityController.add);
router.put("/admin/goodQauntity/:id", goodQualityController.edit);
router.delete("/admin/goodQauntity/:id",  goodQualityController.delete);

// Currency Route
router.get("/admin/currency/:pages/:size", currencyController.getAll);
router.get("/admin/currency/:id", currencyController.getOne);
router.post('/admin/currency/', currencyController.add);
router.put("/admin/currency/:id", currencyController.edit);
router.delete("/admin/currency/:id",  currencyController.delete);
router.put("/admin/currency/default/:id",  currencyController.default);

// tax Route
router.get("/admin/tax/:pages/:size", taxController.getAll);
router.get("/admin/tax/:id", taxController.getOne);
router.post('/admin/tax/', taxController.add);
router.put("/admin/tax/:id", taxController.edit);
router.delete("/admin/tax/:id",  taxController.delete);

// Item Group Route
router.get("/admin/item/group/:pages/:size", itemGroupController.getAll);
router.post('/admin/item/group/', itemGroupController.add);
router.delete("/admin/item/group/:id",  itemGroupController.delete);
router.put("/admin/item/group/:id", itemGroupController.edit);
router.get("/admin/item/group/:id", itemGroupController.getOne);

// Item Field Route
router.get("/admin/item/field/:pages/:size", itemFieldController.getAll);
router.get("/admin/item/field/:id", itemFieldController.getOne);
router.post('/admin/item/field/', itemFieldController.add);
router.put("/admin/item/field/:id", itemFieldController.edit);
router.delete("/admin/item/field/:id",  itemFieldController.delete);
router.put("/admin/item/field/active/:id",  itemFieldController.active);

// Item Route
router.get("/admin/sales/item/:pages/:size", itemController.getAll);
router.get("/admin/sales/item/:id", itemController.getOne);
router.post('/admin/sales/item/', itemController.add);
router.put("/admin/sales/item/:id", itemController.edit);
router.delete("/admin/sales/item/:id",  itemController.delete);
router.put("/admin/sales/item/image/:id",  itemController.image);
router.get("/admin/sales/item/:pages/:size/:search/:sort", itemController.all);


// Payment Modes Route
router.get("/admin/payment/mode/:pages/:size", paymentModeController.getAll);
router.get("/admin/payment/mode/:id", paymentModeController.getOne);
router.post('/admin/payment/mode/', paymentModeController.add);
router.put("/admin/payment/mode/:id", paymentModeController.edit);
router.delete("/admin/payment/mode/:id",  paymentModeController.delete);
router.put("/admin/payment/mode/active/:id",  paymentModeController.active);

// Expenses Category
router.get("/admin/expense/category/:pages/:size", expenseCategoryController.getAll);
router.post('/admin/expense/category/', expenseCategoryController.add);
router.delete("/admin/expense/category/:id",  expenseCategoryController.delete);


// Contacts Route
router.get("/admin/contact/:pages/:size/:search/:sort", contactController.getAll);
router.get("/admin/contact/:id", contactController.getOne);
router.post('/admin/contact/', contactController.add);
router.put("/admin/contact/:id", contactController.edit);
router.delete("/admin/contact/:id",  contactController.delete);
router.get("/admin/contact/get/some/:pages/:size/:id",  contactController.getSome);
router.put("/admin/contact/active/:id",  contactController.active);

module.exports = router;