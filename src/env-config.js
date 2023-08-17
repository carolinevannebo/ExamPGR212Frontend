const config = {
    https: process.env.REACT_APP_HTTPS === 'true',
    sslCrtFile: process.env.REACT_APP_SSL_CRT_FILE,
    sslKeyFile: process.env.REACT_APP_SSL_KEY_FILE
  };
  
  export default config;