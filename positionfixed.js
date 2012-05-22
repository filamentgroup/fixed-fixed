/*! CSS position:fixed qualifier. (c)2012 @scottjehl, Filament Group, Inc. Dual license: MIT and/or GPLv2 */
(function( w, undefined ){
	
	var htmlclass = "fixed-supported",
		el = w.document.createElement( "div" ),
		ua = w.navigator.userAgent;
	
	// fix the test element
	el.style.position = "fixed";
	el.style.top = 0;

	// support test
	function checkFixed(){

		var scroll = "scrollTop" in w.document.body ? w.document.body.scrollTop : w.document.documentElement.scrollTop;

		// only run test if there's a scroll we can compare
		if( scroll !== undefined && scroll > 0 && w.document.body ){
			
			w.document.body.insertBefore( el, w.document.body.firstChild );

			if( !el.getBoundingClientRect || el.getBoundingClientRect().top !== 0 ){
				// Fixed is not working or can't be tested
				w.document.documentElement.className = w.document.documentElement.className.replace( htmlclass, "" );
			}

			// remove the test element
			w.document.body.removeChild( el );
				
			// unbind the handlers
			if( w.removeEventListener ){
				w.removeEventListener( "scroll", checkFixed, false );
			}
			else{
				w.removeEvent( "onscroll", checkFixed, false );
			}
		}		
	}
		
	// if a particular UA is known to return false results with this feature test, try and avoid that UA here.
	if(
		// Android 2.1, 2.2, 2.5, and 2.6 Webkit
		!( ua.match( /Android 2\.[1256]/ ) && ua.indexOf( "AppleWebKit") > -1 )
		
		// TODO. Add the other untestable browsers here...
	){
		//add the HTML class for now.
		w.document.documentElement.className += " " + htmlclass;
		
		// bind to scroll event so we can test and potentially degrade
		if( w.addEventListener ){
			w.addEventListener( "scroll", checkFixed, false );
		}
		else{
			w.attachEvent( "onscroll", checkFixed, false );
		}
	}
}( this ));