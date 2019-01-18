import app from './app';
import {  ConnectionOptions,createConnection, ConnectionManager } from '../../rigor-database/src'

//const options: ConnectionOptions = {
 //// type: "mssql",
 // database: "/Users/simon/Rigor-Prototype/packages/rigor-server/src/tester.sqlite"
//}
const options: ConnectionOptions = {
    type: "mssql",
    host: "ENTDEV01",
    port: 1433,
    database: "ondeck_main"
  }


// Potentially lots of routes
// route our app
app.get('/connect', async function(req, res) {

  const connectionManager = new ConnectionManager();
  const connection = connectionManager.create(options);
  await  connection.connect();

  res.send(connection.isConnected);

});

app.get('/disconnect', async function(req, res) {

  const connectionManager = new ConnectionManager();
  const connection = connectionManager.create(options);
  await  connection.connect();
  
  const s  = "Select * from users"
  let t = await connection.driver.query(s);

  res.send(t);

  await connection.close();

  res.send(connection.isConnected);

});


// Start Expresons server.
const server = app.listen(app.get('port'), () => {
  console.log(
    'App is running'
  );
  console.log('Press CTRL-C to stop\n');
});

