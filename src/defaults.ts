import { enums, types } from './internal';

export const region: types.Region = {
  name: 'missing_name',
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  offsetX: 0,
  offsetY: 0,
  originalWidth: 0,
  originalHeight: 0,
  rotate: false,
  index: 0,
};

export const page: types.Page = {
  name: 'default',
  texture: new Blob(),
};

export const pack: types.Pack = {
  page,
  width: 0,
  height: 0,
  format: enums.PackFormat.RGBA8888,
  minFilter: enums.PackFilter.LINEAR,
  magFilter: enums.PackFilter.LINEAR,
  repeat: enums.PackRepeat.NONE,
  preMultipliedAlpha: false,
  regions: [region],
};
