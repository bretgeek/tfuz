/**
 * TFUZ
 * (c) 2022 Bret Lowry
 * @license MIT
 * @description TFUZ - A tiny, plugin extendable JavaScript utility library with a JQuery-like syntax!
 * @author Bret Lowry <bretgeek@gmail.com>
 * @constructor
 * @return object
 */

function Tfuz() {
  /**
   * lobj
   * LOBJ
   * @description the return obj for the tfuz
   */

  const lobj = {
    append: append,
    appendTo: appendTo,
    prependTo: prependTo,
    each: each,
    select: select,
    ready: ready,
    filterString: filterString,
    css: css,
    html: html,
    _text: text, // prefix with underscore because anchor tags have a text property that you can't overwrite
    fn: plg,
    use: plg,
    delay: delay,
    q: [],
    runq: runq,
    copyright: copyright,
    isrun: false,
    on: on,
    off: off,
    trigger: trigger,
    bret: true,
    observers: {},
    observe: observe,
    unobserve: unobserve,
    getobservers: getobservers,
    scroll: scroll,
    grab: grab,
    attr: attr,
    removeAttr: removeAttr,
    addClass: addClass,
    removeClass: removeClass,
    toggle: toggle,
    rpx: rpx,
    cs: cs,
    isString: isString,
    isFunction: isFunction, 
    isObject: isObject,
    isArray: isArray,
    isElement: isElement,
    isNumber: isNumber,
    isEmpty: isEmpty,
    createNode: createNode,
    
  };

  let tfuzloaded = false;
  (function ready() {
    if (document.readyState != "loading") {
      tfuzloaded = true;
    } else if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", function () {
        tfuzloaded = true;
      });
    } else {
      document.attachEvent("onreadystatechange", function () {
        if (document.readyState != "loading") {
          tfuzloaded = true;
        }
      });
    }
  })();

  /**
   * ready
   * READY
   * @description check if document is ready
   * @return null
   */
  function ready(fn, fallbacktime = 3000) {
    let docint;
    let tout;
    let inc = 1;
    docint = setInterval(() => {
      if (tfuzloaded) {
        clearInterval(docint);
        clearTimeout(tout);
        if (fn && isFunction(fn) && inc <= 1) {
          // Don't run more than once per call
          try {
            fn();
            inc++;
          } catch (e) {
            console.error(e);
          }
        } else {
          // Should also be able to use to check if docready is true
          return true;
        }
      }
    }, 6);
    // If all else fails set tfuzloaded after fallbacktime (can pass it in too)
    tout = setTimeout(() => {
      tfuzloaded = true;
    }, fallbacktime);
  } // end read

  /* UTILITIES */

  /**
   * template
   * TEMPLATE
   * @description a function template to use for new functions
   * @return this
   */
  function template(str, { e = this } = {}) {
    e.style.cssText = str;
    return this;
  }

  /**
   * scroll
   * SCROLL
   * @description Run fn on window load
   * @return this
   */
  function scroll(fn) {
    if (isFunction(fn)) {
      window.addEventListener("scroll", fn, true);
    }
    return this;
  }

  /**
   * copyright
   * COPYRIGHT
   * @description console log the copyright
   * @return this
   */

  function copyright() {
    console.log("COPYRIGHT Bret Lowry 6/6/2022");
    return this;
  }

  /**
   * isnode
   * ISNODE
   * @description  internal function to check if element is document
   * @return document
   */
  function isnode(e) {
    return e.nodeName || false;
  }

  /**
   * createNode
   * CREATENODE
   * @description  create a new node and optionally append or prepend to caller
   * @return document
   */
  function createNode( str = null, { e = this, add = false, prepend = false } = {} ) {
    let el = false;
    if (str) {
      let s = str;
      s = s.replace(/ /g, "");
      s = s.trim();
      el = document.createElement(s);

      // we could  restrict types of nodes from list of valid types but that would require more code. Currently trusting that the user knows what they are doing even though you should never trust the user

      init(el);
      if (add) {
        if (isnode(e)) {
          if (prepend) {
            e.prepend(el);
          } else {
            e.appendChild(el);
          }
        } else {
          if (prepend) {
            document.body.prepend(el);
          } else {
            document.body.appendChild(el);
            return el;
          }
        }
      } else {
        //add
      }
    }
    return el;
  }

  /**
   * toggle
   * TOGGLE
   * @description  set or unset a class name or list of classes if element has the class it will be removed else it will be added
   * @return this
   */
  function toggle(str = false, { e = this } = {}) {
    if (str) {
      const selectors = str.split(",");
      for (let s of selectors) {
        s = s.trim();
        s = s.replace(/\./g, "");
        if (e.classList.contains(s)) {
          e.removeClass(s);
        } else {
          e.addClass(s);
        }
      }
    }
    return this;
  }

  /**
  * addClass
  * ADDCLASS
  * @description Add to an element's class list
  * @return this
*/
  function addClass(s, r = false, { e = this } = {}) {
    if (!r) {
      e.classList.add(s);
    } else {
      e.classList.remove(s);
    }
    return this;
  }

  /**
   * removeClass
   * REMOVECLASS
   * @description remove a class from element's class list
   * @return this
   */
  function removeClass(s, { e = this } = {}) {
    e.addClass(s, true); // Call addClass with remove option
    return this;
  }

  /**
   * attr
   * ATTR
   * @description  set or return attr
   * @return this or attr
   */
  function attr(str, s = false, r = false, { e = this } = {}) {
    if (str && isString(str)) {
      if (r) {
        e.removeAttribute(str);
        return this;
      }

      if (isString(s) || typeof s === "number") {
        e.setAttribute(str, s);
        return this;
      }
      if (!s) {
        const a = e.getAttribute(str);
        return a;
      }
    }
  }

  /**
   * removeAttr
   * REMOVEATTR
   * @return this
   */
  function removeAttr(str, { e = this } = {}) {
    attr(str, { s: false, r: true });
    return this;
  }

  /**
   * rpx
   * RPX
   * @description  Remove px, %, em from a number
   * @return  number
   */
  function rpx(s, { e = this } = {}) {
    s = s.toString();
    s = s.replace(/px/g, "");
    s = s.replace(/%/g, "");
    s = s.replace(/em/g, "");

    s = Math.round(Number(s));

    return s;
  }
  /**
   * cs
   * CS
   * @description  Get computed styles of element
   * @return computed stryles of an element
   */
  function cs(prop, trim = true, { e = this } = {}) {
    // there is no
    if (prop == "rotate") {
      return getCurrentRotation(e);
    }
    if (prop === "position") {
      return e.style.position;
    }
    // these are not computed values but you may need them and forget you can just do e.offset*
    if (prop === "offsetLeft") {
      return e.offsetLeft;
    }
    if (prop === "offsetTop") {
      return e.offsetTop;
    }
    if (prop === "offsetHeight") {
      return e.offsetHeight;
    }
    if (prop === "offsetWidth") {
      return e.offsetHeight;
    }
    let cs = getComputedStyle(e).getPropertyValue(prop) || null;
    if (trim && isNumber(cs)) {
      try {
        cs = rpx(cs);
      } catch (er) {
        console.error(er);
      }
    }
    return cs;
  }

  /**
   * observe
   * OBSERVE
   * @description observer generator
   * @return obj
   */
  function observe(
    fn,
    {
      name = "name",
      delay = 10,
      child = true,
      attr = true,
      subtree = false,
      attrs = ["none"],
      chardat = false,
      attrsOV = false,
      chardatOV = false,
      e = this,
    }
  ) {
    if (typeof fn !== "function") {
      return;
    }
    // configuration of the observer
    const config = {
      childList: child,
      attributes: attr,
      characterData: chardat,
      subtree: subtree,
      attributeFilter: attrs,
      attributeOldValue: attrsOV,
      characterDataOldValue: chardatOV,
    };

    // create an observer instance
    const ob = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        // handle attributes seperately if passed in i.e if you dont pass any attrs in then it will only spy on DOM/node changes

        if (mutation.type === "attributes") {
          if (attrs[0] !== "none") {
            e.delay({
              time: delay,
              fn: () => {
                fn(e);
              },
            });
          }
        } else {
          if (attrs[0] === "none") {
            if (
              mutation.type === "childList" ||
              mutation.type === "subtree" ||
              mutation.type === "characterData"
            ) {
              e.delay({
                time: delay,
                fn: () => {
                  fn(e);
                },
              });
            } // end childList
          }
        }
      });
    });

    // To see a list of named observers do:

    // observers with the same name are overwritten
    if (e.observers[name]) {
      e.observers[name].disconnect();
      delete e.observers[name];
    }
    // add to observers object for tracking in order to disconnect later, pass in target nodes, and observer config
    e.observers[name] = ob;
    e.observers[name].observe(e, config);

    return this;
  } // end observe

  /**
   * unobserve
   * UNOBSERVE
   * @description unobserve element
   * @return this
   */
  function unobserve(name = "name", { e = this } = {}) {
    // disconnect all
    if (name === "all") {
      const ok = Object.keys(e.observers);
      for (const o of ok) {
        delete e.observers[o];

        o.disconnect();
      }
    } else {
      if (e.observers[name]) {
        e.observers[name].disconnect();
        delete e.observers[name];
      }
    }
    return this;
  }
  /**
   * getobservers
   * GETOBSERVERS
   * @description Get list of observers
   * @return {array}
   */
  function getobservers({ e = this } = {}) {
    const ok = Object.keys(e.observers);
    return ok;
  }

  /**
   * append
   * APPEND
   * @description append text or html or nodes to caller
   * @return this
   */
  function append(str, { e = this } = {}) {
    if (isElement(str)) {
      e.appendChild(str);
    } else {
      let html = e.innerHTML;
      e.innerHTML = `${html}${str}`;
    }
    return this;
  }

  /**
   * prepend
   * PREPEND
   * @description prepend text or html or nodes to caller
   * @return this
   */
  function prepend(str, { e = this } = {}) {
    let html = e.innerHTML;
    e.innerHTML = "";

    if (isElement(str)) {
      e.appendChild(str);
      e.append(html);
      e.innerHTML = e.innerHTML.trim();
    } else {
      e.innerHTML = `${str}${html}`;
    }
    return this;
  }

  /**
   * prependTo
   * PREPENDTO
   * @description Prepend element to another
   * @return this to maintain chain
   */
  function prependTo(str, { e = this } = {}) {
    if (!str) {
      return this;
    }

    __To(str, true, { e: e });
    return this;
  }

  /**
   * appendTo
   * APPENDTO
   * @description Append element to another
   * @return this to maintain chain
   */
  function appendTo(str, { e = this } = {}) {
    if (!str) {
      return this;
    }

    __To(str, false, { e: e });
    return this;
  }
  /**
   * _to
   * _TO
   * @description internal function for appendTo etc
   * @return this to maintain chain
   */
  function __To(str, p = false, { e = this } = {}) {
    if (isString(str)) {
      // Only append to first one found
      const to = document.querySelectorAll(str)[0];
      if (!to) {
        return this;
      }
      if (p) {
        to.prepend(e);
      } else {
        to.append(e);
      }
    }
    if (isElement(str)) {
      if (p) {
        str.prepend(e);
      } else {
        str.append(e);
      }
      return this;
    }
  }

  /**
   * runq
   * RUNQ
   * @description A queue - each chained function that calls runq must set e.isrun to false when done running
   * @return null
   */
  function runq({ e = this } = {}) {
    let fn;
    if (!e.isrun) {
      e.isrun = true;
      if (e.q) {
        fn = e.q.shift();
        if (isFunction(fn)) {
          fn(e);
          runq();
        }
      }
    }
    return null;
  }

  /**
   * delay
   * DELAY
   * @description delay exection of next chained function and run optional funtion
   * @return {object}
   */
  function delay(
    {
      e = this,
      time = 1000,
      iterate = false,
      autocalc = false,
      step = 1,
      duration = false,
      fn = false,
      fps = false,
      force = false,
    },
    options = {}
  ) {
    // fps overides time and uses fps
    var ee = e;
    if (isNumber(fps)) {
      // time is now fps
      options["fps"] = fps;
      fps = Math.round(1000 / fps);

      // Auto calculate number of iterations based on fps so you don't have to set them if using endTime.
      // All this does is make sure that there are more than enough iterations to run so that it doesnt end
      // before endTime. It's up to you to to send in a correct endTime (epoch) and check / diff endTime with a start time in fn then end your delay set early.
      /*
    // EXAMPLE endTime usage in fn - set endTime to current date plus 1 minute
    // send in endTime to delay as endTime:
     let dt = new Date();
     let t = dt.getTime();
     let dur = 1 * 1000 * 60; // set autocalc to 1 or 2 minutes
     let endTime = t+dur; // so endTime: endTime


     if(stage.endTime){
       let curTime = new Date().getTime();
         if(curTime > stage.endTime){
         stage.kill();
        return;
      }
     }
   */
      // auto calculate iterations based on endTIme
      if (autocalc && options.endTime) {
        const curTime = new Date().getTime();
        let diff = options.endTime - curTime;
        diff = Math.round(diff / 1000);
        let itercalc = fps * diff;
        itercalc = Math.round(itercalc / 100) * 100;
        options["itercalc"] = itercalc;
        iterate = itercalc;
      }
    } // end if fps

    // if iterate doesn't get autocalced and assigned above and was not passed in set it to at least 1
    if (!iterate) {
      iterate = 1;
    }

    // pass in iterate to options for fn
    options["iterate"] = iterate;
    let stepper = 0; // for increasing step
    let iterator = iterate;
    // this will force it to run in case something has isrun set to true
    if (force) {
      e.isrun = false;
    }

    // loop iterate amount of times and add more delays

    for (let i = 0; i < iterate; i++) {
      let intv;
      const f = function (e) {
        const d = new Date();
        const fut = d.getTime() + time;

        if (fps) {
          intv = requestInterval(function () {
            if (isFunction(fn)) {
              stepper += step;
              // round stepper to nearest decimal
              stepper = +stepper.toFixed(2);
              iterator = iterator - 1;
              options["step"] = stepper;
              options["iteration"] = iterate - iterator;
              options["iterationsLeft"] = iterate - (iterate - iterator);
              options["frame"] = iterate - iterator;
              options["el"] = e;

              // kill this set of iterations
              options["kill"] = function () {
                e.q.splice(0, iterate - (iterate - iterator));
                e.isrun = false;
              };

              // add kill function to self for this set of iterations
              e.kill = options["kill"];

              // send all params including self , stepper and iterator as iteration as object param to fn
              fn(e, options);
            }
            e.isrun = false;
            e.runq = e.runq.bind(e);
            e.runq({ e: e });
            // added this setting to false here to fix having to do the force above
            e.isrun = false;
            // clearInterval(intv)
            intv.clear();
          }, fps); // was 1 here but time seems more appropriate
        } else {
          intv = requestInterval(function (ee) {
            const newd = new Date();
            if (newd.getTime() >= fut) {
              if (isFunction(fn)) {
                stepper += step;
                // round stepper to nearest decimal
                stepper = +stepper.toFixed(2);
                iterator = iterator - 1;
                options["step"] = stepper;
                options["iteration"] = iterate - iterator;
                options["iterationsLeft"] = iterate - (iterate - iterator);
                options["el"] = e;

                // kill this set of iterations
                options["kill"] = function () {
                  e.q.splice(0, iterate - (iterate - iterator));
                  e.isrun = false;
                };

                // add kill function to self for this set of iterations
                e.kill = options["kill"];

                // send all params including self , stepper and iterator as iteration as object param to fn
                fn(e, options);
              }
              e.isrun = false;
              e.runq = e.runq.bind(e);
              //  e.runq();
              e.runq({ e: e });
              // added this setting to false here to fix having to do the force above
              e.isrun = false;
              // clearInterval(intv)
              intv.clear();
            }
          }, time); // was 1 here but time seems more appropriate
        }
      };

      e.q.push(f);
    }
    // gotta kickit off
    if (e.q.length) {
      e.runq = e.runq.bind(e);
      //e.runq();
      e.runq({ e: e });
    }

    return this;
  }

  /* EVENTS */

  /**
   * on
   * ON
   * @description Adds an event to an element
   * @return this
   */
  function on(etype = "mousedown", handler, cap = false, e = this) {
    let userCap = cap;
    // If cap is sent in as boolean then set capture to true
    if (typeof cap === "boolean") {
      if (cap) {
        userCap = {
          capture: true,
        };
      } else {
        userCap = {
          capture: false,
        };
      }
    }
    // Note do e.preventDefault() in the handlier
    const types = etype.split(",");
    for (let t of types) {
      // Let here instead of const because t is immediately mutated
      t = t.trim();
      e.addEventListener(t, handler, userCap);
    }
    return this;
  }

  /**
   * removeEvent / off
   * REMOVEEVENT OFF
   * @description Triggers an event
   * @return this
   */
  function off(etype = "mousedown", handler, cap = false, e = this) {
    const y = e;
    let userCap = cap;
    // If cap is sent in as boolean then set capture to true
    if (typeof cap === "boolean") {
      if (cap) {
        userCap = {
          capture: true,
        };
      } else {
        userCap = {
          capture: false,
        };
      }
    }

    const types = etype.split(",");
    for (const t of types) {
      y.removeEventListener(t.trim(), handler, userCap);
    }
    return this;
  }

  /**
   * trigger
   * TRIGGER
   * @description Triggers an event
   * @return collection
   */
  function trigger(event, { e = this } = {}) {
    const y = e;
    const ev = new Event(event);
    y.dispatchEvent(ev, {
      bubbles: true,
      cancelable: true,
    });
    return this;
  }

  /**
   * text
   * TEXT
   * @description set text of caller
   * @return this
   */
  function text(str, { e = this } = {}) {
    let text = e.textContent;
    if (!str || str.length < 1) {
      return text;
    }
    e.innerHTML = str;
    return this;
  }

  /**
   * html
   * HTML
   * @description set HTML of caller
   * @return this
   */
  function html(str, { e = this } = {}) {
    let html = e.innerHTML;
    if (!str || str.length < 1) {
      return html;
    }
    e.innerHTML = str;
    return this;
  }

  /**
   * css
   * CSS
   * @description set css of caller
   * @return this
   */

  function css(str, { add = true, e = this } = {}) {
    if (!add) {
      e.style.cssText = str;
    } else {
      e.style.cssText = e.style.cssText + str;
    }
    return this;
  }

  /**
   * requestInterval
   * REQUESTINTERVAL
   * @description replacement for setInterval for smooth animations
   * @return {object}
   * @usage
   * intv = requestInterval(function(){console.log('interval1')},2000);
   * intv.clear()
   */
  window.requestInterval = function (callback, delay) {
    const dateNow = Date.now;
    const requestAnimation = window.requestAnimationFrame;
    let start = dateNow();
    let stop;
    var intervalFunc = function () {
      dateNow() - start < delay || ((start += delay), callback());
      stop || requestAnimation(intervalFunc);
    };
    requestAnimation(intervalFunc);
    return {
      clear: function () {
        stop = 1;
      },
      start: function () {
        dateNow();
      },
    };
  };

  /**
   * isString
   * ISSTRING
   * @description check if string is a string
   * @return boolean
   */
  function isString(thing) {
    return typeof thing === "string";
  }

  /**
   * isNumber
   * ISNUMBER
   * @description check if string is a number
   * @return boolean
   */
  function isNumber(value) {
    return /^-{0,1}\d+$/.test(value);
  }

  /**
   * isEmpty
   * ISEMPTY
   *@description  Internal helper function to Check if Object is an empty opject.
   * @return  boolean
   *
   */
  function isEmpty(obj) {
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * isFunction
   * ISFUNCTION
   * @description check if parameter is a function
   * @return boolean
   */
  function isFunction(thing) {
    return typeof thing === "function";
  }

  /**
   * isObject
   * ISOBJECT
   * @description check if parameter is an object
   * @return boolean
   */
  function isObject(thing) {
    if (Object.prototype.toString.call(thing).slice(8, -1) === "Object") {
      return true;
    } else {
      return false;
    }
  }

  /**
   * isElement
   * ISELEMENT
   * @description check if parameter is a DOM element
   * @return boolean
   */
  function isElement(thing) {
    return thing.nodeType == 1;
  }

  /**
   * isArray
   * ISARRAY
   * @description check if parameter is an array
   * @return boolean
   */
  function isArray(thing) {
    if (Array.isArray(thing)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * filterString
   * FILTERSTRING
   * @description filter a string of non printable chars
   * @return string
   */

  function filterString(str, strict = false) {
    str = str.replace(/[^\x20-\x7E]+/g, "");
    if (strict) {
      str = str.replace(/[^a-z0-9-#]+|\s+/gim, "");
    }
    str = str.trim();
    return str;
  }

  /**
   * PLG
   * plg
   * @description activate plugin
   * @return this
   */
  function plg({
    e = this,
    name = "",
    fn = () => {}, //dummy function by default
    vdata = {},
    concat = false,
  } = {}) {
    lobj[name] = fn;
    return this;
  } // end plg

  /**
   * each
   * EACH
   * @description query and run a function on all elements in collection
   * @return this
   */
  function each({ e = this, sel = null, fn = () => {} } = {}) {
    if (!isnode(e)) {
      e = document;
    }
    // split , delim list
    if (sel) {
      const selectors = sel.split(",");
      for (let s of selectors) {
        s = s.trim();

        let col = e.querySelectorAll(s);
        col.forEach((c) => {
          init(c);
          fn(c);
        });
      }
    }

    return this;
  }

  /**
   * grab
   * GRAB
   * @description use grab as an easier syntax for select to query the DOM and return nodes
   * @return array
   */

  function grab(
    sel = null,
    { e = this, first = true, all = false, fn = () => {} } = {}
  ) {
    if (all) {
      first = false;
    }
    let grabbed = e.select({ e: e, first: first, sel: sel, fn: fn });
    return grabbed;
  }

  /**
   * select
   * SELECT
   * @description query and run a function on all elements in collection and return the collection
   * @return array
   */

  function select({ e = this, first = false, sel = null, fn = () => {} } = {}) {
    if (!isnode(e)) {
      e = document;
    }
    let stk = [];

    // split , delim list
    if (sel) {
      const selectors = sel.split(",");
      for (let s of selectors) {
        s = s.trim();

        let col = e.querySelectorAll(s);
        col.forEach((c) => {
          stk.push(c);

          init(c);
          fn(c);
        });
      }
    }
    if (stk.length) {
      if (first && stk.length) {
        return stk[0];
      } else {
        return stk;
      }
    } else {
      return false;
    }
  }

  /**
   * init
   * INIT
   * @description initialize elements
   * @return this
   */
  function init(e) {
    // add everything from lobj to each instance
    for (const i in lobj) {
      const key = i;
      if (isFunction(lobj[i])) {
        if (e.nodeName !== "#document") {
          e[key] = e[key] || lobj[i].bind(e);
        }
      } else {
        e[key] = e[key] || lobj[i];
      }
    }
  } //end init

  return lobj;
} //end Lib

const tfuz = new Tfuz();
