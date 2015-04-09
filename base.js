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
  d('icon-menu').addEventListener('touchstart', function(e) {
    menuMove(e.touches[0]);
  });
  document.addEventListener('mousemove', menuMove);
  document.addEventListener('touchmove', function(e) {
    e.preventDefault();
    menuMove(e.touches[0]);
  });
  document.addEventListener('mouseup', menuUp);
  document.addEventListener('touchend', function(e) {
    menuUp(e.touches[0]);
  });
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
var i;
var b;
var irs;
var bls;
var s;
window.addEventListener('load', function() {
  i = d('icon-menu');
  b = d('body');
  irs = d('icons-right-shadow');
  bls = d('body-left-shadow');
  s = d('sidebar');
});

var menuPos;
var menuD = false;
var menuS;
var menuM = false;
var t;
var m;
var rm = 71;
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
  console.log('down');
  menuD = true;
  menuPos = e.pageX;
  rm = r(s);
  menuS = rm;
}
function menuMove(e) {
  if(menuD) {
    // t = performance.now();
    menuM = true;
    document.body.className = 'g';
    m = e.pageX-menuPos;
    console.log(m);
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
