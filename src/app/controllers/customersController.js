import { Op } from "sequelize";
import Customer from "../models/customer"
import Contact from "../models/contact"
import { parseISO } from "date-fns"
import * as Yup from "yup"

//a ideia agora nao eh mais retornar o array de customers, mas sim os registros do nosso banco de dados

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

  async show(req, res) {
    const customer = await Customer.findByPk(req.params.id)

    //Para evitar que o retorno seja 200 com null, verificamos se o contact existe. Se NAO existir, retorna um json 404
    if (!customer) {
      return res.status(404).json({error: 'resource not found.'});
    }
    return res.json(customer)
  }

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