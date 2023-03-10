# gdx-texture-atlas
TS/JS port of the TextureAtlas class that can be found in the 1.11.0 version of libGDX. This is my first NPM library, so feedback/contributions would definitely be appreciated.
## Example
### Instantiate TextureAtlas
```ts
import { TextureAtlas } from 'gdx-texture-atlas';

const atlas = new TextureAtlas();

const packPagePair = {
    pack: // Blob object of your pack file (text file)
    page: // Blob object of the associated page file (image file)
}

// ...
```
### Asynchronously set and get pack
```ts
// ...

asyncFunction();
async function asyncFunction() {
    await textureAtlas.setPack(packPagePair).then(pack => {console.log(pack)}); // setPack() resolves into the pack, so feel free to use it with a .then()
    const pack = textureAtlas.getPack() // as long as you await setPack(), pack should be guaranteed to be defined
}
```
### Synchronously set and get pack
make sure to wait a little time before using getPack() and gracefully handle if not yet defined
```ts
// ...

textureAtlas.setPack(packPagePair);
const pack = textureAtlas.getPack();
if (pack !== undefined) console.log(pack) // do something with pack if defined
else console.log('Pack is not initialized yet.') // gracefully handle if not yet defined
```
## Disclaimer
There may be areas where this library is little biased to fit my specific use case since I'm only developing this because I happen to need this functionality. That being said, I want to try and to make it as generic and applicable to as many use cases and environments as possible, so if there's something that doesn't work with your use case, let me know and maybe I can improve that aspect of the library.
## Support
Don't expect first class support, but if you need to contact me, feel free to friend req me on Discord: Vince the Animator#2359

I'll do what I can within reason