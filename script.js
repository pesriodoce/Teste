const municipios = {
  MG: ["Aimorés", "Alpercata", "Barra Longa", "Belo Oriente", "Bom Jesus do Galho", "Bugre", "Caratinga", "Conselheiro Pena", "Coronel Fabriciano", "Córrego Novo", "Dionísio", "Fernandes Tourinho", "Galiléia", "Governador Valadares", "Iapu", "Ipaba", "Ipatinga", "Itueta", "Mariana", "Marliéria", "Naque", "Ouro Preto", "Periquito", "Pingo D’água", "Ponte Nova", "Raul Soares", "Resplendor", "Rio Casca", "Rio Doce", "Santa Cruz do Escalvado", "Santana do Paraíso", "São Domingos do Prata", "São José do Goiabal", "São Pedro dos Ferros", "Sem Peixe", "Sobrália", "Timóteo", "Tumiritinga"],
  ES: ["Anchieta", "Aracruz", "Baixo Guandu", "Colatina", "Conceição da Barra", "Fundão", "Linhares", "Marilândia", "São Mateus", "Serra", "Sooretama"],
  DF: ["Brasília"]
};

// ✅ Garante que actionCount não cause erro de redefinição
window.actionCount = window.actionCount || 0;

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
  document.querySelectorAll('.accordion-body').forEach(body => {
    body.style.display = 'none';
  });

  window.actionCount++;
  const eixo = document.getElementById(eixoId);
  const newId = `acao${eixoId}_${window.actionCount}`;
  const newAction = document.createElement('div');
  newAction.classList.add('accordion-item');

  newAction.innerHTML = `
    <div class="accordion-header" onclick="toggleAccordion('${newId}')">Nova Ação</div>
    <div class="accordion-body" id="${newId}">
      <label>Identificação do Problema:</label>
      <textarea></textarea>

      <label>Nome da ação:</label>
      <input type="text" class="nome-acao">

      <label>Descrição da ação:</label>
      <textarea></textarea>

      <label>Objetivos:</label>
      <textarea></textarea>

      <label>Itens previstos:</label>
      <input type="text">

      <label>Tipo da Ação:</label>
      <select>
        <option>Investimento</option>
        <option>Custeio</option>
      </select>

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

  const nomeInput = newAction.querySelector('.nome-acao');
  const header = newAction.querySelector('.accordion-header');
  nomeInput.addEventListener('input', () => {
    header.innerText = nomeInput.value || 'Nova Ação';
  });

  const inputBudget = document.getElementById(`budget-${newId}`);
  inputBudget.addEventListener('input', function () {
    let value = inputBudget.value.replace(/\D/g, '');
    value = (parseInt(value, 10) / 100).toFixed(2).toString();
    value = value.replace('.', ',');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    inputBudget.value = value ? 'R$ ' + value : '';
  });

  const body = newAction.querySelector('.accordion-body');
  const salvarBtn = document.createElement('button');
  salvarBtn.innerText = 'Salvar ação';
  salvarBtn.className = 'add-action';
  salvarBtn.onclick = () => {
    body.style.display = 'none';
  };
  body.appendChild(salvarBtn);

  toggleAccordion(newId);

  setTimeout(() => {
    const offset = eixo.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  }, 100);
}

function generatePDF() {
  const date = new Date().toLocaleDateString();
  let content = `
    <style>
      body { font-family: 'Inter', sans-serif; color: #2e2e2e; padding: 20px; }
      h1 { color: #4a6885; text-align: center; font-size: 24px; margin-bottom: 30px; }
      h2 { color: #2c3e50; border-bottom: 1px solid #ccc; padding-bottom: 6px; margin-top: 30px; }
      h3 { margin-top: 20px; color: #4a6885; }
      ul { padding-left: 18px; }
      li { margin-bottom: 8px; line-height: 1.5; }
      footer { font-size: 12px; text-align: center; margin-top: 40px; border-top: 1px solid #ccc; padding-top: 10px; color: #777; }
      .block { margin-bottom: 20px; padding: 12px; border: 1px solid #ccc; border-radius: 6px; background: #f9f9f9; }
    </style>
    <h1>Plano de Ação - Programa Especial de Saúde do Rio Doce</h1>`;

  const nome = document.querySelector('#responsavel')?.value || '';
  const cargo = document.querySelector('#cargo')?.value || '';
  const uf = document.querySelector('#uf')?.value || '';
  const municipio = document.querySelector('#municipio-select')?.value || '';
  content += `
    <h2>Informações Iniciais</h2>
    <ul>
      <li><strong>Responsável:</strong> ${nome}</li>
      <li><strong>Cargo:</strong> ${cargo}</li>
      <li><strong>UF:</strong> ${uf}</li>
      <li><strong>Município:</strong> ${municipio}</li>
    </ul>`;

  const socio = document.querySelector('#perfil-socio')?.value || '';
  const epid = document.querySelector('#perfil-epidemiologico')?.value || '';
  const estrutura = document.querySelector('#estrutura-rede')?.value || '';
  content += `
    <h2>Diagnóstico Situacional de Saúde</h2>
    <div class="block">
      <p><strong>Perfil socioeconômico:</strong> ${socio}</p>
      <p><strong>Perfil epidemiológico:</strong> ${epid}</p>
      <p><strong>Estrutura da rede de saúde:</strong> ${estrutura}</p>
    </div>`;

  document.querySelectorAll('.section').forEach(section => {
    const title = section.querySelector('h2')?.textContent;
    const actions = section.querySelectorAll('.accordion-item');
    if (actions.length > 0) {
      content += `<h2>${title}</h2>`;
      actions.forEach(item => {
        const header = item.querySelector('.accordion-header')?.textContent || 'Ação';
        content += `<div class="block"><h3>${header}</h3><ul>`;
        item.querySelectorAll('label').forEach(label => {
          const field = label.nextElementSibling;
          const value = field?.value || field?.textContent || 'Não preenchido';
          content += `<li><strong>${label.textContent}</strong>: ${value}</li>`;
        });
        content += `</ul></div>`;
      });
    }
  });

  content += `<footer>Emitido em ${date} — Programa Especial de Saúde do Rio Doce</footer>`;
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
