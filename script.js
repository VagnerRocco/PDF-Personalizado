
String.prototype.reverse = function(){
    return this.split('').reverse().join(''); 
  };
  
  function mascaraMoeda(campo,evento){
    var tecla = (!evento) ? window.event.keyCode : evento.which;
    var valor  =  campo.value.replace(/[^\d]+/gi,'').reverse();
    var resultado  = "";
    var mascara = "##.###.###,##".reverse();
    for (var x=0, y=0; x<mascara.length && y<valor.length;) {
      if (mascara.charAt(x) != '#') {
        resultado += mascara.charAt(x);
        x++;
      } else {
        resultado += valor.charAt(y);
        y++;
        x++;
      }
    }
    campo.value = resultado.reverse();
  }

function limpaCampo () {
    document.getElementById('grupo').value = "";
    document.getElementById('cota').value = "";
    document.getElementById('prazo').value = "";
    document.getElementById('parcela').value = "";
    document.getElementById('lance').value = "";
    document.getElementById('parlanc').value = "";
}

function salvar() {
    var cliente = document.getElementById('cliente').value;
    var grupo = document.getElementById('grupo').value;
    var cota = document.getElementById('cota').value;
    var prazo = document.getElementById('prazo').value;
    var parcela = document.getElementById('parcela').value;
    var lance = document.getElementById('lance').value;
    var parlanc = document.getElementById('parlanc').value;

    var resultadoCliente = `
        <div class="resultado-cliente">
            Cliente: ${cliente}<br>`

    var clienteDiv = document.getElementById('resulCliente')
    clienteDiv.innerHTML = resultadoCliente

    var resultadoTexto = `
         <div class="resultado-item">
            Grupo: ${grupo}<br>
            Cota: R$ ${cota}<br>
            Prazo: ${prazo} meses<br>
            Parcela: R$ ${parcela}<br>
            Lance: R$ ${lance}<br>
            Parcela Lance: R$ ${parlanc}<br><br>
        </div>
    `;
    var resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML += resultadoTexto;

    limpaCampo()
}

function gerarPdf() {
    var element = document.getElementById('conjuntos-alfa');
    var opt = {
        margin:       0.5,
        filename:     'documento.pdf',
        image:        { type: 'jpeg', quality: 1 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save().catch(error => {
        console.error('Erro ao gerar o PDF:', error);
    });

    html2canvas(element,{scale: 2}).then(canvas => {
        const {jsPDF} = window.jspdf;
        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        var imgData = canvas.toDataURL('image/png', 1.0);
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        const canvasHeight = canvas.height * 0.75 / 2;
        let position = pdfHeight;
        while (position < canvasHeight) {
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, position - pdfHeight, pdfWidth, pdfHeight);
            position += pdfHeight;
        }
    })  
};

function novaProp () {
    document.getElementById('cliente').value = "";
    document.getElementById('grupo').value = "";
    document.getElementById('cota').value = "";
    document.getElementById('prazo').value = "";
    document.getElementById('parcela').value = "";
    document.getElementById('lance').value = "";
    document.getElementById('parlanc').value = "";
    document.getElementById('resulCliente').innerHTML = "";
    document.getElementById('resultado').innerHTML = "";
}