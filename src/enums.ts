export enum PackFormat {
  ALPHA = 'Alpha',
  INTENSITY = 'Intensity',
  LUMINANCEALPHA = 'LuminanceAlpha',
  RGB565 = 'RGB565',
  RGBA4444 = 'RGBA4444',
  RGB888 = 'RGB888',
  RGBA8888 = 'RGBA8888',
}

export enum PackFilter {
  NEAREST = 'Nearest',
  LINEAR = 'Linear',
  MIPMAP = 'MipMap',
  MIPMAPNEARESTNEAREST = 'MipMapNearestNearest',
  MIPMAPLINEARNEAREST = 'MipMapLinearNearest',
  MIPMAPNEARESTLINEAR = 'MipMapNearestLinear',
  MIPMAPLINEARLINEAR = 'MipMapLinearLinear',
}

export enum PackRepeat {
  X = 'x',
  Y = 'y',
  XY = 'xy',
  NONE = 'none',
}
