import * as readline from 'readline';
import { Readable } from 'stream';
import { types, defaults, enums } from './internal';

interface Data {
  [name: string]: string | number | boolean | RegionData[];
  regions: RegionData[];
}
interface RegionData {
  [name: string]: string;
}

export async function parsePackPagePair(packPagePair: types.PackPagePair): Promise<types.Pack> {
  return new Promise(async (resolve, reject) => {
    const page = await validatePage(packPagePair.page).catch((err) => {
      reject(err);
      return defaults.page;
    });
    const pack = await validatePack(packPagePair.pack, page).catch((err) => {
      reject(err);
      return defaults.pack;
    });
    resolve(pack);
  });
}
export async function validatePack(pack: Blob, page: types.Page): Promise<types.Pack> {
  return new Promise(async (resolve, reject) => {
    if (pack.type !== 'text/plain') reject(new Error("Provided Blob is not of type 'text/plain'"));
    const parsedPack = await parsePack(pack.stream(), page).catch((err) => {
      reject(err);
      return defaults.pack;
    });
    resolve(parsedPack);
  });
}

export async function validatePage(page: Blob): Promise<types.Page> {
  return new Promise(async (resolve, reject) => {
    if (page.type !== 'image/x-png') {
      reject(new Error("Provided Blob is not of type 'image/x-png'"));
      return defaults.page;
    }
    resolve(defaults.page);
  });
}

export async function parsePack(packWebStream: ReadableStream, page: types.Page): Promise<types.Pack> {
  return new Promise((resolve, reject) => {
    const readlineInterface = readline.createInterface({
      input: Readable.fromWeb(packWebStream as import('stream/web').ReadableStream),
      crlfDelay: Infinity,
    });
    const pack = defaults.pack;

    const data: Data = { regions: [{}] };
    let regionData: RegionData = {};
    let lineNumber = 1;
    let lastRegion = '';
    readlineInterface.on('line', (line) => {
      const lastLastRegion = lastRegion;
      if (lineNumber === 1) {
        /* tslint:disable:no-string-literal */
        data['name'] = line;
        /* tslint:enable:no-string-literal */
        lineNumber++;
        return;
      }
      if (!line.includes(':')) lastRegion = line;
      if (lastRegion === '') {
        const [name, value] = line.split(':');
        data[name] = value.trim();
      } else {
        if (line.startsWith(' ')) {
          const [name, value] = line.trimStart().split(':');
          regionData[name] = value.trim();
        } else {
          if (lastLastRegion !== line && lastLastRegion !== '') {
            /* tslint:disable:no-string-literal */
            regionData['name'] = lastLastRegion;
            /* tslint:enable:no-string-literal */
            if (Object.keys(data.regions[0]).length === 0) data.regions[0] = regionData;
            else data.regions.push(regionData);
            regionData = {};
          }
        }
      }
      lineNumber++;
    });

    readlineInterface.on('close', () => {
      const cleanData = cleanUpData(data);
      resolve(pack);
    });
  });
}

function cleanUpData(data: Data) {
  const cleanData = defaults.pack;
  Object.keys(data).forEach((key) => {
    const object = data[key];
    if (key === 'filter' && typeof object === 'string') {
      const splitArgs = object.split(',').map((el) => {
        return el.trim();
      });
      if (Object.values(enums.PackFilter).some((filter: string) => filter === splitArgs[0]))
        cleanData.minFilter = splitArgs[0] as enums.PackFilter;
      if (Object.values(enums.PackFilter).some((filter: string) => filter === splitArgs[1]))
        cleanData.magFilter = splitArgs[1] as enums.PackFilter;
      return;
    }
    const match = Object.keys(cleanData).findIndex((cleanDataKey) => {
      return cleanDataKey === key;
    });
    if (match !== -1 && typeof object === 'string') {
      Object.keys(cleanData)[match] = object;
    }
  });
  data.regions.forEach((region, i) => {
    const cleanRegion = defaults.region;
    Object.keys(region).forEach((regionKey) => {
      const object = region[regionKey];
      if (regionKey === 'xy' && typeof object === 'string') {
        const splitArgs = object.split(',').map((el) => {
          return el.trim();
        });
        const arg1 = parseInt(splitArgs[0], 10);
        const arg2 = parseInt(splitArgs[1], 10);
        cleanRegion.x = !isNaN(arg1) ? arg1 : defaults.region.x;
        cleanRegion.y = !isNaN(arg2) ? arg2 : defaults.region.y;
        return;
      }

      if (regionKey === 'size' && typeof object === 'string') {
        const splitArgs = object.split(',').map((el) => {
          return el.trim();
        });
        const arg1 = parseInt(splitArgs[0], 10);
        const arg2 = parseInt(splitArgs[1], 10);
        cleanRegion.width = !isNaN(arg1) ? arg1 : defaults.region.width;
        cleanRegion.height = !isNaN(arg2) ? arg2 : defaults.region.height;
        return;
      }

      if (regionKey === 'orig' && typeof object === 'string') {
        const splitArgs = object.split(',').map((el) => {
          return el.trim();
        });
        const arg1 = parseInt(splitArgs[0], 10);
        const arg2 = parseInt(splitArgs[1], 10);
        cleanRegion.originalWidth = !isNaN(arg1) ? arg1 : defaults.region.originalWidth;
        cleanRegion.originalHeight = !isNaN(arg2) ? arg2 : defaults.region.originalHeight;
        return;
      }

      if (regionKey === 'offset' && typeof object === 'string') {
        const splitArgs = object.split(',').map((el) => {
          return el.trim();
        });
        const arg1 = parseInt(splitArgs[0], 10);
        const arg2 = parseInt(splitArgs[1], 10);
        cleanRegion.offsetX = !isNaN(arg1) ? arg1 : defaults.region.offsetX;
        cleanRegion.offsetY = !isNaN(arg2) ? arg2 : defaults.region.offsetY;
        return;
      }
      if (regionKey === 'rotate') {
        cleanRegion.rotate = object === 'true' ? true : false;
      }
      if (regionKey === 'index') {
        const index = parseInt(object, 10);
        cleanRegion.index = !isNaN(index) ? index : defaults.region.index;
      }
      cleanRegion.name = region.name;
    });
    if (i === 0) cleanData.regions[0] = { ...cleanRegion };
    else cleanData.regions.push({ ...cleanRegion });
  });
  return cleanData;
}
