const ws = new WebSocket(location.href.replace(/^http/, 'ws'));

document.forms.messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const nickname = event.target.nickname.value;
  const message = event.target.message.value;
  ws.send(JSON.stringify({
    nickname,
    // to: 'Gennadiy',
    message,
  }));
});

const chatContainer = document.getElementById('chat');

ws.addEventListener('message', ({data}) => {
  const {date, nickname, message} = JSON.parse(data);
  chatContainer.innerHTML += `
  <div class="message">
    <small>${date}</small> <strong>${nickname}:</strong> <span>${message}</span>
  </div>
  `;
})
