import { useCallback } from "react";
import type { UseOAuthFlowParams } from "@clerk/clerk-expo";
import { useOAuth } from "@clerk/clerk-expo";

export const useStartOAuthFlow = (strategy: UseOAuthFlowParams["strategy"]) => {
  const { startOAuthFlow } = useOAuth({
    strategy,
  });

  const handleOAuthFlow = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({});

      if (createdSessionId) {
        void setActive?.({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, [startOAuthFlow]);

  return handleOAuthFlow;
};
