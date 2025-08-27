// Dados iniciais
let jogadoras = []
[
  {
    "nome": "Andressa Alves",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://example.com/andressa.jpg",
    "gols": 15,
    "assistencias": 10,
    "jogos": 28,
    "favorita": false
  },
  {
    "nome": "Dayana Rodríguez",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://example.com/dayana.jpg",
    "gols": 5,
    "assistencias": 12,
    "jogos": 30,
    "favorita": false
  },
  {
    "nome": "Mariza",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/mariza.jpg",
    "gols": 2,
    "assistencias": 1,
    "jogos": 32,
    "favorita": false
  },
  {
    "nome": "Thaís Regina",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/thais.jpg",
    "gols": 1,
    "assistencias": 2,
    "jogos": 25,
    "favorita": false
  },
  {
    "nome": "Letícia Teles",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/leticia.jpg",
    "gols": 0,
    "assistencias": 0,
    "jogos": 18,
    "favorita": false
  }
]

// Inicialização
window.onload = function() {
    loadJogadoras();
    displayJogadoras();

    document.getElementById('jogadoraForm').addEventListener('submit', addJogadora);
    document.getElementById('jogadoraList').addEventListener('click', handleJogadoraListClick);
};

// ---------- Funções Auxiliares ----------
function handleJogadoraListClick(event) {
    const clickedElement = event.target.closest("button");
    if (!clickedElement) return;

    const action = clickedElement.dataset.action;
    const index = clickedElement.dataset.index;

    if (action === "edit") {
        editJogadora(index);
    } else if (action === "delete") {
        deleteJogadora(index);
    }
}

function saveJogadoras() {
    localStorage.setItem("jogadoras", JSON.stringify(jogadoras));
}

function loadJogadoras() {
    const stored = localStorage.getItem("jogadoras");
    if (stored) {
        jogadoras = JSON.parse(stored);
    }
}

// CREATE
function addJogadora(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const posicao = document.getElementById('posicao').value;
    const clube = document.getElementById('clube').value;
    const gols = document.getElementById('gols').value;
    const assistencias = document.getElementById('assistencias').value;
    const jogos = document.getElementById('jogos').value;
    const foto = document.getElementById('foto').value;

    const jogadora = { nome, posicao, clube, gols, assistencias, jogos, foto };

    jogadoras.unshift(jogadora);
    saveJogadoras();

    document.getElementById('jogadoraForm').reset();
    displayJogadoras();
    alert("Jogadora adicionada com sucesso!");
}

// READ
function displayJogadoras() {
    const lista = document.getElementById('jogadoraList');
    lista.innerHTML = '';

    jogadoras.forEach((j, index) => {
        const leia = document.createElement('div');
        el.classList.add('card-jogadora');
        el.innerHTML = `
          <h3>${j.nome}</h3>
          ${j.foto ? `<img src="${j.foto}" alt="Foto da jogadora" style="max-width:150px;">` : ""}
          <p><b>Posição:</b> ${j.posicao}</p>
          <p><b>Clube:</b> ${j.clube}</p>
          <p><b>Gols:</b> ${j.gols} | <b>Assistências:</b> ${j.assistencias} | <b>Jogos:</b> ${j.jogos}</p>
          <button data-action="edit" data-index="${index}">Editar</button>
          <button data-action="delete" data-index="${index}">Excluir</button>
          <hr>`;
        lista.append(leia);
    });
}

// UPDATE
function editJogadora(index) {
    const novoNome = prompt("Editar nome:", jogadoras[index].nome);
    if (novoNome !== null) {
        jogadoras[index].nome = novoNome;
        saveJogadoras();
        displayJogadoras();
        alert("Jogadora editada com sucesso!");
    }
}

// DELETE
function deleteJogadora(index) {
    const confirmar = confirm("Tem certeza que deseja excluir?");
    if (confirmar) {
        jogadoras.splice(index, 1);
        saveJogadoras();
        displayJogadoras();
        alert("Jogadora removida com sucesso!");
    }
}
