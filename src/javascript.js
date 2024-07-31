let cart = [];
let total = 0;

function adicionarAoCarrinho(nome, preco) {
    cart.push({ nome, preco });
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    total = 0;

    cart.forEach((produto, index) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div>${produto.nome} - $${produto.preco.toFixed(2)}</div>
        `;
        cartItems.appendChild(div);
        total += produto.preco;
    });

    document.getElementById('total').innerText = total.toFixed(2);
}

function enviarPedido() {
    if (cart.length === 0) {
        alert('O carrinho está vazio!');
        return;
    }

    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;
    const metodoPagamento = document.getElementById('metodo-pagamento').value;

    if (!nome || !endereco || !telefone) {
        alert('Por favor, preencha todos os campos de entrega.');
        return;
    }

    let mensagem = `Pedido de ${nome}:\n\nItens:\n`;
    cart.forEach(produto => {
        mensagem += `- ${produto.nome}: $${produto.preco.toFixed(2)}\n  ${produto.descricao}\n`;
    });
    mensagem += `\nTotal: $${total.toFixed(2)}\n\nEndereço de Entrega: ${endereco}\nTelefone: ${telefone}\nMétodo de Pagamento: ${metodoPagamento}`;

    const telefoneWhatsApp = '5521979238535'; // Coloque aqui o número de telefone com o código do país
    const url = `https://api.whatsapp.com/send?phone=${telefoneWhatsApp}&text=${encodeURIComponent(mensagem)}`;

    window.open(url, '_blank');
}