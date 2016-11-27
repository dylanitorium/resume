import smoothScroll from 'smooth-scroll';
import gumshoe from 'gumshoe';
import Sticky from 'sticky-js';
import SVGInjector from 'svg-injector';
require ('../css/styles.css');

const sticky = new Sticky('[data-sticky]');
const nav = document.querySelectorAll('.nav')[0];
const toggle = document.querySelectorAll('[data-nav-toggle]')[0];
const toggleOff = document.querySelectorAll('[data-nav-off]');
const toggleClass = (target, className) => {
  if (target.classList.contains(className)) {
      target.classList.remove(className);
  } else {
      target.classList.add(className);
  }
}
for(var item of toggleOff){
  item.addEventListener('click', (event) => {
    toggleClass(nav, 'is-active');
    toggleClass(toggle, 'is-active');
  })
}
toggle.addEventListener('click', (event) => {
  event.preventDefault();
  toggleClass(nav, 'is-active');
  toggleClass(toggle, 'is-active');
});


smoothScroll.init({
  offset: '20px',
});
gumshoe.init({
  activeClass: 'is-active', // Class to apply to active navigation link and it's parent list item
});
SVGInjector(document.querySelectorAll('[data-svg-embed]'))
