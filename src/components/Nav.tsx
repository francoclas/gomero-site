//Importo use translation
'use client'
import { useState, useRef,useEffect } from 'react';
import '@styles/nav.css';
import { useTranslations } from 'next-intl';

export default function Nav() {
    const t = useTranslations("nav");
    //Setear menu de configuracion
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null)

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
            <h1 className="nav-logo">gomero<span className="dot-red">.dev</span></h1>
            <ul className="nav-links">
                <li><a href="#">{t('links.home')}</a></li>
                <li><a href="#">{t('links.projects')}</a></li>
                <li><a href="#">{t('links.lab')}</a></li>
                <li><a href="#">{t('links.personal')}</a></li>
      <li ref={menuRef} className="config-btn" onClick={() => setOpen(!open)}>
        ⚙️
        <ul className={`dropdown ${open ? "show" : ""}`}>
          <li>🇺🇾 Español</li>
          <li>🇺🇸 English</li>
          <li>🌗 Tema</li>
        </ul>
      </li>
            </ul>
        </nav>
    );
}