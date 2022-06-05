var express = require('express');
var router = express.Router();
var d3 = require('d3-sparql');

/* GET Data */
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
          ?x data:subKategori ?subKategori.
          FILTER regex(?subKategori, "Snack")
        }`;
        
        var sparqlEndpoint = 'http://localhost:3030/perusahaanProduct/sparql';

        d3.sparql(sparqlEndpoint, myQuery).then((results) => {
            console.log(results); 
            res.render('kategori_snack', { title: 'Data', makanan: results });
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