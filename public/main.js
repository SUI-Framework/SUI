(function (d,w) {


	// Vars --------------------------------------------------------------------
	var elContainer = d.querySelector('body'),
		eventType = mobilecheck() ? 'touchstart' : 'click',
		aItemMenu = d.querySelectorAll('.js-itemMenu'),
		aItemSubmenu = d.querySelectorAll('.sg-submenu a'),
		fnResetMenu = function() {
			classie.remove( elContainer, 'sg-menu-open' );
			elContainer.style.overflow = 'auto';
		},
		fnBodyClick = function(e) {
			if( !hasParentClass( e.target, 'menu' ) && e.target.id != 'burgerMenu' ) {
				fnResetMenu();
				document.removeEventListener( eventType, fnBodyClick );
			}
		};

	//--------------------------------------------------------------------------
	w.addEventListener('load', function() {
		var sPath = window.location.pathname;
		var sHash = window.location.hash;

		currentSection( sPath, sHash );
        prettyPrint();
	});



	// Funcions ----------------------------------------------------------------
	function mobilecheck() {
		var check = false;
		(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	}

	function hasParentClass( e, classname ) {
		if(e === document) return false;
		if( classie.has( e, classname ) ) {
			return true;
		}
		return e.parentNode && hasParentClass( e.parentNode, classname );
	}

	function changeClassName(o, className, remove) {
	    o.className = o.className.split(' ' + className).join('');
	    if (!remove) o.className += ' ' + className;
	}

	function currentSection( path, hash ) {

		path = path.split('/');
		var current = path[path.length -1]+hash;

		for ( var i=0; i < aItemSubmenu.length; i++ ) {
            if( aItemSubmenu[i].getAttribute('href').indexOf( '.html' ) > -1 ) {
				classie.removeClass( document.getElementById('home'), 'sg-active');
                if( aItemSubmenu[i].getAttribute('href') == current ) {
					aItemSubmenu[i].className = 'sg-active';

					if( hasParentClass( aItemSubmenu[i], 'sg-submenu' ) ) {
						classie.addClass(aItemSubmenu[i].parentNode.parentNode, 'sg-selected');
						classie.addClass(aItemSubmenu[i].parentNode.parentNode.parentNode.parentNode, 'sg-selected');
					}
				}

			}

			if( classie.has( aItemSubmenu[i], 'js-disabled') ) {
				aItemSubmenu[i].addEventListener( eventType, function(e) {
					e.preventDefault();
				});
			} else {
				aItemSubmenu[i].addEventListener( eventType, function(e) {
					unActive();
					classie.addClass(e.target, 'sg-active');
					console.log(e);
				});
			}
		}

        if( d.querySelector('.sg-submenu.sg-selected') ) {
          d.querySelector('.sg-submenu.sg-selected').style.height = d.querySelector('.sg-submenu.sg-selected').clientHeight+'px';
        }

        if( w.location.pathname.indexOf( 'index.html' ) > -1 ) {
            d.getElementById('home').className = 'sg-active';
        }
	}

	function unActive() {
		for ( var i=0; i < aItemSubmenu.length; i++ ) {
			classie.removeClass( aItemSubmenu[i], 'sg-active');
		}
	}


	// Listeners ---------------------------------------------------------------
	d.getElementById('burgerMenu').addEventListener( eventType, function(e) {
		elContainer.style.overflow = 'hidden';
		setTimeout( function() {
			classie.addClass(elContainer, 'sg-menu-open');
		}, 25 );
		d.addEventListener( eventType, fnBodyClick );
	});
	d.addEventListener('keypress', function(e) {
		e = e || window.event;
		if(e.keyCode === 27) {
			fnResetMenu();
		}
	});

	for ( var i=0; i < aItemMenu.length; i++ ) {

		aItemMenu[i].addEventListener( eventType, function(e){
			//e.preventDefault();
			e.stopPropagation();

			var elItemMenu = e.target.parentNode.lastElementChild,
				nElements = 0;



			for ( var i=0; i < elItemMenu.children.length; i++ ) {
				nElements += elItemMenu.children[i].clientHeight;
			}

			if(elItemMenu.clientHeight == 0) {
				elItemMenu.style.height = nElements+'px';
				if ( elItemMenu.parentNode.parentNode.id != 'sg-menu' ) {
					elItemMenu.parentNode.parentNode.style.height = (Number(elItemMenu.parentNode.parentNode.style.height.replace('px','')) + nElements)+'px';
				}
			} else {
				elItemMenu.style.height = '0';
				if ( elItemMenu.parentNode.parentNode.id != 'sg-menu' ) {
					elItemMenu.parentNode.parentNode.style.height = (Number(elItemMenu.parentNode.parentNode.style.height.replace('px','')) - nElements)+'px';
				}
			}
		});
	}


	prettyPrint();

	$(window).on("hashchange load", function () {
	    window.scrollTo(window.scrollX, window.scrollY - 100);
	});

})(document, window);

//prevent default anchor with #
( function( $ ) {
   $( 'a[href="#"]' ).click( function(e) {
      e.preventDefault();
   } );
} )( jQuery );
