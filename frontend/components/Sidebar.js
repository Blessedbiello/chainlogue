import Link from 'next/link'
import { FiMoreHorizontal, FiBell } from 'react-icons/fi';
import { VscTwitter } from 'react-icons/vsc';
import SidebarHighlights from './SidebarHighlights';
import { useState } from 'react';
import { RiHome7Line, RiHome7Fill, RifileList2Fill } from 'react-icons/ri';
import { HiOutlineMail, HiMail } from 'react-icons/hi';
import { FaregListAlt, FaHashtag, FaBell } from 'react-icons/fa';
import { CgMoreO } from 'react-icons/cg'; 
import { MdOutlineCollectionsBookmark, MdCollectionsBookmark } from 'react-icons/md'
import {
  BsBookmark,
  BsBookmarkFill,
  BsPerson,
  BsPersonFill
} from 'react-icons/bs'


const style = {
  wrapper: `flex-[0.7] px-8 flex-col`,
  twitterIconContainer: `text-3xl m-4`,
  postButton: `bg-[#1d9bf0] hover:bg-[#1b8cd8] flex items-center justify-center font-bold rounded-3xl h-[50px] mt-[20px] cursor-pointer`,
  navContainer: `flex-1`,
  profileButton: `flex items-center mb-6 cursor-pointer hover`,
  profileLeft: `flex item-center justify-center mr-4`,
  profileImage: `height-12 w-12 rounded-full`,
  profileRight: `flex-1 flex`,
  details: `flex-1`,
  name: `text-lg`,
  handle: `text-[#8899a6]`,
  moreContainer: `flex items-center mr-2`,
};


function Sidebar({ initialSelectedIcon = 'Home'}) {
  const [selected, setSelected] = useState(initialSelectedIcon)
  return (
    <div className={style.wrapper}>
      <div className={style.twitterIconContainer}>
        <VscTwitter />
      </div>
      <div className={style.navContainer}>

        <SidebarHighlights
          Icon={selected === 'Home' ? RiHome7Fill : RiHome7Line}
          text='Home'
          isActive={Boolean(selected === 'Home')}
          setSelected={setSelected}
          redirect={'/'}
         />
        <SidebarHighlights
          Icon={selected === 'Notifications' ? FaBell : FiBell}
          text='Notifications'
          isActive={Boolean(selected === 'Notifications')}
          setSelected={setSelected}
        />

        <SidebarHighlights
          Icon={selected === 'Collectibles' ? MdCollectionsBookmark : MdOutlineCollectionsBookmark }
          text='Collectibles'
          isActive={Boolean(selected === 'Collectibles')}
          setSelected={setSelected}
          redirect={'/collectibles'}
        />  

        <SidebarHighlights
          Icon={selected === 'Profile' ? BsPersonFill : BsPerson}
          text='Profile'
          isActive={Boolean(selected === 'Profile')}
          setSelected={setSelected}
          redirect={'/profile'}
        />

<       SidebarHighlights
          Icon={selected === 'Messages' ? HiMail : HiOutlineMail}
          text='Messages'
          isActive={Boolean(selected === 'Messages')}
          setSelected={setSelected}
        />

        <div className={style.postButton}>Mint</div>
      </div>
      <div className={style.profileButton}>
        <div className={style.profileLeft}></div>
        <div className={style.profileRight}>
          <div className={style.details}>
            <div className={style.name}>Bprime</div>
            <div className={style.handle}>@0x43gf...5dfge</div>
          </div>
          <div className={style.moreContainer}>
            <FiMoreHorizontal />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
