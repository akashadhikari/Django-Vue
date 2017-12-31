import { createSimpleTransition, createJavaScriptTransition } from '../../util/helpers';

import ExpandTransitionGenerator from './expand-transition';

// Component specific transitions
export var VBottomSheetTranstion = createSimpleTransition('bottom-sheet-transition');
export var VCarouselTransition = createSimpleTransition('carousel-transition');
export var VCarouselReverseTransition = createSimpleTransition('carousel-reverse-transition');
export var VTabTransition = createSimpleTransition('tab-transition');
export var VTabReverseTransition = createSimpleTransition('tab-reverse-transition');
export var VMenuTransition = createSimpleTransition('menu-transition');
export var VFabTransition = createSimpleTransition('fab-transition', 'center center', 'out-in');

// Generic transitions
export var VDialogTransition = createSimpleTransition('dialog-transition');
export var VDialogBottomTransition = createSimpleTransition('dialog-bottom-transition');
export var VFadeTransition = createSimpleTransition('fade-transition');
export var VScaleTransition = createSimpleTransition('scale-transition');
export var VSlideXTransition = createSimpleTransition('slide-x-transition');
export var VSlideXReverseTransition = createSimpleTransition('slide-x-reverse-transition');
export var VSlideYTransition = createSimpleTransition('slide-y-transition');
export var VSlideYReverseTransition = createSimpleTransition('slide-y-reverse-transition');

// JavaScript transitions
export var VExpandTransition = createJavaScriptTransition('expand-transition', ExpandTransitionGenerator());
export var VRowExpandTransition = createJavaScriptTransition('row-expand-transition', ExpandTransitionGenerator('datatable__expand-col--expanded'));

export default install;
/* istanbul ignore next */
function install(Vue) {
  Vue.component('v-bottom-sheet-transition', VBottomSheetTranstion);
  Vue.component('v-carousel-transition', VCarouselTransition);
  Vue.component('v-carousel-reverse-transition', VCarouselReverseTransition);
  Vue.component('v-dialog-transition', VDialogTransition);
  Vue.component('v-dialog-bottom-transition', VDialogBottomTransition);
  Vue.component('v-fab-transition', VFabTransition);
  Vue.component('v-fade-transition', VFadeTransition);
  Vue.component('v-menu-transition', VMenuTransition);
  Vue.component('v-scale-transition', VScaleTransition);
  Vue.component('v-slide-x-transition', VSlideXTransition);
  Vue.component('v-slide-x-reverse-transition', VSlideXReverseTransition);
  Vue.component('v-slide-y-transition', VSlideYTransition);
  Vue.component('v-slide-y-reverse-transition', VSlideYReverseTransition);
  Vue.component('v-tab-reverse-transition', VTabReverseTransition);
  Vue.component('v-tab-transition', VTabTransition);
  Vue.component('v-expand-transition', VExpandTransition);
  Vue.component('v-row-expand-transition', VRowExpandTransition);
}