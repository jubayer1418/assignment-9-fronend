import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
const Logo = () => {
  return (
    <Link href={"/"}>
      <Image src={logo} alt="Logo" width={150} height={120} />

    </Link>
  );
};

export default Logo;
