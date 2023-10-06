import { NFTStorage } from 'nft.storage';


const NFT_STORAGE_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQyNzViZDRiNjFjRTRBNzRlNTk2QzU5MWRCYWE1MUZiYTc0MjZCODQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5NTgwODUwOTg4MywibmFtZSI6ImJwcmltZSJ9.P4dmVkfGCiB3TJGqJIIzyqcUPZEqsjHCj9su6MkknF8';
export const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });


// const nftStorage = new NFTStorage({
//     apiKey: 'YOUR_NFTSTORAGE_API_KEY',
//   });
