import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border-b border-earth-300/60 bg-parchment">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/mypage" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Gondor Chic" width={40} height={40} />
          <span className="flex items-center gap-2 font-[family-name:var(--font-display)] text-xl tracking-wider text-ochre">
            <span>Gondor</span>
            <span className="text-gold">◆</span>
            <span>Chic</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 font-[family-name:var(--font-display)] text-xs tracking-[0.25em] text-earth-700 md:flex">
          <li><Link href="/mypage" className="hover:text-ochre">ACCUEIL</Link></li>
          <li><span className="cursor-default">BOUTIQUE</span></li>
          <li><span className="cursor-default">PANIER</span></li>
          <li><span className="cursor-default">PROFIL</span></li>
        </ul>

        <Link
          href="/"
          className="rounded-full border border-ochre px-5 py-1.5 text-xs tracking-[0.2em] text-ochre transition-colors hover:bg-ochre hover:text-white"
        >
          DÉCONNEXION
        </Link>
      </nav>
    </header>
  );
}

