document.addEventListener('DOMContentLoaded', function() {
  const uploadInput = document.getElementById('pdfUpload');
  const btnEnviar = document.getElementById('btn-enviar');

  uploadInput.addEventListener('change', function(e) {
    if (e.target.files[0]?.type === "application/pdf") {
      btnEnviar.disabled = false;
      document.getElementById('fileName').textContent = `Arquivo selecionado: ${e.target.files[0].name}`;
    } else {
      alert('Apenas arquivos PDF são aceitos!');
    }
  });

  btnEnviar.addEventListener('click', function() {
    const formData = new FormData();
    formData.append('_replyto', 'no-reply@pesriodoce.org.br');
    formData.append('_subject', `Plano Aprovado - ${localStorage.getItem('municipioLogado')}`);
    formData.append('uploaded_file', uploadInput.files[0]);

    fetch('https://formsubmit.co/ajax/saude.riodoce@saude.gov.br', {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      alert('Plano enviado com sucesso para a Câmara Técnica!');
      btnEnviar.disabled = true;
    })
    .catch(error => {
      alert('Erro no envio. Tente novamente.');
      console.error(error);
    });
  });
});
