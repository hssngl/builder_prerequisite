// listen click in canvas  to copy a said attribute to said attribute on the target


window.addEventListener("load", () => {
  window.selected2 = function selected2({
    sourceDocument,
    destDocument,
    wrap,
    newValueCB,
    elementSelector,
    targetSelector,
    source,
    destination,
    type = "post",
    eventType = "click",
  }) {
    let element =
      elementSelector === "*"
        ? sourceDocument
        : sourceDocument.querySelectorAll(elementSelector);
    let targets = destDocument.querySelectorAll(targetSelector);
    if (element && targets.length)
      element.addEventListener(eventType, (e) => {
        let element = e.target;
        if (element.hasAttribute(source))
          targets.forEach((target) => {
            let value = element.getAttribute(source);
            if (wrap) value = wrap.replace("$1", value);
            else if(newValueCB) value = newValueCB(element, target, value)
            target.setAttribute(destination, value);
          });
        if (type === "cut") element.removeAttribute(source);
      });
    else return false;
  };
});
