document.addEventListener("DOMContentLoaded", () => {
  const eixos = [
    "Fortalecimento e ampliação dos serviços de Atenção à Saúde",
    "Fortalecimento e ampliação das ações e serviços de Vigilância em Saúde",
    "Fortalecimento, ampliação e melhorias da infraestrutura de saúde",
    "Melhoria das práticas de gestão em saúde",
    "Ações de inteligência e ciências de dados e serviços de saúde digital",
    "Formação e educação permanente"
  ];

  const container = document.getElementById("eixos-container");

  eixos.forEach((titulo, i) => {
    const eixoId = `eixo${i + 1}`;
    const section = document.createElement("div");
    section.className = "section";
    section.innerHTML = `
      <h2 onclick="toggleAccordion('${eixoId}')">Eixo ${i + 1} - ${titulo}</h2>
      <div class="accordion" id="${eixoId}"></div>
      <button class="add-action" onclick="addAction('${eixoId}')">
        <i class="fas fa-plus-circle"></i> Adicionar nova ação
      </button>
    `;
    container.appendChild(section);
  });
});

function addAction(eixoId) {
  const eixoDiv = document.getElementById(eixoId);
  const actionDiv = document.createElement("div");
  actionDiv.classList.add("action");

  actionDiv.innerHTML = `
    <label>Descrição da ação</label>
    <input type="text" placeholder="Descreva a ação">
    <label>Meta</label>
    <input type="text" placeholder="Informe a meta">
    <label>Indicadores</label>
    <input type="text" placeholder="Informe os indicadores">
    <label>Responsável</label>
    <input type="text" placeholder="Nome do responsável">
    <label>Cronograma</label>
    <input type="text" placeholder="Ex: Jan 2025 - Dez 2025">
    <label>Orçamento estimado</label>
    <input type="text" placeholder="R$ 0,00">
    <button onclick="this.parentElement.remove()">Remover</button>
  `;

  eixoDiv.appendChild(actionDiv);
  actionDiv.scrollIntoView({ behavior: "smooth", block: "start" });
}

function toggleAccordion(eixoId) {
  const eixoDiv = document.getElementById(eixoId);
  eixoDiv.style.display = eixoDiv.style.display === 'block' ? 'none' : 'block';
}

function updateMunicipios(uf) {
  const municipioSelect = document.getElementById("municipio-select");
  municipioSelect.innerHTML = '<option value="">Selecione a UF primeiro</option>';

  const municipios = {
    'DF': ['Brasília'],
    'ES': ['Vitória', 'Vila Velha', 'Serra'],
    'MG': ['Belo Horizonte', 'Uberlândia', 'Juiz de Fora']
  };

  if (municipios[uf]) {
    municipios[uf].forEach(m => {
      const opt = document.createElement('option');
      opt.value = m;
      opt.textContent = m;
      municipioSelect.appendChild(opt);
    });
  }
}
