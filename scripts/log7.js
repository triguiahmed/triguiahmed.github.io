if (typeof Date.now !== 'function') {
    Date.now = function() {
        return +new Date();
    };
}
if (typeof wts7 === 'undefined') {
    wts7 = {};
}
wts7.versionNumber = wts7.versionNumber || "8.246";
wts7.lastPageShow = 0;
wts7.lastEvent = "load";

function wtslog7(alias, db, obj, event_name, event_conversion, event) {
    wts7.alias = alias;
    try {
        wtslog7Exe(alias, db, obj, event_name, event_conversion, event);
    } catch (e) {
        wtsDebug7('flag 1', e);
    }
}

function wtslog7Exe(alias, db, obj, event_name, event_conversion, event) {
    if (/bot|crawl|google|baidu|bing|msn|teoma|slurp|yandex/i.test(navigator.userAgent)) {
        return;
    }
    if (event) {
        wts7.thisEvent = event.type;
    } else {
        wts7.thisEvent = "load";
    }
    if (wts7.thisEvent != wts7.lastEvent && Date.now() - wts7.lastPageShow < 1500) {
        return;
    }
    if (event_name) {
        if (event) {
            event.preventDefault();
        }
    }
    if (wts7.origin == 'wtslog6_2') {
        wts7.versionNumber = '6.28';
    }
    if (!alias || !db) {
        return;
    }
    var start = Date.now();
    var web_url = "www.web-stat.com";
    var app_url = "app.ardalio.com";
    var app_name = "Web-Stat";
    if (alias != '197785') {
        if (document.readyState === 'loading') {
            if (typeof document.addEventListener === 'function') {
                document.addEventListener("DOMContentLoaded", function() {
                    wtslog7Exe(alias, db, obj, event_name, event_conversion, event);
                });
                return;
            }
        }
    }
    wts7.lastEvent = wts7.thisEvent;
    wts7.lastPageShow = start;
    window.onerror = function(msg, url, lineNo, columnNo, error) {
        if (url.indexOf(/wts\d?\.one/) > -1) {
            var e_text = 'JS error on url: ' + url + ' / error: ' + msg + ' (' + lineNo + '/' + columnNo + ') / ' + error + ' / ref: ' + document.referrer;
            wtsDebug7(e_text, error);
        }
        return true;
    };
    var gmtimeUnix, timeLastLoad, sessionId, visitorId, nVisits, referer, title, url, checkedOnline, originalRef, allow_cookies, isOwner, isEvent, params, invisible, conversion_number, page_name, group_name, checked_online, qry, cs, s, newSpan, userId, uidsid;
    checkedOnline = "";
    gmtimeUnix = Math.floor(Date.now() / 1000);
    wts7.origin = wts7.origin || 'log7';
    params = wts7.params || '';
    invisible = wts7.invisible || '';
    conversion_number = wts7.conversion_number || '';
    page_name = wts7.page_name || '';
    group_name = wts7.group_name || '';
    referer = wts7.ref || '';
    if (referer !== '') {
        referer = referer + '::::::';
    }
    if (!wts7.focusEvent) {
        window.addEventListener('focus', function() {
            wts7.focusEvent = 1;
            start = Date.now();
            if (Date.now() - start > 1800000) {
                wtslog7Exe(alias, db, obj, event_name, event_conversion, event);
            }
        });
    }
    if (wts7.params != 'editor_load' && wts7.params != 'no_count') {
        wts7.url = '';
        wts7.scrW = screen.width || window.innerWidth || window.screen.height || 0;
        wts7.scrH = screen.height || window.innerHeight || window.screen.height || 0;
        checked_online = '';
        if (typeof event_name !== 'undefined' && event_name != '') {
            isEvent = 'yes';
            invisible = 'yes';
            conversion_number = event_conversion || '';
            event_name = event_name.replace(/^\\s+|\\s+\$/g, '');
            event_name = encodeURIComponent(event_name);
            if (alias == '197785') {
                page_name = event_name;
                group_name = event_name;
                url = document.URL || page_name;
                title = document.title || page_name;
            } else {
                page_name = 'event_' + event_name;
                group_name = event_name;
                url = event_name;
                title = event_name;
            }
        } else {
            isEvent = 'no';
            try {
                title = top.document.title || '';
            } catch (e) {
                title = document.title || '';
            }
            try {
                url = top.document.URL || '';
            } catch (e) {
                url = document.URL || '';
            }
            url = url.replace(/\/$/, '');
            wts7.url = url;
            try {
                referer = referer + top.document.referrer;
            } catch (e) {
                referer = referer + document.referrer;
            }
            if (referer && referer.length > 510) {
                referer = referer.substring(0, 510);
            }
        }
        var rgx = {};
        rgx.ack = /^1$|^0$/;
        rgx.tll = /^\d+$/;
        rgx.sid = /^[\w\-@]+$/;
        rgx.uid = /.+/;
        rgx.vid = /^[\w\-@\.]+$/;
        rgx.bid = /^[\w\-@]+$/;
        rgx.nv = /^\d+$/;
        rgx.io = /^1$|^0$/;
        rgx.lv = /^\d+$/;
        rgx.or = /^[^\[]+$/;
        rgx.prf = /^[^\[]+$/;
        rgx.cty = /.+/;
        rgx.asn = /^\d+$/;
        if (wts7.allow_cookies === false) {
            allow_cookies = 0;
        } else if (wts7.use_cookies === "1") {
            allow_cookies = 1;
        } else if (wts7.use_cookies === "0") {
            allow_cookies = 0;
        } else {
            allow_cookies = getData7('ack', alias, gmtimeUnix, rgx) || '';
        }
        timeLastLoad = getData7('tll', alias, gmtimeUnix, rgx) || '0';
        sessionId = getData7('sid', alias, gmtimeUnix, rgx) || '';
        userId = wts7.user_id || getData7('uid', alias, gmtimeUnix, rgx) || '';
        visitorId = getData7('vid', alias, gmtimeUnix, rgx) || '';
        nVisits = getData7('nv', alias, gmtimeUnix, rgx) || 0;
        isOwner = getData7('io', alias, gmtimeUnix, rgx) || '0';
        if (isOwner != '1' && isOwner != '0') {
            wtsDebug7('1/ bad isOwner : ' + isOwner);
        }
        originalRef = getData7('or', alias, gmtimeUnix, rgx) || '';
        if (timeLastLoad != '0') {
            writeData7('tll_' + alias, timeLastLoad, allow_cookies, 315360000, gmtimeUnix, rgx);
        }
        if (sessionId != '') {
            writeData7('sid_' + alias, sessionId, allow_cookies, 1800, gmtimeUnix, rgx);
        }
        if (nVisits != 0) {
            writeData7('nv_' + alias, nVisits, allow_cookies, 315360000, gmtimeUnix, rgx);
        }
        if (visitorId != '') {
            writeData7('vid_' + alias, visitorId, allow_cookies, 315360000, gmtimeUnix, rgx);
        }
        if (userId != '') {
            writeData7('uid_' + alias, userId, allow_cookies, 315360000, gmtimeUnix, rgx);
        }
        if (isOwner == '1') {
            writeData7('io_' + alias, '1', allow_cookies, 315360000, gmtimeUnix, rgx);
        }
        if (originalRef != '') {
            writeData7('or_' + alias, originalRef, allow_cookies, 315360000, gmtimeUnix, rgx);
        }
        try {
            uidsid = sessionStorage.getItem("uidsid_" + alias);
        } catch (e) {}
        if (userId != '' && uidsid == sessionId) {
            userId = 'd_' + userId;
        }
        url = encodeURIComponent(url);
        url = url.replace(/&/g, "%oag");
        if (originalRef !== '') {
            originalRef = encodeURIComponent(originalRef);
            originalRef = originalRef.replace(/&/g, "%oag");
        }
        if (referer !== '') {
            referer = encodeURIComponent(referer);
            referer = referer.replace(/&/g, "%oag");
        }
        if (page_name !== '') {
            page_name = encodeURIComponent(page_name);
        }
        if (group_name !== '') {
            group_name = encodeURIComponent(group_name);
        }
        if (title !== '') {
            try {
                title = encodeURIComponent(title);
            } catch (e) {}
        }
        if (userId !== '') {
            userId = encodeURIComponent(userId);
        }
    }
    qry = alias + '&' + db + '&' + invisible + '&' + conversion_number + '&' + page_name + '&' + group_name + '&' + title + '&' + url + '&' + referer + '&' +
        originalRef + '&' + wts7.scrW + 'x' + wts7.scrH + '&_&&' + sessionId + '&' + timeLastLoad + '&' + visitorId + '&' + nVisits + '&' + isOwner + '&' +
        params + '&' + isEvent + '&' + checkedOnline + '&' + userId + '&' + wts7.versionNumber + '&' + allow_cookies + '&' + Math.random();
    if (event_name) {
        cs = document.createElement("script");
        cs.type = "text/javascript";
        cs.async = "async";
        cs.src = "https://" + app_url + "/count7.pl?" + qry;
        s = document.getElementsByTagName("script")[0];
        if (s) {
            s.parentNode.insertBefore(cs, s);
        } else {
            document.head.appendChild(cs);
        }
        if (obj) {
            cs.onload = function() {
                redirect7(obj);
            };
            return false;
        }
    } else {
        newSpan = document.createElement("span");
        newSpan.setAttribute("id", "wtstimer" + alias);
        newSpan.style.display = "none";
        document.body.appendChild(newSpan);
        cs = document.createElement("script");
        cs.type = "text/javascript";
        cs.async = "async";
        cs.src = "https://" + app_url + "/count7.pl?" + qry;
        s = document.getElementsByTagName("script")[0];
        if (s) {
            s.parentNode.insertBefore(cs, s);
        } else {
            document.head.appendChild(cs);
        }
        cs.onload = function() {
            finalProcessing7(alias, db, app_url, gmtimeUnix, params, invisible, wts7, 0, obj, event_name, event_conversion, event);
        };
    }
}

function redirect7(obj) {
    var new_window;
    if (obj.target) {
        try {
            new_window = window.open(obj.href, obj.target);
        } catch (e) {
            try {
                window.top.location = obj.href;
            } catch (e) {
                window.location = obj.href;
            }
        }
    } else {
        try {
            window.top.location = obj.href;
        } catch (e) {
            window.location = obj.href;
        }
    }
}

function finalProcessing7(alias, db, app_url, gmtimeUnix, params, invisible, wts7, loop, obj, event_name, event_conversion, event) {
    var pingId, panelId, status, exclude_hit, counterType, sessionId, response, ajaxRequest, ajaxRequest2, msg, delay;
    if (document.getElementById("wtstimer" + alias).innerHTML) {
        response = document.getElementById("wtstimer" + alias).innerHTML;
    }
    if (response.indexOf("::") == -1) {
        loop++;
        if (loop < 100) {
            setTimeout(function() {
                finalProcessing7(alias, db, app_url, gmtimeUnix, params, invisible, wts7, loop, obj, event_name, event_conversion, event);
            }, 100);
            return;
        }
        return;
    }
    if (document.readyState === 'complete') {
        if (!wts7.pageShowEvent) {
            window.addEventListener("pageshow", function(event) {
                wts7.pageShowEvent = 1;
                wtslog7Exe(alias, db, obj, event_name, event_conversion, event);
            });
        }
    } else {
        window.addEventListener("load", function(event) {
            setTimeout(function() {
                if (!wts7.pageShowEvent) {
                    window.addEventListener("pageshow", function(event) {
                        wts7.pageShowEvent = 1;
                        wtslog7Exe(alias, db, obj, event_name, event_conversion, event);
                    });
                }
            }, 1500);
        });
    }
    response = response.split("::");
    status = response[5];
    if (status != "premium") {
        return;
    }
    exclude_hit = response[6];
    counterType = response[7];
    sessionId = response[4];
    pingId = db + "&" + alias + "&" + response[0] + "&" + response[1] + "&" + response[2] + "&" + response[3] + "&" + sessionId;
    panelId = db + "&" + alias + "&" + response[1] + "&" + response[0] + "&" + response[8];
    if (params != "no_count" && exclude_hit != "yes") {
        ajaxRequest = new XMLHttpRequest();
        pingPage7(pingId, gmtimeUnix, 0, ajaxRequest, app_url, alias, db);
    }
    if (counterType == "panel" && invisible != "yes") {
        msg = "https://" + app_url + "/get_panel_data.pl?" + panelId + "&" + Math.random();
        ajaxRequest2 = new XMLHttpRequest();
        ajaxRequest2.onreadystatechange = function() {
            if (ajaxRequest2.readyState == 4 && ajaxRequest2.status == 200) {
                updatePanelDisplay7(ajaxRequest2, alias, msg);
            }
        };
        delay = 500;
        setTimeout(function() {
            getPanelData7(alias, msg, ajaxRequest2);
        }, delay);
    }
}

function pingPage7(pingId, last_active, delay, ajaxRequest, app_url, alias, db) {
    var currTime, msg;
    currTime = Math.floor(Date.now() / 1000);
    if (currTime > last_active + delay / 1000 + 1800) {
        return;
    }
    var hasFocus;
    try {
        hasFocus = top.document.hasFocus() || document.hasFocus();
    } catch (e) {}
    if (document.visibilityState != "hidden" && hasFocus) {
        last_active = currTime;
        delay = delay + 1000;
        if (delay > 30000) {
            delay = 30000;
        }
        msg = "https://" + app_url + "/ping_timer.pl?" + pingId + "&" + delay + "&ck=" + Math.random();
        ajaxRequest.open('GET', msg, true);
        ajaxRequest.send();
        setTimeout(function() {
            pingPage7(pingId, last_active, delay, ajaxRequest, app_url, alias, db);
        }, delay);
    } else {
        setTimeout(function() {
            pingPage7(pingId, last_active, 0, ajaxRequest, app_url, alias, db);
        }, 2000);
    }
}

function getPanelData7(alias, msg, ajaxRequest2) {
    msg = msg + "::" + Math.random();
    ajaxRequest2.open('GET', msg, true);
    ajaxRequest2.send();
}

function updatePanelDisplay7(ajaxRequest2, alias, msg) {
    var focusTest, response, previous_count, now_count, previous_delay, delay, done_updating;
    response = ajaxRequest2.responseText.split("::");
    if (response[0] == 'OK') {
        delay = 1000;
        previous_count = parseInt(document.getElementById("wts_last_" + alias).innerHTML);
        previous_delay = parseInt(document.getElementById("wts_delay_" + alias).innerHTML);
        now_count = parseInt(response[1]);
        document.getElementById("wts_p_online_" + alias).innerHTML = response[2].toLocaleString();
        done_updating = 1;
        if (document.getElementById("wts_dot_" + alias).style.opacity == 1) {
            blink7("wts_dot_" + alias, 0, 0);
        }
        if (now_count > previous_count) {
            done_updating = 0;
            animateIncrement7(alias, now_count, previous_count);
        }
        document.getElementById("wts_last_" + alias).innerHTML = response[1];
        if (now_count > previous_count && previous_delay > 3000) {
            delay = previous_delay - 1000;
        } else {
            delay = previous_delay + 1000;
        }
        if (delay > 60000) {
            delay = 60000;
        }
        if (delay < 3000) {
            delay = 3000;
        }
        document.getElementById("wts_delay_" + alias).innerHTML = delay;
        setTimeout(function() {
            done_updating = 1;
        }, 20000);
        if (document.visibilityState != "hidden" && done_updating) {
            setTimeout(function() {
                getPanelData7(alias, msg, ajaxRequest2);
            }, delay);
        } else {
            document.getElementById("wts_delay_" + alias).innerHTML = 0;
            focusTest = setInterval(function() {
                if (document.visibilityState != "hidden" && done_updating) {
                    clearInterval(focusTest);
                    getPanelData7(alias, msg, ajaxRequest2);
                }
            }, 2000);
        }
    }

    function animateIncrement7(alias, now_count, previous_count) {
        previous_count++;
        document.getElementById("wts_p_count_" + alias).innerHTML = previous_count.toLocaleString();
        if (previous_count < now_count) {
            if (now_count - previous_count < 10) {
                setTimeout(function() {
                    animateIncrement7(alias, now_count, previous_count);
                }, 300);
            } else if (now_count - previous_count < 100) {
                setTimeout(function() {
                    animateIncrement7(alias, now_count, previous_count);
                }, 50);
            }
        } else {
            if (document.getElementById("wts_dot_" + alias).style.opacity == 1) {
                blink7("wts_p_count_" + alias, 0, 1);
            }
        }
    }

    function blink7(id, opacity, update) {
        if (opacity > 1) {
            opacity = 1;
        }
        document.getElementById(id).style.opacity = opacity;
        if (opacity < 1) {
            opacity = opacity + 0.05;
            setTimeout(function() {
                blink7(id, opacity, update);
            }, 100);
        } else {
            if (update == "1") {
                done_updating = 1;
            }
        }
    }
}

function writeData7(id, data, allow_cookies, max_age, now, rgx) {
    var domain, item, expiry;
    if (!data) {
        return;
    }
    data = data.toString();
    if (data === '0' || data === '') {
        return;
    }
    expiry = now + max_age;
    item = {
        value: data,
        expiry: expiry
    };
    try {
        window.localStorage.setItem(id, JSON.stringify(item));
    } catch (e) {}
    if (allow_cookies == '1') {
        try {
            var parts = location.hostname.split('.');
            domain = parts.slice(-2).join('.');
        } catch (e) {}
        if (domain) {
            try {
                document.cookie = id + '=' + data + '; domain=' + domain + '; path=/; SameSite=None; Secure; Max-Age=' + max_age;
            } catch (e) {
                wtsDebug7('writeData 3.1 / error writing cookies on ' + domain, e);
            }
        } else {
            try {
                document.cookie = id + '=' + data + '; path=/; SameSite=None; Secure; Max-Age=' + max_age;
            } catch (e) {
                wtsDebug7('writeData 3.2 / error writing cookie', e);
            }
        }
    }
}

function getData7(id, alias, now, rgx) {
    var data, dataJSON;
    try {
        dataJSON = window.localStorage.getItem(id + '_' + alias);
    } catch (e) {}
    if (dataJSON) {
        try {
            data = JSON.parse(dataJSON);
        } catch (e) {
            data = dataJSON;
            if (data) {
                try {
                    window.localStorage.removeItem(id + '_' + alias);
                } catch (e) {}
                if (rgx[id].test(data)) {
                    return data;
                } else {
                    wtsDebug7('error::storage 0::non-conform id ' + id + '=' + data);
                }
            }
        }
        if (data && data.expiry && data.value) {
            if (data.expiry >= now) {
                if (rgx[id].test(data.value)) {
                    return data.value;
                } else {
                    wtsDebug7('error::storage::non-conform id ' + id + '=' + data.value);
                    try {
                        window.localStorage.removeItem(id + '_' + alias);
                    } catch (e) {}
                }
            } else {
                try {
                    window.localStorage.removeItem(id + '_' + alias);
                } catch (e) {}
                return;
            }
        }
    }
    data = '';
    try {
        if (document.cookie && document.cookie.indexOf(id + '_' + alias) > -1) {
            data = document.cookie.split("; ").find(function(row) {
                return row.startsWith(id + '_' + alias + '=');
            }).split("=")[1];
        }
    } catch (e) {}
    if (data) {
        if (rgx[id].test(data)) {
            return data;
        } else {
            var domain;
            wtsDebug7('error::cookie::non-conform id ' + id + '=' + data);
            try {
                domain = window.location.host.match(/^(?:.*?\.?)?([a-zA-Z0-9\-_]{3,}\.(?:\w{2,8}|\w{2,4}\.\w{2,4}))$/)[1];
                document.cookie = id + '=; path=/; domain=' + domain + '; SameSite=None; Secure; expires=Thu, 01 Jan 1970 00:00:01 GMT';
            } catch (e) {}
        }
    }
}

function wtsDebug7(e_text, e_object) {
    var errData = new URLSearchParams();
    errData.append('e_text', e_text);
    if (e_object) {
        errData.append('e_object', e_object.toString() + ' / e name: ' + e_object.name + ' e message: ' + e_object.message);
    }
    errData.append('version', wts7.versionNumber);
    errData.append('referrer', document.referrer);
    errData.append('url', document.URL);
    errData.append('alias', wts7.alias);
    navigator.sendBeacon('https://app.ardalio.com/beacon_e.pl', errData);
    return;
}