!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var r=e();for(var n in r)("object"==typeof exports?exports:t)[n]=r[n]}}("undefined"!=typeof self?self:this,(()=>(()=>{"use strict";var t,e,r,n,o={436:(t,e,r)=>{r.a(t,(async(t,e)=>{try{r(45);let t=window.Flxy||{};const n=location.origin.startsWith("https")?`${location.origin}/WeatherPro`:location.origin;console.log(`Base URL: ${n}`),t.template.setPrefix(`${n}/templates`),t.translator.setPrefix(`${n}/translations`),await t.translator.load("en"),t.api.configure({baseEndpoint:"https://api.openweathermap.org/data/2.5",headers:{},middlewares:[function(t){t.query.appid="948ba3af885728c1dd369e9f253c36ed"}]}),t.template.setConfig({defaults:{assetURL:`${n}/assets`}});const o=e=>{404===e.status&&t.router.navigate("/home")};t.router.handle(o),t.events.addListener(".drawer__nav","click",(()=>{document.querySelector(".drawer").classList.toggle("drawer--fullscreen")}));const i=()=>{const t=document.querySelector(".modal__content");t&&(t.style.display="none")};["click","touch","scroll"].forEach((t=>{document.addEventListener(t,i)})),e()}catch(t){e(t)}}),1)},45:()=>{const t="°",e=273.15,r=2,n="km",o=1e3,i="km/h",a=3.6,s="°",c="hPa",l="12-hour",u="%",d="%",p=[];function m(t){const[e,r]=t.split(" ");let[n,o]=e.split(":").map(Number);return"PM"===r&&12!==n&&(n+=12),"AM"===r&&12===n&&(n=0),60*n+o}function h(t,e,r=!1){const n=m(t);let o=m(e);r&&(o+=1440);const i=(function(){const t=new Date;return 60*t.getHours()+t.getMinutes()}()-n)/(o-n)*180;return Math.min(Math.max(i,0),180)}const y=Flxy.router,f=Flxy.template;y.register("/home",(async function(m){try{const w=p,g=await async function(m){if(m.length>0)return m;try{let m;try{console.log("location Date Started",new Date),m=await Flxy.location.get()}catch(t){console.log(t),m=await Flxy.location.get()}console.log("location Date Ended",new Date);let y=m.latitude,f=m.longitude;const w=await Flxy.api.get("/forecast",{query:{lat:y,lon:f}}),g=w.list.map(((p,m)=>function(p){const m=n=>(n-e).toFixed(r)+` ${t}`,h=t=>{const e=new Date(1e3*t);let r=e.getHours();const n=e.getMinutes().toString().padStart(2,"0");if("12-hour"===l){const t=r>=12?"PM":"AM";return r=r%12||12,`${r}:${n} ${t}`}return`${r.toString().padStart(2,"0")}:${n}`},y=p.city.sunrise,f=p.city.sunset,w=f,g=y,x=w-7200,b=g+7200,v=String(p.weather[0].icon).endsWith("n"),_=!v,$={sun:{sunrise:h(y),sunset:h(f)},night:{start:h(w),end:h(g)},moon:{rise:h(x),set:h(b)}},{sunrise:S,sunset:k}=$.sun,{start:q,end:D}=$.night;return{dt:p.dt,location:{city:p.city.name,country:p.city.country},weather:{condition:p.weather[0].main,description:p.weather[0].description,id:p.weather[0].icon,icon:`https://openweathermap.org/img/wn/${p.weather[0].icon}@2x.png`},temperature:{current:m(p.main.temp),feelsLike:m(p.main.feels_like),minimum:m(p.main.temp_min),maximum:m(p.main.temp_max)},part:_?"sun":"moon",pressure:`${p.main.pressure} ${c}`,humidity:`${p.main.humidity}${u}`,wind:{speed:`${(p.wind.speed*a).toFixed(2)} ${i}`,direction:`${p.wind.deg}${s}`},visibility:`${(p.visibility/o).toFixed(2)} ${n}`,clouds:`${p.clouds.all}${d}`,isDay:_,isNight:v,timezone:`${(p.city.timezone/3600).toFixed(1)} hours from UTC`,metadata:{timestamp:h(p.dt),source:p.base||"Unknown"},...$,rise:_?S:q,set:_?k:D,dt_txt:p.dt_txt,index:p.index}}({...p,city:w.city,index:m})));return h=g,p.push(...h),g}catch(t){return console.error("Error fetching weather data:",t),[]}var h}(w);m.list=g,m.weather=(y=m.query.dt||null,y?p.find((t=>t.dt==y)):p[0]),m.query.dt=m.weather.dt,m.list=function(t,e){const r=function(t){const e={};return t.forEach((t=>{const r=(n=t.dt,new Date(1e3*n).toISOString().split("T"));var n;e[r[0]]||(e[r[0]]=[]);let o=r[1].split(":");t.time=o.slice(0,o.length-1).join(":"),t.date=r[0],t.formattedDate=function(t){let e=new Date(t).toLocaleString("en-GB",{day:"2-digit",month:"short",year:"numeric",weekday:"long",hour:"2-digit",minute:"2-digit",hour12:!0});return e=e.replace(/am|pm/i,(t=>t.toUpperCase())),e.replace(",","")}(t.dt_txt),e[r[0]].push(t)})),e}(t);return Object.values(r).map((t=>t.map((t=>({...t,active:t.dt==e?"capsule--active":""})))))}(m.list,m.query.dt),await f.render("/home",m,{detail:{path:"/forecast"}}),async function(t){const{sunrise:e,sunset:r}=t.sun,{start:n,end:o}=t.night,{isDay:i}=t,a=document.querySelector(".half-circle"),s=document.querySelector(".circle-border-item"),{height:c}=function(t){const e=t.offsetWidth-40,r=e/2,n=r+2;return t.style.setProperty("--circle-width",`${e}px`),t.style.setProperty("--circle-border",`${n}px`),t.style.setProperty("--circle-border-width","2px"),{width:e,height:r,borderWidth:2,borderRadius:n}}(a),l=h(e,r),u=h(n,o,!0),d=i?l:u,{x:p,y:m}=function(t,e,r,n){const o=(t=t>=180?179:t)%180*(Math.PI/180);return{x:r+e*Math.cos(o),y:n-e*Math.sin(o)}}(d,c,c-15,c-18);s.style.right=p-10+"px",s.style.top=m-10+"px"}(m.weather),function(){const t=document.querySelector(".capsule--active");t&&t.scrollIntoView({behavior:"instant",block:"nearest",inline:"center"})}(),function(t){if(!t)return;const e=t.getAttribute("date"),r=document.querySelector(".drawer__item.drawer__item--active");r&&(r.innerHTML=e)}(document.querySelector(".capsule--active")),localStorage.getItem("a")||(document.querySelector(".modal__content").style.display="block",localStorage.setItem("a",Date.now()))}catch(t){console.error("Error processing /home route:",t)}var y}))}},i={};function a(t){var e=i[t];if(void 0!==e)return e.exports;var r=i[t]={exports:{}};return o[t](r,r.exports,a),r.exports}t="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",e="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",r="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",n=t=>{t&&t.d<1&&(t.d=1,t.forEach((t=>t.r--)),t.forEach((t=>t.r--?t.r++:t())))},a.a=(o,i,a)=>{var s;a&&((s=[]).d=-1);var c,l,u,d=new Set,p=o.exports,m=new Promise(((t,e)=>{u=e,l=t}));m[e]=p,m[t]=t=>(s&&t(s),d.forEach(t),m.catch((t=>{}))),o.exports=m,i((o=>{var i;c=(o=>o.map((o=>{if(null!==o&&"object"==typeof o){if(o[t])return o;if(o.then){var i=[];i.d=0,o.then((t=>{a[e]=t,n(i)}),(t=>{a[r]=t,n(i)}));var a={};return a[t]=t=>t(i),a}}var s={};return s[t]=t=>{},s[e]=o,s})))(o);var a=()=>c.map((t=>{if(t[r])throw t[r];return t[e]})),l=new Promise((e=>{(i=()=>e(a)).r=0;var r=t=>t!==s&&!d.has(t)&&(d.add(t),t&&!t.d&&(i.r++,t.push(i)));c.map((e=>e[t](r)))}));return i.r?l:a()}),(t=>(t?u(m[r]=t):l(p),n(s)))),s&&s.d<0&&(s.d=0)};var s=a(436);return s.default})()));