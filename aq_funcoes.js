const fs = require('fs');
var flag_plot_temp=0;
var flag_salva_temp=0;
var x_temp = 0;
const { SerialPort, ReadlineParser }= require('serialport')
const port = new SerialPort({path:'COM7',baudRate: 19200})
const parser = port.pipe(new ReadlineParser())
parser.on('data', (line) =>
{
    var dado_recebido = line.split(':'); //amostra:temp:umid:dist
    if(flag_plot_temp==1)
    {
        plot_temp(x_temp,dado_recebido[1]);
        x_temp++;
    }

    if(flag_salva_temp==1)
    {
        fs.appendFileSync("temperatura.txt",dado_recebido[1]+'\n');
    }
});