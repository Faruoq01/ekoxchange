export class AppEnv {
  static cloudinary = {
    cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUD_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_API_SECRET,
    upload_preset: process.env.NEXT_PUBLIC_CLOUD_UPLOAD_PRESET,
  };

  static api = {
    base_url: process.env.NEXT_PUBLIC_BASE_URL,
  };
}
