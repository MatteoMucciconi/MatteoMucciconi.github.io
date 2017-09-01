'use strict';
const  Message = function (arg) {
    this.text = arg.text, this.message_side = arg.message_side, this.avatar = arg.who.substring(0,1).toUpperCase();
    this.draw = function (_this) {
        return function () {
            var $message;
            $message = $($('.message_template').clone().html());
			$message.find('.avatar').html(_this.avatar)
            $message.addClass(_this.message_side).find('.text').html(_this.text);
			
            $('.messages').append($message);
            return setTimeout(function () {
                return $message.addClass('appeared');
            }, 0);
        };
    }(this);
    return this;
};

const socket = io.connect();
let onlineUsers = {};
let chatter = {
	ready: false
};
chatter.addMe = () => {
	let name = $("#name").val();
	if (name != "") {
		chatter.user = {id:socket.id, name: name};
		socket.emit("join", name);
		$("#login").detach();
		$('#user-name').text(name);
		$(".chat_window").removeClass('hide');
		$(".message_input").focus();
		chatter.ready = true;
	}
}
chatter.send = () => {
	let text = $(".message_input").val();
	if(text != "") {
		socket.emit("send", text);
		$(".message_input").val('');							
	}
}

$(document).ready(function(){
	$("#name").focus();
	$("form").submit((event) => event.preventDefault());
	$("#join").click(() =>  chatter.addMe() );
	$("#name").keypress((e) => {
		if(e.which == 13) {
			chatter.addMe();
		}
	});
	$('.send_message').click( (e) => {
		return chatter.send();
	});
	$('.message_input').keyup( (e) => {
		if (e.which === 13) {
	    	return chatter.send();
	    }
	});
});
/**
* Socket Functions
*/
socket.on("update-people", function(people){
	if (chatter.ready) {
		onlineUsers = people;
		$("#people").empty();
		$.each(people, function(clientid, name) {
			$('#people').append("<li>" + name + "</li>");
		});
	}
});
socket.on("chat", function(data){
	if(chatter.ready && data.message != "") {
		let side = data.user == chatter.user.id?'right': 'left';
		let $messages = $('.messages');
		let message = new Message({
			text: data.message,
			message_side: side,
			who: onlineUsers[data.user]
		});
		message.draw();
		return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
	}
});
socket.on("disconnect", function(){
	$("#msgs").append("<li><strong><span class='text-warning'>The server is not available</span></strong></li>");
	$("#msg").attr("disabled", "disabled");
	$("#send").attr("disabled", "disabled");
});