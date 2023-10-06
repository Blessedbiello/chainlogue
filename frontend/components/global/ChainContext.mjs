// import { NFTStorage } from 'nft.storage'
import { NFTStorage, File, Blob } from 'nft.storage'

import { client } from "../../libraries/NftConfig.mjs"


const imageFile = new File([ someBinaryImageData ], 'nft.png', { type: 'image/png' })
const metadata = await client.store({
  name: 'My sweet NFT',
  description: 'Just try to funge it. You can\'t do it.',
  image: imageFile
})


const someData = new Blob(["hello world"])
const cid = await client.storeBlob(someData)