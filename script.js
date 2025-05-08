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

let actionCount = 0;

function addAction(eixoId) {
  // Fecha todas as outras ações ao adicionar uma nova
document.querySelectorAll('.accordion-body').forEach(body => {
  body.style.display = 'none';
});
  actionCount++;
  const eixo = document.getElementById(eixoId);
  const newId = `acao${eixoId}_${actionCount}`;
  const newAction = document.createElement('div');
  newAction.classList.add('accordion-item');
  newAction.innerHTML = `
    <div class="accordion-header" onclick="toggleAccordion('${newId}')">Nova Ação</div>
    <div class="accordion-body" id="${newId}">
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
      <input type="text" class="masked-currency" id="budget-${newId}">
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
  const inputBudget = document.getElementById(`budget-${newId}`);
  inputBudget.addEventListener('input', function () {
    let value = inputBudget.value.replace(/\D/g, '');
    value = value.replace(/(\d)(\d{2})$/, '$1,$2');
    inputBudget.value = value ? 'R$ ' + value : '';
  });
  toggleAccordion(newId);
}

function generatePDF() {
  const sections = document.querySelectorAll('.section');
  let content = '<h1>Plano de Ação - Programa Especial de Saúde do Rio Doce</h1>';
  sections.forEach(section => {
    const title = section.querySelector('h2').textContent;
    const inputs = section.querySelectorAll('input, select, textarea');
    content += `<h2>${title}</h2><ul>`;
    inputs.forEach(input => {
      content += `<li><strong>${input.previousElementSibling ? input.previousElementSibling.textContent : input.tagName}</strong>: ${input.value || 'Não preenchido'}</li>`;
    });
    content += '</ul>';
  });
  const pdfWindow = window.open();
  pdfWindow.document.write(content);
  pdfWindow.document.close();
  pdfWindow.print();
}
