import { defaults, types, utils } from './internal';

export class TextureAtlas {
  private pack: types.Pack | undefined;

  async setPack(packPagePair: types.PackPagePair) {
    const parsedPack = await utils.parsePackPagePair(packPagePair).catch((err) => {
      return defaults.pack;
    });
    this.pack = parsedPack;
    return this.pack;
  }

  getPack() {
    return this.pack;
  }
}
