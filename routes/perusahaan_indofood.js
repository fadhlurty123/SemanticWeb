var express = require('express');
var router = express.Router();
var d3 = require('d3-sparql');

/* GET Data Indofood */
router.get('/', async(req, res) => {
    try {
        var myQuery = `
        prefix data: <http://makanan.com/>
        prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        SELECT *
        WHERE {
          ?x data:nama ?nama.
          ?x data:harga ?harga.
          ?x data:varian ?varian.
          ?x data:urlFoto ?urlFoto . 
          ?x data:perusahaan ?perusahaan.
          FILTER regex(?perusahaan, "Indofood")
        }`;
        
        var sparqlEndpoint = 'http://localhost:3030/perusahaanProduct/sparql';

        d3.sparql(sparqlEndpoint, myQuery).then((results) => {
            console.log(results); 
            res.render('perusahaan_indofood', { title: 'Data', indofood: results });
        });
    } catch (err) {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else if (err.request) {
            console.log(err.request);
        } else {
            console.error('Error', err.message);
        }
    }
});


module.exports = router;