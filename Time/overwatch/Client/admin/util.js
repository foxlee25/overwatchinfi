var Ajax = {
    fail: function (jqXHR, textStatus, errorThrown) {
        console.log("Sorry, Error Occur !");
    },
    get: function (url, param, callback, $header, returnDataType) {
        if (!returnDataType)
            returnDataType = 'text';
        //callback is only use for easy request, for example load html
        var jqxhr = $.get(url, param, undefined, returnDataType);
        jqxhr.done(function (data) {
            if (typeof (callback) === 'function')
                callback(data);
        });
        jqxhr.fail(function (jqXHR, textStatus) {
            timeAjax.fail(jqXHR, textStatus);
        });

    },
    post: function (url, param, callback, returnDataType, sendDataType) {
        if (!param)
            param = {};
        if (!returnDataType)
            returnDataType = 'json';
        if (!sendDataType)
            sendDataType = 'application/json; charset=UTF-8';
        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(param),
            contentType: sendDataType,
            dataType: returnDataType,
        }).done(function (data) {
            if (typeof (callback) === 'function')
                callback(data);

        }).fail(function (jqXHR, textStatus) {
            Ajax.fail(jqXHR, textStatus);
        });
    }
};