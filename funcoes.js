const fs = require('fs');


function salvaEmArquivos(){
    fs.appendFile('Valores.txt', 'test', function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
}

function func_fechar() {
    window.close();
}
function func_ajuda() {
    alert("Essa é uma janela de ajuda");
}

function func_plot_temp() 
{
    var quantidade_de_labels = 10;

    var dados_temp =
    {
        type: 'line',
        data:
        {
            labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            datasets:
                [
                    {
                        label: 'Dados de Temperatura',
                        borderColor: 'rgba(0,0,255,0.8)',
                        data: [45, 34, 78, 23, 89, 54, 32, 78, 12, 72]
                    }
                ]
        }
    };
    var grafico_temp = new Chart(document.getElementById('plot1'), dados_temp);
    setInterval(function () {

        if (dados_temp.data.labels.length >= 20)
        {
            dados_temp.data.labels.shift(); //apaga o primeiro.... mantem apenas 20 temperaturas
            dados_temp.data.datasets[0].data.shift(); //apaga o primeiro... mantem apenas 20 temperaturas
        }


        dados_temp.data.labels.push(quantidade_de_labels++);
        dados_temp.data.datasets[0].data.push(Math.random()*100);
        grafico_temp.update();

    }, 1000);



}
