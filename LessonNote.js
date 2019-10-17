/*
    Weather App
    1) Introduction to API accessing the browser, Using Query String
    2) Building a JSON HTTP Endpoint
    3) Browser HTTP requests with fetch (accessing api from browser)
    4) Creating a Search Form
    5) Wiring Up the User Interface
    6) Setting Github and Heroku Account
        - heroku.com and github.com
        - heroku installation guide
            + https://devcenter.heroku.com/articles/heroku-cli
            + type in terminal 'heroku login'
    7) Version Control using Git
    8) Exploring Git
        + Untracked Files 
            - All new files added to your project will be under in untracked files.
        + Unstaged Changes
            - This is where git store tracked files with changes. 
        + Staged Changes
            - This where we put things we want to save.
        + Commits 
            - This is the save point.
    9) Integrating Git
        + git init (initialize git)
        + git status
            * git ignore node_modules folder
            * create .gitignore file 
            * store folders or files you don't want to add to your git repository
        + git add . (to add everyhing in the staging area)
        + git status
        + git commit -m "Initial Commit"
    10) Setting up SSH Keys on Github and Heroku
        + SSH means Secure Shell
        + Terminal Command
            * Run Command to see if ssh is already added
            1) "ls -a -l ~/.ssh" (This is view all files [ as well as hidden files ])
            * if you have a file ( id_rsa and id_rsa.pub ) that means you already have 
            * an ssh keys and you could chose those instead of creating a new one.
            2) next command creating ssh-keygen, ssh-keygen -t rsa -b 4096 -C "jbalbertjoligon@gmail.com"
            * -b is bits, 4096 is the standard | -C is comment 
            * just hit enter to create the ssh keys
            * then run "ls -a -l ~/.ssh"
            * id_rsa - is a secret file that we need to keep in our machine
            * id_rsa.pub - public file this is what we are going to share to other 3rd party app.
            * next command, is make sure the program is running
            3) eval "$(ssh-agent -s)" this is to start up ssh agent
            * last is to register the file
            4) ssh-add ~/.ssh/id_rsa
    11) Pushing Code to Github After setting up ssh keys
            * git remote add origin https://github.com/jbalbert/node3-weather-website.git
            * git remote -v
            * git push -u origin master -> will not work if you did not configure the ssh keys in your
            * github account. To do that follow steps below :
                + Git Account -> Go to Settings ->
                + SSH + GPG Keys -> New SSH Key
                + to get the ssh key
                + run command on terminal
                    * cat ~/.ssh/id_rsa.pub
                + copy everyting in the output
                + then paste to github
                + to test github connection
                + run command
                    * ssh -T git@github.com
                    
    12) Deploying NODE Project on Heroku 
        - This is using terminal commands
            * set up ssh public key file with heroku
             1) heroku keys:add
            * creating heroku application
             1) heroku create <project name>
                - project name must be unique in all heroku applications
                - jb-weather-application
             2) after creation heroku will output some urls
                - https://jb-weather-application.herokuapp.com/  (live url where we can view our application)
                - https://git.heroku.com/jb-weather-application.git (git repository where we can push our code)
             
             Additional:
                If you have environment variables then we need to use a command in heroku called
                'heroku config' this will allow us to set env variables, read our existing env variables and delete them

                1) to test and add env variables on heroku.. run "heroku config:set key=value" then enter
                    terminal result:
                        Setting key and restarting ⬢ jbalbert-task-manager... done, v3
                        key: value
                2) to see the env variables you set run "heroku config"
                3) "heroku config:unset key" this is remove the testing "key=value" we added
                4) run again and exact env variables:
                    * heroku config:set JWT_SECRET_KEY=TaskAuthApiKey SENDGRID_API_KEY=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 
                            Terminal Result:  
                                    Setting JWT_SECRET_KEY, SENDGRID_API_KEY and restarting ⬢ jbalbert-task-manager... done, v5
                                    JWT_SECRET_KEY:   TaskAuthApiKey
                                    SENDGRID_API_KEY: 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
                    * set up mongodb env
                        * go to atlas.com click 'connect' then click 'connect your application'
                        * then copy connection string 
                        * then change password as well as the /test to your exact database name.
                        * heroku config:set MONGODB_CONNECTION='mongodb+srv://taskapp:deathnote69@cluster0-ff6ed.mongodb.net/task-manager-api?retryWrites=true&w=majority'
                    * port is already managed by heroku so not need to be added to env config. 
             3) We have to make a couple of changes so that heroku can actually know how to run
                our application
             4) We have to provide it with some basic instruction on what to do when it gets our code
             5) One of the changes is in "package.json", in order for heroku to start our application
                we need to tell it first which file to run.
             6) changes in package.json 
                1) scripts section, empty it first by deleting some unnecessary code.
                    "scripts": {
                    "start" : "node src/app.js"
                    },
                 on terminal we can run our application locally by
                 " npm run start " like what we put in the scripts section that heroku will do we it gets our code.
            7) changes in app.js by changing the port value where our application listens
                port 3000 can still be used when our application is running locally in our computer
                but in heroku it will provide a port value that we need to use when our app is running in heroku.    
                    
                adding constat port
                const port = process.env.PORT || 3000
                app.listen(port, () => {
                        console.log('Server is up on port 3000')
                })
            8) changing or removing static url's like http://localhost:3000 to our heroku's domain like in /public/js/app.js
                before -> const url = 'http://localhost:3000/weather?address=' + location
                after -> const url = '/weather?address=' + location
            9) after changes, push our changes to github and heroku
                1) before pushing to heroku
                2) push changes first in github
                3) after pushing to github
                4) git remote
                    - output 
                       + heroku
                       + origin
                5) to deploy on heroku
                    - git push heroku master
    13) Avoiding Global Modules
        1) adding new scripts to package.json to make life easy
                 "scripts": {
                    "start": "node src/app.js",
                --->"development": "nodemon src/app.js -e js,hbs,css"
                }
        2) then run command on terminal "npm run dev"

         - when we have global modules installed, it is difficult for other people to know that 
         - they need to install them. Since they are not local dependencies. 
         - So if you have project it is better to install everything LOCALLLY.
         - Since in our computer we installed nodemon globally. so the solution is
         - to uninstall it and install it as a local dependencies.
         - type in terminal "npm uninstall -g nodemon"
         - to instal nodemon "npm install nodemon --save-dev" 
         * --save-dev is a dependency that you need only in your local machine.
                





        
*/