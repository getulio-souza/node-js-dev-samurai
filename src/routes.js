import { Router } from 'express';

const routes = new Router();

import customers from './app/controllers/customersController'
import contacts from "./app/controllers/contactsController"

//customers 
routes.get("/customers", customers.index);
routes.get("/customers/:id", customers.show);
routes.post("/customers/", customers.create);
routes.put("/customers/:id", customers.update);
routes.delete("/customers/:id", customers.delete);

//contacts
// routes.get("/customers/:customerId/contacts", contacts.index);
routes.get("/customers/:customerId/contacts/:id", contacts.show);
// routes.post("/customers/:customerId/contacts", contacts.create);
// routes.put("/customers/:customerId/contacts/:id", contacts.update);
// routes.delete("/customers/:customerId/contacts/:id", contacts.delete);



export default routes;