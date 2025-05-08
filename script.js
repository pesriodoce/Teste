// Atualiza o select de municípios de acordo com a UF escolhida
function updateMunicipios(uf) {
  const municipioSelect = document.getElementById('municipio-select');
  municipioSelect.innerHTML = "<option value=''>Selecione a UF primeiro</option>";

  if (uf === 'DF') {
    municipioSelect.innerHTML += `
      <option value="Brasília">Brasília</option>
    `;
  } else if (uf === 'ES') {
    municipioSelect.innerHTML += `
      <option value="Vitória">Vitória</option>
      <option value="Vila Velha">Vila Velha</option>
    `;
  } else if (uf === 'MG') {
    municipioSelect.innerHTML += `
      <option value="Belo Horizonte">Belo Horizonte</option>
      <option value="Montes Claros">Montes Claros</option>
    `;
  }
}

// Função para alternar a visibilidade das ações nos eixos
function toggleAccordion(eixoId) {
  const accordion = document.getElementById(eixoId);
  accordion.classList.toggle('active');
}

// Função para adicionar novas ações em cada eixo
function addAction(eixoId) {
  const eixoDiv = document.getElementById(eixoId);
  const newAction = document.createElement('div');
  newAction.classList.add('action');

  newAction.innerHTML = `
    <label for="acao">Descrição da Ação:</label>
    <input type="text" name="acao">
    <label for="responsavel">Responsável:</label>
    <input type="text" name="responsavel">
    <label for="prazo">Prazo de Execução:</label>
    <input type="date" name="prazo">
    <button class="remove-action" onclick="removeAction(this)">Remover Ação</button>
  `;
  
  eixoDiv.appendChild(newAction);
}

// Função para remover uma ação
function removeAction(button) {
  const actionDiv = button.parentElement;
  actionDiv.remove();
}

// Função para gerar o PDF com os dados do formulário
function generatePDF() {
  const doc = new jsPDF();
  
  // Captura as informações iniciais
  const nome = document.querySelector('[name="nome"]').value;
  const cargo = document.querySelector('[name="cargo"]').value;
  const uf = document.querySelector('[name="uf"]').value;
  const municipio = document.querySelector('[name="municipio"]').value;

  // Adiciona o título e as informações iniciais no PDF
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`Plano de Ação do Programa Especial de Saúde do Rio Doce`, 20, 20);
  doc.text(`Nome: ${nome}`, 20, 30);
  doc.text(`Cargo: ${cargo}`, 20, 40);
  doc.text(`Unidade da Federação: ${uf}`, 20, 50);
  doc.text(`Município: ${municipio}`, 20, 60);

  // Função para adicionar os eixos e suas ações no PDF
  const eixos = ['eixo1', 'eixo2', 'eixo3', 'eixo4', 'eixo5', 'eixo6'];
  let yPosition = 70;

  eixos.forEach(eixoId => {
    const eixoTitulo = document.querySelector(`#${eixoId}`).previousElementSibling.innerText;
    doc.text(eixoTitulo, 20, yPosition);
    yPosition += 10;

    const actions = document.querySelectorAll(`#${eixoId} .action`);
    actions.forEach(action => {
      const descricao = action.querySelector('[name="acao"]').value;
      const responsavel = action.querySelector('[name="responsavel"]').value;
      const prazo = action.querySelector('[name="prazo"]').value;
      
      doc.text(`Descrição: ${descricao}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Responsável: ${responsavel}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Prazo: ${prazo}`, 20, yPosition);
      yPosition += 10;
    });
    
    yPosition += 10; // Espaço entre os eixos
  });

  // Gera o PDF
  doc.save("plano_de_acao.pdf");
}
