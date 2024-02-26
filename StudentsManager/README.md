## Overview
This is a demo project on ExpressJs.

This simple web application enables https connection and reads data from a local json file.

Here are the expected view:

![image](https://github.com/wxhtd/ExpressJSProjects/assets/152568460/44574c19-9990-46c8-8da6-bed825e591dd)

![image](https://github.com/wxhtd/ExpressJSProjects/assets/152568460/8a73424e-5e07-41a7-aef4-f87e1b4ad703)



## Implementation Steps in Detail
1. Create new folder for the repository
   
[powershell]

`mkdir ExpressJsProjects
cd .\ExpressJsProjects`

3. Initiate git repository with git Bash
   
[git bash]

`git init`

5. Create new folder for project "StudentsManager"
   
[powershell]

`mkdir StudentsManager
cd .\StudentsManager`

7. Initiate NodeJs project
   
[powershell]

`npm init`

**fill in project information**

9. Install express, and install nodemon as dev dependency
    
[powershell]

`npm install express
npm install nodemon --save-dev`

11. Create index.js under project folder, add the following code:
```
const express = require('express')
const https = require('https')
const fs = require('fs')
const startup = require('./routes/startup')
const students = require('./routes/students')

const app = express()
app.use(express.json())
app.use('/', startup)
app.use('/student-info/v1', students)

const httpsOptions = {
    key: fs.readFileSync('./ssl/key.key'),
    cert: fs.readFileSync('./ssl/cert.pem')
}
const server = https.createServer(httpsOptions, app)

server.listen(8080, () => {
    console.log('app is running')
})
```

7. Update package.json
   
Under scripts node, add:

`"start": "nodemon index.js"`

9. Create folders: routes, ssl, data
    
[powershell]

`mkdir data, routes, ssl`

11. Create student-info.json under data folder, add sample data

12. Run powershell command to generate local certificate keys
    
[powershell]

```
cd ssl
openssl req -x509 -nodes -new -sha256 -days 1024 -newkey rsa:2048 -keyout key.key -out cert.pem -subj "/C=US/CN=Example-Root-CA"
openssl x509 -outform pem -in cert.pem -out cert.crt
```

14. Ignore ssl and node_modules folders from git
    
Create file ".gitignore" under project folder
In this file, add:

`node_modules/
ssl/`

16. In index.js, add the following code:
```
const express = require('express')
const https = require('https')
const fs = require('fs')
const startup = require('./routes/startup')
const students = require('./routes/students')

const app = express()
app.use(express.json())
app.use('/', startup)
app.use('/student-info/v1', students)

const httpsOptions = {
    key: fs.readFileSync('./ssl/key.key'),
    cert: fs.readFileSync('./ssl/cert.pem')
}
const server = https.createServer(httpsOptions, app)

server.listen(8080, () => {
    console.log('app is running')
})
```

13. Under routes folder, create startup.js and students.js

14. Add code into startup.js:
```
const express = require('express')

const startup = express.Router()

startup.get('/', (req, resp)=>{
    resp.statusCode = 200;
    resp.setHeader('Content-Type','text/plain');
    console.log('default route visited');
    resp.send('Welcome to student info manager');
})

module.exports = startup
```

15. Add code into students.js:
```
const express = require('express')
const fs = require('fs')

const students = express.Router()

students.get('/students', (req, resp)=>{
    try{
        const info = fs.readFileSync('./data/student-info.json')
        resp.statusCode = 200;
        resp.setHeader('Content-Type','text/plain');
        console.log('Get students visited');
        resp.send(`Here are all the student information:\n${info}`);
    }
    catch(ex){
        resp.statusCode = 500;
        resp.setHeader('Content-Type','text/plain');
        console.log('Get students visited but failed');
        resp.send(`Error occurred when getting student information:\n${ex}`);
    }    
})

module.exports = students
```

16. Start the application and test
    
[powershell]

`npm start` 
 
18. After testing is completed, check in the code to github
    
**in ExpressJSProjects folder**

[git bash] 

```
git add *
git reset – StudentsManager/.gitignore
** Verify file list by git status
git commit -m "first check-in"
```
