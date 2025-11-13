//Importo use translation
import { useTranslations } from 'next-intl';

export default function Nav () {
    const t = useTranslations('nav');
return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
        <h1 className="text-xl font-bold">GomeroDev</h1>
        <ul className="flex gap-4">
            <li><a href="#" className="hover:text-red-400">{t('links.home')}</a></li>
            <li><a href="#" className="hover:text-red-400">{t('links.projects')}</a></li>
            <li><a href="#" className="hover:text-red-400">{t('links.lab')}</a></li>
            <li><a href="#" className="hover:text-red-400">{t('links.personal')}</a> </li>
        </ul>
    </nav>

);

}