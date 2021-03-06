window.addEventListener("load", myMain, false);


function myMain(evt) {
    var jsInitChecktimer = setInterval(checkForJS_Finish, 1500);

    function checkForJS_Finish() {
        if (document.readyState === 'complete' //document.querySelector (".footer__policy-item")  && $('a').filter(function() {return this.href.match(/\/.*i\.\d+\.\d+/);}).length > 5
        ) {
            clearInterval(jsInitChecktimer);
            document.getElementsByTagName("body")[0].setAttribute("ng-app", "myapp");
            document.getElementsByTagName("body")[0].setAttribute("ng-csp", "");
            let icon = chrome.runtime.getURL('lib/css/icon.css')
            $('head').append('<link rel="stylesheet" type="text/css" href="' + icon + '">');
            switch (true) {

                case $(location).attr('href').indexOf('facebook.com/messages') !== -1 || $(location).attr('href').indexOf('www.messenger.com') !== -1:
                    
                    $.get(chrome.extension.getURL('app-content/messenger/template.html'), function (data) {
                        $(data).prependTo('body');
                        angular.bootstrap($('.panel-msg'), ['myapp']);
                    });
                    break;
                case $(location).attr('href').indexOf('facebook.com') !== -1:
                    
                    $.get(chrome.extension.getURL('app-content/facebook/template.html'), function (data) {
                        $(data).prependTo('body');
                        angular.bootstrap($('.panel-fb'), ['myapp']);
                    });
                    break;
            }
        }
    }
}