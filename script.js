const municipios = {
  MG: ["Aimorés", "Alpercata", "Barra Longa", "Belo Oriente", "Bom Jesus do Galho", "Bugre", "Caratinga", "Conselheiro Pena", "Coronel Fabriciano", "Córrego Novo", "Dionísio", "Fernandes Tourinho", "Galiléia", "Governador Valadares", "Iapu", "Ipaba", "Ipatinga", "Itueta", "Mariana", "Marliéria", "Naque", "Ouro Preto", "Periquito", "Pingo D’água", "Ponte Nova", "Raul Soares", "Resplendor", "Rio Casca", "Rio Doce", "Santa Cruz do Escalvado", "Santana do Paraíso", "São Domingos do Prata", "São José do Goiabal", "São Pedro dos Ferros", "Sem Peixe", "Sobrália", "Timóteo", "Tumiritinga"],
  ES: ["Anchieta", "Aracruz", "Baixo Guandu", "Colatina", "Conceição da Barra", "Fundão", "Linhares", "Marilândia", "São Mateus", "Serra", "Sooretama"],
  DF: ["Brasília"]
};

window.actionCount = 0;

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
  if (el) {
    el.style.display = el.style.display === "block" ? "none" : "block";
  }
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

  // Botão Salvar
  const salvarBtn = document.createElement('button');
  salvarBtn.innerText = 'Salvar ação';
  salvarBtn.className = 'add-action';
  salvarBtn.onclick = () => {
    if (body) body.style.display = "none";
    const heading = eixo.previousElementSibling;
    const offset = heading.getBoundingClientRect().top + window.scrollY - 20;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  };
  body.appendChild(salvarBtn);

  // Botão Excluir
  const excluirBtn = document.createElement('button');
  excluirBtn.innerText = 'Excluir ação';
  excluirBtn.className = 'remove-action';
  excluirBtn.onclick = () => {
    newAction.remove();
    const heading = eixo.previousElementSibling;
    const offset = heading.getBoundingClientRect().top + window.scrollY - 20;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  };
  body.appendChild(excluirBtn);

  toggleAccordion(newId);

  setTimeout(() => {
    const heading = eixo.previousElementSibling;
    const offset = heading.getBoundingClientRect().top + window.scrollY - 20;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  }, 100);
}

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'pt', 'a4');
  let y = 60;

  const addText = (text, { bold = false, size = 12, spacingBefore = 0, spacingAfter = 16 } = {}) => {
    y += spacingBefore;
    doc.setFont('Helvetica', bold ? 'bold' : 'normal');
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, 480);
    lines.forEach(line => {
      doc.text(line, 60, y);
      y += spacingAfter;
      if (y > 770) {
        doc.addPage();
        y = 60;
      }
    });
  };

  const addDivider = () => {
    y += 12;
    doc.setDrawColor(180);
    doc.line(60, y, 540, y);
    y += 12;
  };

  addText("Plano de Ação - Programa Especial de Saúde do Rio Doce", {
    bold: true,
    size: 14,
    spacingAfter: 30
  });

  addDivider();
  addText("Informações Iniciais", {
    bold: true,
    size: 14,
    spacingBefore: 10,
    spacingAfter: 20
  });

  addText("Responsável: " + (document.querySelector('#responsavel')?.value || ''));
  addText("Cargo: " + (document.querySelector('#cargo')?.value || ''));
  addText("UF: " + (document.querySelector('#uf')?.value || ''));
  addText("Município: " + (document.querySelector('#municipio-select')?.value || ''));

  addDivider();
  addText("Diagnóstico Situacional", {
    bold: true,
    size: 14,
    spacingBefore: 10,
    spacingAfter: 12
  });

  addText("Perfil socioeconômico:", { bold: true, spacingBefore: 10 });
  addText(document.querySelector('#perfil-socio')?.value || '', { spacingAfter: 18 });

  addText("Perfil epidemiológico:", { bold: true, spacingBefore: 10 });
  addText(document.querySelector('#perfil-epidemiologico')?.value || '', { spacingAfter: 18 });

  addText("Estrutura da rede:", { bold: true, spacingBefore: 10 });
  addText(document.querySelector('#estrutura-rede')?.value || '', { spacingAfter: 18 });

  doc.addPage();
  y = 60;

  document.querySelectorAll('.section').forEach(section => {
    const title = section.querySelector('h2')?.textContent;
    const actions = section.querySelectorAll('.accordion-item');
    if (actions.length > 0) {
      addDivider();
      addText(title, {
        bold: true,
        size: 14,
        spacingBefore: 20,
        spacingAfter: 12
      });

      actions.forEach(item => {
        const header = item.querySelector('.accordion-header')?.textContent || 'Ação';
        addText("• " + header, { bold: true, spacingBefore: 18, spacingAfter: 10 });

        item.querySelectorAll('label').forEach(label => {
          const field = label.nextElementSibling;
          const labelText = label.textContent?.replace(/:$/, '') || '';
          const value = field?.value || field?.textContent || 'Não preenchido';

          addText(labelText, { bold: true, spacingBefore: 14, spacingAfter: 6 });
          addText(value, { spacingBefore: 0, spacingAfter: 18 });

        });

        y += 10; // leve espaço após cada ação
      });
    }
  });

  addDivider();
  addText("Emitido em: " + new Date().toLocaleDateString(), { size: 10, spacingBefore: 20 });
  doc.output('dataurlnewwindow');
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
