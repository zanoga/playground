define(function (require) {
	'use strict';

	var $ = require('jquery');
	var fb = require('fb');
	var $el = $('<a href="#" id="send-result">Save result</a>').appendTo('body');
	var EMAIL = 'a.mezin@javascript.ru';


	var email ={

		set: function (subj, code) {
			return new Promise((resolve, reject) => {
				let background = $el.css('background');
				resolve(fb.set(subj, code));
				$el.slideUp( 300 ).delay( 800 ).fadeIn( 400 );
			});
		}

	};


	$el.click(function (event) {
		event.preventDefault();
		email.onclick(email);
	});



	// export
	return email;
});
