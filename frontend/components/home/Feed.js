import { BsStars } from 'react-icons/bs';
import PostBox from './PostBox';
import Post from '../Posts';

const style = {
  wrapper: `flex-[2] border-r border-l border-[#38444d]`,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
};

const posts = [
  {
    displayName: 'Bprime',
    userName: '0xjhda64556djshd754djhsd765',
    avatar: '',
    text: 'gorrd mord',
  },
  {
    displayName: 'man6',
    userName: '0xjhda64556djshd754djhsd776tg65',
    avatar: '',
    text: 'gorrd mord',
  },
];

function Feed() {
  return (
    <div className={`${style.wrapper}`}>
      <div className={style.header}>
        <div className={style.headerTitle}>Home</div>
        <BsStars />
      </div>
      <PostBox />
      {posts.map((posts, index) => (
        <Post
          key={index}
          displayName={ posts.displayName}
          userName={`${posts.userName.slice( 0, 4 )}...`}
          text={posts.text}
          avatar={posts.avatar}
          isProfileImageNft={posts.isProfileImageNft}
          timestamp={posts.timestamp}
        />
      ))}
    </div>
  );
}

export default Feed;
