import useApi from "../../axios/hooks/useApi";
import { axiosPublic } from "../../axios";

const useTrack = () => {
  const { triggerApiCall } = useApi<
    {
      eventName: string;
      metadata: any;
    },
    undefined
  >({
    callFunction: async (params): Promise<void> => {
      const payload = {
        event_name: params.eventName,
        metadata: params.metadata,
      };

      await axiosPublic.post("/api/track", payload);
    },
  });

  return { triggerTrackApiCall: triggerApiCall };
};

export default useTrack;
