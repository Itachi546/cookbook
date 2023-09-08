export let testConfig = {
  // Set env ETHEREUM_RPC to change default fork RPC.
  ethereumForkRPC: process.env.ETHEREUM_RPC ?? 'https://cloudflare-eth.com',

  showVerboseLogs: false,

  // Mock wallets for tests
  signerMnemonic: 'test test test test test test test test test test test junk',
  railgunMnemonic:
    'test test test test test test test test test test test junk',
  railgunMnemonic2:
    'nation page hawk lawn rescue slim cup tired clutch brand holiday genuine',
  encryptionKey:
    '0101010101010101010101010101010101010101010101010101010101010101',

  contractsEthereum: {
    proxy: '0xfa7093cdd9ee6932b4eb2c9e1cde7ce00b1fa4b9',
    treasuryProxy: '0xE8A8B458BcD1Ececc6b6b58F80929b29cCecFF40',
    weth9: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    relayAdapt: '0x0355B7B8cb128fA5692729Ab3AAa199C1753f726',

    // WARNING: Be careful adding tokens to this list.
    // Each new token will increase the setup time for tests.
    // Standard tokens
    rail: '0xe76C6c83af64e4C60245D8C7dE953DF673a7A33D',
    usdc: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    // LP tokens
    usdcWethSushiSwapV2LPToken: '0x397ff1542f962076d0bfe58ea045ffa2d347aca0',
    // Vault tokens
    steCRV: '0x06325440D014e39736583c165C2963BA99fAf14E',
    mooConvexStETH: '0xa7739fd3d12ac7F16D8329AF3Ee407e19De10D8D',
  },

  contractsArbitrum: {
    proxy: '0xfa7093cdd9ee6932b4eb2c9e1cde7ce00b1fa4b9',
    treasuryProxy: '0xE8A8B458BcD1Ececc6b6b58F80929b29cCecFF40',
    weth9: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    relayAdapt: '0x0355B7B8cb128fA5692729Ab3AAa199C1753f726',

    // Standard tokens
    dai: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
  },

  contractsPolygon: {
    proxy: '0xfa7093cdd9ee6932b4eb2c9e1cde7ce00b1fa4b9',
    treasuryProxy: '0xE8A8B458BcD1Ececc6b6b58F80929b29cCecFF40',
    weth9: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
    relayAdapt: '0x0355B7B8cb128fA5692729Ab3AAa199C1753f726',

    // Standard tokens
    usdc: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
  },

  // OVERRIDES - override using test-config-overrides.ts

  // API Domain for a proxy server equipped with 0x nginx config that includes private API key.
  zeroXProxyApiDomain: process.env.ZERO_X_PROXY_API_DOMAIN ?? '',
  // API Key for 0x API.
  zeroXApiKey: process.env.ZERO_X_API_KEY ?? '',
};

try {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, global-require, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-member-access
  const overrides = require('./test-config-overrides.test').default;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  testConfig = { ...testConfig, ...overrides };
  // eslint-disable-next-line no-empty
} catch {
  // eslint-disable-next-line no-console
  console.error('Could not load test-config-overrides.');
}
