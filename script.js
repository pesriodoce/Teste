const municipiosPorUF = {
  DF: ["Brasília"],
  ES: ["Vitória", "Vila Velha", "Serra"],
  MG: ["Belo Horizonte", "Governador Valadares", "Ipatinga"]
};

function updateMunicipios(uf) {
  const select = document.getElementById("municipio-select");
  select.innerHTML = "";
  if (municipiosPorUF[uf]) {
    municipiosPorUF[uf].forEach(m => {
      const option = document.createElement("option");
      option.value = option.textContent = m;
      select.appendChild(option);
    });
  } else {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Selecione a UF primeiro";
    select.appendChild(option);
  }
}

function collapseAllAccordions() {
  document.querySelectorAll('.accordion-content').forEach(content => {
    content.style.display = 'none';
  });
}

function collapseAllAndAdd(eixoId) {
  collapseAllAccordions();
  addAcao(eixoId);
}

function toggleAccordion(id) {
  const accordion = document.getElementById(id);
  accordion.style.display = accordion.style.display === 'none' ? 'block' : 'none';
}

function addAcao(eixoId) {
  const accordion = document.getElementById(eixoId);

  const acaoIndex = accordion.children.length + 1;
  const item = document.createElement('div');
  item.className = 'accordion-item';

  const header = document.createElement('div');
  header.className = 'accordion-header';
  header.textContent = `Ação ${acaoIndex}`;
  header.onclick = () => {
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
  };

  const content = document.createElement('div');
  content.className = 'accordion-content';
  content.style.display = 'block';
  content.innerHTML = `
    <label>Nome da ação:</label>
    <input type="text" class="nome-acao" oninput="this.closest('.accordion-item').querySelector('.accordion-header').textContent = this.value || 'Ação ${acaoIndex}'">
    <label>Descrição:</label>
    <textarea></textarea>
    <label>Data de Início:</label>
    <input type="date">
    <label>Data de Término:</label>
    <input type="date">
    <label>Orçamento previsto:</label>
    <input type="text" class="masked-currency" oninput="formatCurrency(this)">
    <div class="pdf-separator"></div>
  `;

  item.appendChild(header);
  item.appendChild(content);
  accordion.appendChild(item);
}

function formatCurrency(input) {
  let value = input.value.replace(/\D/g, "");
  value = (parseInt(value, 10) / 100).toFixed(2);
  input.value = `R$ ${value.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

function generatePDF() {
  const originalTitle = document.title;
  document.title = 'Plano_de_Acao';

  window.print();

  document.title = originalTitle;
}
