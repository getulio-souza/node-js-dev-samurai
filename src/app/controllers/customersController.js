import { Op } from "sequelize";
import Customer from "../models/customer"
import Contact from "../models/contact"
import { parseISO } from "date-fns"
import * as Yup from "yup"

//a ideia agora nao eh mais retornar o array de customers, mas sim os registros do nosso banco de dados

let customers = [
    {id: 1, name: 'dev samurai', site: 'http://devsamurai.com.br'},
    {id: 2, name: 'Google', site: 'http://google.com'},
    {id: 3, name: 'UOL', site: 'http://uol.com.br'},
];

class CustomerController {
  constructor(){
  }
  
  //listagem dos customers
  async index(req, res) {

    //parametros de consulta
    const {
      name,
      email,
      status,
      createdBefore,
      createdAfter,
      updatedBefore,
      updatedAfter,
      sort
    } = req.query;

    const page = req.query.page || 1;
    const limit = req.query.limit || 25;

    let where = {};
    let order = [];

    if (name) {
      where = {
        ...where,
        name: {
          [Op.iLike]: name,
        }
      }
    }

    if (email) {
      where = {
        ...where,
        email: {
        [Op.iLike]: email
        }
      }
    }

    if (status) {
      where = {
        ...where,
        status: {
          [Op.in]: status.split(",").map(item => item.toUpperCase())
        }
      }
    }

     if (createdBefore) {
      where = {
        ...where,
        createdBefore: {
          [Op.gte]: parseISO(createdBefore)
        }
      }
    }

    if (createdAfter) {
      where = {
        ...where,
        createdAfter: {
          [Op.lte]: parseISO(createdAfter)
        }
      }
    }

    if (updatedBefore) {
      where = {
        ...where,
        updatedAt: {
          [Op.gte]: parseISO(updatedBefore)
        }
      }
    }

    if (updatedAfter) {
      where = {
        ...where,
        updatedAt: {
          [Op.lte]: parseISO(updatedAfter)
        }
      }
    }

    if (sort) {
     order = sort.split(",").map(item => item.split(":"))
    }

    const data = await Customer.findAll({
      where,
      include: [
        {
          model: Contact,
          attributes: ["id"]
        }
      ],
      order,
      limit,
      offset: limit * page - limit,
    });

    return res.json(data)
  }
  
  //recupera um customer
  // show(req, res) {
  //   const id = Number(req.params.id);
  //   const customer = customers.find((item)=> item.id);
  //   const status = customer ? 200 : 404;

  //   if(!customer){
  //     return res.status(404).json({
  //       message: 'Cliente não encontrado'
  //     })
  //   }

  //   return res.status(status).json(customer)
  // }

  async show(req, res) {
    const customer = await Customer.findByPk(req.params.id)

    //Para evitar que o retorno seja 200 com null, verificamos se o customer existe. Se NAO existir, retorna um json 404
    if (!customer) {
      return res.status(404).json({error: 'resource not found.'});
    }
    return res.json(customer)
  }

  //cria um customer
  // create(req, res) {
  //   const {name, site} = req.body; //corpo que vai ser enviado na requisição
  //   const id = customers[customers.length -1].id + 1 //obtendo o último id cadastrado e somando mais 1
  //   const newCustomer = {id, name, site};

  //   //jogamos dentro do array de customers o novo customer
  //   customers.push(newCustomer)

  //   //retornar a resposta com o novo costumer criado
  //   return res.status(201).json(newCustomer)
  // }

  //o metodo create recebe todos os registros dentro do request body
  async create(req, res) {

    //criando a schema com o Yup (para comparar o body que estou enviando com o que esta no banco de dados)
    const schema = Yup.object().shape(
      {
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        status: Yup.string().uppercase(),
      }
    )

    //agora verifico que o schema que montei e valido com o req.body. Se nao for, tomar providencias
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({error: "error on validate schema"})
    }


    const customer = await Customer.create(req.body)
    return res.status(201).json(customer)
  }

  //atualiza um customer
  // update(req, res) {
  //   const id = Number(req.params.id);
  //   const {name, site} = req.body;

  //   const index = customers.findIndex(item => item.id === id);
  //   const status = index >=0 ? 200 : 404;

  //   if(index >=0){
  //     customers[index] = {id: Number(id), name, site};
  //   }

  //   return res.status(status).json(customers[index])
  // }

  //os campos name, email e status ficam como opcionais
  async update(req, res) {
    console.log('body retornado:', req.body)
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      status: Yup.string().uppercase(),
    });

    console.log(schema)

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({error: "Error on validate schema"})
    }

    const customer = await Customer.findByPk(req.params.id)

    //antes de rodar a atualizacao, verificamos se o customer existe
    if (!customer) {
      return res.status(404).json();
    }

    await customer.update(req.body)

    return res.json(customer)
  }

  //exclui um customer
  // delete(req, res) {
  // //receber o id
  // const id = req.params.id;

  // //localizar o index
  // const index = customers.findIndex(item => item.id === id);
  // const status = index >= 0 ? 200 : 404;

  // //se o index for maior do que zero, significa que achei o customer que procurava
  // if (index >= 0) {
  //   //o splice remove o objeto na posicao atual (primeiro parametro) e define a quantidade que sera removida(segundo parametro)
  //   costumers.splice(index, 1)
  // }

  // //no caso do delete, a gente passa o json vazio porque o customer deletado nao precisa ser retornado
  // return res.status(status).json();
  // }

  async delete(req, res) {
  
    const customer = await Customer.findByPk(req.params.id);
    
    if (!customer) {
      return res.status(404).json();
    }

    await customer.destroy();

    return res.json()
  }


}

export default new CustomerController();