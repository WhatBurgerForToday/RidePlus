import { useCallback } from "react";
import {
  useOAuth as useOAuth$,
  type UseOAuthFlowParams,
} from "@clerk/clerk-expo";

export const useOAuth = (strategy: UseOAuthFlowParams["strategy"]) => {
  const { startOAuthFlow } = useOAuth$({ strategy });

  const handleOAuthFlow = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({});
      if (createdSessionId) {
        void setActive?.({ session: createdSessionId });
      }
    } catch (error) {
      console.log(error);
    }
  }, [startOAuthFlow]);

  return handleOAuthFlow;
};
