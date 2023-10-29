declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      SECRET: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
    }
  }
}

export {};
