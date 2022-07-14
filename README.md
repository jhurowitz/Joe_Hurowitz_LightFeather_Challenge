# Joe_Hurowitz_LightFeather_Challenge
 LightFeather Coding Challenge


1) Get api/supervisors
Was able to use this to auto-populate select drop down form option.
Also successful in sorting them based on jurisdiction, last name, then first name.

2) POST api/submit
Made validations to catch and send errors based on situations, but unable to get passed 404 error.
Curl methods from terminals and CMD would still produce 404.

3) Front end
Built form and used CSS from external source. On Firefox, checkboxes worked for requiring and not requiring email/phone number, but seemed to act differently on Chrome. Submit form could send console log with data, but was unable to post with fetch methods. 

May need to run 
__________________
npm install cors
docker-compose build; docker-compose up <-- in both react and express template folders
