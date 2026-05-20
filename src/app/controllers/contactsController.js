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
    } = req.body;


    const page = req.query.page || 1;
    const limit = req.query.limit || 25;

    let where = {};
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
          attributes: ["id", "status"]
        },
      ],
      order,
      limit,
      offset: limit * page - limit
    })



  }
}

export default ContactsController