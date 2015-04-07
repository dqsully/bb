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
// End Library


// Begin EventListeners
window.addEventListener('load', function () {
  //#icon-menu
  d('icon-menu').addEventListener('mousedown', menuDown);
  document.addEventListener('mousemove', menuMove);
  document.addEventListener('mouseup', menuUp);
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
var menuPos;
var menuD = false;
var menuS;
var menuM = false;
function menuToggle() {
  var m = d('sidebar');
  var b = d('body');
  if(!menuM) {
    if(m.className == 't') {
      m.className = '';
      b.className = '';
    } else {
      m.className = 't';
      b.className = 't';
    }
  }
  if(m.className == 't') {
    d('icons-right-shadow').style.opacity = 0;
    d('body-left-shadow').style.opacity = 1;
  } else {
    d('icons-right-shadow').style.opacity = 1;
    d('body-left-shadow').style.opacity = 0;
  }
  menuM = false;
}
function menuDown(e) {
  menuD = true;
  menuPos = e.pageX;
  menuS = width(d('sidebar'));
}
function menuMove(e) {
  if(menuD) {
    menuM = true;
    document.body.style.cursor = 'grabbing';
    d('icon-menu').style.cursor = 'grabbing';
    var m = e.pageX-menuPos;
    d('sidebar').className = 'm';
    d('body').className = 'm';
    d('icons-right-shadow').className = 'i m';
    d('body-left-shadow').className = 'i m';
    if(m+menuS>70) {
      if(m+menuS<350) {
        d('sidebar').style.width = m + menuS + 'px';
        d('body').style.left = m + menuS + 1 + 'px';
        if(m+menuS-70<140) {
          d('icons-right-shadow').style.opacity = 1 - (m+menuS-70)/140;
        } else {
          d('body-left-shadow').style.opacity = (m+menuS-210)/140;
        }
      } else {
        d('sidebar').className = 'm t';
        d('sidebar').style.width = '';
        d('body').className = 'm t';
        d('body').style.left = '';
        d('icons-right-shadow').style.opacity = 0;
        d('body-left-shadow').style.opacity = 1;
      }
    } else {
      d('sidebar').style.width = '';
      d('body').style.left = '';
      d('icons-right-shadow').style.opacity = '1';
      d('body-left-shadow').style.opacity = '0';
    }
  }
}

function menuUp(e) {
  var m = d('sidebar');
  var b = d('body');
  if(menuM) {
    document.body.style.cursor = '';
    d('icon-menu').style.cursor = '';
    d('icons-right-shadow').className = 'i';
    d('body-left-shadow').className = 'i';
    if(m.className == 'm') {
      m.className = '';
      b.className = '';
    } else if(m.className == 'm t') {
      m.className = 't';
      b.className = 't';
    }
    console.log(width(m));
    if(width(m)>=210) {
      m.className = 't';
      b.className = 't';
    }
    m.style.width = '';
    b.style.left = '';
  }
  if(m.className == 't') {
    d('icons-right-shadow').style.opacity = 0;
    d('body-left-shadow').style.opacity = 1;
  } else {
    d('icons-right-shadow').style.opacity = 1;
    d('body-left-shadow').style.opacity = 0;
  }
  menuD = false;
  if(e.target !== d('icon-menu')) {
    menuM = false;
  }
}

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
