module.exports = {
  // https://stackoverflow.com/questions/71847778/why-my-nextjs-component-is-rendering-twice
  // Can turn this off to ensure no double renders.
  reactStrictMode: false,
  experimental: {
    transpilePackages: ['ui'],
  },
};
