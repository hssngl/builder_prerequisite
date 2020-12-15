/*global Element*/
/*global HTMLElement*/

window.addEventListener('load',() => {
  function context(state) {
    this.state = state;

    this.removeAttribute = (element, attName) => {
      if (this.state.has(element))
        delete this.state.get(element)["attributes"][attName];
    };

    this.hasAttribute = (element, attName) => {
      if (this.state.has(element))
        return this.state.get(element)["attributes"][attName] ? true : false;
    };

    this.getAttribute = (element, attName) => {
      if (this.state.has(element))
        return this.state.get(element)["attributes"][attName];
    };

    this.setAttribute = (element, attName, value) => {
      if (this.state.has(element))
        this.state.get(element).attributes[attName] = value;
      else
        this.state.set(element, { element, attributes: { [attName]: value } });
    };

    this.getAllAttributes = (element) => {
      if (this.state.has(element)) return this.state.get(element)["attributes"];
    };

    this.getDataset = (element) => {
      let dataset = {};
      for (let [key, value] of Object.entries(
        this.state.get(element)["attributes"]
      ))
        if (key.beginsWith("data-")) dataset[key.substr(5)] = value;

      return dataset;
    };
  }
  let state = new Map();
  window.CoCreateDomReader = { state };

  let domContext = new context(state);

  const domReader = {
    splitBydelimiter: (str, delimiter) => {
      return str.split(delimiter).map((s) => s.trim());
    },
    joinBydelimiter: (str, delimiter) => {
      return str.map((s) => s.trim()).join(delimiter);
    },
  };

  let allFrames = Array.from(window.frames);
  allFrames.unshift(window);

  for (let frame of allFrames) {
    let htmlPrototype = frame.HTMLElement.prototype;
    // let nativeSetAttribute = htmlPrototype.setAttribute;
    // htmlPrototype.setAttribute = function (attName, value) {
    //   if(this.getAttribute(attName) !== value)
    //   nativeSetAttribute.apply(this, [attName,value])
        
    // };
    let nativeSetAttribute = htmlPrototype.setAttribute;
    htmlPrototype.setAttribute = function (attName, value) {
      nativeSetAttribute.apply(this, [attName,value])
        
    };
    htmlPrototype.setHiddenAttribute = function (attName, value) {
      domContext.setAttribute(this, attName, value);
    };

    htmlPrototype.getHiddenAttribute = function (attName) {
      return domContext.getAttribute(this, attName);
    };

    htmlPrototype.getAllHiddenAttribute = function (attName) {
      return domContext.getAllAttributes(this);
    };

    htmlPrototype.getAnyAttribute = function (attName) {
      if (this.hasAttribute(attName)) return this.getAttribute(attName);
      else if (domContext.hasAttribute(this, attName))
        return domContext.getAttribute(this, attName);
    };

    htmlPrototype.setAnyAttribute = function (attName, value) {
      this.setAttribute(attName, value);
      domContext.setAttribute(this, attName, value);
    };

    htmlPrototype.removeAnyAttribute = function (attName) {
      this.removeAnyAttribute(attName);
      domContext.removeAttribute(this, attName);
    };

    htmlPrototype.hasAnyAttribute = function (attName, value) {
      return (
        this.hasAttribute(attName) || domContext.hasAttribute(this, attName)
      );
    };

    // todo: should this cause mutation
    htmlPrototype.hideAttribute = function (attName) {
      if (this.hasAttribute(attName)) {
        if (domContext.hasAttribute(this, attName)) return false;
        domContext.setAttribute(this, attName, this.getAttribute(attName));
        this.removeAttribute(attName);
      }
    };

    htmlPrototype.unhideAttribute = function (attName) {
      if (domContext.hasAttribute(this, attName)) {
        if (this.hasAttribute(attName)) return false;

        this.setAttribute(attName, domContext.getAttribute(this, attName));
        domContext.removeAttribute(this, attName);
      }
    };
  }
})
