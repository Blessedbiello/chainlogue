import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { client } from '../libraries/NftConfig'

export const ChainGlobal = createContext()

export const ChainLogueProvider = ({ children }) => {
  const [appStatus, setAppStatus] = useState('')
  const [currentAccount, setCurrentAccount] = useState('')
  const [currentUser, setCurrentUser] = useState({})
  const [posts, setPosts] = useState([])
  const router = useRouter()

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  useEffect(() => {
    if (!currentAccount && appStatus == 'connected') return
    getCurrentUserDetails(currentAccount)
    fetchPosts()
  }, [currentAccount, appStatus])

  /**
   * Check if there is  active wallet connection
   */
  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setAppStatus('noMetaMask')
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      })
      if (addressArray.length > 0) {
        setAppStatus('connected')
        setCurrentAccount(addressArray[0])

        createUserAccount(addressArray[0])
      } else {
        router.push('/')
        setAppStatus('notConnected')
      }
    } catch (err) {
      router.push('/')
      setAppStatus('error')
    }
  }

  /**
   * Initiate MetaMask wallet connection
   */
  const connectWallet = async () => {
    if (!window.ethereum) return setAppStatus('noMetaMask')
    try {
      setAppStatus('loading')

      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0])
        createUserAccount(addressArray[0])
      } else {
        router.push('/')
        setAppStatus('notConnected')
      }
    } catch (err) {
      setAppStatus('error')
    }
  }

  /**
   * Creates an account in Sanity DB if the user does not already have one
   * @param {String} userAddress Wallet address of the currently logged in user
   */
  // const createUserAccount = async (userAddress = currentAccount) => {
  //   if (!window.ethereum) return setAppStatus('noMetaMask')
  //   try {
  //     const userDoc = {
  //       _type: 'users',
  //       _id: userAddress,
  //       name: 'Unnamed',
  //       isProfileImageNft: false,
  //       profileImage:
  //         'https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg',
  //       walletAddress: userAddress,
  //     }

  //     await client.createIfNotExists(userDoc)

  //     setAppStatus('connected')
  //   } catch (error) {
  //     router.push('/')
  //     setAppStatus('error')
  //   }
  // }

  /**
   * Generates NFT profile picture URL or returns the image URL if it's not an NFT
   * @param {String} imageUri If the user has minted a profile picture, an IPFS hash; if not then the URL of their profile picture
   * @param {Boolean} isNft Indicates whether the user has minted a profile picture
   * @returns A full URL to the profile picture
   */
  const getNftProfileImage = async (imageUri, isNft) => {
    if (isNft) {
      return `https://gateway.pinata.cloud/ipfs/${imageUri}`
    } else if (!isNft) {
      return imageUri
    }
  }

  /**
   * Gets all the tweets stored in Sanity DB.
   */
  // const fetchPosts = async () => {
  //   const query = `
  //     *[_type == "posts"]{
  //       "author": author->{name, walletAddress, profileImage, isProfileImageNft},
  //       tweet,
  //       timestamp
  //     }|order(timestamp desc)
  //   `

  //   setPosts(await client.fetch(query))

  //   const sanityResponse = await client.fetch(query)

  //   setPosts([])

    /**
     * Async await not available with for..of loops.
     */
  //   sanityResponse.forEach(async item => {
  //     const profileImageUrl = await getNftProfileImage(
  //       item.author.profileImage,
  //       item.author.isProfileImageNft,
  //     )

  //     if (item.author.isProfileImageNft) {
  //       const newItem = {
  //         tweet: item.tweet,
  //         timestamp: item.timestamp,
  //         author: {
  //           name: item.author.name,
  //           walletAddress: item.author.walletAddress,
  //           profileImage: profileImageUrl,
  //           isProfileImageNft: item.author.isProfileImageNft,
  //         },
  //       }

  //       setPosts(prevState => [...prevState, newItem])
  //     } else {
  //       setPosts(prevState => [...prevState, item])
  //     }
  //   })
  // }

  /**
   * Gets the current user details from Sanity DB.
   * @param {String} userAccount Wallet address of the currently logged in user
   * @returns null
   */
  // const getCurrentUserDetails = async (userAccount = currentAccount) => {
  //   if (appStatus !== 'connected') return

  //   const query = `
  //     *[_type == "users" && _id == "${userAccount}"]{
  //       "posts": posts[]->{timestamp, post}|order(timestamp desc),
  //       name,
  //       profileImage,
  //       isProfileImageNft,
  //       coverImage,
  //       walletAddress
  //     }
  //   `
  //   const response = await client.fetch(query)

  //   const profileImageUri = await getNftProfileImage(
  //     response[0].profileImage,
  //     response[0].isProfileImageNft,
  //   )

  //   setCurrentUser({
  //     posts: response[0].posts,
  //     name: response[0].name,
  //     profileImage: profileImageUri,
  //     walletAddress: response[0].walletAddress,
  //     coverImage: response[0].coverImage,
  //     isProfileImageNft: response[0].isProfileImageNft,
  //   })
  // }

  return (
    <ChainGlobal.Provider
      value={{
        appStatus,
        currentAccount,
        connectWallet,
        posts,
        fetchPosts,
        setAppStatus,
        getNftProfileImage,
        currentUser,
        getCurrentUserDetails,
      }}
    >
      {children}
    </ChainGlobal.Provider>
  )
}