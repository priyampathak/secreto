/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
  API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000',
  AUTH0_SECRET:"36192e0919bfb2c12bc73c71ea38fd47b7857d383673d8d73f276d1fb9bd07a8",
  AUTH0_BASE_URL:"http://localhost:3000",
  AUTH0_ISSUER_BASE_URL:"dev-hkpg5beuzskfa4no.us.auth0.com",
  AUTH0_CLIENT_ID:"zC9IUSskat9YmXcpFDMv1uFXtkGY2U2j",
  AUTH0_CLIENT_SECRET:"aGxxp6mKrW_5BQ-u9Ps4p3ixMvE6sib9XHgiYrxpthooP-6eaww4BNMO0eHT_Dj2"
  },
  images: {
    domains: ['secreto.me'],
  },
};

export default nextConfig;
