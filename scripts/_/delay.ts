export const delay = (delayInMs: number) =>
  new Promise((resolve) => setTimeout(resolve, delayInMs))
