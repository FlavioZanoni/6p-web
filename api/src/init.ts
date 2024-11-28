const API_URL = 'http://localhost:3001/api'
let TOKEN = ''

const authHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${TOKEN}`
}

export async function exemploDeUso() {
  try {
    const registerResponse = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: "user@example.com",
        password: "123456",
        name: "User Example"
      })
    });

    const loginResponse = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: "user@example.com",
        password: "123456"
      })
    });
    const { token } = await loginResponse.json();
    TOKEN = token;

    const fornecedor = await fetch(`${API_URL}/suppliers`, {
      method: 'POST',
      headers: { ...authHeaders, Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        nome: "Fornecedor Teste",
        cnpj: "12.345.678/0001-90",
        contato: "(11) 99999-9999",
        endereco: "Rua Teste, 123"
      })
    });
    const fornecedorData = await fornecedor.json();

    const produto = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { ...authHeaders, Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        nome: "Produto Teste",
        descricao: "Descrição do produto teste",
        preco: 99.99,
        quantidade: 50,
        imagem: "url-da-imagem",
        fornecedorId: fornecedorData.id
      })
    });
    const produtoData = await produto.json();

    const cliente = await fetch(`${API_URL}/clients`, {
      method: 'POST',
      headers: { ...authHeaders, Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        nome: "Cliente Teste",
        cpf_cnpj: "123.456.789-00",
        contato: "(11) 88888-8888",
        endereco: "Rua do Cliente Teste, 456"
      })
    });
    const clienteData = await cliente.json();

    console.log('Dados criados:', {
      fornecedor: fornecedorData,
      produto: produtoData,
      cliente: clienteData
    });
  } catch (error) {
    console.error('Erro:', error);
  }
}
