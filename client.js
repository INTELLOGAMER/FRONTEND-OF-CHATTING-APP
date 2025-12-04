const socket=io('https://chatting-app-g0pr.onrender.com');
const form=document.getElementById('input-area');
const messageinput=document.getElementById('message-input');
const messagecontainer=document.querySelector('.message1');
var audio=new Audio('ting.mp3');
const append=(message,position)=>{
    messageelement=document.createElement('div');
    messageelement.innerText=message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);
    if(position=='left'){
        audio.play();
    };
};
// const name=prompt("Enter your name to join the chat");
let name;
do {
    name = prompt("Enter your name to join the chat:", "");
    if (name === null) {
        alert("A name is required to join the chat. Please try again.");
    } else {
        name = name.trim();
    }
} while (!name);

socket.emit('new-user-joined',name);
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'left');
});
socket.on('recieve',data=>{
    append(`${data.name}: ${data.message}`,'left');

});
socket.on('left',data=>{
    append(`${data} left the chat`,'left');
});
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageinput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageinput.value='';

});