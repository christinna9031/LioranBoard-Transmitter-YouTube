// Receiver connection
// connect to LB
connecttoboard();
// function to establish connection to LB
function connecttoboard() {
  lioranboardclient = (new WebSocket(url));
  lioranboardclient.binaryType = 'arraybuffer';
  // reconnect on disconnect
  lioranboardclient.onclose = () => {
    ConnectionStatus('toclient', 'disconnected', 'Disconnected, attempting to reconnect.', 'red');
    if (on_server == 1) {
      on_server = 0;
    }
    connecttoboard();
    if (LBDebugPost) LBDebugPost('receiver', 'Connection Closed');
  };

  lioranboardclient.onerror = (e) => {
    if (LBDebugPost) LBDebugPost('receiver', `Connection Error ${JSON.stringify(e)}`);
  };
  // notice that connection is established
  lioranboardclient.onopen = (event) => {
    ConnectionStatus('toclient', 'connected', 'Connected.', 'green');
    if (typeof LBGetVersion !== 'undefined') LBGetVersion();
    if (LBDebugPost) LBDebugPost('receiver', event);

    {% include ext_commands.js %}
  };
  // receiving a message
  lioranboardclient.onmessage = (event) => {
    boardmessage(event);
  };
}

// receiving a message from lioranboard
function boardmessage(event) {
  if (typeof (event.data) === 'string') {
    str = event.data;
    val = str.slice(0, 1);
    str = str.slice(2, str.length);
    switch (val) {
      default:
      case '0':
      case '1':
      case '2':
      case '5':
        break;
        // JSON string from LioranBoard
      case '3':
        LBExtensionReceived(str);
        if (LBDebugPost) LBDebugPost('receiver', event.data);
        break;
        // reload transmitter
      case '4':
        window.location.reload();
        break;
        // send stuff to twitch chat
    }
  } else {
    console.log('Message received from LioranBoard is not a string.');
  }
}