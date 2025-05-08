// Função para atualizar os municípios com base na UF selecionada
function updateMunicipios(uf) {
  const municipioSelect = document.getElementById('municipio-select');
  municipioSelect.innerHTML = ''; // Limpar as opções atuais

  const municipios = {
    'DF': ['Brasília'],
    'ES': ['Vitória', 'Vila Velha', 'Serra'],
    'MG': ['Belo Horizonte', 'Uberlândia', 'Juiz de Fora']
  };

  if (uf && municipios[uf]) {
    municipios[uf].forEach(municipio => {
      const option = document.createElement('option');
      option.value = municipio;
      option.textContent = municipio;
      municipioSelect.appendChild(option);
    });
  } else {
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'Selecione a UF primeiro';
    municipioSelect.appendChild(option);
  }
}

// Função para expandir ou recolher os eixos (accordion)
function toggleAccordion(eixoId) {
  const eixo = document.getElementById(eixoId);
  const isExpanded = eixo.style.display === 'block';
  eixo.style.display = isExpanded ? 'none' : 'block';
}

// Função para adicionar uma nova ação em cada eixo
function addAction(eixoId) {
  const eixo = document.getElementById(eixoId);

  // Criar um novo item de ação
  const newAction = document.createElement('div');
  newAction.classList.add('action');

  // Adicionar campos para a ação
  newAction.innerHTML = `
    <label for="descricao">Descrição da Ação:</label>
    <input type="text" name="descricao" placeholder="Descrição da ação">
    <label for="responsavel">Responsável:</label>
    <input type="text" name="responsavel" placeholder="Responsável pela ação">
    <label for="prazo">Prazo:</label>
    <input type="date" name="prazo">
  `;

  // Adicionar a nova ação ao eixo
  eixo.appendChild(newAction);
}

// Função para gerar o PDF do plano de ação
function generatePDF() {
  const doc = new jsPDF();

  // Adicionar título
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(20, 20, 'Plano de Ação do Programa Especial de Saúde do Rio Doce');

  // Captura as informações do formulário
  const nome = document.querySelector('input[name="nome"]').value;
  const cargo = document.querySelector('input[name="cargo"]').value;
  const uf = document.querySelector('select[name="uf"]').value;
  const municipio = document.querySelector('select[name="municipio"]').value;

  // Adicionar as informações iniciais ao PDF
  doc.setFontSize(12);
  doc.text(20, 30, `Nome: ${nome}`);
  doc.text(20, 40, `Cargo: ${cargo}`);
  doc.text(20, 50, `Unidade da Federação: ${uf}`);
  doc.text(20, 60, `Município: ${municipio}`);

  // Adicionar os eixos e as ações
  const eixos = ['eixo1', 'eixo2', 'eixo3', 'eixo4', 'eixo5', 'eixo6'];
  let yPosition = 70;

  eixos.forEach(eixoId => {
    const eixo = document.getElementById(eixoId);
    const eixoTitle = document.querySelector(`h2[onclick="toggleAccordion('${eixoId}')"]`).textContent;

    doc.setFont('Helvetica', 'bold');
    doc.text(20, yPosition, eixoTitle);
    yPosition += 10;

    const actions = eixo.getElementsByClassName('action');
    Array.from(actions).forEach(action => {
      const descricao = action.querySelector('input[name="descricao"]').value;
      const responsavel = action.querySelector('input[name="responsavel"]').value;
      const prazo = action.querySelector('input[name="prazo"]').value;

      doc.setFont('Helvetica', 'normal');
      doc.text(20, yPosition, `Descrição: ${descricao}`);
      doc.text(20, yPosition + 10, `Responsável: ${responsavel}`);
      doc.text(20, yPosition + 20, `Prazo: ${prazo}`);
      yPosition += 30;
    });

    yPosition += 20; // Espaço entre os eixos
  });

  // Salvar o PDF
  doc.save('plano_de_acao.pdf');
}
