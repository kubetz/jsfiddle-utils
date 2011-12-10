var jsfiddle = (function($) {
    // default options for retrieval of fiddles
    var defaults = {
        sort: 'date',
        order: 'asc',
        limit: 100000
    };
    // "public" object that will get returned
    return {
        retrieve: function(user, options, success) {
            // options were not specified => params are (user, success)
            if (typeof options === 'function') {
                sucess = options;
                options = {};
            }
            // merge default options with user options
            options = $.extend({}, defaults, options);
            // regexp for extracting fiddle IDs
            var idRE = new RegExp("/" + escape(user) + "/([^/]+)/");
            // retrieve list of fiddles using JSONP service
            $.ajax({
                // see http://doc.jsfiddle.net/api/fiddles.html
                url: 'http://jsfiddle.net/api/user/' + escape(user) + '/demo/list.json',
                dataType: 'jsonp',
                type: 'GET',
                data: options,
                success: function(data) {
                    var fiddles = data.list, maxCount = fiddles.length, currentCount = 0;
                    // for each fiddle ..
                    $.each(fiddles, function(i, fiddle) {
                        // take the fiddle ID from the url
                        var fiddleID = idRE.exec(fiddle.url)[1];
                        // retrieve the fiddle using x-domain plug-in (channeling through YQL)
                        $.ajax({
                            url: 'http://jsfiddle.net/' + escape(user) + '/' + fiddleID,
                            type: 'GET',
                            success: function(fiddlePage) {
                                // retrieve CSS, HTML and JS and save them to the fiddle object
                                var $content = $($(fiddlePage.responseText).find('div#content'));
                                fiddle.code_js = $content.find('textarea#id_code_js').text();
                                fiddle.code_css = $content.find('textarea#id_code_css').text();
                                fiddle.code_html = $content.find('textarea#id_code_html').text();
                            },
                            complete: function() {
                                currentCount++;
                                // if we completed all fiddle requests, call success and pass data
                                if (currentCount === maxCount) {
                                    sucess.call(this, fiddles);
                                }
                            }
                        });
                    });
                }
            });
        }
    };
})(jQuery);