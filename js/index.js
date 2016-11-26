import smoothScroll from 'smooth-scroll';
import gumshoe from 'gumshoe';
import Sticky from 'sticky-js';
import SVGInjector from 'svg-injector';
require ('../css/styles.css');

var sticky = new Sticky('[data-sticky]');
smoothScroll.init({
  offset: '20px',
});
gumshoe.init({
  activeClass: 'nav__item--active', // Class to apply to active navigation link and it's parent list item
});

SVGInjector(document.querySelectorAll('[data-svg-embed]'))
