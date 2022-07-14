# Joe Hurowitz - LightFeather Coding Challenge
LightFeather Coding Challenge

Will need to run
- npm install cors

Start program by running 'docker-compose build; docker-compose up' 
in both the express-template and react-template directories.

The form comes initially set with the first name, last name, and
supervisor fields required for submission. The supervisor drop down
is auto-populated with the GET api/supervisors, which is why the 
docker must be running for both express-template and react-template.
Also, initially, the email and phone input fields are disabled and
not required. Upon checking the checkbox next to either the email 
or phone input fields, it will enable and require that field.

Upon form submission, an alert is triggered for the client. In the event
of a submission containing all fields with valid information, a
console log will be triggered on the back-end containing all submitted
information. In the event that a field is missing or containing invalid
information, an error message will be sent to the client via response and
the back-end will not receive a console log.

