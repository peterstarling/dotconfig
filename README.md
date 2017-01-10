Dotconfig
=========

A small library providing utility to load configuration files with dot notation. 
Uses memory caching for already loaded files.

## Installation

  npm install dotconfig --save

## Usage

   import config from 'dotconfig';

   console.log(config('db.host')); // will print the 'host' from db.js file in config dir

   console.log(config('non_existent.nothing', 'fallback value'); // will print 'fallback value'
  