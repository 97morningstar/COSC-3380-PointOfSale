# COSC-3380-PointOfSale :credit_card:
Team 4 - Point of Sale System

# Team Members

1. Kyle Cunningham
2. Elisa Martinez
3. Jordan Yu
4. Steven Do
5. Daniel Aigboduwa

# Website Link

[Heroku Link](https://cosc3380-pointofsale.herokuapp.com/)

# Login Information

### Employee
email: p@gmail.com

password: p


### Customer
email: newCustomer@gmail.com

password: password

## Instructions (How to install) :receipt:
> You need to have installed: npm, git, nodejs

Links:

[To install npm and nodejs](https://nodejs.org/en/)
[To install git](https://git-scm.com/downloads)

1. Create a folder in your computer

### If working with the remote repository:

Type in the command line:

`git init` [inside that folder to initialize a git repository]

`git clone https://github.com/97morningstar/COSC-3380-PointOfSale.git` [To copy the remote repository into your own computer]

`cd COSC-3380-PointOfSale`

`cd client`

`npm install` [inside /client to install client dependencies]

`cd ..`

`npm install` [in the root folder to install server dependencies]

`npm install -g nodemon`


### If working with the local repository:

Type in the command line:

Go to the folder you just created and copy the contents of the zip file there

`git init` [inside that folder to initialize a git repository]

`cd client`

`npm install` [inside /client to install client dependencies]

`cd ..`

`npm install` [in the root folder to install server dependencies]

`npm install -g nodemon`

## To run the project in the root folder run :runner:
`nodemon`

## Possible Problems :massage_man:
1. react-scripts is missing or not installed

### Solution :pill:

1. Run the following in the ./client:

`cd client`

`rm-rf node_modules`

`rm -rf package-lock.json`

`npm install react-scripts`

`npm install`

`cd ..`

`nodemon `

## All of our queries and code are in the following files :hammer:
/routes

## Branching :octocat:

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
> Make sure to know your origin

1. `git pull origin heroku-deploy`

## How to open a pull request

> Pull requests or PRs are basically how you merge your changes with the master code. They will be revised by a member of the group and that member will post comments on your code and ask you to fix those.

1. Once you push your code you will see a green message saying if you want to create a pull request. Always do a pull request to heroku-deploy as it is the main branch. Do not delete your own branch as you will continue to use it.
2. You can also click on Pull Request and open one there.

## Tech Stack

nodejs :sparkle:

expressjs :steam_locomotive:

react :electron:

mysql :key:

heroku :rocket:

## To test your queries

To test the queries:

1. Install Postman
2. Create a Collection (once)
3. Click the 3 dots and create a new request by clicking "Add Request"
4. Select the correct method (get, put, post, delete)
5. Run the server in the command prompt
6. Copy the localhost address and go to the link on the request (example: http://localhost:4200/api/create_item)
