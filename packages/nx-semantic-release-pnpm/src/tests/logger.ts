import { BaseContext } from "semantic-release";

export const createFakeSemanticReleaseLogger = () =>
  ({
    log: jest.fn(),
    error: jest.fn(),
  } as unknown as BaseContext['logger']);
