import { HTMLAttributes } from "react";



interface ViewHeaderProps extends HTMLAttributes<HTMLDivElement>
{

}

export function Header( { children, ...props }: ViewHeaderProps )
{
    return (
        <div { ...props }>
            { children }
        </div>
    )
}
interface ViewBodyProps extends HTMLAttributes<HTMLDivElement>
{

}

export function Body( { children, ...props }: ViewBodyProps )
{
    return (
        <div { ...props }>
            { children }
        </div>
    )
}
interface ViewFooterProps extends HTMLAttributes<HTMLDivElement>
{

}

export function Footer( { children, ...props }: ViewFooterProps )
{
    return (
        <div { ...props }>
            { children }
        </div>
    )
}