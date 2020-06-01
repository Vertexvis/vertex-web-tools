import { Disposable } from '../utils';
import { CommandFactory, StreamingClients } from './command';
import { ConfigProvider } from '../config/config';
import { CredentialsProvider } from '../credentials/credentials';
import { HttpClientProvider } from '../api-client/httpClient';
import { StreamingClient } from '../streaming-client';

interface CommandDefinition<R, S extends StreamingClients> {
  factory: CommandFactory<R, S>;
  thisArg: any | undefined;
}

export class CommandRegistry {
  private commands: Record<string, CommandDefinition<any, any>> = {};

  public constructor(
    private stream: StreamingClient,
    private httpClientProvider: HttpClientProvider,
    private configProvider: ConfigProvider,
    private credentialsProvider: CredentialsProvider
  ) {}

  public register<R, S extends StreamingClients, T>(
    id: string,
    factory: CommandFactory<R, S>,
    thisArg?: T
  ): Disposable {
    this.commands[id] = { factory, thisArg };
    return { dispose: () => delete this.commands[id] };
  }

  public execute<R>(id: string, ...args: any[]): Promise<R> {
    const commandDefinition = this.getCommandDefinition(id);
    if (commandDefinition != null) {
      const command = commandDefinition.factory.apply(
        commandDefinition.thisArg,
        args
      );

      return Promise.resolve(
        command({
          stream: this.stream,
          httpClient: this.httpClientProvider(),
          config: this.configProvider(),
          credentialsProvider: this.credentialsProvider,
        }) as any
      );
    } else {
      throw new Error(`Command not registered for \`${id}\``);
    }
  }

  private getCommandDefinition<R, S extends StreamingClients>(
    id: string
  ): CommandDefinition<R, S> | undefined {
    return this.commands[id];
  }
}
