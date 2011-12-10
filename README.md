JsFiddle Utils
==============

This is currently a simple JavaScript project allowing to retrieve all fiddles of a specified user from [jsfiddle.net](http://jsfiddle.net). Part of this project is also a page for retrieving and printing all fiddles in stringified JSON format. You can access the page directly **[HERE](http://dzejkej.github.com/jsfiddle-utils/jsfiddleretriever.html)**.

Data are retrieved using a combination of JSFiddle's own JSONP service (to retrieve fiddle list) and YQL to retrieve a HTML content of every fiddle and save HTML/CSS/JS code.

### Usage

To access *jsfiddle-utils* functionality you need these scripts loaded:

* [jQuery 1.6.4+](http://jquery.com/)
* [Cross-Domain AJAX jQuery plug-in by James Padosley](https://raw.github.com/padolsey/jQuery-Plugins/master/cross-domain-ajax/jquery.xdomainajax.js) (more info [here](http://james.padolsey.com/javascript/cross-domain-requests-with-jquery/))
* project's [jsfiddleutils.js](https://raw.github.com/dzejkej/jsfiddle-utils/master/jsfiddleutils.js)

```javascript
jsfiddle.retrieve(username, options, callback);
```

**Where**:

* *username* - name of the user you want to retrieve all fiddles from
* *options* - jsfiddle's webservice options (see [documentation](http://doc.jsfiddle.net/api/fiddles.html))
* *callback(data)* - callback function that will get called when data are available

**Data Structure** (see [documentation](http://doc.jsfiddle.net/api/fiddles.html)):

```javascript
  "status": "ok",
  "list": [
    {
      "description": "...",		// description of the fiddle
      "author": "{username}",	// name of the author
      "url": "...",				// url of the fiddle
      "created": "...",			// creation date
      "framework": "...",		// used framwork
      "version": 123,           // base version number
      "latest_version": 234,    // latest version number
      "title": "..."			// title of the fiddle
      "code_html": "..."		// HTML code of the fiddle
      "code_css": "..."			// CSS code of the fiddle
      "code_js": "..."			// JavaScript code of the fiddle
    },
    // ...
  ],
  "overallResultSetCount": 123	// number of the results
```