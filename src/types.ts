import { enums } from './internal';

export type PackPagePair = {
  pack: Blob;
  page: Blob;
};

export type Pack = {
  page: Page;
  width: number;
  height: number;
  format: enums.PackFormat;
  minFilter: enums.PackFilter;
  magFilter: enums.PackFilter;
  repeat: enums.PackRepeat;
  preMultipliedAlpha: boolean;
  regions: Region[];
};

export type Page = {
  name: string;
  texture: Blob;
};

export type Region = {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  // TODO: consider replacing "x", "y", "width", and "height" with a single "bounds" property as per the new format
  offsetX: number;
  offsetY: number;
  // TODO: consider replacing "offsetX" and "offsetY" with a single "offsets" property as per the new format
  originalWidth: number;
  originalHeight: number;
  rotate: boolean;
  index: number;
};
