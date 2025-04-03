import { Link } from "react-router-dom"

import vk from "../../assets/footer/vk.svg"
import ok from "../../assets/footer/ok.svg"
import youtube from "../../assets/footer/youtube.svg"
import telegram from "../../assets/footer/telegram.svg"

import "./style/footer.css"

export const Footer = () => {
    
    return (  <footer className='footer'> 
        <Link to={"/"} className='footer__link'>
          <img src={vk} alt="VK" />
        </Link>
        <Link to={"/"} className='footer__link'>
          <img src={youtube} alt="YouTube" />
        </Link>
        <Link to={"/"} className='footer__link'>
          <img src={ok} alt="Одноклассники" />
        </Link>
        <Link to={"/"} className='footer__link'>
          <img src={telegram} alt="Telegram" />
        </Link>
      </footer>)
}