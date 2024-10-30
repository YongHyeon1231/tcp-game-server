import { createPingPacket } from '../../utils/notification/game.notification.js';

class User {
  constructor(id, socket) {
    this.id = id;
    this.socket = socket;
    this.x = 0;
    this.y = 0;
    this.sequence = 0;
    this.lastUpdateTime = Date.now();
    // 있어도 없어도 그만
    this.latency = 0;
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
    this.lastUpdateTime = Date.now();
  }

  getNextSequence() {
    return ++this.sequence;
  }

  // 보인에게 핑을 보냄
  ping() {
    const now = Date.now();

    console.log(`${this.id}: ping`);
    this.socket.write(createPingPacket(now));
  }

  // 서버에서 보냈으면 클라에서도 다시 반환해줌
  handlePong(data) {
    const now = Date.now();
    this.latency = (now - data.timestamp) / 2;
    console.log(`Received pong from user ${this.id} at ${now} with latency ${this.latency}ms`);
  }
}

export default User;
