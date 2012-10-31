var siri = ( function() {

	'use strict'

	var siri = {
		init: function() {

			// Events
			// ------

			$( '.mic-input' ).on( 'webkitspeechchange', function( event ) {
				siri.parse( $( this ).val() )
			})


			return this
		},

		parse: function( command ) {
			console.log(command)
			if (command.indexOf('procure por') === 0) {
				this.search( command.substr(12) )
			} else if (command.indexOf('procurar por') === 0) {
				this.search( command.substr(13) )
			} else if (command.indexOf('mostre número') === 0) {
				var numero = command.substr(14)

				if ( numero == 'zero' ) {
					this.show(0)
				} else {
					this.show(numero)
				}
			} else if (command.indexOf('mostrar número') === 0) {
				var numero = command.substr(15)

				if ( numero == 'zero' ) {
					this.show(0)
				} else {
					this.show(numero)
				}
			} else if (command.indexOf('fechar') === 0 || command.indexOf('esconder') === 0) {
				this.hide()
			} else {
				this.alert('Desculpa, eu não entendo: "' + command + '"')
				setTimeout(this.hideAlert, 3000)
			}
		},

		alert: function( message ) {
			$( '.alert' )
				.text( message )
				.addClass( 'alert-visible' )
		},

		hideAlert: function() {
			$( '.alert' )
				.removeClass( 'alert-visible' )
		},

		search: function( query ) {
			var that = this
			var url = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=' +
				query +
				'&format=json&jsoncallback=?'

			this.alert( 'Procurando por:"' + query + '"' )

			$( '.results ul li' )
				.remove()

			$.getJSON( url )
				.success( function( response ) {
						that.hideAlert()

						$.each( response.items, function( index ) {
							if ( index == 6 ) {
								return false
							}
							console.log(this)

							$( '<li>' )
								.css( 'background', 'url(' + this.media.m + ') center center' )
								.appendTo( '.results ul' )
						} )

				})
		},

		show: function( imageNumber ) {
			var $result = $( '.results ul li' ).eq( imageNumber )

			//
			var imageSrc = $result.css( 'background-image' )
			console.log(imageSrc)
			imageSrc = imageSrc.substr(4)
			imageSrc = imageSrc.substr(0, imageSrc.length - 1)
			console.log(imageSrc)

			$( '.result-big' )
				.attr( 'src', imageSrc )
				.fadeIn()

			var left = $( '.result-big' ).width()
			left = left / 2
			$( '.result-big' ).css( 'margin-left', '-' + left + 'px' )

			$( '.results ul li' )
				.fadeOut()
		},

		hide: function() {
			$( '.result-big' )
				.fadeOut()
			$( '.results ul li' )
				.fadeIn()
		}
	}

	return siri.init()
})()