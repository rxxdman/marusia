import { FC, HTMLAttributes, MouseEventHandler, useState } from "react";
import "./style/Button.css";
import { Loader } from "../Loader/Loader";

export interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
    title?: string
    ico?: string
    color?: string
    click?: MouseEventHandler
    basis?: boolean
    padding?: string

    isLoading?: boolean;
    isDisabled?: boolean;
    type?: "submit" | "reset" | "button";
}



export const Button: FC<IButtonProps> = ({ title, ico, color, click, basis, isLoading, isDisabled = isLoading, type, children, padding}) => {

    const [hover, setHover] = useState(false);
    const width = document.documentElement.scrollWidth;

    const handleMouseEnter = () => {
        if (width < 720)
        {
            setHover(true);

            setTimeout(() => setHover(false), 400);
        }
        else
        {
            setHover(true)
        }
        
    };
    const handleMouseLeave = () => setHover(false);

    const icoNew = hover ? ico?.replace("white", "black") : ico?.replace("black", "white");

    const Style = {
        backgroundColor: hover ? "rgba(255, 255, 255, 1)" : color ? color : "rgba(0, 0, 0, 0.4)",
        backgroundColorHover: "rgba(255, 255, 255, 1)",
        padding: padding ? padding : width < 720 ? (title ? "16px 40px" : "28px 32px") : (title ? "16px 48px" : "28px 32px"),
        backgroundImage: ico ? `url("${icoNew}")` : "",
        color: hover ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 1)",

        flexBasis: basis ? "100%" : "content"
    };

    return (
        <button
            style={Style}
            className="Button"
            onClick={click}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            disabled={isDisabled}
            type={type}
        >
            {title ? title : ''}
            {isLoading ? <Loader /> : children}
        </button>)

}