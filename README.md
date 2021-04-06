# COSC-3380-PointOfSale :credit_card:
Team 4 - Point of Sale System

## Instructions :receipt:
> You need to install: npm, git, nodejs

1. Create a folder in your computer
2. Type in the command line:

`git init` [inside that folder to initialize a got repository]

`git clone https://github.com/97morningstar/COSC-3380-PointOfSale.git` [To copy the remote repository into your own computer]

`cd COSC-3380-PointOfSale`

`npm install` [inside /client to install client dependencies]

`npm install` [in the root folder to install server dependencies]

`npm install -g nodemon`

## To run the project in the root folder run :runner:
`nodemon`

## Possible Problems :massage_man:
1. react-scripts is missing or not installed

### Solution :pill:

1. Run the following in the /client:

`rm-rf node_modules`

`rm -rf package-lock.json`

`npm install react-scripts`

`npm install`

`cd mainFolder`

`nodemon `

## If you want to work on the server, then main file that we will be working on is in the root folder
index.js

## Branching 

> We create branches so we can work at the same time and then we merge those branches with the main one

1. `git branch {your-branch-name}`
2. `git checkout {your-branch-name}`
3. `git push --set-upstream origin {your-branch-name}`

## To push your work to the shared repo run in the root folder. 

> Never push if you haven't pull the latest code and solve the merging conflicts locally if any

1. `git add -A`
2. `git commit -m "Your message, what you did in the code"`
3. `git push`

## To pull from master

> Always pull before starting to work for the day, or first verify that you have the latest code

1. `git pull origin master`

## How to open a pull request

> Pull requests or PRs are basically how you merge your changes with the master code. They will be revised by a member of the group and that member will post comments on your code and ask you to fix those.

1. Once you push your code you will see a green message saying if you want to create a pull request. Always do a pull request to heroku-deply as it is the main branch. Do not delete your own branch as you will continue to use it.
2. You can also click on Pull request and open one there.

## Tech Stack

nodejs 

expressjs

react

mysql

heroku :rocket:


