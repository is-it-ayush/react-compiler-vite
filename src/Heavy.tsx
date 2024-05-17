import { useEffect, useState } from "react";

export const Heavy = () => {
  const [state, setState] = useState(0);

  useEffect(() => {
    setState(someHeavyWork());
  }, []);

  function someHeavyWork(): number {
    let sum = 0;
    for (let i = 0; i <= 1e5; i++) {
      sum += i;
    }
    return sum;
  }

  return (
    <span>
      {state}
    </span>
  );
};
