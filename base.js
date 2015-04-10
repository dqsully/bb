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

function getTouchById(e, id) {
  for(var i=0; i<e.touches.length; i++) {
    if(e.touches[i].identifier == id) return e.touches[i];
  }
  return null;
}
// End Library


// Begin EventListeners
window.addEventListener('load', function () {
  //#icon-cont
  d('icons-cont').addEventListener('wheel', function(e) {menuScroll(e.deltaY);});
  window.addEventListener('resize', menuResize);
  //#icon-menu
  d('icon-menu').addEventListener('mousedown', menuDown);
  d('icon-menu').addEventListener('pointerdown', menuDown);
  d('icon-menu').addEventListener('touchstart', menuTouchDown);
  document.addEventListener('mousemove', menuMove);
  document.addEventListener('pointermove', menuMove);
  document.addEventListener('touchmove', menuTouchMove);
  document.addEventListener('mouseup', menuUp);
  document.addEventListener('pointerup', menuUp);
  document.addEventListener('touchend', menuTouchUp);
  d('icon-menu').addEventListener('click', menuToggle);
  //#icon-add
  d('icon-add').addEventListener('click', iconAdd);
  //#icon-search
  d('icon-search').addEventListener('click', iconSearch);
  //#icon-adjust
  d('icon-adjust').addEventListener('click', iconAdjust);
  //#icon-diff
  d('icon-diff').addEventListener('click', iconDiff);
  //#icon-account
  d('icon-account').addEventListener('click', iconAccount);
  //#icon-settings
  // d('icon-settings').addEventListener('click', iconSettings);
});
// End EventListeners

//#icon-menu
var iti;

var i;
var b;
var irs;
var bls;
var s;
var ic;
window.addEventListener('load', function() {
  i = d('icon-menu');
  b = d('body');
  irs = d('icons-right-shadow');
  bls = d('body-left-shadow');
  s = d('sidebar');
  ic = d('icons-cont');
});

var menuPos;
var menuD = false;
var menuS;
var menuM = false;
var t;
var m;
var rm = 71;
var sm = 0;
function menuToggle() {
  if(!menuM) {
    if(s.className == 't') {
      s.className = '';
      b.className = '';
    } else {
      s.className = 't';
      b.className = 't';
    }
  }
  if(s.className == 't') {
    irs.style.opacity = 0;
    bls.style.opacity = 1;
  } else {
    irs.style.opacity = 1;
    bls.style.opacity = 0;
  }
  menuM = false;
}
function menuDown(e) {
  menuD = true;
  menuPos = e.pageX;
  rm = r(s);
  menuS = rm;
  e.stopPropogation();
}
function menuTouchDown(e) {
  iti = e.targetTouches[0].identifier;
  menuD = true;
  menuPos = e.targetTouches[0].pageX;
  rm = r(s);
  menuS = rm;
  e.stopPropogation();
}
function menuMove(e) {
  if(menuD) {
    // t = performance.now();
    menuM = true;
    document.body.className = 'g';
    m = e.pageX-menuPos;
    s.className = 'm';
    b.className = 'm';
    irs.className = 'i m';
    bls.className = 'i m';
    if(m+menuS>70) {
      if(m+menuS<350) {
        s.style.transform = 'translate(-' + (350 - m - menuS) + 'px)';
        b.style.transform = 'translate(' + (m + menuS - 70) + 'px)';
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
        irs.style.opacity = 0;
        bls.style.opacity = 1;
        rm = 351;
      }
    } else {
      s.style.transform = '';
      b.style.transform = '';
      irs.style.opacity = '1';
      bls.style.opacity = '0';
      rm = 71;
    }
    // console.log('menuMove took ' + (performance.now()-t) + ' milliseconds to run');
    e.stopPropogation();
  }
}
function menuTouchMove(e) {
  if(menuD) {
    // t = performance.now();
    menuM = true;
    document.body.className = 'g';
    m = getTouchByID(e, iti).pageX-menuPos;
    s.className = 'm';
    b.className = 'm';
    irs.className = 'i m';
    bls.className = 'i m';
    if(m+menuS>70) {
      if(m+menuS<350) {
        s.style.transform = 'translate(-' + (350 - m - menuS) + 'px)';
        b.style.transform = 'translate(' + (m + menuS - 70) + 'px)';
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
        irs.style.opacity = 0;
        bls.style.opacity = 1;
        rm = 351;
      }
    } else {
      s.style.transform = '';
      b.style.transform = '';
      irs.style.opacity = '1';
      bls.style.opacity = '0';
      rm = 71;
    }
    // console.log('menuMove took ' + (performance.now()-t) + ' milliseconds to run');
    e.stopPropogation();
  }
}
function menuUp(e) {
  if(menuM) {
    document.body.className = '';
    irs.className = 'i';
    bls.className = 'i';
    if(s.className == 'm') {
      s.className = '';
      b.className = '';
    } else if(s.className == 'm t') {
      s.className = 't';
      b.className = 't';
    }
    if(rm>=210) {
      s.className = 't';
      b.className = 't';
    }
    s.style.transform = '';
    b.style.transform = '';
  }
  if(s.className == 't') {
    irs.style.opacity = 0;
    bls.style.opacity = 1;
  } else {
    irs.style.opacity = 1;
    bls.style.opacity = 0;
  }
  menuD = false;
  if(e.target !== i) {
    menuM = false;
  }
  e.stopPropogation();
}
function menuTouchUp(e) {
  if(menuM) {
    document.body.className = '';
    irs.className = 'i';
    bls.className = 'i';
    if(s.className == 'm') {
      s.className = '';
      b.className = '';
    } else if(s.className == 'm t') {
      s.className = 't';
      b.className = 't';
    }
    if(rm>=210) {
      s.className = 't';
      b.className = 't';
    }
    s.style.transform = '';
    b.style.transform = '';
  }
  if(s.className == 't') {
    irs.style.opacity = 0;
    bls.style.opacity = 1;
  } else {
    irs.style.opacity = 1;
    bls.style.opacity = 0;
  }
  menuD = false;
  if(getTouchById(e, iti).target !== i) {
    menuM = false;
  }
  e.stopPropogation();
}
function menuScroll(d) {
  if(ic.offsetHeight > icons.offsetHeight) {
    // sm += e.deltaY * 16;
    if(navigator.browser == 'Firefox') {
      sm += d * 16;
    } else {
      sm += d;
    }
    if(sm + icons.offsetHeight < ic.offsetHeight && sm > 0) {
      ic.style.marginTop = '-' + sm + 'px';
    } else if(sm + icons.offsetHeight >= ic.offsetHeight) {
      sm = ic.offsetHeight - icons.offsetHeight;
      ic.style.marginTop = '-' + sm + 'px';
    } else if(sm < 0) {
      ic.style.marginTop = '0';
      sm = 0;
    }
  }
}

function menuResize() {
  if(sm + icons.offsetHeight >= ic.offsetHeight) {
    sm = ic.offsetHeight - icons.offsetHeight;
    ic.style.marginTop = '-' + sm + 'px';
  }
  if(sm < 0) {
    ic.style.marginTop = '0';
    sm = 0;
  }
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
