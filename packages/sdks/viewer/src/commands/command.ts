import { ImageStreamingClient } from '../image-streaming-client';
import { Config } from '../config/config';
import { CredentialsProvider } from '../credentials/credentials';
import { HttpClient } from '@vertexvis/network';
import { FrameStreamingClient } from '../frame-streaming-client';

export type StreamingClients = ImageStreamingClient | FrameStreamingClient;

export interface CommandContext<T extends StreamingClients> {
  stream: T;
  httpClient: HttpClient.HttpClient;
  config: Config;
  credentialsProvider: CredentialsProvider;
}

export type CommandFactory<T, S extends StreamingClients> = (...args: any[]) => Command<T, S>;

export type Command<T, S extends StreamingClients> = (context: CommandContext<S>) => T | Promise<T>;
