import { TextureAtlas } from '../index';

test('Instantiate TextureAtlas', () => {
  expect(new TextureAtlas() instanceof TextureAtlas).toBe(true);
});
