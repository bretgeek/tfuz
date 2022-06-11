

[<img alt="TFUZ"  src="imgs/logo.png" />](https://tfuz.com/)

# Tiny Friggin' Utility Zapper


## What is it?

### A tiny ~7kb extendable JavaScript utility library with a JQuery like syntax for getting work done fast!

If you are looking for small footprint utility library with a syntax similar to JQuery, **TFUZ** may be just what you need.

Get **TFUZ** at https://github.com/bretgeek/tfuz
Visit https://tfuz.com for ongoing documentation and examples.

## Features
* Tiny! - currently under ~7KB minified (smaller if gzipped).
* Can be used as a general purpose JQuery like library.
* Easy familiar syntax with built-in chainable DOM manipulation methods.
* Built-in iterable delay queue.
* Ability set up custom observers on any element.
* And more ...

### Why?
Not every site uses React (and friends) and not every site needs all the features that require loading the full JQuery library.

**TFUZ** is the pagespeed conscious web developer's best friend. It's super small and easy to extend.

 Sure you could write everything **TFUZ** has to offer in Vanilla JavaScript but **TFUZ** is so small and the syntax is familiar and easy to remember that it can potentially save you time / development costs.

**TFUZ** is your tiny tool belt of most used DOM manipulation tools with some really cool extra bits.

 If **TFUZ** doesn't have what you need you can easily add it!

## Basic Usage

* Basic usage for manually adding and using **TFUZ** to a web page.

### Add TFUZ to your page before your closing body tag :

```html
<script src='https://yoururl.com/tfuz.min.js'></script>

```


### Use TFUZ like you would JQuery

* In an html file:
```html
// somewhere in your html

<div id='app'> I am an App </div>
```

* In a script tag after tfuz.min.js add:

```js
// create a wrapper function to hold all the stuff you want to do:
function init(){

// Select an element and return a reference to it using "grab"
// there are many options to "grab" but this minimal use returns a reference
// to the first element (so you don't keep querying the DOM) of #app by default

let app = tfuz.grab('#app');
app.css('color: red;'); // changes app's color with CSS
}


// Run your wrapper function when the document is ready...
tfuz.ready(init);

```

### Add your own functionality and make plugins!

* In your same script file from above add:

```js
function myplug(){
this.css('color: red;');
return this;
}


//  Now tell TFUZ to use the plugin:
// *** Note you must tell TFUZ to use plugins at the top of your script file before initalizing anything else.

tfuz.use({name: 'myplug', fn: myplug}); // add to top of your init/wrapper function.


// Use the new plugin wherever you want later:

app.myplug(); // use plguin after reference to app was "grabbed";

```

### Some TFUZ Methods - *For help read the function signatures in the code or contact me!

 *   **append** -  el.append('text or html') - append to bottom of el.
 *   **appendTo** - el.appendTo('.otherEl' or el.appendTo(Elvar) - append to first of selector or to reference.
 *   **prependTo** - Same as appendTo but prepends to silly.
 *   **grab** - tfuz.grab (query document) or el.grab('selector', {all: false, fn: func}) (query starting from element)  - short hand for each that will run function and return found collection (first found by default).
 *   **each**- el.each({sel, 'selector1, selector2', all: true, fn: func}) - run function on collection of selectors.
 *   **select** - el.select({sel, 'selector1, selector2', first: false, fn: func}) - run function on collection of selectors and return collection.
 *  **ready** - tfuz.ready(func) - run function when document is ready
 *   **css** -  el.css('color: blue;') OR   el.css('color: blue;', { add = false } ) to overwrite CSS, true by default to add to current CSS)
 *   **html** - el.html() to return html, el.html('some new html here') to set html.
 *   **_text**- el._text() to return text, el._text('some new text here') to set text - *prefixed with underscore because anchor tags have a text property that you can't overwrite.
 *   **plg** - add a new plugin.
 *   **fn** - alias to plg.
 *   **use** - alias to plg.
 *   **on** - el.on('click', func) - adds an event listener.
 *   **off** - el.off('click', func) -  removes event listener created by on.
 *   **trigger** -  trigger an event created with on.
 *   **observe**- listen for changes on elements - read code!
 *   **unobserve** - stop observing observers of elements created by observe.
 *   **getobservers** -  Get list of observers
 *   **scroll** - tfuz.scroll(func) - run function on scroll.
 *   **attr** -  get or set attributes of el.
 *   **removeAttr** - el.removeAttr('attr') -  remove attributes of el
 *   **addClass** - el.addClass('classname list');
 *   **removeClass** - el.removeClass('classlist');
 *   **toggle** -  toggle on or off a class
 *   **rpx** - remove px, em from numbers and return number.
 *   **cs** - return computed values.
 *   **isString** - return boolean if is a string.
 *   **isFunction** -  return boolean if is a function.
 *   **isObject** -  return boolean is an Object.
 *   **isArray** - return boolean  if is an array.
 *   **isElement** -  return bollean  if is an Element.
 *   **isNumber** -return boolean if is a number.
 *   **isEmpty** -  return boolean if empty object.
 *   **createNode** -  create Node and optionall append or prepend to caller.
 *   **delay** - iterate-able delay queue - el.delay({time: 1000, fn: yourFunc, iterate: 6 }); -  runs yourFunc every second for 6 iterations - chained delays are queued and ran in order until queue is empty..





### Delay Example

```js

  // Create a normal function - as an example this function will increase a counter
  function delayCount(e){
    if(!e.templateHTML){
     if(!e.countme){
       e.countme = 0;
     }
      e.templateHTML = e.html(); // save original html for future iterations
    }
    e.countme++;
   console.log('Count is '+e.countme);
   e.html(e.templateHTML + ' '+e.countme)
  }

// call delay from app and watch the magic happen as the count up to 6 is appended to the existing html.
  app.delay({time: 1000, fn: delayCount, iterate: 6 }); // chain more delays here if you want.

```




### Now that you know about delay, you can build your own effects!
**TFUZ** doesn't come with effects, that helps keep the code small. But you can build your own!

We will build **FadeOut** and **FadeIn**.


```js
// fadeOut

function fadeOut(e,options){
let op =  e.cs('opacity');
let itr = '0.'+options.iterationsLeft;
itr = Number(itr)
e.css(`opacity: ${itr};`);
}

// FadeIn

function fadeIn(e){
let op =  e.cs('opacity');
if(op < 1){
op = Number( op ) + 0.1
}
if(op >= 0.9){
op = 1
}
op = op.toFixed(1);
e.css(`opacity: ${op};`);
}


// Now use delay to run your new fade functions

fader.delay({time: 100, fn: fadeOut, iterate: 10 });
fader.delay({time: 100, fn: fadeIn, iterate: 10 });


// You could wrap the above delay calls in a function... like fadeInOut() then call fadeInOut on click or wherever you want.

function fadeInOut(){
fader.delay({time: 100, fn: fadeOut, iterate: 10 });
fader.delay({time: 100, fn: fadeIn, iterate: 10 });
}


// call fadeInOut on click event

fader.on('click', fadeInOut);


```







#### Like TFUZ and want to help?

Get TFUZ fork and make imporvements on https://github.com/bretgeek/tfuz

