window.onload = function() {

	var messages = [];
	var translations = [];
	var socket = io.connect('http://localhost:3700');
	var field = document.getElementById('field');
	var sendButton = document.getElementById('send');
	var content = document.getElementById('content');
	var translation = document.getElementById('translation');
	var name = document.getElementById('name');

	socket.on('message', function(data) {
		if (data.message) {
			messages.push(data);
			var html = '';
			for (var i=0; i<messages.length; i++) {
				html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
				html += messages[i].message + '<br />';
				content.innerHTML = html;
				content.scrollTop = content.scrollHeight;
			}

		} else {
			console.log('There is a problem', data)
		}
	});

	socket.on('translate', function(data) {
		if (data.message) {
			translations.push(data);
			var html = '';
			for (var i=0; i<translations.length; i++) {
				html += '<b>' + (translations[i].username ? translations[i].username : 'Server') + ': </b>';
				html += translations[i].message + '<br />';
				translation.innerHTML = html;
				translation.scrollTop = translation.scrollHeight;
			}

		} else {
			console.log('There is a problem', data)
		}
	});	

	// Not best practice as this is a global function
	sendButton.onclick = sendMessage = function() {
		if (name.value == "") {
			alert("Please type your name!");
		} else {
			var text = field.value;
			socket.emit('send', { message: text, username: name.value})
			field.value = "";
		}
	}
}

$(document).ready(function() {
    $("#field").keyup(function(e) {
        if(e.keyCode == 13) {
            sendMessage();
        }
    });
});