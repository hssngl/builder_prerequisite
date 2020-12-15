function parseConfig(input) {
  let config = {},
    attributes = input.split(";");

  for (var i = 0; i < attributes.length; i++) {
    let entry = attributes[i].split(":");
    let property = entry.splice(0, 1)[0].trim();
    if (property) config[property] = entry.join(":").trim();
  }
  return config;
}

const clickEvents = ["click"];
const focusEvents = ["mouseenter", "focus"];
const blurEvents = ["mouseleave", "blur"];

let lastClickedElement = null;

window.initTooltip = function ({ target, tooltip, config = {} }) {
  Popper.createPopper(target, tooltip, {
    ...config,
  });
};

let tooltips = document.querySelectorAll("[tooltip-on]");

// tooltips.forEach(tooltip => {

//     focusEvents.forEach((event) => {
//       target.addEventListener(event, () => {
//         tooltip.setAttribute("tooltip-show", "");
//       });
//     });

//     blurEvents.forEach((event) => {
//       target.addEventListener(event, () => {
//         tooltip.removeAttribute("tooltip-show", "");
//       });
//     });

// })

// document.body.addEventListener("focus", (e) => {
//   activate(e.target)
// });

// document.body.addEventListener("blur", (e) => {
//   deactivate(e.target)
// });
// // document.addEventListener("click", (e) => {
// //   if(lastClickedElement instanceof HTMLElement)
// //   {

// //     if(lastClickedElement === e.target)
// //     {
// //       decativate(e.target)
// //     }
// //   }
// //   else
// //   {

// //   }
// // });

// function activate(target) {
//   let id = target.getAttribute("element-id");
//   if (!id) return;

//   let tooltips = document.querySelectorAll(`[tooltip-id="${id}"]`);
//   tooltips.forEach((tooltip) => {
//     let type = tooltip.getAttribute("tooltip-type") || "hover";
//     if (type === "hover") {
//           tooltip.setAttribute("tooltip-show", "");
//     }
//     let rawConfig = tooltip.getAttribute("tooltip-config");
//     let config = undefined;
//     if (rawConfig) config = parseConfig(rawConfig);

//     window.initTooltip({ target, tooltip, config });
//   });
// }

// function deactivate(target){

//   let id = target.getAttribute("element-id");
//   if (!id) return;

//   let tooltips = document.querySelectorAll(`[tooltip-id="${id}"]`);
//   tooltips.forEach((tooltip) => {
//     let type = tooltip.getAttribute("tooltip-type") || "hover";
//     if (type === "hover") {
//           tooltip.removeAttribute("tooltip-show", "");
//     }
//   });

// }

tooltips.forEach((tooltip) => {
  let type = tooltip.getAttribute("tooltip-type") || "hover";
  let id = tooltip.getAttribute("tooltip-on");
  let target = document.querySelector(`[element-id="${id}"]`);

  if (type === "hover") {
    focusEvents.forEach((event) => {
      target.addEventListener(event, () => {
        tooltip.setAttribute("tooltip-show", "");
        let rawConfig = tooltip.getAttribute("tooltip-config");
        let config = undefined;
        if (rawConfig) config = parseConfig(rawConfig);

        window.initTooltip({ target, tooltip, config });
      });
    });

    blurEvents.forEach((event) => {
      target.addEventListener(event, () => {
        tooltip.removeAttribute("tooltip-show", "");
      });
    });
  }
});

clickEvents.forEach((event) => {
  document.body.addEventListener(event, (e) => {
    if (lastClickedElement instanceof HTMLElement) {
      let lastId = lastClickedElement.getAttribute("element-id");
      if (!lastId) return;
      let tooltips = document.querySelectorAll(`[tooltip-on="${lastId}"]`);
      tooltips.forEach((tooltip) => {
        tooltip.removeAttribute("tooltip-show", "");
      });
    }


    if(lastClickedElement === e.target){
      return;
      lastClickedElement = undefined;
    }
    let id = e.target.getAttribute("element-id");
    if (!id) return;
    let tooltips = document.querySelectorAll(`[tooltip-on="${id}"]`);

    tooltips.forEach((tooltip) => {
      tooltip.setAttribute("tooltip-show", "");
      let type = tooltip.getAttribute("tooltip-type");
      if (type === "toggle") return;
      let rawConfig = tooltip.getAttribute("tooltip-config");
      let config = undefined;
      if (rawConfig) config = parseConfig(rawConfig);

      window.initTooltip({ target: e.target, tooltip, config });
    });

    lastClickedElement = e.target;
  });
});
