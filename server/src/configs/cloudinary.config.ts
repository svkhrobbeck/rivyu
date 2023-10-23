const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

const config = {
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
};

export default config;
