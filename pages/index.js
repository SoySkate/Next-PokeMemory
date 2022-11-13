import Link from "next/link";
import { useRouter } from "next/router";

export default function Nav() {

  return (
    <div className="bg-gray-400 min-h-screen">
      <div className="flex bg-[url('../public/phoneBgImage.png')] md:bg-[url('../public/menuPc.jpg')] md:py-96 bg-cover min-h-screen  h-72 justify-center items-center">
        <div className="md:py-12 md:px-12 py-6 px-6 bg-red-600 border border-black  rounded-full shadow-xl">
          <Link href="/playing">
            <button className="md:text-3xl md:font-bold font-black text-black text-xl border-2 border-black  bg-white rounded-full md:py-10 md:px-6 py-4 px-2 hover:bg-slate-500 hover:text-white">
              PLAY
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
