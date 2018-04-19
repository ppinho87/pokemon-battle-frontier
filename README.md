# Pokemon Battle Frontier

A battleship game built with Meteor and React.

  * [What it is](#what-it-is)
  * [How to use](#how-to-use)
    * [Requirements](#requirements)
    * [Run Locally](#run-locally)
  * [Structure](#structure)
    * [Packages used](#packages-used)
    * [Folder structure](#folder-structure)
  * [Built With](#built-with)
  * [Authors](#authors)
  * [Copyright](#copyright)

## What it is

A simple battleship game that uses an API

### Getting Started

To try it out, open [Pokmon Battle Frontier](http://pokemon-battle-frontier.herokuapp.com/) in your browser of choice.

### The API endpoints

> A more thorough breakdown coming soon.

* Create a game

* Destroy a game

* Accepts coordinates for the player’s next move.

* Returns the coordinates for the CPU’s next move.

### The game works like this

* A battleship occupies one block.

* The starting board will be 5x5.

* The player starts a game and places 10 ships on the board.

* The player submits their positions on the board via the API.

* The CPU places its ships on the board.

* The player is given the first move and submits coordinates to strike.

* If a ship is hit, it is destroyed.

* Allow the CPU to attack.

* Alternate moves between player and CPU.

* The first player to have all ships destroyed is the loser.

## How to use

### Requirements

Make sure [Meteor is installed and up to date](https://www.meteor.com/install) or run:

```sh
OSX / LINUX: curl https://install.meteor.com/ | sh

WINDOWS: choco install meteor
```

### Run Locally

```sh
git clone https://github.com/pinhop07/pokemon-battle-frontier.git
cd pokemon-battle-frontier
```

Run the following to get the bash file to work:  

```
chmod +x ./run.sh
```

Now you can start the app with the following command `./run.sh` and the app should now be running on <http://localhost:3000>

### Deployment

**Create a new app on Heroku.** Login to heroku and go to the dashboard. Click on the ‘New’ button and pick a name for your app. It’s okay if this is different than the name of your git repo. We will use this name again in a moment.

**Connect your repository to Heroku.** Open a terminal window and browse to your Meteor project directory. Run `heroku login` and enter your credentials. Run `heroku git:remote -a $NAME` where `$NAME` is the name of your project on heroku. You should see `git remote heroku added`. For more information, see heroku’s instructions on deployment.

**Setup the buildpack.** Run `heroku buildpacks:set https://github.com/AdmitHub/meteor-buildpack-horse.git` in your project directory to add the buildback to your project. A ‘buildpack’ is heroku terminology for all the configuration stuff that tells heroku how to setup your app. Luckily a nice person made a great one for us so we don’t need to do it ourselves. If you’d like to learn more about Meteor Buildpack Horse (including the significance of ‘Horse’) check out the README in the git repo [here](https://github.com/AdmitHub/meteor-buildpack-horse).

**Link your MongoDB to your app.** If you created a database using the `heroku addons:create mongolab` command then you can skip this step. To tell heroku where our database is we must configure the MONGO_URL environment variable. To do this, run `heroku config:set MONGO_URL="$URL"` where `$URL` is the MongoDB URI of your database. Note that it should be enclosed in quotes.

MongoDB URIs begin with "mongodb://". If you set up your database manually in the last step then you can simply copy the URI on the mLab dashboard and replace and with the username and password of the database user you created.

**Set the ROOT_URL.** Run `heroku config:set ROOT_URL="https://<appname>.herokuapp.com"` where `<appname>` is the name of your app on heroku. If you have a custom domain you can use that as the ROOT_URL instead.

**Deploy.** Run `git push heroku master` to deploy to heroku. Your terminal will print some short logs that look a lot like what you see when you push to GitHub. After that you will begin to see lines prefaced by `remote:`. These are logs from Heroku documenting the setup process. You can watch them if you like or you can turn off your computer and go for a walk. The deploy takes about five minutes so it might have to be a short walk.

**Logs.** Run `heroku logs --tail` from your project directory to get real-time logs from your Heroku server.

## Structure

### Folder structure

```
app/                # Application folder
  client/             # Client folder
    components/          # Contains react components
      layouts/            # Router layouts
      modules/            # Modules used across the app
        boards/             # Game boards components
        common/             # Common components (i.e. header, footer)
        games/              # Games components
      views/              # Router views
        private/            # Private routes
        public/             # Public routes
    helpers/            # Global helper functions
    modules/            # Reusable modules to keep components high level
    stylesheets         # SASS files (libSass)
      components/         # Components styles
        layouts/            # All layouts styles
        modules/            # All modules styles
        views/              # View styles
      _app.scss           # Stylesheet imports into app
      _variables.scss     # All SASS variables
      elements.scss       # html elements and modules styles
      helpers.scss        # style helpers for global use
      typography.scss     # global typography styles
  collections/        # All Collections
  lib/                # Lib files that get executed first
    methods/            # Collection methods (API)
    modules/            # Lib modules
    routes/             # Routes (public/private routes, config)
  public/             # Public files
    images/             # Public image files
  server/             # Server directory
    modules/            # Server modules
    publications/       # Collection publications
  tests/              # All tests
environments/       # Environments folder
  local/              # local environment
  production/         # production environment

```

### Packages Used

* Meteor Core
  * [meteor-base](http://github.com/meteor/meteor/tree/devel/packages/meteor-base)
  * [blaze-html-templates](https://github.com/meteor/meteor/tree/devel/packages/blaze-html-templates)
  * [ecmascript](https://github.com/meteor/meteor/tree/devel/packages/ecmascript)
  * [es5-shim](https://github.com/meteor/meteor/tree/devel/packages/es5-shim)
  * [jquery](https://github.com/meteor/meteor/tree/devel/packages/jquery)
  * [mobile-experience](https://github.com/meteor/meteor/tree/devel/packages/mobile-experience)
  * [mongo](https://github.com/meteor/meteor/tree/devel/packages/mongo)
  * [session](https://github.com/meteor/meteor/tree/devel/packages/session)
  * [standard-minifiers](https://github.com/meteor/meteor/tree/devel/packages/standard-minifiers)
  * [tracker](https://github.com/meteor/meteor/tree/devel/packages/tracker)
  * [check](https://github.com/meteor/meteor/tree/devel/packages/check)
  * [browser-policy](https://github.com/meteor/meteor/tree/devel/packages/browser-policy)
  * [fastclick](http://github.com/meteor/meteor/tree/devel/packages/fastclick)
  * [react](https://github.com/meteor/meteor/tree/devel/packages/react)
  * [reactive-var](https://github.com/meteor/meteor/tree/devel/packages/reactive-var)
  * [reactive-dict](https://github.com/meteor/meteor/tree/devel/packages/reactive-dict)
* Accounts
  * [accounts-base](https://github.com/meteor/meteor/tree/devel/packages/accounts-base)
  * [accounts-password](https://github.com/meteor/meteor/tree/devel/packages/accounts-password)
* Collections
  * [dburles:collection-helpers](https://github.com/dburles/meteor-collection-helpers)
  * [aldeed:collection2](https://github.com/aldeed/meteor-collection2)
* Router
  * [kadira:flow-router](https://github.com/kadirahq/flow-router)
  * [kadira:react-layout](https://github.com/kadirahq/meteor-react-layout)
  * [meteorhacks:fast-render](https://github.com/meteorhacks/fast-render)
* SEO
  * [spiderable](http://github.com/meteor/meteor/tree/devel/packages/spiderable)
  * [tomwasd:flow-router-seo](https://github.com/tomwasd/flow-router-seo)
* Analytics 
  * [datariot:ganalytics](https://github.com/datariot/meteor-ganalytics)
* UI/UX
  * [natestrauser:animate-css](https://github.com/nate-strauser/meteor-animate-css)
  * [fortawesome:fontawesome](https://github.com/MeteorPackaging/Font-Awesome)
  * [themeteorchef:jquery-validation](https://github.com/themeteorchef/jquery-validation/)
  * [themeteorchef:bert](https://github.com/themeteorchef/bert/)
* Development
  * [fourseven:scss](https://github.com/fourseven/meteor-scss)
  * [stevezhu:lodash](https://github.com/stevezhu/meteor-lodash)
  * [digilord:faker](https://github.com/digilord/meteor-faker)
  * [momentjs:moment](https://github.com/moment/moment/)

### Built With

* Visual Studio Code - Text Editor

### Authors

* Adriana Salvador
* Alexa Martinez
* Jeffrey Francois
* Mark Pinho
* Paul Pinho

### Copyright

RandomScript © 2018. All Rights Reserved.
