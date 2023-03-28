# Gerencimento de contatos

## Resumo;
Este é um software que visa organizar seus contatos de maneira mais prática e deixa-os guardado em um banco de dados.

## Algoritmo geral;
1. Ambiente Node/Express.js
2. Criar banco de dados (MySQL)
3. Fazer CRUD
4. Axios
5. Design de interface

## Passo-a-passo

### Configuração

Client side:
- HTML e CSS da Aplicação;
- Fazer useState para armazenar valores dos inputs;
- Função para atualizar o setValue adicionando um objeto com os valores de todos os inputs;
- Função para botão para mandar infos para o DB;

Server side:
- Instalar Node;
- Instalar mysql2, express.js, nodemon e cors;
- Importar Cors e usar .use() no "app";
- Converter Express para JSON e usar .use() no "app";
- Importar 'mysql';
- Configurar Schema (MySQL);

### Banco de dados no Node
- Armazenar 'mysql' em uma constante e usar método creatPool() para conectar ao seu bando de dados;

```js
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Ricardo20@',
  database: 'contact-schema',
});
```

### CRUD
- Criar método **POST**, primeiro argumento será a rota da requisição e o segundo será uma função anonima que recebe como argumento require e o result. Dentro da função anonima, coletamos os dados enviador por uma requisição HTTP pelo lado do cliente, e em seguida uma variável para armazenar o código SQL e passamos nele os dados. Após isso fazemos uma query() para mandar os dados ao servidor.

```js
app.post('/register', (req, res) => {
  const { name } = req.body;
  const { email } = req.body;
  const { tel } = req.body;
  let SQL = 'INSERT INTO infos (name, email, tel) VALUES ( ?,?,? )';

  db.query(SQL,[name, email, tel], (err, res) => {
    console.log(err)
  })

});
```

- Criamos o método **GET** agora. Dentro dele uma variável com código SQL selecionando toda a tabela, e depois fazermos o query() para conversar com o banco e pegar os dados, e mandamos ele para o client side usando .send()

```js
app.get('/getContacts', (req, res) => {
  let SQL = 'SELECT * from infos';

  db.query(SQL, (err, result) => {
    if (err) console.log(err)
    else res.send(result)
  })
})
```
e la no front, no arquivo principal "App.jsx" fazemos um **useEffect** para coletar esses dados ao abrir o página.

```js
useEffect(() => {
  Axios.get('http://localhost:3001/getContacts').then(
    (response) => console.log(response) 
  )
}, [])
```

- Criamos um state para receber os dados;
```js
const [listContacts, setListContacts] = useState();
```
e atualizamos o **useEffect** com o **setListContacts(response.data)**

```js
useEffect(() => {
  Axios.get('http://localhost:3001/getContacts').then(
    (response) => setListContacts(response.data)
  )
}, []);
```

- Agora vamos fazer um map() no array de objetos que são retornado com os dados. Porém na primeira entrada não havera informações, então fazemos uma condição para não fazer o map() de um array vazio e retornar um erro;

```js
{ typeof listContacts !== 'undefined' && 
  listContacts.map((item, index) => {
    return <h1></h1>
  })
} 
```

#### Até aqui, nossa aplicação já está enviando e recebendo os dados e retornando eles para o usuário. Agora vamos fazer os recursos de Editar o contato e Apaga-lo.

- Para editar o contato, começamos a prepara na API nosso método **PUT**.
Recolhemos os dados do usuário, declaramos o código SQL, depois fazemos uma query para conectar ao banco de dados. Nela passamos o código SQL, os valores que estão dinâmicos no código SQL. Com uma função anônima retornamos o erro e o resultado. Se não ter algum erro, nos mandamos de volta o resultado com valor editado para o client side.

```js
app.put('/edit', (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  const { email } = req.body;
  const { tel } = req.body;

  let SQL = 'UPDATE `contact-schema`.`infos` SET name = ?, email = ?, tel = ? WHERE id = ?'

  db.query(SQL, [name, email, tel, id], (err, result)=> {
    if(err) console.log(err)
    else res.send(result)
  })
});
```
No front-end. Iniciamos um **useState** com um objeto dos dados do contato escolhido para edição. Com uma função para o "onChange" do input, atualizamos o objeto com os dados do contato. Após ja termos editado o contato, vamos manda isso para a API fazer seu trabalho com ele, usando uma função que chama o Axios, ele chama a rota para edição "/edit", e passa os novos valores para as chaves do DB, que será recolhida lá na API.

```js
const [editContact, setEditContact] = useState({
  id: props.id,
  name: props.name,
  email: props.email,
  tel: props.tel,
});

function handleEditContact(e) {
  setEditContact( prevContact => ({
    ...prevContact,
    [e.target.name]: e.target.value
  }))
};

function edit() {
  axios.put('http://localhost:3001/edit', {
    id: editContact.id,
    name: editContact.name,
    email: editContact.email,
    tel: editContact.tel,
  }).then((response) => {
    console.log(response)
  })
  props.setOpenEdit(false)
  document.location.reload()
};
```

- Agora para deletar o contato é simples. Fazemos uma rota dinâmica com o id do contato escolhido para apagar. No rota colocamos **:id**, isso ja deixa dinâmica e no código SQL colocamos o **WHERE id = ?**. No query é o mesmo processo repetido nos passos anteriores.

```js
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  let SQL = 'DELETE FROM `contact-schema`.`infos` WHERE id = ?';

  db.query(SQL, [id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});
```
E no front-end nós fazemos requisição Axios e colocamos o Id que será deletado.

```js
function deleteContact() {
  axios.delete(`http://localhost:3001/delete/${props.id}`)
  document.location.reload()
};
```

## 🎉 E esse foi meu primeiro projeto usando Node e MySQL. 🎉

😎 Obrigado e aguardem os próximos projetos!!

<a href='https://instagram.com/gevolgdev/' target='blank'>Link do Reels desse projeto</a>
