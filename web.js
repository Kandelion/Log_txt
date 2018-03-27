const express = require('express')
const app = express()
const fs = require('fs')

app.get('/', (req, res) => res.send('Hello World!'))

var seq = 0
app.get('/update', function(req, res) {
    try{
        let date = req.param('date');
        let time = req.param('time');
        let temp = req.param('temp');

        const csv = date + "," + time + "," + temp; 
        console.log(csv);
        fs.appendFile('log.txt', String(csv)+"\n", function (err){
            if(err) throw err
            console.log("%j", req.query)
            res.end("Got "+ String(seq++) +" "+ JSON.stringify(req.query))
        });
    }catch(err){
        console.log(err);
    }
})

app.get('/get', function(req, res) {
    fs.readFile('log.txt', 'utf-8', function(err, data) {
        if(err) throw err
        res.end(String(data))
    });
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
