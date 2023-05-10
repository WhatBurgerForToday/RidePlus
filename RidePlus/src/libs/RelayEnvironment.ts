import type { FetchFunction } from "relay-runtime";
import { Environment, Network, RecordSource, Store } from "relay-runtime";

const HTTP_ENDPOINT = "http://localhost:8080/graphql";

const fetchFn: FetchFunction = async (params, variables) => {
  const response = await fetch(HTTP_ENDPOINT, {
    method: "POST",
    headers: {
      Accept:
        "application/graphql-response+json; charset=utf-8, application/json; charset=utf-8",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await response.json();
};

export const createRelayEnvironment = () => {
  return new Environment({
    network: Network.create(fetchFn),
    store: new Store(new RecordSource()),
  });
};

export type RelayEnvironment = ReturnType<typeof createRelayEnvironment>;

export const relayEnvironment = createRelayEnvironment();
