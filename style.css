const municipios = {
  MG: ["Aimorés", "Alpercata", "Barra Longa", "Belo Oriente", "Bom Jesus do Galho", "Bugre", "Caratinga", "Conselheiro Pena", "Coronel Fabriciano", "Córrego Novo", "Dionísio", "Fernandes Tourinho", "Galiléia", "Governador Valadares", "Iapu", "Ipaba", "Ipatinga", "Itueta", "Mariana", "Marliéria", "Naque", "Ouro Preto", "Periquito", "Pingo D’água", "Ponte Nova", "Raul Soares", "Resplendor", "Rio Casca", "Rio Doce", "Santa Cruz do Escalvado", "Santana do Paraíso", "São Domingos do Prata", "São José do Goiabal", "São Pedro dos Ferros", "Sem Peixe", "Sobrália", "Timóteo", "Tumiritinga"],
  ES: ["Anchieta", "Aracruz", "Baixo Guandu", "Colatina", "Conceição da Barra", "Fundão", "Linhares", "Marilândia", "São Mateus", "Serra", "Sooretama"],
  DF: ["Brasília"]
};

function updateMunicipios(uf) {
  const select = document.getElementById("municipio-select");
  select.innerHTML = "";
  if (municipios[uf]) {
    municipios[uf].forEach(m => {
      const option = document.createElement("option");
      option.value = m;
      option.textContent = m;
      select.appendChild(option);
    });
  } else {
    const option = document.createElement("option");
    option.textContent = "Selecione a UF primeiro";
    select.appendChild(option);
  }
}

function toggleAccordion(id) {
  const body = document.getElementById(id);
  body.style.display = body.style.display === 'block' ? 'none' : 'block';
}

function addAction(eixoId) {
  const eixo = document.getElementById(eixoId);
  const newAction = document.createElement('div');
  newAction.classList.add('accordion-item');
  newAction.innerHTML = `
    <div class="accordion-header" onclick="toggleAccordion('acao${eixoId}novo')">Nova Ação</div>
    <div class="accordion-body" id="acao${eixoId}novo">
      <label>Identificação do Problema:</label>
      <textarea></textarea>
      <label>Nome da ação:</label>
      <input type="text">
      <label>Descrição da ação:</label>
      <textarea></textarea>
      <label>Objetivos:</label>
      <textarea></textarea>
      <label>Itens previstos:</label>
      <input type="text">
      <label>Tipo da Ação:</label>
      <select><option>Investimento</option><option>Custeio</option></select>
      <label>Orçamento previsto:</label>
      <input type="number">
      <label>Data de início:</label>
      <input type="date">
      <label>Data de conclusão:</label>
      <input type="date">
      <label>Indicador:</label>
      <input type="text">
      <label>Meta:</label>
      <input type="text">
      <label>Observações:</label>
      <textarea></textarea>
    </div>
  `;
  eixo.appendChild(newAction);
}
