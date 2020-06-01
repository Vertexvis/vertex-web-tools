import { Uri, UUID } from '@vertexvis/utils';

interface Scene {
  id: UUID.UUID;
}

export function fromPlatformUrn(urn: string): Scene {
  const uri = Uri.parse(urn);

  if (uri.scheme !== 'urn') {
    throw new Error('Invalid URN. Expected URN scheme.');
  }

  const [nid, vertexScheme, resourceType, resourceId] = uri.path.split(':');

  if (nid !== 'vertexvis') {
    throw new Error('Invalid URN. Expected URN to be vertexvis namespace');
  }

  if (vertexScheme !== 'platform') {
    throw new Error(
      'Invalid URN. Expected URN to contain platform vertex scheme'
    );
  }

  if (resourceType === 'scene') {
    return { id: resourceId };
  } else {
    throw new Error('Invalid URN. Unknown resource type');
  }
}