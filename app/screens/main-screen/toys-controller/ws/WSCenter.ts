export class WSCenter {
  private webSocket: WebSocket;
  private status: "open" | "close";
  private pingInterval: NodeJS.Timer;
  private pongInterval: NodeJS.Timer;
  private messageList: string;
  private pingPong: string;

  static myInstance: WSCenter = null;
  private readonly myUrl: string;

  static getInstance() {
    if (WSCenter.myInstance == null) {
      WSCenter.myInstance = new WSCenter("ws://fangpaopao.cn:8089/websocket/chat/MTg5NjQwMTQ1NjNAMjAyMTEyMTMxMTA5NDg=");
    }

    return this.myInstance;
  }

  constructor(url) {
    this.myUrl = url;
    console.log(url);
    //this.getMessage()
  }

  connect() {//连接服务器
    this.webSocket = new WebSocket(this.myUrl);
    this.webSocket.onopen = () => {
      this.status = "open";
      console.log("connection to server is opened");
      //this.heartCheck.reset().start()
      this.webSocket.send("succeed");
      this.heartCheck();
    };
    this.webSocket.onmessage = (event => {
      console.log("onmessage", event);
    });
  }

  sendMessage(message: string) {
    this.webSocket.send(message);
  }

  sendControlMessage(message: string) {
    console.log("sendControl",message)
    this.webSocket.send(JSON.stringify({ type: "control", message: message }));
  }


  async getMessage() {//异步获取数据
    this.messageList = "";
    await new Promise((resolve) => {
      this.webSocket.onmessage = (e) => {
        //console.log(e.data)
        this.messageList = e.data;
        //console.log(this.messageList)
        resolve();
      };
    });
    console.log(this.messageList);
    return this.messageList;
  }

  heartCheck() {//心跳
    this.pingPong = "ping";
    // this.pingInterval = setInterval(() => {
    //   if (this.webSocket.readyState === 1) {
    //     this.webSocket.send("ping");
    //   }
    // }, 10000);
    // this.pongInterval = setInterval(() => {
    //   if (this.pingPong === "ping") {
    //     this.closeHandle("pingPong没有改为pong");
    //   }
    //   console.log("return the pong");
    // }, 20000);
  }

  closeHandle(res) {
    if (this.status !== "close") {
      console.log("断开，重连websocket", res);
      if (this.pongInterval !== undefined && this.pingInterval !== undefined) {
        clearInterval(this.pongInterval);
        clearInterval(this.pingInterval);
      }
      this.connect(this.myUrl);
    } else {
      console.log("websocket手动关闭了，或者正在连接");
    }
  }

  close() {//关闭连接
    clearInterval(this.pingInterval);
    clearInterval(this.pongInterval);
    this.webSocket.close();
    this.status = "close";
    this.webSocket.onclose = e => {
      console.log("socket close");
    };
  }
}