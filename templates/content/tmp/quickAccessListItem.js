function render() {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.itemType !== 'entry' || (_vm.itemType === 'entry' && _vm.entry.isTextType()))?_c('li',[_c('div',{class:[_vm.selected ? 'selected' : '', 'selectable', _vm.itemSize && 'size-' + _vm.itemSize, 'fill'],attrs:{"data-tooltip":_vm.itemTooltip},on:{"click":function($event){_vm.commit()},"mouseenter":_vm.select,"mouseleave":_vm.unselect}},[(_vm.itemType === 'entry')?[(!_vm.isSess)?_c('span',{staticClass:"icon inner-fake-arrow icon-arrow-forward"},[_c('span',{attrs:{"data-tooltip":"Restore this entry (this entry was typed in another field)"}})]):_vm._e(),_vm._v(" "),_c('span',{domProps:{"innerHTML":_vm._s(_vm.entry.getPrintableValue({truncate: 80}))}})]:_vm._e(),_vm._v(" "),(_vm.itemType === 'link' && _vm.itemText)?[_vm._v(" "+_vm._s(_vm.itemText)+" ")]:_vm._e(),_vm._v(" "),(_vm.itemType === 'link' && _vm.itemImg)?[_c('span',{class:['icon', _vm.itemImg]})]:_vm._e()],2),_vm._v(" "),(_vm.isSess)?_c('div',{class:[_vm.singleSelected ? 'selected' : '', 'selectable', _vm.itemSize && 'size-' + _vm.itemSize, 'flex-icon', 'keyboard-ignore'],attrs:{"data-tooltip":"Restore just this entry."},on:{"click":function($event){_vm.commit(true)},"mouseenter":_vm.singleSelect,"mouseleave":_vm.unselect}},[_vm._v(" "+_vm._s(_vm.entry.session.length)+" "),_c('span',{staticClass:"icon icon-arrow-forward"})]):_vm._e()]):_vm._e()}
var staticRenderFns = [];
export {render, staticRenderFns}