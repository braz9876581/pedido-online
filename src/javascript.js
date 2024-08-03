
import { add, take, del, carts, total } from "./grid/index.js";

import listItems from "./grid/index.js";

function loadGrid () {
    const category = document.querySelector('.category')
    category.innerHTML = ``;

    for (let i=0; i<listItems.length; i++) {
        category.innerHTML += `
            <div class="item">
                <div class="item-info">
                    <h3>${listItems[i].type}</h3>
                    <div class="groupedInfo">
                        <p>${listItems[i].item}</p>
                        <p>${formatNumber(listItems[i].price)}</p>
                    </div>
                </div>
                <button class="add-button">+</button>
            </div>
        `;   
    }

    const buttons = document.querySelectorAll('.add-button')
    for (let i=0; i<buttons.length; i++) {
        buttons[i].addEventListener('click', () => adicionarAoCarrinho(listItems[i].item, listItems[i].price))
    }

    document.querySelector('input#endereco').style.display = 'none';
    document.querySelector('input#telefone').style.display = 'none';

    const radios = document.querySelectorAll('input.radios')
    for (let i=0; i<radios.length; i++) {
        radios[i].addEventListener('click', () => {
            if (i === 0) {
                document.querySelector('input#endereco').style.display = 'none';
                document.querySelector('input#telefone').style.display = 'none';
                return
            }

            if (i === 1) {
                document.querySelector('input#endereco').style.display = 'block';
                document.querySelector('input#telefone').style.display = 'block';
            }
        })
    }

    document.querySelector('button#sendWhatsap').addEventListener('click', () => enviarPedido())
}
loadGrid()

function adicionarAoCarrinho(nome, preco) {
    add(nome, preco)
    atualizarCarrinho();
}

function formatNumber(numero) {
    return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function atualizarCarrinho() {
    const newCart = carts()
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    newCart.forEach((produto) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class='firstGroup'>
                <div>${produto.item} - $${produto.price} ${produto.qnt}x</div>
                <div> 
                    <button class='take'> - </button>
                    <p> - </p>
                    <button class='add'> + </button>
                    <span class="material-symbols-outlined">delete</span>
                </div>
            </div>
        `;
        cartItems.appendChild(div);
    });

    document.getElementById('total').innerText = total();
    
    const buttonstake = document.querySelectorAll('button.take')
    for (let i=0; i<buttonstake.length; i++) {
        buttonstake[i].addEventListener('click', _ => {
            take(newCart[i].item, 1);
            atualizarCarrinho()
        })
    }

    const buttonsadd = document.querySelectorAll('button.add')
    for (let i=0; i<buttonsadd.length; i++) {
        buttonsadd[i].addEventListener('click', _ => {
            add(newCart[i].item, 1);
            atualizarCarrinho()
        })
    }

    const buttonsdel = document.querySelectorAll('span')
    for (let i=0; i<buttonsdel.length; i++) {
        buttonsdel[i].addEventListener('click', _ => {
            del(newCart[i].item)
            atualizarCarrinho()
        })
    }
}

function enviarPedido() {
    const newCart = carts()
    if (newCart.length === 0) {
        alert('O carrinho está vazio!');
        return;
    }

    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;
    const metodoPagamento = document.getElementById('metodo-pagamento').value;

    const radios = document.querySelectorAll('input.radios')
    if (radios[1].checked) {
        if (!nome || !endereco || !telefone) {
            alert('Por favor, preencha todos os campos de entrega.');
            return;
        }
    }

    if (!nome) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    let mensagem = `Pedido de ${nome} 😋:\n\nItens:\n`;
    newCart.forEach(produto => {
        mensagem += `- ${produto.item}: $${produto.price} ${produto.qnt}x 😋\n`;
    });
    
    if (radios[1].checked) {
        mensagem += `\nTotal: $${total()} 💰\n\nEndereço: ${endereco} 🏠\nTelefone: ${telefone} ☎️\nConclusão: Entrega a domicílio 🤤\nMétodo de Pagamento: ${metodoPagamento} 💳`;
    } else {
        mensagem += `\nTotal: $${total()} 💰\n\nConclusão: Retirar no estabelecimento 🤤\nMétodo de Pagamento: ${metodoPagamento} 💳`;
    }

    const telefoneWhatsApp = '5521965200381'; // Coloque aqui o número de telefone com o código do país
    const url = `https://api.whatsapp.com/send?phone=${telefoneWhatsApp}&text=${encodeURIComponent(mensagem)}`;

    window.open(url, '_blank');
}