!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);class i{static say(e,t=!1){if(t&&("array"==typeof e||"object"==typeof e))return i.say(e[Math.floor(Math.random()*e.length)]);if("string"==typeof e)return responsiveVoice.speak(e,"Czech Female",{onstart:this._openMouth,onend:this._closeMouth});var n=this;responsiveVoice.speak(e[0],"Czech Female",{onstart:n._openMouth,onend:function(){if(n._closeMouth(),e.shift(),!e.length)return!1;var t=100;"number"==typeof e[0]&&(t=e[0]),setTimeout(function(){"number"==typeof e[0]&&e.shift(),n.say(e)},t)}})}static _openMouth(){$(".hund img").attr("src","imgs/seznam_hund.gif")}static _closeMouth(){$(".hund img").attr("src","imgs/seznam_hund.png")}}class o{constructor(e,t){this.page=t,this.data=e,this.isGuessed=!1}render(){var e=this.data[0].text,t=this.data[1].text;i.say(["Myslíš si, že je vyhledávanější "+e+", nebo "+t+"?","Je podle tebe vyhledávanější "+e+", nebo "+t+"?",["Jaký dotaz lidé zadávají častěji?",e+", nebo "+t]],!0),this._fillCard(this.page.find(".row .col:first-child .card"),this.data[0]),this._fillCard(this.page.find(".row .col:nth-child(2) .card"),this.data[1]),this.page.find(".button-wrapper").hide()}_fillCard(e,t){e.find(".card-action").text(t.text),e.find("img").attr("src",t.image),e.find(".card-title").text(t.countText).hide(),e.off().on("click",function(){this.isGuessed||this._makeGuess(t)}.bind(this))}_makeGuess(e){this.isGuessed=!0,this.data.winner==e.count?(i.say(["Máš pravdu, "+e.text+" je vyhledávanější.","Je to tak. Jupí!","Taky si myslím, dobrá práce.","Přesně tak. Jen tak dál!"],!0),window.game.points++):i.say(["Mrzí mě to, ale není to tak","Bohužel tvá odpověď není správná","Bylo to těsné, ale ne","Příště se zadaří","Tentovkát to bohužel "+e.text+" není","Bohužel, "+e.text+" je méně vyhledávaný"],!0),this._updatePoints(),this.page.find(".card-title, .button-wrapper").fadeIn(350),this.page.find(".button-wrapper").off().on("click",function(){var e=new s;window.game.questions.length?e.move("questions"):(e.move("finished"),this._endGame())}.bind(this))}_endGame(){var e=window.game.points;i.say(["Konec hry!","Získal jsi "+e+" bod"+(1==e?"":e>4||0==e?"ů":"y")+" z "+$(".points_total")[0].innerText+".","Chceš hrát znovu?"])}_updatePoints(){$(".points_received").text(window.game.points)}static loadQuestions(){$.ajax("api",{data:{type:"question",categories:window.selectedCategories,settings:window.gameSettings}}).done(function(e){window.game={questions:e,points:0},$(".points_total").text(e.length),$(".points_received").text(0),(new s).move("questions")})}}class s{constructor(){this.afterMove={login:function(e){e.find("button").off().on("click",function(){var e=new s;"single"==$(this).data("type")?i.say(["tak fajn, budeme si hrát spolu","přizpůsob si hru podle svých představ"]):i.say(["tohle napíšeme, až budeme mít singleplejer"]),e.move("settings")})},categories:function(e){i.say(["vyber si své soutěžní otázky"]),e.find("input[type=checkbox]").off().on("change",function(){var e=$(this).parent().next();if(!e.hasClass("subcategories"))return!1;e.find("input").prop("checked",this.checked)}),e.find(".subcategories input[type=checkbox]").off().on("change",function(){var e=$(this).parent().parent(),t=e.prev().find("input")[0];return this.checked?t.checked=!0:!e.find("input:checked").length&&void(t.checked=!1)}),e.find("button").off().on("click",function(){if(!e.find("input[type=checkbox]:checked").length)return i.say("vyber si prosím kategorie, se kterými chceš hrát");var t=[];e.find(".col input:checked").each(function(){t.push($(this).data("value"))}),window.selectedCategories=t,o.loadQuestions()})},questions:function(e){new o(window.game.questions[0],e).render(),window.game.questions.shift()},settings:function(e){e.find("button").off().on("click",function(){window.gameSettings={difficult:$("input[name=difficult]:checked").val(),period:$("input[name=period]:checked").val(),rounds:$("input[name=rounds]:checked").val()},(new s).move("categories")})},finished:function(e){e.find("button").off().on("click",function(){(new s).move("login")})}}}move(e){var t=this;if(!$("#pages>div:visible").length)return this._showPage(e);$("#pages>div:visible").fadeOut(200,function(){t._showPage(e)})}_showPage(e){var t=$("#pages>#page-"+e),n=this;t.fadeIn(200,function(){$(".points").toggleClass("hide","questions"!=e);var i=n.afterMove[e];i&&i(t)})}}function a(){i.say(["haf haf!","ahoj seznamáku!","vítej ve hře Pes se ptá, neboli já, Krasty, se ptám","chceš si hrát sám, nebo s přáteli?"])}$(document).ready(function(){(new s).move("login"),setTimeout(function(){document.hasFocus()?a():$(window).one("focus",a)},500),$(".hund img").click(function(){i.say("haf haf")})})}]);