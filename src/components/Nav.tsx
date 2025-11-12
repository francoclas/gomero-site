//Importo use translation
import { useTranslations } from 'next-intl';

export default function Nav () {
    const t = useTranslations('nav');
return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
        <h1 className="text-xl font-bold">GomeroDev</h1>
        <ul className="flex gap-4">
            <li><a href="#" className="hover:text-red-400"></a></li>
            <li><a href="#" className="hover:text-red-400">Proyectos</a></li>
            <li><a href="#" className="hover:text-red-400">Desarrollos</a></li>
            <li><a href="#" className="hover:text-red-400">Sobre mi</a> </li>
        </ul>
    </nav>

);

}