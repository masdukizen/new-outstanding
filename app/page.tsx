"use client";

import styles from "@/app/Sign-in.module.css";
import FormLogin from "@/components/form-login";
import Image from "next/image";
export default function Home() {
  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <article className="relative w-[170px] h-[75px]">
          <Image
            src="/images/antang_gunung_meratus.png"
            alt="logo-antang"
            fill
            sizes="(max-width: 768px) 100vw, 170px"
          />
        </article>
        <article className="relative w-[80px] h-[75px]">
          <Image
            fill
            src="/images/bssr.png"
            alt="logo-company"
            sizes="(max-width: 768px) 100vw, 170px"
          />
        </article>
      </header>
      <main className="flex flex-col  items-center xl:grid xl:grid-cols-[4fr_2fr] xl:m-0">
        <section className="relative min-h-[70dvh] lg:min-h-[65dvh] xl:min-h-[calc(100dvh-100px)]">
          <article className="hidden xl:block xl:absolute aspect-[16/9] 2xl:max-w-[95%] 2xl:-top-[255px] 2xl:-left-[130px] xl:w-full xl:-top-[230px] xl:-left-[130px]">
            <Image src="/images/desktop-img.png" alt="desktop-img" fill />
          </article>
          <article className="text-center text-[clamp(1rem,0.913rem+0.4348vw,1.25rem)] xl:absolute xl:-top-20 xl:left-[50%] xl:-translate-x-1/2 xl:text-center font-bold text-[#111313] xl:text-[#f2f2f2]">
            <h2 className="text-3xl 2xl:text-4xl">PT. ANTANG GUNUNG MERATUS</h2>
            <h3 className="text-2xl 2xl:text-3xl">
              -SUPPLY CHAIN DEPARTEMENT-
            </h3>
          </article>
          <article className=" absolute aspect-[16/9] left-1/2 -translate-x-1/2 min-w-96 mt-24 xl:min-w-72 2xl:min-w-96 xl:bottom-0 ">
            <Image src="/images/kolaborasi.svg" alt="kolaborasi" fill />
          </article>
        </section>
        <section className="relative flex flex-col items-center gap-5 xl:gap-2 2xl:gap-8 mb-10 xl:mb-0 xl:min-h-[calc(100dvh-100px)]">
          <article className=" flex  flex-col items-center mt-10 xl:mt-5 2xl:mt-32">
            <div className="relative  aspect-[16/9] h-24 2xl:h-28">
              <Image
                src="/images/po.png"
                alt="logo-PO"
                fill
                sizes="(max-width: 768px) 100vw, (min-width: 1024px) 170px"
              />
            </div>
            <h3 className="text-center font-bold xl:text-lg 2xl:text-xl">
              Integrated Outstanding PO
            </h3>
          </article>
          <article className="xl:mb-10">
            <FormLogin />
          </article>
        </section>
      </main>
    </div>
  );
}
