'use client'
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setLocale } from '@/app/actions/languageAction';
import '@styles/nav.css';
import { useTranslations } from 'next-intl';
import ThemeToggle from './ui/toggle-theme';
import SettingsMenu from './ui/settings-menu';
import Link from 'next/link';

export default function Nav() {
    const t = useTranslations("nav");
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null)

    const changeLang = async (lang: string) => {
        await setLocale(lang);
        router.refresh();
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, []);

    return (
        <nav className="nav-container">
            <Link href="/" className="nav-logo">
                gomero<span className="dot-red">.dev</span>
            </Link>

            <ul className="nav-links">
                <li><Link href="/">{t('links.home')}</Link></li>
                <li><Link href="/projects">{t('links.projects')}</Link></li>
                <li><Link href="/aboutme">{t('links.personal')}</Link></li>
            </ul>

            <div className="config-btn">
                <SettingsMenu />
            </div>
            <div className="theme-btn">
                <ThemeToggle />
            </div>
        </nav>
    );
}
