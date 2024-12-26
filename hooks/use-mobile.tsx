import * as React from "react";

type Props = {
  point?: number;
};

export function useIsMobile(props?: Props) {
  const { point = 768 } = props || {};

  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${point - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < point);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < point);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
