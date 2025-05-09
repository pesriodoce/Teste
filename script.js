const municipios = {
  MG: [...], // mesmos dados anteriores
  ES: [...],
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

function collapseAllBodies(exceptId = null) {
  document.querySelectorAll('.accordion-body').forEach(body => {
    if (body.id !== exceptId) {
      body.style.display = 'none';
    }
  });
}

function toggleAccordion(id) {
  const body = document.getElementById(id);
  if (body.style.display === 'block') {
    body.style.display = 'none';
  } else {
    collapseAllBodies(id);
    body.style.display = 'block';
  }
}

let actionCount = 0;

function addAction(eixoId) {
  collapseAllBodies();

  actionCount++;
  const eixo = document.getElementById(eixoId);
  const newId = `acao_${eixoId}_${actionCount}`;
  const item = document.createElement('div');
  item.classList.add('accordion-item');

  item.innerHTML = `
    <div class="accordion-header" onclick="toggleAccordion('${newId}')">Nova Ação</div>
    <div class="accordion-body" id="${newId}" style="display: block;">
      <label>Nome da ação:</label>
      <input type="text" oninput="updateAccordionTitle(this, '${newId}')">

      <label>Identificação do Problema:</label>
      <textarea></textarea>

      <label>Descrição da ação:</label>
      <textarea></textarea>

      <label>Objetivos:</label>
      <textarea></textarea>

      <label>Itens previstos:</label>
      <input type="text">

      <label>Tipo da Ação:</label>
      <select><option>Investimento</option><option>Custeio</option></select>

      <label>Orçamento previsto:</label>
      <input type="text" class="masked-currency" oninput="formatCurrency(this)">

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

      <button class="save-action" onclick="document.getElementById('${newId}').style.display='none'">Salvar ação</button>
      <button class="remove-action" onclick="this.closest('.accordion-item').remove()">Remover ação</button>
    </div>
  `;

  eixo.appendChild(item);

  setTimeout(() => {
    eixo.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function updateAccordionTitle(input, bodyId) {
  const header = document.getElementById(bodyId).previousElementSibling;
  header.textContent = input.value || 'Nova Ação';
}

function formatCurrency(input) {
  let value = input.value.replace(/\D/g, '');
  value = value.replace(/(\d)(\d{2})$/, '$1,$2');
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
  input.value = value ? `R$ ${value}` : '';
}

function generatePDF() {
  const sections = document.querySelectorAll('.section');
  let content = `
    <h1>Plano de Ação - Programa Especial de Saúde do Rio Doce</h1>
    <style>
      body { font-family: Inter, sans-serif; padding: 40px; }
      h2 { color: #1a5276; margin-top: 30px; }
      h3 { color: #21618c; margin-top: 20px; }
      ul { margin-bottom: 30px; padding-left: 0; list-style: none; }
      li { margin-bottom: 8px; }
      hr { margin: 24px 0; border-top: 1px dashed #aaa; }
      footer { font-size: 12px; text-align: center; margin-top: 50px; color: #888; }
    </style>
  `;

  sections.forEach(section => {
    const title = section.querySelector('h2')?.textContent;
    if (title) content += `<h2>${title}</h2>`;

    const actions = section.querySelectorAll('.accordion-item');
    actions.forEach(action => {
      const header = action.querySelector('.accordion-header')?.textContent || 'Ação';
      content += `<h3>${header}</h3><ul>`;

      const fields = action.querySelectorAll('input, select, textarea');
      fields.forEach(field => {
        const label = field.previousElementSibling?.textContent || 'Campo';
        const value = field.value || 'Não preenchido';
        content += `<li><strong>${label}</strong>: ${value}</li>`;
      });

      content += '</ul><hr>';
    });
  });

  const data = new Date().toLocaleDateString('pt-BR');
  content += `<footer><strong>Programa Especial de Saúde do Rio Doce</strong><br>Emitido em: ${data}</footer>`;

  const pdfWindow = window.open('', '_blank');
  pdfWindow.document.write(`<html><head><title>PDF</title></head><body>${content}</body></html>`);
  pdfWindow.document.close();
  pdfWindow.print();
}

// Inserção dinâmica dos 6 eixos
window.onload = () => {
  const eixos = [
    "Eixo 1 – Fortalecimento e ampliação dos serviços de Atenção à Saúde",
    "Eixo 2 - Fortalecimento e ampliação das ações e serviços de Vigilância em Saúde",
    "Eixo 3 – Fortalecimento, ampliação e melhorias da infraestrutura de saúde",
    "Eixo 4 - Melhoria das práticas de gestão em saúde",
    "Eixo 5 - Ações de inteligência e ciências de dados e serviços de saúde digital",
    "Eixo 6 - Formação e educação permanente"
  ];
  const container = document.getElementById("eixos-container");
  eixos.forEach((eixo, i) => {
    const id = `eixo${i + 1}`;
    container.innerHTML += `
      <div class="section">
        <h2 onclick="toggleAccordion('${id}')">${eixo}</h2>
        <div class="accordion" id="${id}"></div>
        <button class="add-action" onclick="addAction('${id}')">Adicionar nova ação</button>
      </div>
    `;
  });
};
