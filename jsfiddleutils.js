var jsfiddle = (function($) {
    // default options for retrieval of fiddles
    var defaults = {
        sort: 'date',
        order: 'asc',
        limit: 100000
    };

    return {
        retrieve: function(user, options, callback) {
            // options were not specified => params are (user, callback)
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }
            // merge default options with the given ones
            options = $.extend({}, defaults, options);
            // regexp for extracting fiddle IDs
            var idRE = new RegExp('/' + user + '/([^/]+)/');
            // retrieve list of fiddles using JSONP service
            $.ajax({
                // see http://doc.jsfiddle.net/api/fiddles.html
                url: 'http://jsfiddle.net/api/user/' + user + '/demo/list.json',
                dataType: 'jsonp',
                type: 'GET',
                data: options,
                success: function(data) {
                    var fiddles = data.list, xhrs = [];
                    // loop through all fiddles and request code for each of them
                    $.each(fiddles, function(i, fiddle) {
                        // take the fiddle ID from the url
                        var fiddleID = idRE.exec(this.url)[1];
                        // retrieve the fiddle using x-domain plug-in (channeling through YQL)
                        xhrs.push($.ajax({
                            url: 'http://jsfiddle.net/' + user + '/' + fiddleID,
                            type: 'GET',
                            success: function(fiddlePage) {
                                // retrieve CSS, HTML and JS and save them to the fiddle object
                                var $content = $('div#content', fiddlePage.responseText);
                                fiddle.code_js = $content.find('textarea#id_code_js').text();
                                fiddle.code_css = $content.find('textarea#id_code_css').text();
                                fiddle.code_html = $content.find('textarea#id_code_html').text();
                            }
                        }));
                    });
                    // call callback when all $.ajax calls are complete
                    $.when.apply(this, xhrs).then(function() { callback.call(this, fiddles); });
                }
            });
        }
    };
})(jQuery);