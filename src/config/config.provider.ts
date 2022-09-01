import { readFileSync } from 'fs';
import { join } from 'path';

const CONFIG_FILE = 'config.json';

export default () => {
    const config = JSON.parse(readFileSync(join(__dirname, CONFIG_FILE), 'utf8'));
    config['recordsUrl'] = `http://${config.appHost}:${config.appPort}/${config.appPrefix}/records/`;
    return config;
};