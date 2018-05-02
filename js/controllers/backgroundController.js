(function() {

	chrome.idle.setDetectionInterval(60); // seconds
	chrome.idle.onStateChanged.addListener(function(state) {
		if(state === 'idle') {
			console.log('idle detected');

			chrome.storage.local.get('DBMaintenanceTimestamp', function(res) {
				let lastrun = res.DBMaintenanceTimestamp || 0;

				console.log('last run:', lastrun)
				if(Date.now() - lastrun > 43200000) { // 12 hours
					runMaintenance();
					chrome.storage.local.set({ DBMaintenanceTimestamp: Date.now() });
				}
			})
		}
	});

	function runMaintenance() {

		chrome.storage.sync.get('storageTimeDays', function(data) {
			let maxdays = -1; //data.hasOwnProperty('storageTimeDays') ? maxdays : 7; // Todo: Default is hard coded!
			let expirepoint = (Date.now()/1000) - (maxdays * 86400);

			console.log('maxdays:', maxdays, 'expirepoint:', expirepoint);

			// Delete old stuff
			chrome.storage.local.get(null, function(data) {

				console.log(data);

				for(let domain in data) {
					if(domain.indexOf('###') !== 0 || !data[domain].hasOwnProperty('fields')) continue;
					let action = 'ignore';

					if(Object.keys(data[domain].fields) < 1) {
						action = 'delete';
					} else {
						for(let fieldId in data[domain].fields) {
							for(let sessionId in data[domain].fields[fieldId]) {

								if(sessionId < expirepoint) {
									console.log('deleting in', domain, sessionId)

									// Delete entry
									delete data[domain].fields[fieldId][sessionId];

									// Delete entire field if empty
									if(Object.keys(data[domain].fields[fieldId]).length < 1) {
										delete data[domain].fields[fieldId]
									}

									action = 'save';

									// Delete entire field if empty
									if(Object.keys(data[domain].fields).length < 1) {
										action = 'delete';
									}
								}

							}
						}
					}

					if(action === 'save') {
						console.log('should save for', domain, 'saving:', {domain: data[domain]});
						chrome.storage.local.set({domain: data[domain]});

					} else if(action === 'delete') {
						console.log('deleting', domain);
						chrome.storage.local.remove(domain);
					}
				}
			});
		});
	}

})();