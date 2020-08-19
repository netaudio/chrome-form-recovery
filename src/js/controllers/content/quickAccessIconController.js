import Options from '../../modules/options/options';
import Events from '../../modules/Events';
import initHandler from '../../modules/initHandler';
import validator from '../../modules/validator';
import ui from '../../modules/ui';
import Cache from '../../modules/Cache';
import quickAccessController from './quickAccessController';


let node,
	triggerAction,
	disabledEditables = [],
	iconDelayTimeout;

initHandler.onInit(function() {
	if(Options.get('quickAccessButtonEnabled')) {
		triggerAction = Options.get('quickAccessButtonTrigger');
		addEventListeners();
	}
});

function addDeepEventListeners() {
	node.addEventListener('click', e => e.preventDefault() )
	node.addEventListener('mousedown', function(e) {
		e.preventDefault();
		e.stopPropagation();

		if(e.button !== 0) return;

		if(e.target.dataset.hide !== undefined) {
			hide();
			disableForEditable();
		} else {
			requestAnimationFrame(function() {
				Cache.wipeCache();
				quickAccessController.show(terafm.focusedEditable, {x: e.layerX, y: e.layerY});
			})

		}
	})
}


function addEventListeners() {
	if(triggerAction === 'focus') {
		Events.on('editable-text-focus', function() {
			if(validator.validate(window.terafm.focusedEditable, 'elem')) {
				delayShow();
			}
		});
	}

	// On editable double click
	if(triggerAction === 'doubleclick') {
		Events.on('dblclick', function() {
			if(validator.validate(window.terafm.focusedEditable, 'elem')) {
				delayShow();
			}
		})
	}

	Events.on(['blur'], function(e) {
		ui.touch();
		hide()
	});
}

function build(callback) {
	if(!node) {
		ui.inject({
			html: '<a id="quickAccessIcon" title="Open Typio Quick Access"><span data-hide="" title="Hide icon for this input this page load"></span></a>',
			returnNode: '#quickAccessIcon'
		}, function(res) {
			node = res;
			addDeepEventListeners();
			callback();
		})
	} else {
		callback();
	}
}

function hide() {
	if(node) node.style.display = 'none';
}

function disableForEditable() {
	if(window.terafm.focusedEditable) disabledEditables.push(window.terafm.focusedEditable);
}

function isDisabled(editable) {
	return disabledEditables.indexOf(editable) !== -1;
}

function delayShow() {
	clearTimeout(iconDelayTimeout);
	iconDelayTimeout = setTimeout(show, 50);
}

function show(trigger) {
	if (!window.terafm.focusedEditable) return;

	build(function () {
		var editable = window.terafm.focusedEditable
		var edStyle = getComputedStyle(editable.el);

		// Prevent flying icon in some cases
		if (edStyle.display !== 'none') {
			hide();
		}

		if (isDisabled(editable.el)) return;
		if (triggerAction === 'focus' && !(parseInt(edStyle.width) > 80 && parseInt(edStyle.height) > 10)) return;

		var rect = editable.rect(),
			pos = {
				x: rect.x + rect.width - 18,
				y: rect.y
			},
			offset = 4;

		// Calculate edge offset
		if (!editable.isBigTextEditable()) { // if(rect.height < 50 && rect.width > 150) {
			offset = (rect.height / 2) - (18 / 2);
		}

		// Vertical scrollbar check
		if (editable.el.scrollHeight > editable.el.clientHeight || ['search', 'number'].includes(editable.type)) {
			pos.x -= 17;
		}

		pos.x -= (offset > 15 ? 15 : offset);
		pos.y += offset;

		node.style.top = pos.y + 'px';
		node.style.left = pos.x + 'px';
		node.style.display = 'block';

		ui.touch();
	})
}