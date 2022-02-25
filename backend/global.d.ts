namespace NodeJS {
  interface ProcessEnv {
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_PORT: number;

    NODE_DOCKER_PORT: number;
  }
}
