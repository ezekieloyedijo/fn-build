import Link from "next/link";
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter, FiMapPin, FiMail, FiPhone } from "react-icons/fi";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-steel-950 text-steel-200 pt-20 pb-8 overflow-hidden">
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[36rem] rounded-full bg-primary-600/20 blur-[100px]" />

      <div className="section-container relative grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="#home" className="flex items-center gap-2 font-display text-xl font-bold text-white">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-400 to-primary-700 text-sm">
              FN
            </span>
            FNBUILD &amp; Construction
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-steel-400">
            Building the future with excellence — premium construction, architectural design, and civil
            engineering services delivered across Nigeria with uncompromising quality.
          </p>
          <div className="mt-6 flex gap-3">
            {[FiFacebook, FiInstagram, FiLinkedin, FiTwitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-colors hover:border-primary-500 hover:text-primary-400"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm text-steel-400">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-primary-400">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
            Services
          </h4>
          <ul className="space-y-2.5 text-sm text-steel-400">
            <li>Building Construction</li>
            <li>Architectural Design</li>
            <li>Renovation &amp; Remodeling</li>
            <li>Civil Engineering</li>
            <li>Project Management</li>
            <li>Interior Finishing</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h4>
          <ul className="space-y-3 text-sm text-steel-400">
            <li className="flex items-start gap-2.5">
              <FiMapPin className="mt-0.5 shrink-0 text-primary-400" />
              1, Abe-Koko Shopping Complex, Abe-Koko Junction, Ogooluwa/Africa, Osogbo, Osun State
            </li>
            <li className="flex items-center gap-2.5">
              <FiPhone className="shrink-0 text-primary-400" />
              {process.env.NEXT_PUBLIC_PHONE_NUMBER || "+234 803 897 5028"}
            </li>
            <li className="flex items-center gap-2.5">
              <FiMail className="shrink-0 text-primary-400" />
              info@fnbuild.com.ng
            </li>
          </ul>
        </div>
      </div>

      <div className="section-container mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-steel-500 md:flex-row">
        <p>© {year} FNBUILD &amp; Construction. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/login" className="hover:text-primary-400">
            Admin Login
          </Link>
          <a href="#" className="hover:text-primary-400">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-primary-400">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
