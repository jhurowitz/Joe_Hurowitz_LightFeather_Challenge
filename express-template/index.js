const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');

const app = new express();
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/supervisors', async (req, res) => {
    const supervisors = []
    fetch('https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers')
      .then((response) => response.json())
      .then((data) => {
        for (var id in data) {
            var supervisor = data[id]
            if (isNaN(supervisor.jurisdiction)) {
                var string = `${supervisor.jurisdiction} - ${supervisor.lastName}, ${supervisor.firstName}`
                supervisors.push(string)
            }
        }
 
        supervisors.sort((a, b) => {  
            aProps = [a[0], a.substring(a.indexOf('-') + 2, a.indexOf(',') - 1), 
                a.substring(a.indexOf(',') + 2)]
            bProps = [b[0], b.substring(b.indexOf('-') + 2, b.indexOf(',') - 1), 
                b.substring(b.indexOf(',') + 2)]
                    
            if (aProps[0].localeCompare(bProps[0]) < 0) return -1;
            if (aProps[0].localeCompare(bProps[0]) > 0) return 1;
            
            if (aProps[1].localeCompare(bProps[1]) < 0) return -1;
            if (aProps[1].localeCompare(bProps[1]) > 0) return 1;
            
            if (aProps[2].localeCompare(bProps[2]) < 0) return -1;
            if (aProps[2].localeCompare(bProps[2]) > 0) return 1;
        })

        res.json(supervisors)
    })
})

app.post('/api/submit', async (req, res) => {
    try {
        if (req.body.firstName != null && req.body.firstName.length > 0) {
            if (/\d+/.test(req.body.firstName)) {
                throw new Error("Invalid first name, can only contain letters.")
            } 
        } 
        else {
            throw new Error("First name is missing.")
        }

        if (req.body.lastName != null && req.body.lastName.length > 0) {
            if (/\d+/.test(req.body.lastName)) {
                throw new Error("Invalid last name, can only contain letters.")
            } 
        } 
        else {
            throw new Error("Last name is missing.")
        }

        if (req.body.supervisor == null || req.body.supervisor.length <= 0) {
            throw new Error("Supervisor is missing.")
        }

        if (req.body.phoneCheckBoxChecked) {
            if (!(/^\+?\d?[ -]?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}$/.test(req.body.phone.toLowerCase()))) {
                throw new Error("Invalid phone number.")
            }
        }

        if (req.body.emailCheckBoxChecked) {
            if (!(/^[a-z0-9\-_\.]+@[a-z0-9\-_\.]+\.[a-z]{2,4}$/).test(req.body.email.toLowerCase())) {
                throw new Error("Invalid email.")
            }
        }

        console.log({
            'First Name' : req.body.firstName, 
            'Last Name' : req.body.lastName, 
            'Phone' : req.body.phone, 
            'Email' : req.body.email, 
            'Supervisor' : req.body.supervisor
        })

        res.json({
            'success' : true
        })
    }
    catch(e) {
        res.json({
            'success' : false,
            'error': e.message
        })
    }
})

app.listen(8080, () => {
    console.log('Listening on 8080. Ctrl+c to stop this server.')
})