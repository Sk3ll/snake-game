// eslint-disable-next-line no-shadow
export enum SocketMessage {
    // Base messages
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
    CONNECT_ERROR = 'connect_error',

    // Game messages
    INIT_GAME = 'initGame',
    UPDATE_GAME = 'updateGame',
    ON_KEY_PRESS = 'keyPress',
}
