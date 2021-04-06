# COSC-3380-PointOfSale
Team 4 - Point of Sale System

#Instructions:

You need to install: npm, git, nodejs

1. Create a folder in your computer
2. Type in the command line:

`git init` [inside that folder to initialize a got repository]

`git clone https://github.com/97morningstar/COSC-3380-PointOfSale.git` [To copy the remote repository into your own computer]

`cd COSC-3380-PointOfSale`

`npm install` [inside /client to install client dependencies]

`npm install` [in the root folder to install server dependencies]

`npm install -g nodemon`

# To run the project in the root folder run
`nodemon`

# Possible Problems
1. react-scripts is missing or not installed

Solution:

1. Run the following in the /client:

`rm-rf node_modules`

`rm -rf package-lock.json`

`npm install react-scripts`

`npm install`

`cd mainFolder`

`nodemon `

# If you want to work on the server, then main file that we will be working on is in the root folder
index.js

# Branching 

We create branches so we can work at the same time and then we merge those branches with the main one

1. `git branch {your-branch-name}`
2. `git checkout {your-branch-name}`
3. `git push --set-upstream origin {your-branch-name}`

# To push your work to the shared repo run in the root folder. 

Never push if you haven't pull the latest code and solve the merging conflicts if any

1. `git add -A`
2. `git commit -m "Your message, what you did in the code"`
3. `git push`

# To pull from master

Always pull before starting to work for the day, or first verify that you have the latest code

1. `git pull origin master`
