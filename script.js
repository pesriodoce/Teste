const municipios = {
  MG: ["Aimorés", "Alpercata", "Barra Longa", "Belo Oriente", "Bom Jesus do Galho", "Bugre", "Caratinga", "Conselheiro Pena", "Coronel Fabriciano", "Córrego Novo", "Dionísio", "Fernandes Tourinho", "Galiléia", "Governador Valadares", "Iapu", "Ipaba", "Ipatinga", "Itueta", "Mariana", "Marliéria", "Naque", "Ouro Preto", "Periquito", "Pingo D’água", "Ponte Nova", "Raul Soares", "Resplendor", "Rio Casca", "Rio Doce", "Santa Cruz do Escalvado", "Santana do Paraíso", "São Domingos do Prata", "São José do Goiabal", "São Pedro dos Ferros", "Sem Peixe", "Sobrália", "Timóteo", "Tumiritinga"],
  ES: ["Anchieta", "Aracruz", "Baixo Guandu", "Colatina", "Conceição da Barra", "Fundão", "Linhares", "Marilândia", "São Mateus", "Serra", "Sooretama"],
  DF: ["Brasília"]
};

function updateMunicipios(uf) {
  const select = document.getElementById("municipio-select");
  select.innerHTML = "";
  (municipios[uf] || []).forEach(m => {
    const option = document.createElement("option");
    option.value = m;
    option.textContent = m;
    select.appendChild(option);
  });
}

function toggleAccordion(id) {
  document.querySelectorAll(".accordion-body").forEach(el => {
    if (el.id !== id) el.style.display = "none";
  });
  const el = document.getElementById(id);
  el.style.display = el.style.display === "block" ? "none" : "block";
}

function removeAction(button) {
  const item = button.closest('.accordion-item');
  item.remove();
}

function addAction(eixoId) {
  const eixo = document.getElementById(eixoId);
  const actionId = `acao-${Date.now()}`;
  const wrapper = document.createElement("div");
  wrapper.className = "accordion-item";
  wrapper.innerHTML = `
    <div class="accordion-header" onclick="toggleAccordion('${actionId}')" id="header-${actionId}">Nova Ação</div>
    <div class="accordion-body" id="${actionId}">
      <label>Nome da ação:</label>
      <input type="text" oninput="document.getElementById('header-${actionId}').textContent = this.value || 'Nova Ação'">
      <label>Identificação do Problema:</label><textarea></textarea>
      <label>Descrição da ação:</label><textarea></textarea>
      <label>Objetivos:</label><textarea></textarea>
      <label>Itens previstos:</label><input type="text">
      <label>Tipo da Ação:</label><select><option>Investimento</option><option>Custeio</option></select>
      <label>Orçamento previsto:</label><input type="text" class="masked-currency">
      <label>Data de início:</label><input type="date">
      <label>Data de conclusão:</label><input type="date">
      <label>Indicador:</label><input type="text">
      <label>Meta:</label><input type="text">
      <label>Observações:</label><textarea></textarea>
      <button class="remove-action" onclick="removeAction(this)">Remover ação</button>
    </div>`;
  eixo.appendChild(wrapper);
  toggleAccordion(actionId);
  setTimeout(() => eixo.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
}

function generatePDF() {
  const date = new Date().toLocaleDateString();
  let content = `<h1>Plano de Ação - Programa Especial de Saúde do Rio Doce</h1>`;

  document.querySelectorAll('.section').forEach(section => {
    const title = section.querySelector('h2')?.textContent;
    content += `<h2>${title}</h2>`;
    const actions = section.querySelectorAll('.accordion-item');
    actions.forEach(item => {
      const header = item.querySelector('.accordion-header')?.textContent || 'Ação';
      content += `<div style="border:1px solid #ccc;padding:10px;margin-bottom:16px;">
        <h3>${header}</h3><ul>`;
      item.querySelectorAll('label').forEach(label => {
        const field = label.nextElementSibling;
        const value = field?.value || field?.textContent || 'Não preenchido';
        content += `<li><strong>${label.textContent}</strong>: ${value}</li>`;
      });
      content += `</ul></div>`;
    });
  });

  content += `<footer>Programa Especial de Saúde do Rio Doce<br>Emitido em ${date}</footer>`;
  const win = window.open();
  win.document.write(`<html><head><title>PDF</title></head><body>${content}</body></html>`);
  win.document.close();
  win.print();
}

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
  const n = i + 1;
  container.innerHTML += `
    <div class="section">
      <h2 onclick="toggleAccordion('eixo${n}')">Eixo ${n} - ${titulo}</h2>
      <div class="accordion" id="eixo${n}"></div>
      <button class="add-action" onclick="addAction('eixo${n}')">Adicionar nova ação</button>
    </div>`;
});
