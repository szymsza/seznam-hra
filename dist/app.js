!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);class i{static say(e,t=!1){if(!window.sound&&""!=e)return!1;if(t&&("array"==typeof e||"object"==typeof e))return i.say(e[Math.floor(Math.random()*e.length)]);if("string"==typeof e)return responsiveVoice.speak(e,"Czech Female",{onstart:this._openMouth,onend:this._closeMouth});var n=this;responsiveVoice.speak(e[0],"Czech Female",{onstart:n._openMouth,onend:function(){if(n._closeMouth(),e.shift(),!e.length)return!1;var t=100;"number"==typeof e[0]&&(t=e[0]),setTimeout(function(){"number"==typeof e[0]&&e.shift(),n.say(e)},t)}})}static _openMouth(){$(".hund>img").attr("src","assets/imgs/seznam_hund.gif")}static _closeMouth(){$(".hund>img").attr("src","assets/imgs/seznam_hund.png")}static play(e){if(!window.sound)return!1;new Audio("assets/audio/"+e).play()}static toggleSound(){$(".hund>span>img").attr("src","assets/imgs/sound-o"+(window.sound?"ff":"n")+".png"),window.sound=!window.sound,window.sound||(i.say(""),setTimeout(i._closeMouth,200))}}class o{constructor(e,t){++window.game.currentPlayer>=window.game.players.length&&(window.game.currentPlayer=0),this.page=t,this.data=e,this.isGuessed=!1}render(){var e=this.data[0].text,t=this.data[1].text,n=["Myslíš si, že je vyhledávanější "+e+", nebo "+t+"?","Je podle tebe vyhledávanější "+e+", nebo "+t+"?","Jaký dotaz lidé zadávají častěji? "+e+", nebo "+t],o=n[Math.floor(Math.random()*n.length)],s=["Nyní je na řadě ","Teď bude hrát ","Pozor pozor, přichází ","Na řadu se dostává "],a=s[Math.floor(Math.random()*s.length)];window.game.players.length>1?($(".points .tab .active").removeClass("active"),$(".points .tab:nth-child("+(parseInt(window.game.currentPlayer)+1)+") a").addClass("active"),i.say([a+window.game.players[window.game.currentPlayer].name,o])):($(".points .tab a").addClass("active"),i.say(o)),this._fillCard(this.page.find(".row .col:first-child .card"),this.data[0]),this._fillCard(this.page.find(".row .col:nth-child(2) .card"),this.data[1]),this.page.find(".button-wrapper").hide()}_fillCard(e,t){e.find(".card-action").text(t.text),e.find("img").attr("src",t.image),e.find(".card-title").toggleClass("winning",t.count==this.data.winner).text(t.countText).hide(),e.off().on("click",function(){this.isGuessed||this._makeGuess(t)}.bind(this))}_makeGuess(e){this.isGuessed=!0,this.data.winner==e.count?(i.play("right.mp3"),i.say(["Máš pravdu, "+e.text+" je vyhledávanější.","Je to tak. Jupí!","Taky si myslím, dobrá práce.","Přesně tak. Jen tak dál!"],!0),$("li:nth-child("+(parseInt(window.game.currentPlayer)+1)+") .points_received").text(++window.game.players[window.game.currentPlayer].points)):(i.play("wrong.mp3"),i.say(["Mrzí mě to, ale není to tak","Bohužel tvá odpověď není správná","Bylo to těsné, ale ne","Příště se zadaří","Tentovkát to bohužel "+e.text+" není","Bohužel, "+e.text+" je méně vyhledávaný"],!0)),this._updatePoints(),this.page.find(".card-title, .button-wrapper").fadeIn(350),this.page.find(".button-wrapper").off().on("click",function(){var e=new s;window.game.questions.length?e.move("questions"):(e.move("finished"),this._endGame())}.bind(this))}_endGame(){if(window.game.players.sort(function(e,t){return e.points>t.points?-1:e.points<t.points?1:0}),window.game.players.length>1)var e="Gratuluji hráči "+window.game.players[0].name+" k vítězství!";else{var t=window.game.players[0].points;e="Získal jsi "+t+" bod"+(1==t?"":t>4||0==t?"ů":"y")+" z "+$(".points .points_total")[0].innerText+"."}i.say(["Konec hry!",e,"Chceš hrát znovu?"])}_updatePoints(){$(".points_received").text(window.game.points)}static loadQuestions(){$.ajax("api",{data:{type:"question",categories:window.selectedCategories,settings:window.gameSettings}}).done(function(e){window.game.questions=e,window.game.currentPlayer=-1,$(".points li:nth-child(n+2)").remove();for(let e in window.game.players){let t=window.game.players[e];if(!$(".points li:nth-child("+(parseInt(e)+1)+")").length)$(".points li:first-child").clone().appendTo($(".points ul"));$(".points li:nth-child("+(parseInt(e)+1)+")").find(".points_name").text(t.name)}$(".points_total").text(e.length/window.game.players.length),$(".points_received").text(0),(new s).move("questions")})}}class s{constructor(){this.afterMove={login:function(e){e.find("button").off().on("click",function(){var e=new s;"single"==$(this).data("type")?(window.game={players:[{name:"Skóre",points:0}]},e.move("settings"),i.say(["tak fajn, budeme si hrát spolu","přizpůsob si hru podle svých představ"])):e.move("multiplayer")})},categories:function(e){i.say(["vyber si své soutěžní otázky"]),e.find("input[type=checkbox]").off().on("change",function(){var e=$(this).parent().next();if(!e.hasClass("subcategories"))return!1;e.find("input").prop("checked",this.checked)}),e.find(".subcategories input[type=checkbox]").off().on("change",function(){var e=$(this).parent().parent(),t=e.prev().find("input")[0];return this.checked?t.checked=!0:!e.find("input:checked").length&&void(t.checked=!1)}),e.find("button").off().on("click",function(){if(!e.find("input[type=checkbox]:checked").length)return i.say("vyber si prosím kategorie, se kterými chceš hrát");var t=[];e.find(".col input:checked").each(function(){t.push($(this).data("value"))}),window.selectedCategories=t,o.loadQuestions()})},questions:function(e){new o(window.game.questions[0],e).render(),window.game.questions.shift()},settings:function(e){e.find("button").off().on("click",function(){window.gameSettings={difficult:$("input[name=difficult]:checked").val(),period:$("input[name=period]:checked").val(),rounds:$("input[name=rounds]:checked").val()*window.game.players.length},(new s).move("categories")})},finished:function(e){var t=$(".points .points_total")[0].innerText;if(window.game.players.length>1){for(let e in window.game.players){let n=window.game.players[e];$("#page-finished .multi-result ol").append("<li>"+n.name+" ("+n.points+" z "+t+")")}$("#page-finished .multi-result").show(),$("#page-finished .single-result").hide()}else $("#page-finished .single-result").find(".points_received").text(window.game.players[0].points),$("#page-finished .single-result").find(".points_total").text(t),$("#page-finished .multi-result").hide(),$("#page-finished .single-result").show();e.find("button").off().on("click",function(){(new s).move("login")})},multiplayer:function(e){i.say(["zadej prosím jména jednotlivých hráčů"]),$(document).on("click",".remove-row",function(){$(this).closest(".row").remove()}),e.find(".add-row").off().on("click",function(){var e=$("#page-multiplayer .container .row:first-child").clone();e.find("input").val(""),e.insertAfter($("#page-multiplayer .container .row:nth-last-child(2)")),e.find("input").focus()}),e.find(".continue-button").off().on("click",function(){var t=[];(e.find("input[type=text]").each(function(){var e=$(this).val().trim();if(""==e)return i.say("Vyplň prosím jména všech hráčů."),t=!1,!1;t.push({name:e,points:0})}),t)&&(window.game={players:t},(new s).move("settings"))})}}}move(e){var t=this;if(!$("#pages>div:visible").length)return this._showPage(e);$("#pages>div:visible").fadeOut(200,function(){t._showPage(e)})}_showPage(e){var t=$("#pages>#page-"+e),n=this;t.fadeIn(200,function(){$(".points").toggleClass("hide","questions"!=e);var i=n.afterMove[e];i&&i(t)})}}function a(){i.say(["haf haf!","ahoj seznamáku!","vítej ve hře Pes se ptá","moje jméno je Krasty, jsem pes ze seznamu a budu tě touto hrou provázet","chceš hrát sám, nebo s přáteli?"])}$(document).ready(function(){var e=new s;e.move("login"),setTimeout(function(){document.hasFocus()?a():$(window).one("focus",a)},500),$(".hund>img").click(function(){i.say("haf haf")}),$(".home-icon").click(function(){e.move("login")}),window.sound=!0,$(".hund>span>img").click(i.toggleSound)})}]);