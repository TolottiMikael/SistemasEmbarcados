const fs = require("fs");
let dataToarchive = "";
let save_flag;

//gráficos
let grafico_temp;
let grafico_batim;
let grafico_oxig;

let quantidade_de_labels = 10;

let Temperatura = {
  values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};

let Batimentos = {
  values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};

let Oxigenacao = {
  values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};

setInterval(() => {
  // rever os labels
  if (Temperatura.labels.length >= 20) {
    Temperatura.values.shift(); //apaga o primeiro.... mantem apenas 20 temperaturas
    Temperatura.labels.shift(); //apaga o primeiro.... mantem apenas 20 temperaturas
  }
  Temperatura.labels.push(quantidade_de_labels);
  Temperatura.values.push(Math.random() * 100);

  if (Batimentos.labels.length >= 20) {
    Batimentos.values.shift(); //apaga o primeiro.... mantem apenas 20 temperaturas
    Batimentos.labels.shift(); //apaga o primeiro.... mantem apenas 20 temperaturas
  }
  Batimentos.labels.push(quantidade_de_labels);
  Batimentos.values.push(Math.random() * 100);

  if (Oxigenacao.labels.length >= 20) {
    Oxigenacao.values.shift(); //apaga o primeiro.... mantem apenas 20 temperaturas
    Oxigenacao.labels.shift(); //apaga o primeiro.... mantem apenas 20 temperaturas
  }
  Oxigenacao.labels.push(quantidade_de_labels);
  Oxigenacao.values.push(Math.random() * 100);

  quantidade_de_labels++;

  //atualizando os gráficos
  if (grafico_temp) {
    grafico_temp.update();
  }
  if (grafico_batim) {
    grafico_batim.update();
  }
  if (grafico_oxig) {
    grafico_oxig.update();
  }

  //verificando a necessidade de salvar
  if (save_flag) {
    dataToarchive = `Temp:${Temperatura.values.pop()};Batim:${Batimentos.values.pop()};Oxig:${Oxigenacao.values.pop()};`;
    //   console.log(dataToarchive)
    fs.appendFile("Valores.txt", dataToarchive +"\n", (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}, 1000);

function salvaEmArquivos() {
  if (!save_flag) {
    const data = new Date();
    const hora = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    fs.writeFileSync("Valores.txt", "I: " + data.getDate() + "/" + `${data.getMonth()+1}`  + "/" + data.getFullYear() + " " + hora + "\n", function (err) {
      //de Start
      if (err) throw err;
      console.log("Salvamento iniciado:");
    });
    save_flag = true;
  } else {
    fs.appendFile("Valores.txt", "F\n", function (err) {
      if (err) throw err;
      console.log("Salvamento Finalizado:");
    });

    save_flag = false;
  }
}

function func_fechar() {
  window.close();
}
function func_ajuda() {
  alert("Essa é uma janela de ajuda");
}

function func_plot_batim() {
  if (!grafico_batim) {
    const dados_temp = {
      type: "line",
      data: {
        labels: Batimentos.labels,
        datasets: [
          {
            label: "Dados de Batimentos",
            borderColor: "rgba(0,255,0.8)",
            data: Batimentos.values,
          },
        ],
      },
    };
    grafico_batim = new Chart(document.getElementById("plot2"), dados_temp);
    grafico_batim.update();
  } else {
    grafico_batim.destroy();
    grafico_batim = null;
  }
}

function func_plot_temp() {
  if (!grafico_temp) {
    const dados_temp = {
      type: "line",
      data: {
        labels: Temperatura.labels,
        datasets: [
          {
            label: "Dados de Temperatura",
            borderColor: "rgba(0,0,255,0.8)",
            data: Temperatura.values,
          },
        ],
      },
    };
    grafico_temp = new Chart(document.getElementById("plot1"), dados_temp);
    grafico_temp.update();
  } else {
    grafico_temp.destroy();
    grafico_temp = null;
  }
}

function func_plot_oxig() {
  if (!grafico_oxig) {
    const dados_temp = {
      type: "line",
      data: {
        labels: Oxigenacao.labels,
        datasets: [
          {
            label: "Dados de Oxigenação",
            borderColor: "rgba(255,0,0,0.8)",
            data: Oxigenacao.values,
          },
        ],
      },
    };
    grafico_oxig = new Chart(document.getElementById("plot3"), dados_temp);
    grafico_oxig.update();
  } else {
    grafico_oxig.destroy();
    grafico_oxig = null;
  }
}
