import type { ReactNode } from "react";

type Props = {
  children: ReactNode,
  value : number,
  index: number
}

// Holds the content for each tab panel
function TabPanel({ children, value, index} : Props) {
  const isActive = value === index;
  return (
    <div
      role="tabpanel"
      hidden={!isActive}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      aria-hidden={!isActive}
      className="py-4 max-w-[600px] 2xl:max-w-[800px] overflow-y-auto h-full"
    >
      {value === index ? children : <></>}
    </div>
  );
}
export default TabPanel