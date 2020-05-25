const dgram = require("dgram");
const server = dgram.createSocket("udp4");
const express = require("express");
const app = express();
const mysql = require("mysql");
const soda = require('soda-js');
const cors = require("cors");

const SELECT_ALL_COVID = "SELECT * FROM covid";
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "covid",
  password: "password",
});

let coordinates;
let message;

connection.connect(function (err) {
  if (err) throw err;
  console.log("Node connected ");
});

server.on("error", (err) => {
  console.log(err.stack);
  server.close();
});



server.on("listening", () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("go to /coords to see info");
});

app.get("/coords", (req, res) => {
  connection.query(SELECT_ALL_COVID, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data1: results,
      });
    }
  });
});



var ciudad='Barranquilla'
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.get('/stats', function(req,res){
  var consumer = new soda.Consumer('datos.gov.co',{apiToken:'lnVVdDZkbRxYhDNkY0V20tKnq'});
  consumer.query()
    .withDataset('gt2j-8ykr')
    .where({ ciudad_de_ubicaci_n: ciudad })
    .order('fecha_reporte_web')
    .limit(50000)
    .getRows()
      .on('success', function(rows){getStats(rows);} )
      .on('error', function(error) { console.error(error); });
    function getStats(rows){
      var m = 0
      var r = 0
      var Fecha_Muer = [];
      var Fecha_Recu = [];
      var Fecha_web = [];
      var Sexo = [];
      var Fecha_muerte=[];
      var Fecha_Recuperado=[];
      var Fecha_Infectados=[];
      var Muertos_Diarios_Acumulados=[];
      var Muertos_Diarios=[];
      var Infectados_Diarios=[];
      var Infectados_Diarios_Acumulados=[];
      var Recuperados_Diarios_Acumulados=[];
      var Recuperados_Diarios=[];
      var Infectados_Total;
      var Recuperados_Total;
      var Muertos_Total;
      var Masculinos=0;
      var Femeninos=0;
      var acumulador=1;
      var acumulador2=1;
      var m = 0
      var r = 0
      for (x in rows){
        if (rows[x].fecha_de_muerte!="-   -" ){
          Fecha_Muer[m]=rows[x].fecha_de_muerte;
          m += 1;
        };
        if (rows[x].fecha_recuperado!="-   -"){
          Fecha_Recu[r]=rows[x].fecha_recuperado;
          r += 1;
        };
        Sexo[x]=rows[x].sexo;
        Fecha_web[x]=rows[x].fecha_reporte_web;
      }
      x = 0;
      m = 0;

      var aux1=Fecha_Muer[0]
      for (x in Fecha_Muer){
        if (Fecha_Muer[x]==aux1){
          Fecha_muerte[m]=Fecha_Muer[x];
          Muertos_Diarios_Acumulados[m]=acumulador;
          Muertos_Diarios[m]=acumulador2;
          acumulador+=1;
          acumulador2+=1;
        }else{
          m+=1;
          acumulador2=1;
          Fecha_muerte[m]=Fecha_Muer[x];
          Muertos_Diarios_Acumulados[m]=acumulador;
          Muertos_Diarios[m]=acumulador2;
          acumulador+=1;
          acumulador2+=1;
        }
        aux1=Fecha_Muer[x];
        Muertos_Total=Muertos_Diarios_Acumulados[m];
      };
      x = 0;
      m = 0;
      acumulador=1
      acumulador2=1
      aux1 = Fecha_Recu[0];
      for (x in Fecha_Recu){
        if (Fecha_Recu[x]==aux1){
          Fecha_Recuperado[m]=Fecha_Recu[x];
          Recuperados_Diarios_Acumulados[m]=acumulador;
          Recuperados_Diarios[m]=acumulador2;
          acumulador+=1;
          acumulador2+=1;
        }else{
          m+=1;
          acumulador2=1;
          Fecha_Recuperado[m]=Fecha_Recu[x];
          Recuperados_Diarios_Acumulados[m]=acumulador;
          Recuperados_Diarios[m]=acumulador2;
          acumulador+=1;
          acumulador2+=1;
        }
        aux1=Fecha_Recu[x];
        Recuperados_Total=Recuperados_Diarios_Acumulados[m];
      };
      x = 0;
      m = 0;
      acumulador=1
      acumulador2=1
      aux1 = Fecha_web[0];
      for (x in Fecha_web){
        if (Fecha_web[x]==aux1){
          Fecha_Infectados[m]=Fecha_web[x];
          Infectados_Diarios_Acumulados[m]=acumulador;
          Infectados_Diarios[m]=acumulador2;
          acumulador+=1;
          acumulador2+=1;
        }else{
          m+=1;
          acumulador2=1;
          Fecha_Infectados[m]=Fecha_web[x];
          Infectados_Diarios_Acumulados[m]=acumulador;
          Infectados_Diarios[m]=acumulador2;
          acumulador+=1;
          acumulador2+=1;
        }
        aux1=Fecha_web[x];
        Infectados_Total=Infectados_Diarios_Acumulados[m];
      };
      for (x in Sexo){
        if (Sexo[x]==="M"){
          Masculinos+=1;
        }else{
          Femeninos+=1
        }
      }
      let Stats = {
        Fecha_Infectados:Fecha_Infectados,
        Infectados_Diarios_Acumulados:Infectados_Diarios_Acumulados,
        Infectados_Diarios:Infectados_Diarios,
        Fecha_muerte:Fecha_muerte,
        Muertos_Diarios_Acumulados:Muertos_Diarios_Acumulados,
        Muertos_Diarios:Muertos_Diarios,
        Fecha_Recuperado:Fecha_Recuperado,
        Recuperados_Diarios:Recuperados_Diarios,
        Recuperados_Diarios_Acumulados:Recuperados_Diarios_Acumulados,
        Recuperados_Total:Recuperados_Total,
        Infectados_Total:Infectados_Total,
        Muertos_Total:Muertos_Total,
        Masculinos:Masculinos,
        Femeninos:Femeninos
      };
      res.send(Stats);
    };
});






app.listen(5000, () => {
  console.log("Listening on Port 5010");
});
server.bind(5010);