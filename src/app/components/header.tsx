import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { Montserrat } from "next/font/google";

const bokorFont = Montserrat({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bokor",
});

export default function Header() {
  return (
    <header
      className={`bg-white rounded-bl-lg rounded-br-lg p-4 flex justify-between mb-5 items-center ${bokorFont.className}`}
    >
      <div className="font-bold text-[18px]">4 peak</div>
      <div className="flex items-center gap-3 sm:gap-7">
        <a
          href="#"
          className="text-[#949494] text-[11px] hover:text-[#F29100] no-underline hidden sm:inline-block"
        >
          Services
        </a>
        <a
          href="#"
          className="text-[#949494] text-[11px] hover:text-[#F29100] no-underline hidden sm:inline-block"
        >
          Produkte
        </a>
        <a
          href="#"
          className="text-[#949494] text-[11px] hover:text-[#F29100] no-underline hidden sm:inline-block"
        >
          Stromtarife
        </a>
        <div className="bg-[#F29100] text-white px-3 py-1 rounded-md text-[11px] hover:bg-[#00112D] transition-colors duration-300 flex items-center gap-[12px]">
          <HiOutlineArrowLongRight size={24} />
          Anfrage
        </div>
        <div className="flex flex-col items-end space-y-2">
          <div className="w-8 h-[2px] bg-black"></div>
          <div className="w-6 h-[2px] bg-black"></div>
        </div>
      </div>
    </header>
  );
}
