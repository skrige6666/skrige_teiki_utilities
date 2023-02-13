// ==UserScript==
// @name         Yurikagami_plus
// @namespace    https://kurone.co/
// @version      0.3
// @description  try to take over the world!
// @author       skrige
// @match        https://csyuki.sakura.ne.jp/cgi-bin/prism/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sakura.ne.jp
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle(`
div,h1,h2,h3{
  box-sizing: border-box;
}
body{
  margin:0;
  padding:0;
}
body>p,
body>dl{
  max-width: 1280px;
  margin: auto;
}

body>div:not(#stylebot){
  max-width: 1280px;
  margin:auto;
  background: white;
  padding:0.2em 1rem;
}

.index .head .menu{
  min-width: calc(88px + 1em);
}
body>h1+div.menu:not(#stylebot){
  position: relative;
  display: flex;
  flex-direction: row;
  width:100%;
  font-size:0.92em;
  left:auto;
  border-left: 1px solid
}
body>h1+div.menu:not(#stylebot)> div{
  padding:0 0.5em;
  margin:auto;
}

table.list{
  max-width: 1280px;
  width:100%;
  margin:auto;
}
table.list tr:nth-child(2n+1){
  background: #f8f8ff;
}
body>section,body>h2,body>h3,body>form,body>ul,body>table,body>hr{
  max-width: 1280px !important;
  margin-right:auto !important;
  margin-left:auto !important;
}

h1{
  max-width: 1280px;
  margin:0 auto;
  background: #033;
  color:white;
  padding: 1rem;
}
h2{
  margin: 0;
  margin-bottom: 0.4em;
  border-left: solid 0.3em #800;
  padding:0.3em;
  padding-left: 0.5em;
  background-color:#a00;
  color:white;
}
h3{
  border-bottom: dashed 1px;
}
h3::before{
  content:"◆ ";
}
h3+p{
  margin-left: 1em;
}
body > div.battle:not(#stylebot){
  padding-left:2rem;
}

body > div.battle:not(#stylebot) > div,
body > div.battle:not(#stylebot) > h2{
  margin-left:-1rem;
}


div.plact:not(.atset),
div.coact:not(.atset),
div.vsact:not(.atset){
  font-size:1.2em;
}

div.plact .res,
div.coact .res,
div.vsact .res{
  font-size:0.83em;
  background: rgba(128,128,152,0.05);
  background-blend-mode: multiply;
  padding:0.1em 1em;
}


div.plact:not(:empty){
  text-align: left;
  padding:0.4em 10%;
  background: #eef;
  position: relative;
}

div.plact:not(:empty)::after{
  position:absolute;
  opacity: 0.06;
  font-size:2em;
  font-weight:bolder;
  right: 10%;
  bottom :-0.2em;
  content:"Party's Action";
}
div.coact:not(:empty){
  text-align: left;
  padding:0.4em 10%;
  background: #efe;
  position: relative;
}
div.coact:not(:empty)::after{
  position:absolute;
  opacity: 0.06;
  font-size:2em;
  font-weight:bolder;
  right: 10%;
  bottom :-0.2em;
  content:"Ally's Action";
}
div.vsact:not(:empty){
  text-align: right;
  padding:0.4em 10%;
  background: #fee;
  position: relative;
}
div.vsact:not(:empty)::after{
  position:absolute;
  opacity: 0.06;
  font-size:2em;
  font-weight:bolder;
  left:10%;
  bottom :-0.2em;
  content:"Enemy's Action";
}
div.noact,div.land,div.finish{
  text-align: center;
  padding:0;
}
div.noact{
  background: #eee;
  padding:0.4em 10%;

}
div.battle table.bstat{
  margin:auto;
}
table.bstat td{
  padding:0.1em 0.48em;
}

div.reward{
  text-align: left;
}
table.stat,table.item{
  width:100%;
  margin-right:auto;
  margin-left:auto;
}
td.gazo{
  max-width:205px;
  text-align: center;
}
#map img{
  vertical-align:bottom;
}
`);

})();






