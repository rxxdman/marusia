import { FC, useEffect, useState } from "react"
import "./style/MovieParametr.css"

interface MovieParametrProps {
    param: string
    title: string
}

export const MovieParametr: FC<MovieParametrProps> = ({ param, title }) => {

    const [paramN, setParam] = useState('')

    switch (param) {
        case "language":
            param = "Язык оригинала ..........................."
            break;
        case "budget":
            param = "Бюджет ..........................................";
            if (title != "Не известен")
                title = (parseInt(title)).toLocaleString('ru-Ru') + " $";
            break;
        case "revenue":
            param = "Выручка ........................................."
            if (title != "Не известна")
                title = (parseInt(title)).toLocaleString('ru-Ru') + " $";
            break;
        case "director":
            param = "Режиссёр ......................................."
            break;
        case "production":
            param = "Продакшен ...................................."
            break;
        case "awards":
            param = "Награды ........................................."
            break;
    }



    useEffect(() => {
        if (document.documentElement.scrollWidth < 600) {
            setParam(param.replace(/[.]/g, ''));
        }
        else {
            setParam(param);
        }



    }, [param, paramN])

    return <div className="movieParametr">
        <span className="movieParametr__param">{paramN}</span> 
        <span className="movieParametr__title"> {title}</span>
    </div>
}