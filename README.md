# CSS `position:fixed` feature test

(c)2012 @scottjehl, Filament Group

## Explanation

CSS fixed-positioning varies widely in browser support, and it's difficult to test. This repo includes a test to qualify the application of CSS <code>position:fixed</code>. Rather than testing immediately, it needs to wait for the user to scroll to see if fixed positioning is working properly. Because of this, the script assumes fixed-positioning works initially, adding a class of `fixed-supported` that can be used to qualify any `position:fixed` rules. When the page is scrolled, it runs a test to determine if fixed-positioning is working properly, if not, the class is removed, allowing any fixed-positioned elements to safely degrade to some other layout.

## Usage

Just qualify any `position:fixed` usage in your stylesheet with a `.fixed-supported` parent class selector, like so:

    .fixed-supported header { position: fixed; }

That class will be present on the HTML element in fixed-supporting browsers. You can apply an initial layout without using the `.fixed-supported` selector to provide a fallback for browsers that don't support fixed positioning properly.

## Compressed source:

	(function(a,b){function f(){var e="scrollTop"in a.document.body?a.document.body.scrollTop:a.document.documentElement.scrollTop;if(e!==b&&e>0&&a.document.body){a.document.body.insertBefore(d,a.document.body.firstChild);if(!d.getBoundingClientRect||d.getBoundingClientRect().top!==0)a.document.documentElement.className=a.document.documentElement.className.replace(c,"");a.document.body.removeChild(d),a.removeEventListener?a.removeEventListener("scroll",f,!1):a.removeEvent("onscroll",f,!1)}}var c="fixed-supported",d=a.document.createElement("div"),e=a.navigator.userAgent;d.style.position="fixed",d.style.top=0,e.match(/Android 2\.[1256]/)&&e.indexOf("AppleWebKit")>-1||(a.document.documentElement.className+=" "+c,a.addEventListener?a.addEventListener("scroll",f,!1):a.attachEvent("onscroll",f,!1))})(this)
