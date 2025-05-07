const eixos = [
  'Eixo 1 – Fortalecimento e ampliação dos serviços de Atenção à Saúde',
  'Eixo 2 - Fortalecimento e ampliação das ações e serviços de Vigilância em Saúde',
  'Eixo 3 – Fortalecimento, ampliação e melhorias da infraestrutura de saúde',
  'Eixo 4 - Melhoria das práticas de gestão em saúde',
  'Eixo 5 - Ações de inteligência e ciências de dados e serviços de saúde digital',
  'Eixo 6 - Formação e educação permanente'
];

const municipios = {
  DF: ['Brasília'],
  ES: ['Anchieta', 'Aracruz', 'Baixo Guandu', 'Colatina', 'Conceição da Barra', 'Fundão', 'Linhares', 'Marilândia', 'São Mateus', 'Serra', 'Sooretama'],
  MG: ['Aimorés', 'Alpercata', 'Barra Longa', 'Belo Oriente', 'Bom Jesus do Galho', 'Bugre', 'Caratinga', 'Conselheiro Pena', 'Coronel Fabriciano', 'Córrego Novo', 'Dionísio', 'Fernandes Tourinho', 'Galiléia', 'Governador Valadares', 'Iapu', 'Ipaba', 'Ipatinga', 'Itueta', 'Mariana', 'Marliéria', 'Naque', 'Ouro Preto', 'Periquito', 'Pingo D’água', 'Ponte Nova', 'Raul Soares', 'Resplendor', 'Rio Casca', 'Rio Doce', 'Santa Cruz do Escalvado', 'Santana do Paraíso', 'São Domingos do Prata', 'São José do Goiabal', 'São Pedro dos Ferros', 'Sem Peixe', 'Sobrália', 'Timóteo', 'Tumiritinga']
};

function loadMunicipios() {
  const uf = document.getElementById('uf').value;
  const municipioSelect = document.getElementById('municipio');
  municipioSelect.innerHTML = '';
  if (municipios[uf]) {
    municipios[uf].forEach(m => {
      const opt = document.createElement('option');
      opt.value = m;
      opt.textContent = m;
      municipioSelect.appendChild(opt);
    });
  } else {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = 'Selecione a UF primeiro';
    municipioSelect.appendChild(opt);
  }
}

function createEixo(index, title) {
  const container = document.createElement('div');
  container.className = 'section';

  const header = document.createElement('h2');
  header.textContent = title;
  header.onclick = () => {
    content.classList.toggle('hidden');
  };

  const content = document.createElement('div');
  content.className = 'hidden';

  const addBtn = document.createElement('button');
  addBtn.textContent = 'Adicionar Ação';
  addBtn.onclick = () => content.appendChild(createAcao(index));

  content.appendChild(addBtn);
  container.appendChild(header);
  container.appendChild(content);
  return container;
}

function createAcao(eixoIndex) {
  const div = document.createElement('div');
  div.className = 'action';

  div.innerHTML = `
    <label>Identificação do Problema:</label>
    <textarea></textarea>

    <label>Nome da Ação:</label>
    <input type="text">

    <label>Descrição da Ação:</label>
    <textarea></textarea>

    <label>Objetivos:</label>
    <textarea></textarea>

    <label>Itens previstos:</label>
    <input type="text">

    <label>Tipo da Ação:</label>
    <select>
      <option value="">Selecione</option>
      <option value="Investimento">Investimento</option>
      <option value="Custeio">Custeio</option>
    </select>

    <label>Orçamento previsto (R$):</label>
    <input type="number">

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
  `;

  return div;
}

const eixosContainer = document.getElementById('eixos');
eixos.forEach((eixo, i) => {
  eixosContainer.appendChild(createEixo(i, eixo));
});

document.getElementById('generate-pdf').addEventListener('click', () => {
  const element = document.body;
  const opt = {
    margin: 0.5,
    filename: 'plano-de-acao.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
});
