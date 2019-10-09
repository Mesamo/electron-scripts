type EmitFn<T> = (e: T) => void;

export class EventQueue<T = any> {
  events: T[] = [];
  timerId?: NodeJS.Timeout;

  enqueue(event: T) {
    this.events.push(event);
  }

  dequeue(): T | undefined {
    return this.events.shift();
  }

  isEmpty(): boolean {
    return this.events && this.events.length === 0;
  }

  clean(): void {
    this.events = [];
  }

  emit(emitter: EmitFn<T>, interval: number = 0): void {
    if (this.isEmpty()) {
      return;
    }
    this.timerId = global.setInterval(() => {
      const event = this.dequeue();
      if (event) {
        emitter(event);
      }
      if (this.isEmpty() && this.timerId) {
        clearInterval(this.timerId);
        this.timerId = undefined;
      }
    }, interval);
  }
}
