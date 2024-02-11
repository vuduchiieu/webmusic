import Tippy from "@tippyjs/react/headless";
import { useAppContext } from "~/component/context/AppContext";
import classNames from "classnames/bind";
import styles from "./account.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

function Account() {
  const { avatar, setAvatart } = useAppContext();
  const [settingAcc, setSettingAcc] = useState(false);
  const handleLogOut = () => {
    setAvatart(null);
    localStorage.removeItem("photoURL");
  };
  return (
    <Tippy
      interactive
      placement="bottom-end"
      visible={settingAcc}
      render={(attrs) => (
        <div tabIndex="-1" {...attrs} className={cx("setting")}>
          <button>
            <p>Hồ sơ</p>
          </button>
          <button>
            <p>Đăng xuất</p>
          </button>
          <button onClick={handleLogOut}>
            <p>Đăng xuất</p>
          </button>
        </div>
      )}
      onClickOutside={() => setSettingAcc(!settingAcc)}
    >
      <div className={cx("login")}>
        <img onClick={() => setSettingAcc(!settingAcc)} src={avatar} />
      </div>
    </Tippy>
  );
}

export default Account;
