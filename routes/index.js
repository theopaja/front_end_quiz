var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('form_template.html', { title: 'Express' });
});

router.get('/item.json', function(req,res) {
    res.set('Content-Type', 'application/json');
    res.json(200, {
        "httpCode": 200,
        "message": "OK",
        "result": {
            "item": {
                "id": 123,
                "title": "Lorem Ipsum",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "dealerInternalNotes": "none available",
                "material": {
                    "description": "Ceramic",
                    "restricted": "N"
                },
                "measurement": {
                    "unit": "in",
                    "shape": "",
                    "length": "4.5",
                    "depth": "4.5",
                    "height": "12"
                },
                "condition": {
                    "description": "Good"
                }
            }
        }
    });
});

module.exports = router;
