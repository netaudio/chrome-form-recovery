(function() {
	'use strict';

	// Run everywhere (top window and child iframe injections)

	let basepath;

	if(window !== window.top) {
		window.top.postMessage({action: 'terafmRequestBasepath'}, '*');
	} else {
		basepath = chrome.extension.getURL('');
		init();
	}

	window.top.addEventListener('message', function(msg) {

		if(!basepath && msg.data.action && msg.data.action === 'terafmReturnBasepath') {
			basepath = msg.data.path;
			init();
		}
	});



	var observeConf = { childList: true, subtree: true, characterData: false, attributes: false };
	function init() {
		setTimeout(function() {
			var allNodes = document.body.querySelectorAll('*');
			dig(allNodes);

			var observer = createObserver();
			observer.observe(document.body, observeConf);

		}, 10);
	}



	function createObserver() {
		return new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				mutation.addedNodes.forEach(function(node) {

					// If issues with not finding iframes or shadows
					// Do a querySelectorAll('*') on this instead
					dig([node], true);
				});
			});    
		});
	}

	function dig(allNodes, mutated) {

		for(var i=0; i < allNodes.length; ++i) {
			if(allNodes[i].nodeName === 'IFRAME') {
				inject(allNodes[i]);
			}

			if(allNodes[i].shadowRoot && allNodes[i].shadowRoot.mode === 'open') {
				var shroot = allNodes[i].shadowRoot;

				var observer = createObserver();
				observer.observe(shroot, observeConf);

				// Also dig into child elements
				for(var ch=0; ch < shroot.children.length; ++ch) {
					dig([shroot.children[ch]], 1);
				}
			}

			// If mutated, find iframes inside and dig
			if(mutated && allNodes[i].nodeType !== 3) {
				let fr = allNodes[i].querySelectorAll('iframe');
				if(fr.length) dig(fr);
			}

		}
	}

	function inject(iframe, secondTry) {
		var scriptFrame = window.top.document.createElement("script");
		scriptFrame.type = "text/javascript";
		scriptFrame.src = basepath + 'js/min/frame.min.js';

		try {
			iframe.contentWindow.document.body.appendChild(scriptFrame);

			if(secondTry) {
				console.log('success on second try!', iframe.contentWindow.document.body)
			} else {
				// console.log('Success on first try', );
			}
		} catch(e) {
			if(!secondTry) {
				console.log('inject fail, retrying in 1 sec');
				setTimeout(function() {
					inject(iframe, true)
				}, 1000);
			} else {
				console.log('ïnject failed second time');
			}
		}
	}


})();