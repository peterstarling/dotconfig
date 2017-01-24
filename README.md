Dotconfig
=========

A small library providing utility to load configuration files with dot notation. 
Uses memory caching for already loaded files.

## Installation
```
  npm install dotconfig --save
```

## Usage

Create a configuration file
```javascript
   export default {
	    host: process.env.DB_HOST,
	    user: 'user',
	    password: 'password',
   }
```

Import package and assign it to a variable
```javascript
   import easydotconfig from 'easydotconfig';

   const config = easydotconfig();
```
Above will import config files from within 'config' directory in your root folder.
To specify a custom directory within root dir just do:
```javascript
   const config = easydotconfig('src'); // to get config files from './src/config'
```
Then use the following to retrieve the configuration
```javascript
   console.log(config('db.host')); // will print the 'host' from db.js file in config dir

   console.log(config('non_existent.nothing', 'fallback value'); // will print 'fallback value'
   
   console.log(config('db'); // will print entire db configuration
```
