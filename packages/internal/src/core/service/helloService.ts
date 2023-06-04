export const createHelloService = () => {
  return {
    hello: (name: string) => `Hello ${name}`,
  };
};

export type HelloService = ReturnType<typeof createHelloService>;
