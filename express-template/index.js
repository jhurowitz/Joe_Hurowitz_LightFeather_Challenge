const express = require('express')
const request = require('request')

const app = new express()
app.use(express.json())

app.get('/api/supervisors', async (req, res) => {
    var url = 'https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers';
    request({
        url: url,
        json: true
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            
            // Build JSON
            var supervisors = []
            for (var id in body)
            {
                // If jurisdiction is not a number, include supervisor
                var supervisor = body[id]
                if (isNaN(supervisor.jurisdiction)) {
                    var string = `${supervisor.jurisdiction} - ${supervisor.lastName}, ${supervisor.firstName}`
                    supervisors.push(string)
                }
            }

            // Sort by jurisdiction, last name, then first name
            supervisors.sort((a, b) => {
                
                // Array containing [jurisdiction, last name, first name] 
                aProps = [a[0], a.substring(a.indexOf('-') + 2, a.indexOf(',') - 1), 
                    a.substring(a.indexOf(',') + 2)]
                bProps = [b[0], b.substring(b.indexOf('-') + 2, b.indexOf(',') - 1), 
                    b.substring(b.indexOf(',') + 2)]
                
                // If first in alphabet, return -1 and move up
                // If second in alphabet, return 1 and move down
                // If equal, move to next sort
                if (aProps[0].localeCompare(bProps[0]) < 0) return -1;
                if (aProps[0].localeCompare(bProps[0]) > 0) return 1;

                if (aProps[1].localeCompare(bProps[1]) < 0) return -1;
                if (aProps[1].localeCompare(bProps[1]) > 0) return 1;

                if (aProps[2].localeCompare(bProps[2]) < 0) return -1;
                if (aProps[2].localeCompare(bProps[2]) > 0) return 1;
            })

            res.json(supervisors)
        }
    })
})

app.post('/api/submit', async (req, res) => {
    try {
        res.json({
            'body': req.body
        })
    }
    catch(e) {
        res.json({
            'error': e.message
        })
    }
})

app.listen(8080, () => {
    console.log('Listening on 8080. Ctrl+c to stop this server.')
})