import styles from '../../../css/pages/FT/FTMainPage.module.css';
import {useNavigate} from "react-router-dom";

function FTMain(){
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";
    const navigate = useNavigate();

    return(
      <div className={styles.ftMain}>
          <h1><strong>여성인재풀DB란?</strong></h1>
          <div className={styles.ftCont}>
              <p>
                  일을 하고 싶은 여성, 일을 부탁하고 싶은 여성!
                  <br/>세종여성플라자에서 서로를 만나보세요.
                  <br/>자신 있는 분야를 선택하여 여성인재풀DB에 신청해주시면, 세종여성플라자가 확인 후 여성인재풀DB에 정보를 등록합니다.
                  <br/>마찬가지로, 부탁하고 싶은 일감을 적어 매칭을 신청하시면 세종여성플라자에서 확인 후 여성인재풀DB에 등록된 인재와 매칭해드려요!
              </p>
          </div>
          <div className={styles.btn}>
              <button onClick={() => navigate('/ftw/new')}>여성인재풀DB 등록신청</button>
              <button onClick={() => navigate('/ftc/new')}>여성인재풀DB 매칭신청</button>
              {
                  isAdmin?
                      <>
                          <br />
                      <button onClick={() => navigate('/admin/ftmain/ftw')}>여성인재 리스트</button>
                      <button onClick={() => navigate('/admin/ftmain/ftc')}>매칭 리스트</button>
                      </>
                  :
                      <></>
              }
          </div>
      </div>
    );
}

export default FTMain;