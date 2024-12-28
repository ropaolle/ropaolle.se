/* empty css                           */import 'html-escaper';
import 'clsx';
import { e as createAstro, f as createComponent, r as renderTemplate, h as addAttribute, i as renderHead, j as renderSlot, m as maybeRenderHead, s as spreadAttributes, k as renderComponent } from '../astro_00e6315d.mjs';

const $$Astro$4 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="bg-zinc-900"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/home/olle/GITHOME/ropaolle.se/src/layouts/Layout.astro", void 0);

const cv = new Proxy({"src":"/_astro/cv-small.bf9dc166.png","width":247,"height":350,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							
							return target[name];
						}
					});

const $$Astro$3 = createAstro();
const $$ = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$;
  const size = Astro2.props.size;
  delete Astro2.props.size;
  return renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg"${addAttribute(2, "stroke-width")}${addAttribute(size ?? 24, "width")}${addAttribute(size ?? 24, "height")} stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none" viewBox="0 0 24 24"${spreadAttributes(Astro2.props)}> ${renderSlot($$result, $$slots["default"])} </svg>`;
}, "/home/olle/GITHOME/ropaolle.se/node_modules/.pnpm/lucide-astro@0.287.0_astro@3.6.5/node_modules/lucide-astro/dist/.Layout.astro", void 0);
const Layout = $$;

const $$Astro$2 = createAstro();
const $$Github = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Github;
  return renderTemplate`${renderComponent($$result, "Layout", Layout, { ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path> <path d="M9 18c-4.51 2-5-2-7-2"></path> ` })}`;
}, "/home/olle/GITHOME/ropaolle.se/node_modules/.pnpm/lucide-astro@0.287.0_astro@3.6.5/node_modules/lucide-astro/dist/Github.astro", void 0);
const Github = $$Github;

const $$Astro$1 = createAstro();
const $$Linkedin = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Linkedin;
  return renderTemplate`${renderComponent($$result, "Layout", Layout, { ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path> <rect width="4" height="12" x="2" y="9"></rect> <circle cx="4" cy="4" r="2"></circle> ` })}`;
}, "/home/olle/GITHOME/ropaolle.se/node_modules/.pnpm/lucide-astro@0.287.0_astro@3.6.5/node_modules/lucide-astro/dist/Linkedin.astro", void 0);
const Linkedin = $$Linkedin;

const $$Astro = createAstro();
const $$Twitter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Twitter;
  return renderTemplate`${renderComponent($$result, "Layout", Layout, { ...Astro2.props }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path> ` })}`;
}, "/home/olle/GITHOME/ropaolle.se/node_modules/.pnpm/lucide-astro@0.287.0_astro@3.6.5/node_modules/lucide-astro/dist/Twitter.astro", void 0);
const Twitter = $$Twitter;

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "RopaOlle.se" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="flex h-full min-w-fit flex-col print:invisible"> <div class="mx-auto mt-48 text-center"> <div> <div class="mx-8 text-4xl text-slate-200 md:text-6xl">
Välkommen till
</div> <h1 class="mx-2 border-slate-700 text-6xl font-bold text-sky-400 md:text-8xl">
RopaOlle.se
</h1> <p class="mt-8 text-slate-300">
First we build the tools, then they build us…
</p> <div class="mt-4"> <a href="https://github.com/ropaolle"> ${renderComponent($$result2, "Github", Github, { "class": "mr-2 inline h-6 w-6 text-slate-500" })} </a> <a href="https://linkedin.com/ropaolle"> ${renderComponent($$result2, "Linkedin", Linkedin, { "class": "mr-2 inline h-6 w-6 text-slate-500" })} </a> <a href="https://x.com/ropaolle"> ${renderComponent($$result2, "Twitter", Twitter, { "class": "mr-2 inline h-6 w-6 text-slate-500" })} </a> </div> </div> </div> <div class="w-64+ mx-auto mb-2 mt-24 text-center align-middle"> <div class="my-4 text-3xl text-slate-200">curriculum vitae</div> <a href="https://cv.ropaolle.se"> <img${addAttribute(cv.src, "src")} alt="cv"> </a> </div> <div class="mb-12 text-center text-sm text-slate-600">Version 0.0.4</div> <div class="absolute left-[-5rem] top-[-10rem] -z-10 w-[66%] md:left-[-15rem] md:top-[-20rem]"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path fill="rgb(30 30 33)" d="M11.75 6.406c-1.48 0-1.628.157-2.394.157C8.718 6.563 6.802 5 5.845 5c-.958 0-2.075.563-2.075 2.188v1.875c.002.492.18 2 .88 1.597c-.827.978-.91 2.119-.899 3.223c-.223.064-.45.137-.671.212c-.684.234-1.41.532-1.737.744a.75.75 0 0 0 .814 1.26c.156-.101.721-.35 1.408-.585l.228-.075c.046.433.161.83.332 1.19l-.024.013c-.41.216-.79.465-1.032.623l-.113.074a.75.75 0 1 0 .814 1.26l.131-.086c.245-.16.559-.365.901-.545c.08-.043.157-.081.231-.116C6.763 19.475 9.87 20 11.75 20s4.987-.525 6.717-2.148c.074.035.15.073.231.116c.342.18.656.385.901.545l.131.086a.75.75 0 0 0 .814-1.26l-.113-.074a13.008 13.008 0 0 0-1.032-.623l-.024-.013c.171-.36.286-.757.332-1.19l.228.075c.687.235 1.252.484 1.409.585a.75.75 0 0 0 .813-1.26c-.327-.212-1.053-.51-1.736-.744a16.343 16.343 0 0 0-.672-.213c.012-1.104-.072-2.244-.9-3.222c.7.403.88-1.105.881-1.598V7.188C19.73 5.563 18.613 5 17.655 5c-.957 0-2.873 1.563-3.51 1.563c-.767 0-.915-.157-2.395-.157Zm-.675 9.194c.202-.069.441-.1.675-.1c.234 0 .473.031.676.1c.1.034.22.088.328.174a.619.619 0 0 1 .246.476c0 .23-.139.39-.246.476c-.107.086-.229.14-.328.174a2.15 2.15 0 0 1-.676.1a2.14 2.14 0 0 1-.675-.1a1.078 1.078 0 0 1-.329-.174a.619.619 0 0 1-.246-.476c0-.23.139-.39.246-.476c.107-.086.23-.14.329-.174Zm2.845-3.1c.137-.228.406-.5.81-.5s.674.272.81.5c.142.239.21.527.21.813c0 .285-.068.573-.21.811c-.136.229-.406.501-.81.501s-.673-.272-.81-.5a1.596 1.596 0 0 1-.21-.813c0-.285.068-.573.21-.811Zm-5.96 0c.137-.228.406-.5.81-.5s.674.272.81.5c.142.239.21.527.21.813c0 .285-.068.573-.21.811c-.136.229-.406.501-.81.501s-.673-.272-.81-.5a1.596 1.596 0 0 1-.21-.813c0-.285.068-.573.21-.811Z"></path> </svg> </div> </main> ` })}`;
}, "/home/olle/GITHOME/ropaolle.se/src/pages/index.astro", void 0);

const $$file = "/home/olle/GITHOME/ropaolle.se/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
