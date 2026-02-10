import { footerLinks, colors } from "@/lib/tokens";

export function Footer() {
  return (
    <footer
      className="px-12 pt-16 pb-9"
      style={{ background: `linear-gradient(160deg, ${colors.petrol.dark} 0%, ${colors.petrol.DEFAULT} 100%)` }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-14 mb-12">
          {/* Brand */}
          <div>
            <div className="font-display text-[28px] font-medium text-white mb-2">
              aeviti
            </div>
            <p className="font-body text-body-sm text-white/35 leading-relaxed max-w-[260px] mb-5">
              Aeviti Baseline helps you know your health — not just your data.
            </p>
            <div className="flex gap-2.5">
              <a
                href="#waitlist"
                className="inline-flex items-center gap-1.5 bg-terra text-white font-body text-[13px] font-medium px-5 py-2.5 rounded-full cursor-pointer hover:bg-terra-dark transition-colors"
              >
                Join waitlist <span>→</span>
              </a>
              <a
                href="#baseline"
                className="inline-flex items-center gap-1.5 bg-transparent text-white/60 font-body text-[13px] font-medium px-5 py-2.5 rounded-full cursor-pointer border border-white/10 hover:border-white/20 transition-colors"
              >
                Learn more <span>→</span>
              </a>
            </div>
          </div>

          {/* Offerings */}
          <div>
            <h4 className="font-body text-[11px] font-semibold text-white/25 tracking-[0.12em] uppercase mb-[18px]">
              Offerings
            </h4>
            {footerLinks.offerings.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block font-body text-body-sm text-white/40 mb-[11px] cursor-pointer hover:text-white/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-body text-[11px] font-semibold text-white/25 tracking-[0.12em] uppercase mb-[18px]">
              Tools
            </h4>
            {footerLinks.tools.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block font-body text-body-sm text-white/40 mb-[11px] cursor-pointer hover:text-white/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-5 flex justify-between items-center">
          <div className="font-body text-body-xs text-white/20">
            © 2026 aeviti. Wellness tool only. Not medical advice.
          </div>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service"].map((t) => (
              <a
                key={t}
                href="#"
                className="font-body text-body-xs text-white/[0.22] cursor-pointer hover:text-white/40 transition-colors"
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
