import { getProtoMessages } from '../../init/loadProtos.js';

// data는 바이트 배열로 들어올 것이다.
// 호출되는 것은 당연히 가장 최초로 데이터를 받는 onData.js에서 호출이 됩니다.
export const packetParser = (data) => {
  const protoMessages = getProtoMessages();

  // 공통 패킷 구조를 디코딩
  const Packet = protoMessages.common.Packet;
  let packet;
  try {
    packet = Packet.decode(data);
  } catch (error) {
    console.error(error);
  }

  const handlerId = packet.handlerId;
  const userId = packet.userId;
  const clientVersion = packet.clientVersion;
  const payload = packet.payload;
  const sequence = packet.sequence;

  console.log('clientVersion: ', clientVersion);

  return { handlerId, userId, payload, sequence };
};
