import AIFlowClient from '@devvibex/aiflow';
export const aiflow1976 = new AIFlowClient({
  appId: 'ck--wPBFBCiYAu0mCRxye75A5oQTcEuetihWuqki2Wr5do',
  baseUrl: 'https://app.vibe-x.app/v1/aiflow',
  endUserId: (typeof localStorage !== 'undefined' && localStorage.getItem('user_id')) || undefined,
  appUserToken: (typeof localStorage !== 'undefined' && localStorage.getItem('access_token')) || undefined,
});
export const aiflow1976ConfigPromise = aiflow1976.getConfig().catch((err) => {
  console.warn('AIFlow config preload failed:', err?.message);
  return null;
});
export const aiflowClients = [
  aiflow1976,
];