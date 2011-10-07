/**
 * User: David
 * Date: 03/10/11
 * Time: 19:57
 */

var disqus_developer;
var disqus_identifier;
var disqus_url;

function Comments(configOptions) {

    var config = $.extend(getDefaultOptions(), configOptions);

    function getDefaultOptions() {
        return {
            shortname : null,
            developerMode : false,
            postId: null,
            permalink: null
        };
    }

    function isDeveloperMode(options) {
        return options.developerMode ? 1 : 0;
    }

    function loadDisqusScript() {
        disqus_developer = isDeveloperMode(config);
        disqus_identifier = config.postId;
        disqus_url =  config.permalink;

        (function() {
            var dsq = document.createElement('script');
            dsq.type = 'text/javascript';
            dsq.async = true;
            dsq.src = 'http://' + config.shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })()
    }


    var public = {
        initialize : loadDisqusScript,
        getConfig : $.extend(config)
    };

    return public;
}