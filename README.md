
![TFUZ JavaScript Library](imgs/logo.png?raw=true "TFUZ")
See https://tfuz.com for ongoing documentation and info.



# TFUZ - Tiny Friggin' Utility Zapper  - for getting work done fast.
* A tiny ~7kb extendable JavaScript utility library with a JQuery like syntax.

If you are looking for small footprint utility library with a syntax similar to JQuery, TFUZ may be just what you need.

Visit **https://tfuz.com** for updates and info.

## Features
* Tiny! - currently under ~7KB minified (smaller if gzipped).
* Can be used as a general purpose JQuery like library.
* Easy familiar syntax with built-in chainable DOM manipulation methods.
* Built-in iterable delay queue.
* Ability set up custom observers on any element.
* And more ...

## Basic Usage

* Basic usage for manually adding and using TFUZ to a web page. 

#### Add TFUZ to your page before your closing body tag :

```html
<script src='https://yoururl.com/tfuz.min.js'></script>

```


#### Use TFUZ like you would JQuery

* In an html file:
```html
// somewhere in your html

<div id='app'>I am an App </div>
```

* In a script tag after tfuz.min.js:

```js
function init(){
let app = tfuz.grab('#app'); // there are many options to grab but this minimal use returns the first element of #app by default
app.css('color: red;');
}


// Run your function when the document is ready...
tfuz.ready(init);

```

#### Add your own functionality and make plugins

* In your same script file from above add:

``js
function myplug(){
this.css('color: red;');
return this;
}

//  add the flugin to app

app.fn({name: 'myplug', fn: myplug});

// Use the new plugin:

app.myplug();

```



#### More documentation/usage/tutorials coming soon...

Until then, feel free to ask questions, read the code or visit https://tfuz.com for lots more info.



