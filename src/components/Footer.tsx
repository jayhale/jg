import Link, { LinkProps } from 'next/link'
import { Children, ReactNode } from 'react'

import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'

type FooterLinkProps = {
  title: string
} & Pick<LinkProps, 'href'>

const FooterLink = ({ href, title }: FooterLinkProps) => (
  <Link href={href}>
    <a className="rounded-lg px-2 py-1 text-slate-700 hover:bg-slate-100 hover:text-slate-900">
      {title}
    </a>
  </Link>
)

const FooterNav = ({ children }: { children: ReactNode }) => (
  <div className="py-16">
    <Logo className="mx-auto h-10 w-auto" />
    <nav className="mt-10 text-sm" aria-label="quick links">
      <ul className="-my-1 flex justify-center space-x-6">
        {Children.map(children, (child) => (
          <li>{child}</li>
        ))}
      </ul>
    </nav>
  </div>
)

type SocialLinkProps = {
  title: string
  icon: ReactNode
} & Pick<LinkProps, 'href'>

const SocialLink = ({ href, title, icon }: SocialLinkProps) => (
  <Link href={href}>
    <a className="group">
      <span className="sr-only">{title}</span>
      {icon}
    </a>
  </Link>
)

const SocialNavAndCopyright = ({ children }: { children?: ReactNode }) => (
  <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
    <div className="flex space-x-6">{children}</div>
    <p className="mt-6 text-sm text-slate-500 sm:mt-0">
      Copyright &copy; {new Date().getFullYear()} Jones&apos; Guide. All rights
      reserved.
    </p>
  </div>
)

const LinkedInIcon = ({ className }: { className: string }) => (
  <svg aria-hidden="true" className={className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
)

const TwitterIcon = ({ className }: { className: string }) => (
  <svg aria-hidden="true" className={className}>
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 2.8 9.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.093 4.093 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.615 11.615 0 0 0 6.29 1.84" />
  </svg>
)

const Footer = () => (
  <footer>
    <Container>
      <FooterNav>
        <FooterLink title="What We Do" href="/#what-we-do" />
        <FooterLink title="Testimonials" href="/#testimonials" />
      </FooterNav>
      <SocialNavAndCopyright />
    </Container>
  </footer>
)

export { Footer }
