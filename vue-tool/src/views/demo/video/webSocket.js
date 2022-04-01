import ReconnectingWebSocket from "reconnecting-websocket";
//这里是一个默认的url，可以没有
function getHost() {
  let host = window.location.host;
  return "ws://" + '192.168.3.254:8602';
}

function WebSocketTest(url, callback) {
  const host = getHost();
  if ("WebSocket" in window) {
    // 打开一个 web socket
    let ws = new ReconnectingWebSocket(`${host}${url}`);
    ws.onopen = function() {
      ws.send("发送数据");
    };
    ws.onmessage = function(evt) {
      let received_msg = evt.data || "{}";
      callback(received_msg, ws);
    };
    ws.onclose = function() {
      // 关闭 websocket
    };
    window.onbeforeunload = function() {
      if (ws) {
        ws.close();
      }
    };
  } else {
    // 浏览器不支持 WebSocket
  }
}

export default WebSocketTest;
