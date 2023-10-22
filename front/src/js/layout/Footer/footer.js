import footer_bottom_logo from '../../../img/layout/footer_bottom_logo.png';
import styles from '../../../css/layout/Footer/Footer.module.css';
import '../../../css/font.css';

const Footer = () => {
    return (
        <footer id={styles.footer}>
            <div className={styles.layout}>
                <div className={styles.logo}>
                    <a href='https://sj-equity.or.kr/' className={styles.footerLogo}>
                        <img src={footer_bottom_logo} alt="Footer Logo"/>
                    </a>
                </div>
                <div className={styles.information}>
                    <ul className={styles.otherList}>
                        <li className={styles.otherListItemFirst}>
                            <a href='https://sj-equity.or.kr/sub0608'><span>개인정보처리방법</span></a>
                        </li>
                        <li className={styles.otherListItemSecond}>
                            <a href='https://sj-equity.or.kr/sub0608'><span>이용약관</span></a>
                        </li>
                        <li className={styles.otherListItemLast}>
                            <a href='https://sj-equity.or.kr/sub0608'><span>이메일무단수집거부</span></a>
                        </li>
                    </ul>
                    <div className={styles.address}>
                        <li className={styles.addressP}>30151 세종특별자치시 새롬로 14 새롬종합복지센터 4층(새롬동)</li>
                        <li className={styles.addressP}>대표전화 (044) 863-0380 / 대표메일 sjwomenplaza@gmail.com</li>
                        <li className={styles.addressCopr}>Copyrightⓒ 세종특별자치시. all Rights Reserved.</li>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;