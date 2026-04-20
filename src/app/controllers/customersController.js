let customers = [
    {id: 1, name: 'dev samurai', site: 'http://devsamurai.com.br'},
    {id: 2, name: 'Google', site: 'http://google.com'},
    {id: 3, name: 'UOL', site: 'http://uol.com.br'},
];

class CustomerController {
  constructor(){
  }
  
  //listagem dos customers
  index(req, res) {
    return res.json(customers)
  }
  
  //recupera um customer
  show(req, res) {
    const id = Number(req.params.id);
    const customer = customers.find((item)=> item.id);
    const status = customer ? 200 : 404;

    if(!customer){
      return res.status(404).json({
        message: 'Cliente não encontrado'
      })
    }

    return res.status(status).json(customer)
  }

  //cria um customer
  create(req, res) {
    const {name, site} = req.body; //corpo que vai ser enviado na requisição
    const id = customers[customers.length -1].id + 1 //obtendo o último id cadastrado e somando mais 1
    const newCustomer = {id, name, site};

    //jogamos dentro do array de customers o novo customer
    customers.push(newCustomer)

    //retornar a resposta com o novo costumer criado
    return res.status(201).json(newCustomer)
  }

  //atualiza um customer
  update(req, res) {
    const id = Number(req.params.id);
    const {name, site} = req.body;

    const index = customers.findIndex(item => item.id === id);
    const status = index >=0 ? 200 : 404;

    if(index >=0){
      customers[index] = {id: Number(id), name, site};
    }

    return res.status(status).json(customers[index])
  }

  //exclui um customer
  delete(req, res) {
  //receber o id
  const id = req.params.id;

  //localizar o index
  const index = customers.findIndex(item => item.id === id);
  const status = index >= 0 ? 200 : 404;

  //se o index for maior do que zero, significa que achei o customer que procurava
  if (index >= 0) {
    //o splice remove o objeto na posicao atual (primeiro parametro) e define a quantidade que sera removida(segundo parametro)
    costumers.splice(index, 1)
  }

  //no caso do delete, a gente passa o json vazio porque o customer deletado nao precisa ser retornado
  return res.status(status).json();
  }
}

export default new CustomerController();