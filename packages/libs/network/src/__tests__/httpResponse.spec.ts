import * as HttpResponse from '../httpResponse';
import xhrMock from 'xhr-mock';

describe(HttpResponse.fromXhr, () => {
  beforeEach(() => xhrMock.setup());

  afterEach(() => xhrMock.teardown());

  it('returns a response with the correct status code', async () => {});
});
