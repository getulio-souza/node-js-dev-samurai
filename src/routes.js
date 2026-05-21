import { Router } from 'express';

const routes = new Router();

import customers from './app/controllers/customersController'

//customers 
routes.get("/customers", customers.index);
routes.get("/customers/:id", customers.show);
routes.post("/customers/", customers.create);
routes.put("/customers/:id", customers.update);
routes.delete("/customers/:id", customers.delete);

//contacts
routes.get("/customers/:customerId/contacts", customers.index);
routes.get("/customers/:customerId/contacts/:id", customers.show);
routes.post("/customers/:customerId/contacts", customers.create);
routes.put("/customers/:id", customers.update);
routes.delete("/customers/:id", customers.delete);



export default routes;