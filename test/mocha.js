(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
  (function (process,global){
    'use strict';

    /* eslint no-unused-vars: off */
    /* eslint-env commonjs */

    /**
     *  * Shim process.stdout.
     *   */

    process.stdout = require('browser-stdout')({label: false});

    var Mocha = require('./lib/mocha');

    /**
     *  * Create a Mocha instance.
     *   *
     *    * @return {undefined}
     *     */

    var mocha = new Mocha({reporter: 'html'});

    /**
     *  * Save timer references to avoid Sinon interfering (see GH-237).
     *   */

    var Date = global.Date;
    var setTimeout = global.setTimeout;
    var setInterval = global.setInterval;
    var clearTimeout = global.clearTimeout;
    var clearInterval = global.clearInterval;

    var uncaughtExceptionHandlers = [];

    var originalOnerrorHandler = global.onerror;

    /**
     *  * Remove uncaughtException listener.
     *   * Revert to original onerror handler if previously defined.
     *    */

    process.removeListener = function(e, fn) {
      if (e === 'uncaughtException') {
        if (originalOnerrorHandler) {
                global.onerror = originalOnerrorHandler;
                    
        } else {
                global.onerror = function() {};
                    
        }
            var i = uncaughtExceptionHandlers.indexOf(fn);
            if (i !== -1) {
                    uncaughtExceptionHandlers.splice(i, 1);
                        
            }
              
      }
      
    };

    /**
     *  * Implements uncaughtException listener.
     *   */

    process.on = function(e, fn) {
      if (e === 'uncaughtException') {
        global.onerror = function(err, url, line) {
                fn(new Error(err + ' (' + url + ':' + line + ')'));
                          return !mocha.allowUncaught;
                              
        };
            uncaughtExceptionHandlers.push(fn);
      }
    };
