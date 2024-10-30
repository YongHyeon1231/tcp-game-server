import { HANDLER_IDS } from '../constants/handlerIds.js';
import createGameHandler from './game/createGame.handler.js';
import joinGameHandler from './game/joinGame.handler.js';
import InitialHandler from './user/initial.handler.js';

// 핸들러를 맵핑하기 위해서
const handlers = {
  [HANDLER_IDS.INITIAL]: {
    handler: InitialHandler,
    protoType: 'initial.InitialPacket',
  },
  [HANDLER_IDS.CREATE_GAME]: {
    handler: createGameHandler,
    protoType: 'game.CreateGamePayload',
  },
  [HANDLER_IDS.JOIN_GAME]: {
    handler: joinGameHandler,
    protoType: 'game.JoinGamePayload',
  },
};

export const getHandlerById = (handlerId) => {
  if (!handlers[handlerId]) {
    throw new CustomError(
      ErrorCodes.UNKNOWN_HANDLER_ID,
      `핸들러를 찾을 수 없습니다: ID ${handlerId}`,
    );
  }
  return handlers[handlerId].handler;
};

// 핸들러아이디로 프로토타입의 이름을 조회
export const getProtoTypeNameByHandlerId = (handlerId) => {
  if (!handlers[handlerId]) {
    // packetParser 체크하고 있지만 그냥 추가합니다.
    throw new CustomError(
      ErrorCodes.UNKNOWN_HANDLER_ID,
      `핸들러를 찾을 수 없습니다: ID ${handlerId}`,
    );
  }

  return handlers[handlerId].protoType;
};
