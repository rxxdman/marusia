import { FC } from "react"
import "./Rating.css"

export interface IRatingProps {
    rating: number;
    big?: boolean;
}

export const Rating: FC<IRatingProps> = ({ rating, big = true }) => {

    switch (true) {
        case rating > 8.5:
            return (
                <span className="rating" style={{ 
                    backgroundColor: "rgba(165, 148, 0, 1)",
                    padding: big ? "4px 12px 4px 32px" : "2px 8px 2px 22px",
                    backgroundPosition: big ? "12px 8px" : "8px 5px",
                    backgroundSize: big ? "16px" : "10px",
                    fontSize: big ? "18px" : "12px",
                    lineHeight: big ? "24px" : "16px"
                     }}>
                    {rating}
                </span>
            )
        case rating > 7.4:
            return (
                <span className="rating" style={{ 
                    backgroundColor: "rgba(48, 142, 33, 1)",
                    padding: big ? "4px 12px 4px 32px" : "2px 8px 2px 22px",
                    backgroundPosition: big ? "12px 8px" : "8px 5px",
                    backgroundSize: big ? "16px" : "10px",
                    fontSize: big ? "18px" : "12px",
                    lineHeight: big ? "24px" : "16px" }}>
                    {rating}
                </span>
            )
        case rating > 6.3:
            return (
                <span className="rating" style={{ 
                    backgroundColor: "rgba(119, 119, 119, 1)",
                    padding: big ? "4px 12px 4px 32px" : "2px 8px 2px 22px",
                    backgroundPosition: big ? "12px 8px" : "8px 5px",
                    backgroundSize: big ? "16px" : "10px",
                    fontSize: big ? "18px" : "12px",
                    lineHeight: big ? "24px" : "16px" }}>
                    {rating}
                </span>
            )
        case rating <= 6.3:
            return (
                <span className="rating" style={{ 
                    backgroundColor: "rgba(200, 32, 32, 1)",
                    padding: big ? "4px 12px 4px 32px" : "2px 8px 2px 22px",
                    backgroundPosition: big ? "12px 8px" : "8px 5px",
                    backgroundSize: big ? "16px" : "10px",
                    fontSize: big ? "18px" : "12px",
                    lineHeight: big ? "24px" : "16px" }}>
                    {rating}
                </span>
            )
    }
}