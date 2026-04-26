let carrinho = {};

// 🔄 Carregar carrinho salvo
let carrinhoSalvo = localStorage.getItem("carrinho");

if (carrinhoSalvo) {
    carrinho = JSON.parse(carrinhoSalvo);
}

// 🎁 Adicionar com opção presente
function adicionarCarrinhoComPresente(nome, preco, idCheckbox) {
    let checkbox = document.getElementById(idCheckbox);
    let presente = checkbox ? checkbox.checked : false;

    if (presente) {
        nome += " 🎁 (Presente)";
    }

    adicionarCarrinho(nome, preco);
}

// 🛒 Adicionar ao carrinho
function adicionarCarrinho(nome, preco) {
    if (carrinho[nome]) {
        carrinho[nome].quantidade++;
    } else {
        carrinho[nome] = {
            preco: preco,
            quantidade: 1
        };
    }

    atualizarCarrinho();
}

// ➕ Aumentar quantidade
function aumentar(nome) {
    carrinho[nome].quantidade++;
    atualizarCarrinho();
}

// ➖ Diminuir quantidade
function diminuir(nome) {
    carrinho[nome].quantidade--;

    if (carrinho[nome].quantidade <= 0) {
        delete carrinho[nome];
    }

    atualizarCarrinho();
}

// ❌ Remover item
function removerItem(nome) {
    delete carrinho[nome];
    atualizarCarrinho();
}

// 🔄 Atualizar carrinho na tela + salvar
function atualizarCarrinho() {
    let listas = document.querySelectorAll("#lista-carrinho");
    let totais = document.querySelectorAll("#total");

    let total = 0;

    listas.forEach(lista => lista.innerHTML = "");

    for (let nome in carrinho) {
        let item = carrinho[nome];
        let subtotal = item.preco * item.quantidade;
        total += subtotal;

        listas.forEach(lista => {
            let li = document.createElement("li");

            li.innerHTML = `
                ${nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade}
                <br>
                <button onclick="aumentar('${nome}')">+</button>
                <button onclick="diminuir('${nome}')">-</button>
                <button onclick="removerItem('${nome}')">Remover</button>
            `;

            lista.appendChild(li);
        });
    }

    totais.forEach(t => t.innerText = total.toFixed(2));

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    // contador do topo
    let contador = document.getElementById("contador-carrinho");

    if (contador) {
        let totalItens = 0;

        for (let nome in carrinho) {
            totalItens += carrinho[nome].quantidade;
        }

        contador.innerText = totalItens;
    }
}

// 📦 Mostrar campo de endereço
function mostrarEndereco(mostrar) {
    let campo = document.getElementById("campo-endereco");

    if (campo) {
        campo.style.display = mostrar ? "block" : "none";
    }
}

// 📲 Finalizar compra no WhatsApp
function finalizarCompra() {
    if (Object.keys(carrinho).length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let pagamento = document.querySelector('input[name="pagamento"]:checked');

    if (!pagamento) {
        alert("Selecione a forma de pagamento!");
        return;
    }

    let tipoEntrega = document.querySelector('input[name="tipoEntrega"]:checked');

    if (!tipoEntrega) {
        alert("Selecione entrega ou retirada!");
        return;
    }

    let enderecoInput = document.getElementById("endereco");
    let endereco = enderecoInput ? enderecoInput.value : "";

    if (tipoEntrega.value === "Entrega" && endereco.trim() === "") {
        alert("Digite o endereço para entrega!");
        return;
    }

    let mensagem = "Olá! Quero fazer este pedido:%0A%0A";
    let total = 0;

    for (let nome in carrinho) {
        let item = carrinho[nome];
        let subtotal = item.preco * item.quantidade;

        mensagem += `- ${nome} x${item.quantidade} - R$ ${subtotal.toFixed(2)}%0A`;
        total += subtotal;
    }

    mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;
    mensagem += `%0AForma de pagamento: ${pagamento.value}`;
    mensagem += `%0AOpção: ${tipoEntrega.value}`;

    if (tipoEntrega.value === "Entrega") {
        mensagem += `%0AEndereço: ${endereco}`;
    }

    window.open(`https://wa.me/5587991292282?text=${mensagem}`, "_blank");
}

// 🔁 Atualiza ao carregar página
atualizarCarrinho();
function toggleCarrinho() {
    let carrinho = document.getElementById("carrinho-lateral");
    carrinho.classList.toggle("ativo");
}
window.onclick = function(event) {
    let carrinho = document.getElementById("carrinho-lateral");

    if (carrinho && !carrinho.contains(event.target) && !event.target.closest(".carrinho-topo")) {
        carrinho.classList.remove("ativo");
    }
}
