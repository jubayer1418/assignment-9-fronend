import { ReactNode } from "react";

interface HeadingProps {
    children: ReactNode;
  }

const Heading = ({children}:HeadingProps) => {
  return (
    <h1 className="scroll-m-20 text-3xl  text-gradient font-extrabold text-center pb-20 tracking-tight lg:text-4xl">
 {children}
 <hr className="my-3 text-gradient"/>
  </h1>
  )
}

export default Heading