import { Plugin } from 'rollup';
import { copyrightText } from './copyright';

export function copyright(copyright: string = copyrightText): Plugin {
  return {
    name: 'vertex-copyright',
    renderChunk: code => {
      const lines = copyright.split('\n').map(line => ` * ${line}`);
      return `/**!\n${lines.join('\n')}\n */\n${code}`;
    },
  };
}
