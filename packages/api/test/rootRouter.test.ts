import { describe, expect, it } from "vitest";

import { createInnerTRPCContext } from "../src/trpc";

describe("rootRouter", () => {
  it("should return hello world", () => {
    const ctx = createInnerTRPCContext({
      auth: {
        sessionClaims: null,
        sessionId: null,
        session: null,
        actor: null,
        userId: null,
        user: null,
        orgId: null,
        orgRole: null,
        orgSlug: null,
        organization: null,
        getToken: () => Promise.resolve(null),
        debug: () => null,
      },
      helloService: {
        hello: (name: string) => `Alan hate ${name}`,
      },
    });

    expect(ctx.helloService.hello("BaBa")).toBe("Alan hate BaBa");
  });
});
