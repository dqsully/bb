// Begin Library
function box(el) {
  return el.getBoundingClientRect();
}
function x(el) {
  return box(el).left;
}
function y(el) {
  return box(el).top;
}
function width(el) {
  return box(el).width;
}
function height(el) {
  return box(el).height;
}
function t(el) {
  return box(el).top;
}
function b(el) {
  return box(el).bottom;
}
function l(el) {
  return box(el).left;
}
function r(el) {
  return box(el).right;
}
function d(el) {
  return document.getElementById(el);
}

outclicks = [];
function outclickpush(elem, func) {
  outclicks.push([elem,func]);
}
document.addEventListener('click' ,function(e) {
  var miss;
  var tmp = [];
  var cont = false;
  do {
    miss = outclicks.pop();
    if(miss === undefined) break;
    if(typeof miss == "object" && typeof miss[0] == "object" && typeof miss[1] == "function") {
      if(e.target === miss[0]) {
        tmp.push(miss);
      } else {
        if(miss[1](e) === false) tmp.push(miss);
        else cont = true;
      }
    }
  } while(!cont);
  for(var i = 0; i<tmp.length; i++) {
    outclicks.push(tmp[i]);
  }
});

navigator.sayswho= (function(){
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!== null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!== null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();

navigator.browser= (function(){
    var ua= navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!== null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    return M[1];
})();

function getTouchByID(e, id) {
  for(var i=0; i<e.touches.length; i++) {
    if(e.touches[i].identifier == id) return e.touches[i];
  }
  return null;
}

function ab(a, b, n) {
  if(n === undefined) {
    while(a.parentElement !== null) {
      if(a==b) return true; else a = a.parentElement;
    }
  } else {
    for(var i=0; i<n; i++) {
      if(a.parentElement===null) break;
      if(a==b) return true; else a = a.parentElement;
    }
  }
  return false;
}
// End Library


// Begin EventListeners
window.addEventListener('load', function () {
  //#icon-cont
  d('icons-cont').addEventListener(   'wheel',          function(e) {menuScroll(e.deltaY, true);});
  window.addEventListener(            'resize',         menuResize);
  d('icons-cont').addEventListener(   'mousedown',      function(e) {iconsDown(e.pageY, e.target);});
  d('icons-cont').addEventListener(   'pointerdown',    function(e) {iconsDown(e.pageY, e.target);});
  d('icons-cont').addEventListener(   'touchstart',     function(e) {iconsDown(e.targetTouches[0].pageY, e.targetTouches[0].target);iti=e.targetTouches[0].identifier;});
  document.addEventListener(          'mousemove',      function(e) {iconsMove(e.pageY);});
  document.addEventListener(          'pointermove',    function(e) {iconsMove(e.pageY);});
  document.addEventListener(          'touchmove',      function(e) {if(iconsD) {e.preventDefault();iconsMove(getTouchByID(e, iti).pageY);}});
  document.addEventListener(          'mouseup',        function()  {iconsUp();});
  document.addEventListener(          'pointerup',      function()  {iconsUp();});
  document.addEventListener(          'touchend',       function()  {iconsUp();});
  //#icon-menu
  d('icon-menu').addEventListener(    'mousedown',      function(e) {menuDown(e.pageX);});
  d('icon-menu').addEventListener(    'pointerdown',    function(e) {menuDown(e.pageX);});
  d('icon-menu').addEventListener(    'touchstart',     function(e) {menuDown(e.targetTouches[0].pageX);mti=e.targetTouches[0].identifier;});
  document.addEventListener(          'mousemove',      function(e) {menuMove(e.pageX);});
  document.addEventListener(          'pointermove',    function(e) {menuMove(e.pageX);});
  document.addEventListener(          'touchmove',      function(e) {if(menuD) {e.preventDefault();menuMove(getTouchByID(e, mti).pageX);}});
  document.addEventListener(          'mouseup',        function(e) {menuUp(e.target, false);});
  document.addEventListener(          'pointerup',      function(e) {menuUp(e.target, false);});
  document.addEventListener(          'touchend',       function(e) {menuUp(e.target, true);});
  d('icon-menu').addEventListener(    'click',          menuToggle);
  d('icon-menu').addEventListener(    'mouseenter',     function(e) {tryTip(d('tip-icon-menu'));});
  d('icon-menu').addEventListener(    'mouseleave',     function(e) {stopTip(d('tip-icon-menu'));});
  d('icon-menu').addEventListener(    'contextmenu',    function(e) {ctxTip(e, d('tip-icon-menu'));});
  //#icon-add
  d('icon-add').addEventListener(     'click',          iconAdd);
  d('icon-add').addEventListener(     'mouseenter',     function(e) {tryTip(d('tip-icon-add'));});
  d('icon-add').addEventListener(     'mouseleave',     function(e) {stopTip(d('tip-icon-add'));});
  d('icon-add').addEventListener(     'contextmenu',    function(e) {ctxTip(e, d('tip-icon-add'));});
  //#icon-search
  d('icon-search').addEventListener(  'click',          iconSearch);
  d('icon-search').addEventListener(  'mouseenter',     function(e) {tryTip(d('tip-icon-search'));});
  d('icon-search').addEventListener(  'mouseleave',     function(e) {stopTip(d('tip-icon-search'));});
  d('icon-search').addEventListener(  'contextmenu',    function(e) {ctxTip(e, d('tip-icon-search'));});
  //#icon-adjust
  d('icon-adjust').addEventListener(  'click',          iconAdjust);
  d('icon-adjust').addEventListener(  'mouseenter',     function(e) {tryTip(d('tip-icon-adjust'));});
  d('icon-adjust').addEventListener(  'mouseleave',     function(e) {stopTip(d('tip-icon-adjust'));});
  d('icon-adjust').addEventListener(  'contextmenu',    function(e) {ctxTip(e, d('tip-icon-adjust'));});
  //#icon-diff
  d('icon-diff').addEventListener(    'click',          iconDiff);
  d('icon-diff').addEventListener(    'mouseenter',     function(e) {tryTip(d('tip-icon-diff'));});
  d('icon-diff').addEventListener(    'mouseleave',     function(e) {stopTip(d('tip-icon-diff'));});
  d('icon-diff').addEventListener(    'contextmenu',    function(e) {ctxTip(e, d('tip-icon-diff'));});
  //#icon-account
  d('icon-account').addEventListener( 'click',          iconAccount);
  d('icon-account').addEventListener( 'mouseenter',     function(e) {tryTip(d('tip-icon-account'));});
  d('icon-account').addEventListener( 'mouseleave',     function(e) {stopTip(d('tip-icon-account'));});
  d('icon-account').addEventListener( 'contextmenu',    function(e) {ctxTip(e, d('tip-icon-account'));});
  //#icon-settings
  d('icon-settings').addEventListener('click',          iconSettings);
  d('icon-settings').addEventListener('mouseenter',     function(e) {tryTip(d('tip-icon-settings'));});
  d('icon-settings').addEventListener('mouseleave',     function(e) {stopTip(d('tip-icon-settings'));});
  d('icon-settings').addEventListener('contextmenu',    function(e) {ctxTip(e, d('tip-icon-settings'));});
});
// End EventListeners

//#icon-menu
var mti;
var iti;

var toolx = 0, tooly = 0;
var tooltiptimeout;
var tooltimeout;

var i;
var b;
var irs;
var bls;
var s;
var ic;
var tool;
var cs;
var title;
window.addEventListener('load', function() {
  i = d('icon-menu');
  b = d('body');
  irs = d('icons-right-shadow');
  bls = d('body-left-shadow');
  s = d('sidebar');
  ic = d('icons-cont');
  tool = d('tooltips');
  cs = d('content-shade');
  title = d('title');
});

var menuPos;
var menuD = false;
var menuS;
var menuM = false;
var rm = 71;
var sm = 0;
var iconsD = false;
var iconsPos;
function menuToggle() {
  if(!menuM) {
    if(s.className == 't') {
      s.className = '';
      b.className = '';
      bls.className = 'i';
      tool.style.transform = 'translate(' + (toolx = 0) + 'px, -' + tooly + 'px)';
      cs.className = 'i';
      irs.style.opacity = 1;
      bls.style.opacity = 0;
      title.style.transform = '';
    } else {
      s.className = 't';
      b.className = 't';
      bls.className = 'i t';
      tool.style.transform = 'translate(' + (toolx = 280) + 'px, -' + tooly + 'px)';
      irs.style.opacity = 0;
      bls.style.opacity = 1;
      cs.className = 'i s';
      title.style.transform = 'translate(40px)';
    }
  }
  menuM = false;
}
function menuDown(e) {
  menuD = true;
  menuPos = e;
  rm = r(s);
  menuS = rm;
}
function menuMove(e) {
  if(menuD) {
    // t = performance.now();
    menuM = true;
    document.body.className = 'g';
    m = e-menuPos;
    s.className = 'm';
    b.className = 'm';
    tool.className = 'i m';
    cs.className = 'i m';
    title.className = 'u m';
    irs.className = 'i m';
    bls.className = 'i m';
    if(m+menuS>70) {
      if(m+menuS<350) {
        s.style.transform = 'translate(-' + (350 - m - menuS) + 'px)';
        b.style.transform = 'translate(' + (m + menuS - 70)*6/7 + 'px)';
        bls.style.transform = 'translate(' + (m + menuS - 70) + 'px)';
        tool.style.transform = 'translate(' + (toolx = m + menuS - 70) + 'px, -' + tooly + 'px)';
        cs.style.opacity = (m+menuS-70)/280*0.2;
        title.style.transform = 'translate(' + (m + menuS - 70)/7 + 'px)';
        if(m+menuS-70<140) {
          irs.style.opacity = 1 - (m+menuS-70)/140;
        } else {
          bls.style.opacity = (m+menuS-210)/140;
        }
        rm = m + menuS;
      } else {
        s.className = 'm t';
        s.style.transform = '';
        b.className = 'm t';
        b.style.transform = '';
        bls.className = 'i m t';
        bls.style.transform = '';
        tool.style.transform = 'translate(' + (toolx = 280) + 'px, -' + tooly + 'px)';
        irs.style.opacity = '0';
        cs.style.opacity = '0.2';
        cs.className = 'i m s';
        title.style.transform = 'translate(40px)';
        bls.style.opacity = '1';
        rm = 351;
      }
    } else {
      s.style.transform = '';
      b.style.transform = '';
      bls.style.transform = '';
      tool.style.transform = 'translate(' + (toolx = 0) + 'px, -' + tooly + 'px)';
      irs.style.opacity = '1';
      cs.style.opacity = '';
      title.style.transform = '';
      bls.style.opacity = '0';
      rm = 71;
    }
    // console.log('menuMove took ' + (performance.now()-t) + ' milliseconds to run');
  }
}
function menuUp(e) {
  if(menuM) {
    document.body.className = '';
    irs.className = 'i';
    bls.className = 'i';
    title.className = 'u';
    tool.className = 'i';
    title.style.className = '';
    title.style.transform = '';
    if(s.className == 'm') {
      s.className = '';
      b.className = '';
      bls.className = 'i';
      cs.className = 'i';
    } else if(s.className == 'm t') {
      s.className = 't';
      b.className = 't';
      bls.className = 'i t';
      cs.className = 'i s';
      title.style.transform  = 'translate(40px)';
    }
    if(rm>=210) {
      s.className = 't';
      b.className = 't';
      bls.className = 'i t';
      tool.style.transform = 'translate(' + (toolx = 280) + 'px, -' + tooly + 'px)';
      title.style.transform = 'translate(40px)';
    } else tool.style.transform = 'translate(' + (toolx = 0) + 'px, -' + tooly + 'px)';
    s.style.transform = '';
    b.style.transform = '';
    bls.style.transform = '';
  }
  cs.style.opacity = '';
  if(s.className == 't') {
    irs.style.opacity = 0;
    cs.className = 'i s';
    bls.style.opacity = 1;
  } else {
    irs.style.opacity = 1;
    cs.className = 'i';
    bls.style.opacity = 0;
  }
  menuD = false;
  if(e !== i && menuM) {
    menuM = false;
  }
}
function menuScroll(d, b) {
  if(ic.offsetHeight > icons.offsetHeight) {
    // sm += e.deltaY * 16;
    if(navigator.browser == 'Firefox' && b === true) {
      sm += d * 16;
    } else {
      sm += d;
    }
    if(sm + icons.offsetHeight < ic.offsetHeight && sm > 0) {
      ic.style.transform = 'translate(0,-' + sm + 'px)';
      tool.style.transform = 'translate(' + toolx + 'px, -' + (tooly = sm) + 'px)';
    } else if(sm + icons.offsetHeight >= ic.offsetHeight) {
      sm = ic.offsetHeight - icons.offsetHeight;
      ic.style.transform = 'translate(0,-' + sm + 'px)';
      tool.style.transform = 'translate(' + toolx + 'px, -' + (tooly = sm) + 'px)';
    } else if(sm < 0) {
      ic.style.transform = '';
      sm = 0;
      tool.style.transform = 'translate(' + toolx + 'px, -' + (tooly = sm) + 'px)';
    }
  }
}
function menuResize() {
  if(sm + icons.offsetHeight >= ic.offsetHeight) {
    sm = ic.offsetHeight - icons.offsetHeight;
    ic.style.marginTop = '-' + sm + 'px';
    tool.style.transform = 'translate(' + toolx + 'px, -' + (tooly = sm) + 'px)';
  }
  if(sm < 0) {
    ic.style.marginTop = '0';
    sm = 0;
    tool.style.transform = 'translate(' + toolx + 'px, -' + (tooly = sm) + 'px)';
  }
}
function iconsDown(e, t) {
  if(!ab(t, i, 2)) {
    iconsD = true;
    iconsPos = e;
  }
}
function iconsMove(e) {
  if(iconsD) {
    document.body.className = 'g';
    menuScroll(iconsPos-e, false);
    iconsPos = e;
  }
}
function iconsUp() {
  document.body.className = '';
  iconsD = false;
}
function tryTip(t) {
  tooltiptimeout = setTimeout(function() {t.className = 'tip h';}, 1000);
}
function ctxTip(e, t) {
  e.preventDefault();
  t.className = 'tip h';
}
function stopTip(t) {
  clearTimeout(tooltiptimeout);
  t.className = 'tip';
}
//end #icon-menu

function iconAdd() {
}

function iconSearch() {
}

function iconAdjust() {
}

function iconDiff() {
}

function iconAccount() {
}

function iconSettings() {
}

//Begin Functions

//End Functions
