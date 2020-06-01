import {
  WebSocketClient,
  UrlProvider,
  WebSocketSendData,
} from '../websocket-client';
import { Disposable, EventDispatcher } from '../utils';
import { Camera } from '@vertexvis/graphics3d';

type ResponseHandler<T> = (response: T) => void;
type RequestEncoder<T> = (request: T) => WebSocketSendData;
type MessageParser<T> = (message: MessageEvent) => T;

export class StreamingClient<ReqT = any, RespT = any> {
  protected onResponseDispatcher = new EventDispatcher<RespT>();
  protected messageSubscription?: Disposable;

  protected isInteractive: Promise<boolean> = Promise.resolve(false);

  protected isInteractiveResolve: VoidFunction;
  protected isInteractiveTimeout: any;

  public constructor(
    protected requestEncoder: RequestEncoder<ReqT>,
    protected messageParser: MessageParser<RespT>,
    protected websocket: WebSocketClient = new WebSocketClient()
  ) {
    this.initializeInteractive = this.initializeInteractive.bind(this);
    this.resetInteractive = this.resetInteractive.bind(this);
  }

  public async connect(urlProvider: UrlProvider): Promise<Disposable> {
    await this.websocket.connect(urlProvider);
    this.messageSubscription = this.websocket.onMessage(message =>
      this.handleMessage(message)
    );
    return { dispose: () => this.dispose() };
  }

  public dispose(): void {
    this.websocket.close();
    this.messageSubscription?.dispose();
  }

  public onResponse(handler: ResponseHandler<RespT>): Disposable {
    return this.onResponseDispatcher.on(handler);
  }

  public beginInteraction(): Promise<RespT> {
    clearTimeout(this.isInteractiveTimeout);
    this.initializeInteractive();

    return this.send(null);
  }

  public endInteraction(): Promise<RespT> {
    this.isInteractiveTimeout = setTimeout(this.resetInteractive, 2000);

    return this.send(null);
  }

  public replaceCamera(camera: Camera.Camera): Promise<RespT> {
    return this.send(null);
  }

  protected send(request: any): Promise<RespT> {
    return new Promise(resolve => resolve());
  }

  private handleMessage(message: MessageEvent): void {
    console.log(message);

    const response = this.messageParser(message);

    console.log(response);

    this.onResponseDispatcher.emit(response);
  }

  private initializeInteractive(): void {
    if (this.isInteractiveResolve == null) {
      this.isInteractive = new Promise((resolve) => {
        this.isInteractiveResolve = resolve;
      });
    }
  }

  private resetInteractive(): void {
    if (this.isInteractiveResolve != null) {
      this.isInteractiveResolve();
    }
    this.isInteractiveResolve = null;
    this.isInteractive = Promise.resolve(false);
  }
}
