// Função para gerar o PDF
function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Título com tamanho ajustado
  doc.setFontSize(14); // Reduzindo o tamanho da fonte para 18
  doc.text('Plano de Ação do Programa Especial de Saúde do Rio Doce', 10, 10);

  // Informações do formulário
  const nome = document.querySelector('input[name="nome"]').value;
  const cargo = document.querySelector('input[name="cargo"]').value;
  const uf = document.querySelector('select[name="uf"]').value;
  const municipio = document.querySelector('select[name="municipio"]').value;

  doc.setFontSize(12); // Tamanho de fonte ajustado para o restante do conteúdo
  doc.text(`Nome: ${nome}`, 10, 20);
  doc.text(`Cargo: ${cargo}`, 10, 30);
  doc.text(`Unidade da Federação: ${uf}`, 10, 40);
  doc.text(`Município: ${municipio}`, 10, 50);

  // Adiciona os Eixos e as Ações
  let yPosition = 60; // Posição inicial para os eixos

  const eixos = [
    { title: "Eixo 1 - Fortalecimento e ampliação dos serviços de Atenção à Saúde", actions: [] },
    { title: "Eixo 2 - Fortalecimento e ampliação das ações e serviços de Vigilância em Saúde", actions: [] },
    { title: "Eixo 3 - Fortalecimento, ampliação e melhorias da infraestrutura de saúde", actions: [] },
    { title: "Eixo 4 - Melhoria das práticas de gestão em saúde", actions: [] },
    { title: "Eixo 5 - Ações de inteligência e ciências de dados e serviços de saúde digital", actions: [] },
    { title: "Eixo 6 - Formação e educação permanente", actions: [] }
  ];

  // Função para coletar ações inseridas
  function collectActions(eixoId) {
    const actions = [];
    const actionElements = document.querySelectorAll(`#${eixoId} .action input`);
    actionElements.forEach(input => {
      if (input.value.trim() !== "") {
        actions.push(input.value.trim());
      }
    });
    return actions;
  }

  // Atualizar os eixos e ações no PDF
  eixos.forEach((eixo, index) => {
    eixo.actions = collectActions(`eixo${index + 1}`);
    doc.setFontSize(14); // Ajustando para um tamanho maior no título dos eixos
    doc.text(eixo.title, 10, yPosition);
    yPosition += 10; // Aumenta a posição vertical para não sobrepor

    eixo.actions.forEach(action => {
      doc.setFontSize(12);
      doc.text(`- ${action}`, 10, yPosition);
      yPosition += 8; // Aumenta a posição para cada ação
    });

    yPosition += 10; // Espaço entre os eixos
  });

  // Salvar o PDF
  doc.save('plano_de_acao.pdf');
}

// Função para adicionar ações ao formulário (para fins de interação)
function addAction(eixoId) {
  const eixoDiv = document.getElementById(eixoId);
  const actionDiv = document.createElement('div');
  actionDiv.classList.add('action');
  
  const actionInput = document.createElement('input');
  actionInput.setAttribute('type', 'text');
  actionInput.setAttribute('placeholder', 'Digite a ação aqui');
  
  const removeButton = document.createElement('button');
  removeButton.innerHTML = 'Remover';
  removeButton.onclick = () => eixoDiv.removeChild(actionDiv);

  actionDiv.appendChild(actionInput);
  actionDiv.appendChild(removeButton);
  eixoDiv.appendChild(actionDiv);
}

// Função para alternar a visibilidade dos eixos
function toggleAccordion(eixoId) {
  const eixoDiv = document.getElementById(eixoId);
  eixoDiv.style.display = (eixoDiv.style.display === 'block') ? 'none' : 'block';
}

// Função para atualizar a lista de municípios com base na UF selecionada
function updateMunicipios(uf) {
  const municipioSelect = document.getElementById('municipio-select');
  municipioSelect.innerHTML = '<option value="">Selecione a UF primeiro</option>';

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
  }
}
