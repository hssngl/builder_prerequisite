// window.pro = new Proxy(window.localStorage, {
//   get: function (oTarget, sKey) {
//     console.log(1);
//     return oTarget[sKey] || oTarget.getItem(sKey) || undefined;
//   },
//   set: function (oTarget, sKey, vValue) {
//     console.log(2, sKey, vValue);
//     if (sKey in oTarget) {
//       return false;
//     }
//     return oTarget.setItem(sKey, vValue);
//   },
//   deleteProperty: function (oTarget, sKey) {
//     console.log(3);
//     if (sKey in oTarget) {
//       return false;
//     }
//     return oTarget.removeItem(sKey);
//   },
//   enumerate: function (oTarget, sKey) {
//     console.log(4);
//     return [1,2,3,4]
//   },
//   ownKeys: function (oTarget, sKey) {
//     console.log(5);
//     return {a:1,b:2,c:3}
//   },
//   has: function (oTarget, sKey) {
//     console.log(6);
//     return sKey in oTarget || oTarget.hasItem(sKey);
//   },
//   defineProperty: function (oTarget, sKey, oDesc) {
//     console.log(7);
//     if (oDesc && "value" in oDesc) {
//       oTarget.setItem(sKey, oDesc.value);
//     }
//     return oTarget;
//   },

// });



let m = new Map()
let a = {aa:22};
m.set(a, 33);

console.log(m.has(a)? 'yes' : 'no') 