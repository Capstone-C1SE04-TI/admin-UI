import React, { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import {  Button } from "../components";

import avatar from '../data/avatar.jpg';
import { Cart, Chat, Notification, UserProfile } from '~/components';
import { useStateContext } from '../contexts/ContextProvider';
import Modal from './Modal';
import { useSelector } from 'react-redux';
import { userSelector } from '~/modules/user';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {currentUserLogin, currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const [isShowModal, setIsShowModal] = useState(false)

  const openModal = () => {
     setIsShowModal(true);
  }
  const closeModal = () => {
     setIsShowModal(false);
  }
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));

  const currentUser = JSON.parse(localStorage.getItem('currentAdmin'));
  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        {currentUser || currentUserLogin ? (
          <>
            {" "}
            <NavButton
              title="Chat"
              dotColor="#03C9D7"
              customFunc={() => handleClick("chat")}
              color={currentColor}
              icon={<BsChatLeft />}
            />
            <NavButton
              title="Notification"
              dotColor="rgb(254, 201, 15)"
              customFunc={() => handleClick("notification")}
              color={currentColor}
              icon={<RiNotification3Line />}
            />
            <TooltipComponent content="Profile" position="BottomCenter">
              <div
                className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                onClick={() => handleClick("userProfile")}
              >
                <img
                  className="rounded-full w-8 h-8"
                  src={avatar}
                  alt="user-profile"
                />
                <p>
                  <span className="text-gray-400 text-14">Hi,</span>{" "}
                  <span className="text-gray-400 font-bold ml-1 text-14">
                    {adminInfo.username}
                  </span>
                </p>
                <MdKeyboardArrowDown className="text-gray-400 text-14" />
              </div>
            </TooltipComponent>
          </>
        ) : (
          <button
            className="text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={openModal}
            style={{ backgroundColor: "rgb(3, 201, 215)" }}
          >
            Sign In
          </button>
        )}

        <Modal showModal={isShowModal} requestCloseModal={closeModal} />
        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
