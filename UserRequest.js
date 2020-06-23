class UserRequest {
  constructor() {}
  getUserName() {
    console.log("Enter username");
    return new Promise((res) => {
      process.stdin.setEncoding("utf-8");
      process.stdin.on("data", (data) => res(data));
    });
  }
  getPassword() {
    console.log("Enter password");
    return new Promise((res) => {
      process.stdin.setEncoding("utf-8");
      process.stdin.on("data", (data) => res(data));
    });
  }
  getConversationId() {
    console.log("Enter conversationId");
    return new Promise((res) => {
      process.stdin.setEncoding("utf-8");
      process.stdin.on("data", (data) => res(data.toString().trim()));
    });
  }
  getMessage() {
    console.log("Enter message");
    return new Promise((res) => {
      process.stdin.setEncoding("utf-8");
      process.stdin.on("data", (data) => res(data));
    });
  }
  getCountOfMessages() {
    console.log("Enter count of messages");
    return new Promise((res) => {
      process.stdin.setEncoding("utf-8");
      process.stdin.on("data", (data) => res(data));
    });
  }

}
module.exports = UserRequest;
