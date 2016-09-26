const electron = require('electron');
const{app, BrowserWindow} = electron;
const https = require('https');

app.on('ready', () => {
    let win = new BrowserWindow({
        width: 1440,
        height: 800
    });
    win.loadURL(`file://${__dirname}/index.html`);
});

exports.getDataFromORDS = (cb) => {
    var data;
    https.get('https://apex.oracle.com/pls/apex/icodealot/crm/customers/', (res) => {
        res.on('data', (d) => {
            data = data + d;
        });
        res.on('end', () => {
            cb(data);
        });
    });
};