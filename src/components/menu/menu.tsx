import { FunctionComponent, useState, useEffect } from "react";

import { useAppSelector } from "../../hooks/useAppSelector";
import { Action } from "../../types/action";

import {
  menuContainer,
  menuHeader,
  menuTitle,
  menuCloseButton,
  activityContainer,
  activityTitle,
  userLogContainer,
  userLogText,
} from "./styles.css";

interface MenuProps {
  changeStateMenu: () => void;
  openMenu: boolean;
}

export const Menu: FunctionComponent<MenuProps> = ({
  changeStateMenu,
  openMenu,
}) => {
  const [userLogs, setUserLogs] = useState<Action[]>([]);

  const { actions } = useAppSelector((state) => state.board);

  useEffect(() => {
    if (!actions) return;

    setUserLogs(actions);
  }, [actions]);

  return (
    <div className={menuContainer} style={openMenu ? { width: "350px" } : {}}>
      <div className={menuHeader}>
        <h2 className={menuTitle}>Menu</h2>
        <button className={menuCloseButton} onClick={changeStateMenu}>
          Close
        </button>
      </div>
      <div className={activityContainer}>
        <h2 className={activityTitle}>Activity</h2>
        {userLogs.length ? (
          <div className={userLogContainer}>
            {userLogs.map((userLog) => {
              return (
                <p className={userLogText} key={userLog.id}>
                  {userLog.text}
                </p>
              );
            })}
          </div>
        ) : (
          <h2 style={{ textAlign: "center" }}>You don't have any logs yet</h2>
        )}
      </div>
    </div>
  );
};
