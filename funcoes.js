const fs = require("fs");
let dataToarchive = "";
let save_flag;

let arrayTemp = [45, 34, 78, 23, 89, 54, 32, 78, 12, 72];
let labelTemp = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

setInterval(() => {
  // rever os labels
  if (arrayTemp.length >= 20) {
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
  dataToarchive = "";
  if (save_flag) {
    console.log("salvamento desativado");
    save_flag = false;
  } else {
    console.log("salvamento ativado");
    save_flag = true;
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
  var quantidade_de_labels = 10;

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

  var dados_batim = {
    type: "line",
    data: {
      labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      datasets: [
        {
          label: "Dados de Temperatura",
          borderColor: "rgba(0,0,255,0.8)",
          data: [45, 34, 78, 23, 89, 54, 32, 78, 12, 72],
        },
      ],
    },
  };
  var grafico_batim = new Chart(document.getElementById("plot2"), dados_batim);

  var dados_oxig = {
    type: "line",
    data: {
      labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      datasets: [
        {
          label: "Dados de Temperatura",
          borderColor: "rgba(0,0,255,0.8)",
          data: [45, 34, 78, 23, 89, 54, 32, 78, 12, 72],
        },
      ],
    },
  };
  var grafico_oxig = new Chart(document.getElementById("plot3"), dados_oxig);

  setInterval(function () {
    grafico_temp.update();
    // Para batimentos cardíacos
    if (dados_batim.data.labels.length >= 20) {
      dados_batim.data.labels.shift(); //apaga o primeiro.... mantem apenas 20 temperaturas
      dados_batim.data.datasets[0].data.shift(); //apaga o primeiro... mantem apenas 20 temperaturas
    }

    dados_batim.data.labels.push(quantidade_de_labels++);
    dados_batim.data.datasets[0].data.push(Math.random() * 100);
    grafico_batim.update();

    // Para Oxigenação
    if (dados_oxig.data.labels.length >= 20) {
      dados_oxig.data.labels.shift(); //apaga o primeiro.... mantem apenas 20 temperaturas
      dados_oxig.data.datasets[0].data.shift(); //apaga o primeiro... mantem apenas 20 temperaturas
    }

    dados_oxig.data.labels.push(quantidade_de_labels++);
    dados_oxig.data.datasets[0].data.push(Math.random() * 100);
    grafico_oxig.update();

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
  }, 1000);
}
