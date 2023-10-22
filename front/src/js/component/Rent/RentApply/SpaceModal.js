import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {SERVER_URL} from '../../Common/constants';
import Typography from '@mui/material/Typography';
import styles from '../../../../css/component/Rent/SpaceModal.module.css';

const style = {
    position: 'relative',
    display:'flex',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '50%',
    padding: 0,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function SpaceList({spaceInfo}) {
    const [spaces, setSpaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        fetch(SERVER_URL + 'api/spaces')
            .then((response) => response.json())
            .then((data) => {
                setSpaces(data._embedded.spaces);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);


    return (
        <div id={styles.modal}>
            {loading ? (
                <p>Loading....</p>
            ) : (
                <div className={styles.extension}>
                    <Button onClick={handleOpen}>더보기</Button>
                    <Modal className={styles.modalForm}
                           open={open}
                           onClose={handleClose}
                           aria-labelledby="modal-modal-title"
                           aria-describedby="modal-modal-description"
                    >

                        <Box  sx={style}>
                                <div className={styles.outer}>
                                    <div className={styles.innerWrap} >
                                        <div className={styles.imgs}>
                                            <img alt={spaceInfo.spaceName} src={spaceInfo.imageURL}
                                                 style={{width: 350, height: 250}}/>
                                        </div>
                                        <div className={styles.spaceInformation}>
                                            <Typography className={styles.spaceNames}>
                                                {spaceInfo.spaceName}

                                            </Typography>
                                            <hr/>
                                            <Typography className={styles.modalDescription} sx={{mt: 3}}>
                                                {spaceInfo && (
                                                    <>
                                                        <p><b style={{ letterSpacing: '3px'}}>최대인원  ㅣ</b> {spaceInfo.maxPerson}</p>
                                                        <p><b style={{ letterSpacing: '3px'}}>공간용도  ㅣ</b> {spaceInfo.spaceUsage}</p>
                                                        <p><b style={{ letterSpacing: '3px'}}>대관시간  ㅣ</b> {spaceInfo.rentTime}</p>
                                                        <p><b style={{ letterSpacing: '1px'}}>기본이용료ㅣ </b>{spaceInfo.rentFee}</p>
                                                        <p><b style={{ letterSpacing: '3px'}}>구비시설  ㅣ </b>{spaceInfo.facilities}</p>

                                                    </>
                                                )}
                                            </Typography>
                                        </div>

                                    </div>
                                    <div className={styles.closedButton}>
                                        <Button className={styles.closeBtn}
                                                onClick={handleClose}
                                                style={{
                                                    position: 'relative',
                                                    width: "100px",
                                                    height: "50px",
                                                    backgroundColor: "#a38ced",
                                                    color: "#ffffff",
                                                    borderRadius: '5px',
                                                    fontSize: "15px",
                                                    fontWeight: "bold",

                                                }}>닫기
                                        </Button>
                                    </div>

                                </div>

                        </Box>


                    </Modal>

                </div>
            )}
        </div>
    );
}