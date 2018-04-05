# Meteor Battleship

A battleship game built with Meteor and React.

[IN PRODUCTION](http://spacebattle.co)

* [What it is](#what-it-is)
* [How to use](#how-to-use)
  * [Requirements](#requirements)
  * [Run Locally](#run-locally)
* [Structure](#structure)
  * [Packages used](#packages-used)
  * [Folder structure](#folder-structure)
* [License](#license)

## What it is

A simple battleship game that uses an API

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

### Roadmap

* ~~Add in user sessions so the server can handle more than one game at a time.~~
* Add a leaderboard that keeps winner’s initials and ranks them according to the time it took them to win.
* ~~Players can post comments (chat) during a game.~~
* ~~Deploy the application.~~

## How to use

### Requirements

Make sure [Meteor is installed and up to date](https://www.meteor.com/install) or run:

```sh
curl https://install.meteor.com/ | sh
```

### Run Locally

```sh
git clone git@github.com:amazingBastard/mtr-battleship.git
cd mtr-battleship
```

Run the following to get the bash file to work:  

```
chmod +x ./run.sh
```

Now you can start the app with the following command `./run.sh` and the app should now be running on <http://localhost:3000>

### Deployment

Make sure you have Meteor Up (mup) installed.  

```sh
npm install -g mup
```

Configure your mup.json file for deployment in environments/production dir. This is an example file:  

```js
{
  // Server authentication info
  "servers": [
    {
      "host": "hostname",
      "username": "root",
      "password": "password",
      // or pem file (ssh based authentication)
      //"pem": "~/.ssh/id_rsa",
      // Also, for non-standard ssh port use this
      //"sshOptions": { "port" : 49154 },
      // server specific environment variables
      "env": {}
    }
  ],

  // Install MongoDB on the server. Does not destroy the local MongoDB on future setups
  "setupMongo": true,

  // WARNING: Node.js is required! Only skip if you already have Node.js installed on server.
  "setupNode": true,

  // WARNING: nodeVersion defaults to 0.10.36 if omitted. Do not use v, just the version number.
  "nodeVersion": "0.10.36",

  // Install PhantomJS on the server
  "setupPhantom": true,

  // Show a progress bar during the upload of the bundle to the server.
  // Might cause an error in some rare cases if set to true, for instance in Shippable CI
  "enableUploadProgressBar": true,

  // Application name (no spaces).
  "appName": "meteor",

  // Location of app (local directory). This can reference '~' as the users home directory.
  // i.e., "app": "~/Meteor/my-app",
  // This is the same as the line below.
  "app": "/Users/arunoda/Meteor/my-app",

  // Configure environment
  // ROOT_URL must be set to https://YOURDOMAIN.com when using the spiderable package & force SSL
  // your NGINX proxy or Cloudflare. When using just Meteor on SSL without spiderable this is not necessary
  "env": {
    "PORT": 80,
    "ROOT_URL": "http://myapp.com",
    "MONGO_URL": "mongodb://arunoda:fd8dsjsfh7@hanso.mongohq.com:10023/MyApp",
    "MAIL_URL": "smtp://postmaster%40myapp.mailgun.org:adj87sjhd7s@smtp.mailgun.org:587/"
  },

  // Meteor Up checks if the app comes online just after the deployment.
  // Before mup checks that, it will wait for the number of seconds configured below.
  "deployCheckWaitTime": 15
}
```

From the environments/production dir, run ```mup setup``` to setup the server. Then, running ```mup deploy``` will deploy your app.

Check out the [mup docs](https://github.com/arunoda/meteor-up) for more info.

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

## License

This project has an MIT License, see the LICENSE.txt for more information.
