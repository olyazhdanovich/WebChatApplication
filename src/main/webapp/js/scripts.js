var name;
var taskList = [];
var messageList = [];

function restoreLogin() {
    if (typeof (Storage) == "undefined") {
        alert("error!!");
        return;
    }
    var last_name = localStorage.getItem('name');
    return last_name && JSON.parse(last_name);
}

var appState = {
	mainUrl : 'jsonservlet',
	token : 'TE11EN'
};

function login() {
    user_name = document.getElementById('user_name');
    if (user_name.value != "") {
        menu = document.getElementById('menu');
        name = user_name.value;
        chatArea = document.getElementById('chatArea');
        menu.style.display = "block";
        chatArea.style.display = "block";
        user = document.getElementById('user');
        user.style.display = "none";
        updateMessage();
    }
};

function updateMessage() {
    get(appState.mainUrl + "?token=" + appState.token,
        function (answer) {
            chatText = document.getElementById('chatText');
            var str = "";
            for (var i = 0; i < answer.messages.length; i++) {
                str += answer.messages[i].author + " : " + answer.messages[i].text + "\n";
            }
            chatText.value = str;
        });
};

function logout() {
    menu = document.getElementById('menu');
    chatArea = document.getElementById('chatArea');
    chatArea.style.display = "none";
    menu.style.display = "none";
    user = document.getElementById('user');
    user.style.display = "block";
    chatText = document.getElementById('chatText');
    chatText.value = '';

};

function restoreMessage() {
    if (typeof (Storage) == "undefined") {
        alert("error!!");
        return;
    }
    var last_message = localStorage.getItem('message');
    return last_message && JSON.parse(last_message);
}

function message() {
    chatMessage = document.getElementById('chatMessage');
    chatText = document.getElementById('charText');
    var postData = new Object();
    if (chatMessage.value != "") {
        postData.text = chatMessage.value;
        chatMessage.value = '';
        postData.author = name;
        post(appState.mainUrl, JSON.stringify(postData),
        function () {
            updateMessage();
        });
    }
};

function online() {
    stat = document.getElementById('status');
    if (stat.innerHTML == "Online")
    stat.innerHTML = "Offline";
    else if (stat.innerHTML == "Offline")
    stat.innerHTML = "Online";
};

function del(){
    deleteF(appState.mainUrl,
    function () {
        updateMessage();
    });
};

function change() {
    chatMessage = document.getElementById('chatMessage');
    chatText = document.getElementById('chatText');
    chatText.value = nes;
    chatMessage.value = mes;
    s1 = "Message" + " " + mes + " " + "edited";
    taskList.push(s1);
    localStorage.setItem('list', JSON.stringify(taskList, " ", 4)); 
};
function get(url, continueWith) {
	ajax('GET', url, null, continueWith);
}

function post(url, data, continueWith) {
	ajax('POST', url, data, continueWith);	
}

function deleteF(url,continueWith) {
	ajax('DELETE', url, null, continueWith);	
}


function ajax(method, url, data, continueWith) {
	stat = document.getElementById('status');
    var xmlhttp = getXmlHttp();
    xmlhttp.open(method, url, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                if (xmlhttp.responseText != "")
                    continueWith(JSON.parse(xmlhttp.responseText));
                else
                    continueWith();
                stat.innerHTML = "Online";
                stat.style.background = "#7FFF00";
            }
            if (xmlhttp.status == 0) {
                stat.innerHTML = "Offline";
                stat.style.background = "red";
            }
        }
    };
    xmlhttp.ontimeout = function () {
        stat.innerHTML = "Offline";
        stat.style.background = "red";
    }
    xmlhttp.send(data);
}

function getXmlHttp() {
    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}