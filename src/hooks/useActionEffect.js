import { useEffect, useRef } from "react";
import { useActionContext } from "../context/ActionContext";

export const useActionEffect = ({ type, target }, callback) => {
  const { lastAction } = useActionContext();
  const lastTimestamp = useRef(null);

  useEffect(() => {
    console.log(type);
    console.log(target);
    if (
      lastAction &&
      lastAction.type === type &&
      lastAction.target === target &&
      lastAction.timestamp !== lastTimestamp.current
    ) {
      lastTimestamp.current = lastAction.timestamp;
      callback(lastAction);
    }
  }, [lastAction, type, target, callback]);
};
