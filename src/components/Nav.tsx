'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setLocale } from '@/app/actions/languageAction';
import '@styles/nav.css';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ui/toggle-theme';
import SettingsMenu from './ui/settings-menu';
import Link from 'next/link';

export default function Nav() {
    const t = useTranslations("nav");
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const changeLang = async (lang: string) => {
        await setLocale(lang);
        router.refresh();
        setMobileOpen(false);
    };

    const closeMenu = () => setMobileOpen(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <nav className={`nav-container${scrolled ? ' scrolled' : ''}`}>
                <Link href="/" className="nav-logo" onClick={closeMenu}>
                    gomero<span className="dot-red">.dev</span>
                </Link>

                {/* Links — desktop */}
                <ul className="nav-links">
                    <li><Link href="/">{t('links.home')}</Link></li>
                    <li><Link href="/#services">{t('links.services')}</Link></li>
                    <li><Link href="/projects">{t('links.projects')}</Link></li>
                    <li><Link href="/aboutme">{t('links.personal')}</Link></li>
                    <li><Link href="/games">{t('links.games')}</Link></li>
                    <li><Link href="/tools">{t('links.tools')}</Link></li>
                </ul>

                {/* Controles — desktop */}
                <div className="nav-desktop-controls">
                    <SettingsMenu />
                    <ThemeToggle />
                </div>

                {/* Controles — mobile */}
                <div className="nav-mobile-controls">
                    <ThemeToggle />
                    <button
                        onClick={() => setMobileOpen(prev => !prev)}
                        aria-label="Toggle menu"
                        className="nav-hamburger"
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>

            {/* Overlay mobile */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        key="mobile-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="mobile-overlay"
                    >
                        {/* Links grandes */}
                        <motion.ul
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: {},
                                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
                            }}
                            className="mobile-nav-links"
                        >
                            {[
                                { href: "/",          label: t('links.home')     },
                                { href: "/#services", label: t('links.services') },
                                { href: "/projects",  label: t('links.projects') },
                                { href: "/aboutme",   label: t('links.personal') },
                                { href: "/games",     label: t('links.games')    },
                                { href: "/tools",     label: t('links.tools')    },
                            ].map(({ href, label }) => (
                                <motion.li
                                    key={href}
                                    variants={{
                                        hidden:   { opacity: 0, y: 24 },
                                        visible:  { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
                                    }}
                                >
                                    <Link href={href} onClick={closeMenu} className="mobile-nav-link">
                                        {label}
                                    </Link>
                                </motion.li>
                            ))}
                        </motion.ul>

                        {/* Selector de idioma */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.32, duration: 0.3, ease: "easeOut" }}
                            className="mobile-lang-switcher"
                        >
                            <button onClick={() => changeLang('es')} className="lang-btn">
                                🇺🇾 Español
                            </button>
                            <button onClick={() => changeLang('en')} className="lang-btn">
                                🇺🇸 English
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
