

export function translateGenre (text: string): string {

    switch (text) {
        case "history":
            text = "Исторические";
            break;
        case "horror":
            text = "Ужасы"
            break;
        case "scifi":
            text = "Фантастика"
            break;
        case "stand-up":
            text = "stand-up"
            break;
        case "fantasy":
            text = "Фэнтези"
            break;
        case "drama":
            text = "Драмы"
            break;
        case "mystery":
            text = "Мистика"
            break;
        case "family":
            text = "Семейные"
            break;
        case "comedy":
            text = "Комедии"
            break;
        case "romance":
            text = "Романтика"
            break;
        case "music":
            text = "Музыка"
            break;
        case "crime":
            text = "Криминал"
            break;
        case "tv-movie":
            text = "ТВ-фильм"
            break;
        case "documentary":
            text = "Документальные"
            break;
        case "action":
            text = "Боевики"
            break;
        case "thriller":
            text = "Триллеры"
            break;
        case "western":
            text = "Вестерны"
            break;
        case "animation":
            text = "Мультики"
            break;
        case "war":
            text = "Военные"
            break;
        case "adventure":
            text = "Приключения"
            break;
    }
    return text;
}