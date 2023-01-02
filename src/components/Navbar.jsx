import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { DEX_ABI, DEX_SMART_CONTRACT_ADDRESS } from "../abi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Button } from "../components";
import { ethers } from "ethers";
import avatar from "../data/avatar.jpg";
import { Cart, Chat, Notification, UserProfile } from "~/components";
import { useStateContext } from "../contexts/ContextProvider";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import { userSelector } from "~/modules/user";
import axios from "axios";

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
  const [isConnect, setIsConnect] = useState(false);
  const [signerAddress, setSignerAddress] = useState("");
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState("");

  useEffect(() => {
    console.log("hi");
    const onLoad = async () => {
      const provider = await new ethers.providers.Web3Provider(window.ethereum);
      await setProvider(provider);
    };
    onLoad();
  }, []);

  const getSigner = async () => {
    provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setSigner(signer);
    console.log({ signer });
  };

  const handleConnectMetamask = () => {
    getSigner(provider);
  };
  useEffect(() => {
    if (signer) getWalletAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer]);

  const getWalletAddress = () => {
    signer.getAddress().then((address) => {
      setSignerAddress(address);
    });
    setIsConnect(true);
  };

  useEffect(() => {
    const onLoad = async () => {
      const dex_contract = await new ethers.Contract(
        DEX_ABI,
        DEX_SMART_CONTRACT_ADDRESS,
        provider
      );
      // console.log(contractPremium)
    };
    onLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleWithdraw = async () => {
    let ABI = ["function withdraw() public payable onlyOwner"];
    // let ABITEST = ['function updatePrice(uint _newPrice)'];

    let iface = new ethers.utils.Interface(ABI);
    // let ifacetest = new ethers.utils.Interface(ABITEST);

    let params = [
      {
        from: signerAddress,
        to: DEX_SMART_CONTRACT_ADDRESS,
        gas: "0x1FBD0", // 30400
        gasPrice: "0x1BF08EB000", // 10000000000000
        data: iface.encodeFunctionData("withdraw", []),
        // data: ifacetest.encodeFunctionData('updatePrice', [1]),
      },
    ];

    await window.ethereum
      .request({ method: "eth_sendTransaction", params })
      .then((txhash) => {
        // checkTransactionConfirm(txhash).then((result) => {
        //   if (result) {
        //     dispatch(authSlice.actions.saveSmartContractInfo({ ...smartContractInfo, balance: ethChange + smartContractInfo.balance }))
        //     // setBalance((pre) => pre + ethChange);
        //     toast.dismiss();
        //     toast.success('Swap successfully', { icon: '👻' });
        //   }
        //   const handleRequestStatus = async () => {
        //     const statusSwapToken = await axios.get(
        //       `https://api-goerli.etherscan.io/api?module=transaction&action=getstatus&txhash=${txhash}&apikey=P4UEFZVG1N5ZYMPDKVQI7FFU7AZN742U3E`,
        //     );
        //     console.log({ statusSwapToken: statusSwapToken.data });
        //   };
        //   setTimeout(handleRequestStatus, 10000);
        // });
      });
  };

  const {
    currentUserLogin,
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const [isShowModal, setIsShowModal] = useState(true);

  const openModal = () => {
    setIsShowModal(true);
  };
  const closeModal = () => {
     setIsShowModal(false);
  }
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));

  const currentUser = JSON.parse(localStorage.getItem('currentAdmin'));
  console.log({ currentUserLogin });
  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        {currentUserLogin===true ? (
          <>
            {" "}
            {
              <button
                onClick={handleWithdraw}
                className="text-md font-semibold m-1 rounded-lg border-2 text-[#03C9D7] border-[#03C9D7] ease-in py-1 px-2 hover:bg-sky-700 "
              >
                Withdraw
              </button>
            }
            {!isConnect ? (
              <button
                onClick={handleConnectMetamask}
                className="text-md font-semibold m-1 rounded-lg border-2 text-[#03C9D7] border-[#03C9D7] ease-in py-1 px-2 hover:bg-sky-700 "
              >
                Connect Wallet
              </button>
            ) : (
              <button className="text-md font-semibold m-1 rounded-lg border-2 text-[#03C9D7] border-[#03C9D7] ease-in py-1 px-2 hover:bg-sky-700 ">
                {signerAddress.slice(0, 15) + "..."}
              </button>
            )}
            {/* <NavButton
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
            /> */}
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
        {currentUserLogin===true && isClicked.userProfile && <UserProfile />} 
      </div>
    </div>
  );
};

export default Navbar;
