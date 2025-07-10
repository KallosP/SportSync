import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface TagProps {
    title: string | number
    icon?: any
}

export default function Tag({ title , icon } : TagProps) {
    return (
        <li className="bg-tag dark:bg-dark-tag rounded-full items-center px-4 py-1 flex gap-2">
            {icon && <FontAwesomeIcon icon={icon} className="text-svg dark:text-dark-svg" />}
            <p className="text-normal-text dark:text-dark-normal-text">{title}</p>
        </li>
    );
};
