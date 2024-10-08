const fs = require("fs");
let dataToarchive = "";
let save_flag;

const quantidade_de_labels = 10;

let Temperatura = {
  values: [1,2,3,4,5,6,7,8,9,10],
  labels: [1,2,3,4,5,6,7,8,9,10]
}

let Batimentos = {
  values: [1,2,3,4,5,6,7,8,9,10],
  labels: [1,2,3,4,5,6,7,8,9,10]
}

let Oxigenacao = {
  values: [1,2,3,4,5,6,7,8,9,10],
  labels: [1,2,3,4,5,6,7,8,9,10]
}

setInterval(() => {
  // rever os labels
  if (Temperatura.length >= 20) {
    arrayTemp.shift(); //apaga o primeiro.... mantem apenas 20 temperaturas
  }

  arrayTemp.push(Math.random() * 100);
}, 1000);

function salvaEmArquivos() {
  fs.writeFileSync("Valores.txt", "I", function (err) {
    //de Start
    if (err) throw err;
    console.log("Salvamento iniciado:");
  });
  //Aqui irá salvar os arquivos num arquivo
  if (save_flag) {
    dataToarchive = `Temp:${dados_temp.data.datasets[0].data[9]};Batim:${dados_batim.data.datasets[0].data[9]};Oxig:${dados_oxig.data.datasets[0].data[9]};`;
    //   console.log(dataToarchive)
    fs.appendFile("Valores.txt", dataToarchive, (err) => {
      if (err) {
        console.log(err);
      } else {
        // Get the file contents after the append operation
        console.log(
          "\nFile Contents of file after append:",
          fs.readFileSync("Valores.txt", "utf8")
        );
      }
    });
  }
}

function func_fechar() {
  window.close();
}
function func_ajuda() {
  alert("Essa é uma janela de ajuda");
}

function func_plot_batim() {
  //mesmo código
}

function func_plot_temp() {

  var dados_temp = {
    type: "line",
    data: {
      labels: labelTemp,
      datasets: [
        {
          label: "Dados de Temperatura",
          borderColor: "rgba(0,0,255,0.8)",
          data: arrayTemp,
        },
      ],
    },
  };
  var grafico_temp = new Chart(document.getElementById("plot1"), dados_temp);
  grafico_temp.update();
  
  setInterval(function () {
    if (dados_temp.data.labels.length >= 20) {
      dados_temp.data.labels.shift(); //apaga o primeiro.... mantem apenas 20 temperaturas
      dados_temp.data.datasets[0].data.shift(); //apaga o primeiro... mantem apenas 20 temperaturas
    }

    dados_temp.data.labels.push(quantidade_de_labels++);
    dados_temp.data.datasets[0].data.push(Math.random() * 100);
    

  }, 1000);
}
