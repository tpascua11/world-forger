// logger.js

class Logger {
  log(message) {
    console.log(`[INFO] ${message}`);
  }

  warn(message) {
    console.warn(`[WARNING] ${message}`);
  }

  error(message) {
    console.error(`[ERROR] ${message}`);
  }

  scanObject(obj){
    console.log("Check", JSON.stringify(obj));
  }

  scanObjectKeys(obj){
		console.log('scaning object', Object.keys(obj));
  }

}

export default new Logger();
