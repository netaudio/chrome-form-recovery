function render() {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[!_vm.isVisible ? 'hidden' : '', ['boundary-' + _vm.submenuBoundary]],attrs:{"id":"quickAccess"}},[(_vm.isEmpty)?_c('p',[_vm._v("I found nothing! :(")]):_vm._e(),_vm._v(" "),_vm._l((Object.keys(_vm.data)),function(dataType){return [(_vm.data[dataType])?_c('ul',{staticClass:"entry-list"},[_vm._l((_vm.data[dataType].entries),function(entry){return [_c('entry-item',{attrs:{"entry":entry,"editable":_vm.editable,"isSess":dataType === 'sess'}})]})],2):_vm._e()]}),_vm._v(" "),_c('ul',{class:[_vm.submenu.show ? 'visible' : '', 'submenu'],style:({ top: _vm.submenu.posY + 'px' })},[_vm._l((_vm.submenu.entries),function(subEntry){return (_vm.submenu.entries)?[_c('entry-item',{attrs:{"entry":subEntry,"editable":_vm.submenu.editable,"isSub":true}})]:_vm._e()})],2),_vm._v(" "),_c('ul',{staticClass:"footer"},[_c('li',[_c('div',{staticClass:"fill selectable",on:{"click":function($event){_vm.openRecovery()}}},[_vm._v("Browse all entries")]),_vm._v(" "),_c('div',{staticClass:"flex-icon selectable",attrs:{"data-tooltip":"Show keyboard shortcuts"},on:{"click":function($event){_vm.openKeyboardShortcutsModal()}}},[_c('span',{staticClass:"icon-keyboard"})]),_vm._v(" "),_c('div',{staticClass:"flex-icon selectable",attrs:{"data-tooltip":"Disable Typio on this site"},on:{"click":function($event){_vm.disableSite()}}},[_c('span',{staticClass:"icon-block"})])])])],2)}
var staticRenderFns = [];
export {render, staticRenderFns}