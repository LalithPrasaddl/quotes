const k=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}};k();function b(n,e){if(!n)return null;var t=document.createElement(n);if(n==="img")O(t,e);else if(e&&Object.keys(e).length>0)for(var r=Object.keys(e),o=0;o<r.length;o++){var i=r[o];i==="style"?p(t,e[i]):i==="className"?a(t,e[i]):i.indexOf("data-")>-1?t.setAttribute(i,e[i]):t[i]=e[i]}return t}function a(n,e){var t=typeof e;if(t==="string")n.classList.add(e);else if(Array.isArray(e)&&e.length>0)for(var r=0;r<e.length;r++){var o=e[r];n.classList.add(o)}}function L(n,e){var t=typeof e;if(t==="string")n.classList.remove(e);else if(Array.isArray(e)&&e.length>0)for(var r=0;r<e.length;r++){var o=e[r];n.classList.remove(o)}}function p(n,e){if(!n)return null;if(e&&Object.keys(e).length>0)for(var t=Object.keys(e),r=0;r<t.length;r++){var o=t[r];n.style[o]=e[o]}}function v(n){if(!n.type)return null;var e=b(n.type,n.elmAttrs);if(n.elmAttrs&&n.elmAttrs.id){var t=document.getElementById(n.elmAttrs.id);t&&(t.innerHTML="",e=t)}if(n.childElms)for(var r=0;r<n.childElms.length;r++){var o=n.childElms[r];if(o.onlyAppend)e.append(o.content);else{var i=v(o);e.append(i)}}return e}function O(n,e){if(!n)return null;var t=null,r=null,o=e.src,i=e.imageObject;i&&i.imageURL?(t=i.imageURL,r=i.darkURL,t===r&&(r=r+"&bgc=0,0,0")):o&&(t=o,r=o);var s=m();if(o=s?r:t,r&&n.setAttribute("data-darksrc",r),t&&n.setAttribute("data-lightsrc",t),o&&(n.src=o),a(n,"opacityZero"),n.onload=function(T){L(n,"opacityZero")},e&&Object.keys(e).length>0)for(var h=Object.keys(e),w=["src","imageObject"],d=0;d<h.length;d++){var u=h[d];w.indexOf(u)===-1&&(u==="style"?p(n,e[u]):u==="className"?a(n,e[u]):u.indexOf("data-")>-1?n.setAttribute(u,e[u]):n[u]=e[u])}}function m(){return window.matchMedia("(prefers-color-scheme: dark)").matches}function I(){var n=document.getElementsByTagName("img"),e=m();if(n&&n.length>0)for(var t=0;t<n.length;t++){var r=n[t],o=r.dataset;e?o.darksrc&&(a(r,"opacityZero"),r.src=o.darksrc):o.lightsrc&&(a(r,"opacityZero"),r.src=o.lightsrc)}}window.matchMedia("(prefers-color-scheme: dark)").addListener(function(n){setTimeout(function(){I()},100)});const E=7e3,l={currIndex:-1},y=["When you see a problem, you don\u2019t complain about it, instead you try to find a way and solve it.","You don't just dream big, but you wake up and work hard (really hard) to achieve it.","You don't just think about yourself, you care for the causes which affects the nature and the future of human beings.","You do what needs to be done, not what is easy, nor what is normal.","You don't give up when you fail, you try to find out what went wrong, you learn from your mistakes and come back stronger.","You don\u2019t lose confidence when things are not going your way and you stay humble while you are on the peak of success.","You are confined only by the walls you build YOURSELF.","Dont go with the flow. Be the flow.","If you want to be successful, you must respect one rule - Never Lie to Yourself.","No matter how hard you try, You will always miss out on something in life. Let's just enjoy the moment.","Everything you have ever wanted is on the other side of Fear.","Simplicity is the ultimate sophistication.","The greatest prison we live in, is what other people think.","Better to be a warrior in a garden, than a gardener in a war.","Love is giving someone the power to destroy you, and trust he/she won't do it.","Do not stop when you are tired, stop when you are done."];let c=null;x();function x(){const n=document.getElementById("app"),e=f();c&&clearInterval(c),g(),n.append(e)}function f(n){c&&clearInterval(c),g(),n==="decrement"?l.currIndex-=1:l.currIndex+=1,l.currIndex>=y.length&&(l.currIndex=0),l.currIndex<0&&(l.currIndex=0);const e={type:"div",elmAttrs:{id:"quotes"},childElms:[{type:"h1",elmAttrs:{innerHTML:y[l.currIndex]}}]};return v(e)}document.addEventListener("touchstart",function(n){f()},!1);document.addEventListener("keydown",function(n){[39,40].indexOf(n.keyCode)>-1&&f(),[37,38].indexOf(n.keyCode)>-1&&f("decrement")});function g(){c=setInterval(()=>{f()},E)}