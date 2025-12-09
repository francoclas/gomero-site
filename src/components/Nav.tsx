//Importo use translation
'use client'
import { useState, useRef,useEffect } from 'react';
import { useRouter } from 'next/navigation';
//Traigo nextlocale
import { setLocale } from '@/app/actions/languageAction';
import '@styles/nav.css';
import { useTranslations } from 'next-intl';
import ThemeToggle from './ui/toggle-theme';
import SettingsMenu from './ui/settings-menu';


export default function Nav() {
    const t = useTranslations("nav");
    const router = useRouter();
    //Setear menu de configuracion
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null)
    //LAng
    const changeLang = async (lang:string) => {
        await setLocale(lang);
        router.refresh();
    }
   
    //Cerrar menu al cargar
    useEffect(() => {
        function handleClickOutside(event){
            if(menuRef.current && !menuRef.current.contains(event.target)){
                setOpen(false);
            }
        }
        document.addEventListener("mousedown",handleClickOutside);
        return () => document.removeEventListener("mousedown",handleClickOutside)
    },[]);
    return (
      <nav className="nav-container">
            <h1 className="nav-logo">
                gomero<span className="dot-red">.dev</span>
            </h1>

            <ul className="nav-links">
                <li><a href="#">{t('links.home')}</a></li>
                <li><a href="#">{t('links.projects')}</a></li>
                <li><a href="#">{t('links.lab')}</a></li>
                <li><a href="#">{t('links.personal')}</a></li>
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