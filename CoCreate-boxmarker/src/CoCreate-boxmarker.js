
let hover = new initHoverBoxmarker();
let click = new initSelectBoxmarker(hover);



  const watchOverElement = function (entries) {
       hover.update();
  };
  const watchClickElement = function (entries) {
       click.update();
  };
  
document.addEventListener('dndsuccess',()=>{
  hover.update();
  click.update();
})




function computeStyles(el, properties) {
  let computed = window.getComputedStyle(el);
  let result = {};
  properties.forEach((property) => {
    result[property] = parseInt(computed[property]);
  });
  return result;
}

function initHoverBoxmarker() {
  let boxmarker = document.createElement("div");
  boxmarker.classList.add('box-marker')
  boxmarker.style.backgroundColor = "transparent";
  boxmarker.style.position = "absolute";
  boxmarker.style.border = "2px solid blue";
  boxmarker.style.pointerEvents = "none";
  boxmarker.style.zIndex = "999999";

  document.body.appendChild(boxmarker);

  this.target;

  this.update = function update(element = this.target) {
   
    if (!element) return;

    if (element.getAttribute("tooltip") === "false") return;

    boxmarker.style.display = "block";
    this.target = element;

    let rect = this.target.getBoundingClientRect();
    let {
      borderTop,
      borderBottom,
      borderLeft,
      borderRight,
    } = computeStyles(this.target, [
      "borderTop",
      "borderBottom",
      "borderLeft",
      "borderRight",
    ]);

    boxmarker.style.top = rect.top + window.scrollY + "px";
    boxmarker.style.left = rect.left + window.scrollX + "px";
    boxmarker.style.width = rect.width - borderLeft - borderRight + "px";
    boxmarker.style.height = rect.height - borderTop - borderBottom + "px";

  };

  this.hide = function hide() {
    boxmarker.style.display = "none";
  };
  document.addEventListener("mouseover", (e) => {

    this.update(e.target);
    let watch = new ResizeObserver(watchOverElement);
    watch.observe(e.target);
  });
}




function initSelectBoxmarker(hoverInstance) {
  let boxmarker = document.createElement("div");
  boxmarker.classList.add('box-marker')
  boxmarker.style.backgroundColor = "transparent";
  boxmarker.style.position = "absolute";
  boxmarker.style.border = "2px solid red";
  boxmarker.style.pointerEvents = "none";
  boxmarker.style.zIndex = "999999";

  document.body.appendChild(boxmarker);

  this.target;
  // let lastRect = { top: undefined, left: undefined };

  this.update = function update(element = this.target) {

    if (!element) return;
    if (element.getAttribute("tooltip") === "false") return;

    this.target = element;

    if (this.target === hoverInstance.target) {
      hoverInstance.hide();
    }
    boxmarker.style.display = "block";
    let lastRect = this.target.getBoundingClientRect();
    let {
      borderTop,
      borderBottom,
      borderLeft,
      borderRight,
    } = computeStyles(this.target, [
      "borderTop",
      "borderBottom",
      "borderLeft",
      "borderRight",
    ]);

    boxmarker.style.top = lastRect.top + window.scrollY + "px";
    boxmarker.style.left = lastRect.left + window.scrollX + "px";
    boxmarker.style.width = lastRect.width - borderLeft - borderRight + "px";
    boxmarker.style.height = lastRect.height - borderTop - borderBottom + "px";

 
  };

  document.addEventListener("click", (e) => {
    this.update(e.target);
    let watch = new ResizeObserver(watchClickElement);
    watch.observe(e.target);
  });

  this.hide = function hide() {
    boxmarker.style.display = "none";
  };
  document.addEventListener("mouseup", (e) => {
    // if(this.target !== e.target)
    //   this.hide()
  });
  // document.addEventListener("mouseup", (e) => {
  //   let rect = e.target.getBoundingClientRect();
  //   if (rect.top !== lastRect.top || rect.left !== lastRect.left)
  //     boxmarker.style.display = "none";
  // });
}
