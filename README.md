# Gerencimento de contatos

## Resumo;
Este é um software que visa organizar seus contatos de maneira mais prática e deixa-os guardado em um banco de dados.

## Algoritmo geral;
1. Design de interface
2. Ambiente Node/Express.js
3. Criar banco de dados (MySQL)
4. Promise/Axios
5. Fazer CRUD

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
- Criar método **POST**, primeiro argumento será a rota da requisição e o segundo será uma função anonima que recebe como argumento require e o result. Dentro da função anonima, coletamos os dados enviador por uma requisição HTTP pelo lado do cliente, e em seguida uma variável para armazenar o codigo SQL e passamos nele os dados. Após isso fazemos uma query() para mandar os dados ao servidor.

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

- Criamos o método **GET** agora. Dentro dele uma variavel com cogido SQL selecionando toda a tabela, e depois fazermos o query() para conversar com o banco e pegar os dados, e mandamos ele para o client side usando .send()

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
