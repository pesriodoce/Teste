function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text('Plano de Ação do Programa Especial de Saúde do Rio Doce', 10, 10);

  // Informações iniciais
  const nome = document.querySelector('input[name="nome"]').value;
  const cargo = document.querySelector('input[name="cargo"]').value;
  const uf = document.querySelector('select[name="uf"]').value;
  const municipio = document.querySelector('select[name="municipio"]').value;

  doc.setFontSize(12);
  doc.text(`Nome: ${nome}`, 10, 20);
  doc.text(`Cargo: ${cargo}`, 10, 30);
  doc.text(`Unidade da Federação: ${uf}`, 10, 40);
  doc.text(`Município: ${municipio}`, 10, 50);

  let yPosition = 60;

  // Diagnóstico Situacional de Saúde
  const perfilSocio = document.getElementById('perfil-socioeconomico').value;
  const perfilEpi = document.getElementById('perfil-epidemiologico').value;
  const estruturaRede = document.getElementById('estrutura-rede-saude').value;

  doc.setFontSize(14);
  doc.text("Diagnóstico Situacional de Saúde", 10, yPosition);
  yPosition += 10;

  doc.setFontSize(12);
  doc.text("Perfil socioeconômico, produtivo e demográfico do território:", 10, yPosition);
  yPosition += 8;
  yPosition = addMultilineText(doc, perfilSocio, 10, yPosition);

  doc.text("Perfil epidemiológico do território:", 10, yPosition);
  yPosition += 8;
  yPosition = addMultilineText(doc, perfilEpi, 10, yPosition);

  doc.text("Estrutura da rede e serviços de saúde existentes:", 10, yPosition);
  yPosition += 8;
  yPosition = addMultilineText(doc, estruturaRede, 10, yPosition);

  // Eixos e ações
  const eixos = [
    "Eixo 1 - Fortalecimento e ampliação dos serviços de Atenção à Saúde",
    "Eixo 2 - Fortalecimento e ampliação das ações e serviços de Vigilância em Saúde",
    "Eixo 3 - Fortalecimento, ampliação e melhorias da infraestrutura de saúde",
    "Eixo 4 - Melhoria das práticas de gestão em saúde",
    "Eixo 5 - Ações de inteligência e ciências de dados e serviços de saúde digital",
    "Eixo 6 - Formação e educação permanente"
  ];

  eixos.forEach((titulo, i) => {
    const eixoId = `eixo${i + 1}`;
    const inputs = document.querySelectorAll(`#${eixoId} .action input`);
    const actions = Array.from(inputs).map(input => input.value.trim()).filter(val => val !== "");

    if (actions.length > 0) {
      doc.setFontSize(14);
      doc.text(titulo, 10, yPosition);
      yPosition += 10;

      doc.setFontSize(12);
      actions.forEach(action => {
        doc.text(`- ${action}`, 10, yPosition);
        yPosition += 8;
      });

      yPosition += 6;
    }
  });

  doc.save('plano_de_acao.pdf');
}

// Auxiliar para quebras de linha em textos longos
function addMultilineText(doc, text, x, y, maxWidth = 180, lineHeight = 6) {
  const lines = doc.splitTextToSize(text, maxWidth);
  lines.forEach(line => {
    doc.text(line, x, y);
    y += lineHeight;
  });
  return y + 4;
}

function addAction(eixoId) {
  const eixoDiv = document.getElementById(eixoId);
  const actionDiv = document.createElement('div');
  actionDiv.classList.add('action');

  const actionInput = document.createElement('input');
  actionInput.type = 'text';
  actionInput.placeholder = 'Digite a ação aqui';

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remover';
  removeButton.onclick = () => eixoDiv.removeChild(actionDiv);

  actionDiv.appendChild(actionInput);
  actionDiv.appendChild(removeButton);
  eixoDiv.appendChild(actionDiv);
}

function toggleAccordion(eixoId) {
  const eixoDiv = document.getElementById(eixoId);
  eixoDiv.style.display = eixoDiv.style.display === 'block' ? 'none' : 'block';
}

function updateMunicipios(uf) {
  const municipioSelect = document.getElementById('municipio-select');
  municipioSelect.innerHTML = '<option value="">Selecione a UF primeiro</option>';

  const municipios = {
    'DF': ['Brasília'],
    'ES': ['Vitória', 'Vila Velha', 'Serra'],
    'MG': ['Belo Horizonte', 'Uberlândia', 'Juiz de Fora']
  };

  if (municipios[uf]) {
    municipios[uf].forEach(m => {
      const opt = document.createElement('option');
      opt.value = m;
      opt.textContent = m;
      municipioSelect.appendChild(opt);
    });
  }
}
