import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

function InfoModal({ title, data, open, onClose }) {
    if (!data) {
        return null;
    }

    const renderData = (data) => {
        return Object.entries(data).map(([key, value]) => {
            if (key === "pwd" || typeof value === 'object') return null;

            // value가 객체인 경우
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                return (
                    <div key={key}>
                        <strong>{key}:</strong>
                        <div style={{ marginLeft: '15px' }}>{renderData(value)}</div>
                    </div>
                );
            }

            return (
                <div key={key}>
                    <strong>{key}:</strong> {value}
                </div>
            );
        });
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {renderData(data)}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>닫기</Button>
            </DialogActions>
        </Dialog>
    );
}

export default InfoModal;