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
      </div>
    `;
  
    eixo.appendChild(item);
  
    // Rolagem suave até a nova ação
    setTimeout(() => {
      document.getElementById(newId).scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    let content = '<h1>Plano de Ação - Programa Especial de Saúde do Rio Doce</h1>';
  
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
  
    const pdfWindow = window.open('', '_blank');
    pdfWindow.document.write(`<html><head><title>PDF</title></head><body>${content}</body></html>`);
    pdfWindow.document.close();
    pdfWindow.print();
  }
  