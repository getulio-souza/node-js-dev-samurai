import { Op } from "sequelize";
import Customer from "../models/customer"
import Contact from "../models/contact"
import { parseISO } from "date-fns"
import * as Yup from "yup"

class ContactsController {
  async index(req, res) {

    const {
      name,
      email,
      status,
      createdBefore,
      createdAfter,
      updatedBefore,
      updatedAfter,
      sort,
    } = req.query;


    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 25);

    let where = {customer_id: req.params.customerId};
    let order = [];

    if (name) {
      where = {
        ...where,
        name: {
          [Op.iLike]: `%${name}%`
        }
      }
    }

    if (email) {
      where = {
        ...where,
        email: {
          [Op.iLike]: `%${email}%`
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
      where.createdAt = {
        ...where.createdAt,
          [Op.gte]: parseISO(createdBefore)
      }
    }

    if (createdAfter) {
      where = {
        ...where.createdAt,
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

    const data = await Contact.findAll({
      where: { customer_id: req.params.customerId, ...where },
      include: [Customer],
      order,
      limit,
      offset: limit * page - limit
    })

    return res.json(data);

  }

  async show(req, res) {
    const contact = await Contact.findByPk(req.params.id)

    //Para evitar que o retorno seja 200 com null, verificamos se o customer existe. Se NAO existir, retorna um json 404
    if (!contact) {
      return res.status(404).json({error: 'resource not found.'});
    }
    return res.json(contact)
  }


  async create(req, res) {

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


    const contact = await Contact.create(req.body)
    return res.status(201).json(contact)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      status: Yup.string().uppercase(),
    });

    console.log(schema)

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({error: "Error on validate schema"})
    }

    const contact = await Contact.findByPk(req.params.id)

    //antes de rodar a atualizacao, verificamos se o customer existe
    if (!contact) {
      return res.status(404).json();
    }

    await contact.update(req.body)

    return res.json(contact)
  }

  async delete(req, res) {
  
    const contact = await Contact.findByPk(req.params.id);
    
    if (!contact) {
      return res.status(404).json();
    }

    await contact.destroy();

    return res.json()
  }



}

export default new ContactsController()