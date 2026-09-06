import ChatWidget from "./components/ChatWidget";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-[#06070B] text-white">
      {/* HERO */}
      <section className="relative h-screen">
        <Image
          src="/hero-ai.jpg"
          alt="HexCoded AI Studio"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/65" />

        <nav className="absolute top-0 z-20 w-full px-8 py-7 flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-[0.25em]">
            HEX<span className="text-yellow-400">CODED</span>
          </h1>

          <a
            href="https://cal.com/fajeela-sahul-zzapie/hexcoded-demo"
            target="_blank"
            className="rounded-full bg-yellow-400 px-5 py-2 font-semibold text-black"
          >
            Live Demo
          </a>
        </nav>

        <div className="absolute inset-0 z-10 flex items-center px-8">
          <div className="max-w-3xl">
            <p className="uppercase tracking-[0.35em] text-yellow-300 text-sm">
              AI CINEMA STUDIO
            </p>

            <h1 className="mt-4 text-6xl md:text-8xl font-black leading-none">
              MAKE
              <span className="block text-yellow-400">SHOWS</span>
              <span className="block">NOT SHOTS</span>
            </h1>

            <p className="mt-8 text-lg text-zinc-200 leading-8 max-w-xl">
              Create AI-generated short dramas, vertical series and short films
              while keeping every character visually consistent across an entire
              season.
            </p>

            <div className="mt-10 flex gap-4 flex-wrap">
              <a
                href="https://cal.com/fajeela-sahul-zzapie/hexcoded-demo"
                target="_blank"
                className="rounded-full bg-yellow-400 px-8 py-4 font-bold text-black"
              >
                Schedule Live Demo
              </a>

              <a
                href="#workflow"
                className="rounded-full border border-white/30 px-8 py-4"
              >
                Explore Workflow
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.3em] text-yellow-300 text-sm">
            WHY HEXCODED
          </p>
          <h2 className="text-4xl font-black mt-3">
            Built for Series Production
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            [
              "Character Consistency",
              "Keep the same faces, wardrobe and visual identity across every episode.",
            ],
            [
              "AI Series Production",
              "Produce short dramas, vertical series and cinematic short films.",
            ],
            [
              "Studio Workflow",
              "Designed for studios, editors, AI filmmakers and content teams.",
            ],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-400 to-pink-500 mb-5" />
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="mt-3 text-zinc-400 leading-7">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WORKFLOW */}
      <section id="workflow" className="bg-white/5 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-14">
            <p className="uppercase tracking-[0.3em] text-yellow-300 text-sm">
              PRODUCTION PIPELINE
            </p>
            <h2 className="text-4xl font-black mt-3">
              From Idea to Episode
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {["Script", "Characters", "Scenes", "Episodes"].map((item, i) => (
              <div
                key={item}
                className="rounded-3xl bg-[#111216] p-6 border border-white/10"
              >
                <div className="text-5xl font-black text-yellow-400/30">
                  0{i + 1}
                </div>
                <h3 className="mt-6 text-xl font-bold">{item}</h3>
                <p className="mt-3 text-sm text-zinc-400">
                  Maintain visual continuity throughout production.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto rounded-[40px] bg-gradient-to-r from-[#241407] via-[#2A1732] to-[#081B29] p-12">
          <p className="uppercase tracking-[0.3em] text-yellow-300 text-sm">
            LIVE DEMO
          </p>

          <h2 className="mt-3 text-4xl font-black">
            See HexCoded in Action
          </h2>

          <p className="mt-5 text-zinc-300 max-w-2xl leading-8">
            Explore how HexCoded helps studios and creators produce AI-generated
            dramas, vertical series and short films with consistent characters.
          </p>

          <a
            href="https://cal.com/fajeela-sahul-zzapie/hexcoded-demo"
            target="_blank"
            className="inline-block mt-8 rounded-full bg-yellow-400 px-8 py-4 font-bold text-black"
          >
            Book Your Demo →
          </a>
        </div>
      </section>

      <ChatWidget />
    </main>
  );
}