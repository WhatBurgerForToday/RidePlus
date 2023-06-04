export type Expand<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown> ? Expand<T[K]> : T[K];
} extends infer X
  ? X
  : never;

export type MakeOptional<T, K extends keyof T> = Expand<
  Omit<T, K> & Partial<Pick<T, K>>
>;
