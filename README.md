

[<img alt="TFUZ"  src="imgs/logo.png" />](https://tfuz.com/)


See https://tfuz.com for ongoing documentation and info.



# TFUZ - Tiny Friggin' Utility Zapper
### What is it? 

#### A tiny ~7kb extendable JavaScript utility library with a JQuery like syntax for getting work done fast!

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

<div id='app'> I am an App </div>
```

* In a script tag after tfuz.min.js:

```js
// create function to do stuff
function init(){
// there are many options to "grab" but this minimal use returns a reference to the first element (so you don't keep querying the DOM) of #app by default

let app = tfuz.grab('#app');
app.css('color: red;'); // changes app's color with CSS
}


// Run your function when the document is ready...
tfuz.ready(init);

```

#### Add your own functionality and make plugins

* In your same script file from above add:

```js
function myplug(){
this.css('color: red;');
return this;
}


//  Now tell TFUZ to use the plugin:                  
// *** Note you must add plugins at the top of your script file before initalizing anything else. 

tfuz.use({name: 'myplug', fn: myplug}); // add to top of your init function.


// Use the new plugin where ever you want later:

app.myplug();

```

### Methods - * Currently working on filling these out...for help read the function signatures in the code or contact me! 

 *   append -  el.append('text or html') - append to bottom of el.
 *   appendTo - el.appendTo('.otherEl' or el.appendTo(Elvar) - append to first of selector or to reference.
 *   prependTo - Same as appendTo but prepends to silly.
 *   grab - tfuz.grab or el.grab('selector', {all: false, fn: func}) - short hand for each that will run function and return found collection (first found by default).
 *   each - el.each({sel, 'selector1, selector2', all: true, fn: func}) - run function on collection of selectors.
 *   select - el.select({sel, 'selector1, selector2', first: false, fn: func}) - run function on collection of selectors and return collection.
 *   ready - tfuz.ready(func) - run function when document is ready 
 *   css -  el.css('color: blue;') OR   el.css('color: blue;', { add = false } ) to overwrite CSS, true by default to add to current CSS)  
 *   html - el.html() to return html, el.html('some new html here') to set html.
 *   _text - el._text() to return text, el._text('some new text here') to set text -  *prefixed with underscore because anchor tags have a text property that you can't overwrite.
     plg - add a new plugin.
 *   fn - alias to plg.
 *   use - alias to plg.
 *   delay - iterable delay queue description coming soon.
 *   on - el.on('click', func) - adds an event listener.
 *   off - el.off('click', func) -  removes event listener created by on.
 *   trigger -  trigger an event created with on.
 *   observe - listen for changes on elements - description coming soon.
 *   unobserve - stop obeserving observers of elements created by observe.
 *   getobservers -  Get list of observers
 *   scroll - tfuz.scroll(func) - run function on scroll.
 *   attr -  get or set attributes of el. - description coming soon
 *   removeAttr - el.removeAttr('attr') -  remove attributes of el
 *   addClass - el.addClass('classname list');
 *   removeClass - el.removeClass('classlist');
 *   toggle -  toggle on or off a class
 *   rpx - remove px, em from numbers
 *   cs - return computed values 
 *   isString - return boolean if is a string. 
 *   isFunction -  return boolean if is a function.
 *   isObject -  return boolean is an Object.
 *   isArray - return boolean  if is an array.
 *   isElement -  return bollean  if is an Element.
 *   isNumber -return boolean if is a number.
 *   isEmpty -  return boolean if empty object.
 *   createNode -  create Node and optionall append or prepend to caller.
  };



#### More documentation/usage/tutorials coming soon...

Until then, feel free to ask questions, read the code or visit https://tfuz.com for lots more info.


