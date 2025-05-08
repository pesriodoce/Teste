function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text('Plano de Ação do Programa Especial de Saúde do Rio Doce', 10, 10);
  const perfilSocio = document.getElementById('perfil-socioeconomico').value;
  const perfilEpi = document.getElementById('perfil-epidemiologico').value;
  const estruturaRede = document.getElementById('estrutura-rede-saude').value;
  doc.text("Diagnóstico Situacional de Saúde", 10, 20);
  doc.text(perfilSocio, 10, 30);
  doc.text(perfilEpi, 10, 40);
  doc.text(estruturaRede, 10, 50);
  doc.save('plano_de_acao.pdf');
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
  const municipios = { 'DF': ['Brasília'], 'ES': ['Vitória'], 'MG': ['Belo Horizonte'] };
  if (municipios[uf]) {
    municipios[uf].forEach(m => {
      const opt = document.createElement('option');
      opt.value = m;
      opt.textContent = m;
      municipioSelect.appendChild(opt);
    });
  }
}
