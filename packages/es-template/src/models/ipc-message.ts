export class IpcMessage<T = any> {
  channel: string;
  payload: T;

  constructor(channel: string, payload: T) {
    this.channel = channel;
    this.payload = payload;
  }
}
