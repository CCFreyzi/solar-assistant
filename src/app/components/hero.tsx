import Image from "next/image";
import { HiArrowLongDown } from "react-icons/hi2";

export default function Hero() {
  return (
    <div>
      <Image
        className="w-full h-[400px] md:h-[650px] object-cover rounded-lg"
        src="/img_2.avif"
        alt="Опис зображення"
        width={800}
        height={420}
      />
      <div className="flex mt-[20px] justify-between items-center">
      <div className="max-w-[80%] md:max-w-[21%] text-[16px] md:text-[12px] text-[#00112D] leading-[1.2]">
      Homemade Energy für eine Zukunft in der wir gemeinsam unabhängig dem
          Morgen begegnen können.
        </div>
        <HiArrowLongDown size={34} />
      </div>
    </div>
  );
}
