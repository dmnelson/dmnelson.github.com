/**
 * User: David
 * Date: 03/10/11
 * Time: 19:57
 */

function Comments(configOptions) {

    var config = $.extend(getDefaultOptions(), configOptions);

    function getDefaultOptions() {
        return {
            shortname : null,
            developerMode : false
        };
    }

    function isDeveloperMode(options) {
        return options.developerMode ? 1 : 0;
    }

    function loadDisqusScript() {
        var disqus_developer = isDeveloperMode(config);
        var dsq = document.createElement('script');
        dsq.type = 'text/javascript';
        dsq.async = true;
        dsq.src = 'http://' + config.shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    }


    var public = {
        initialize : loadDisqusScript,
        getConfig : $.extend(config)
    };

    return public;
}