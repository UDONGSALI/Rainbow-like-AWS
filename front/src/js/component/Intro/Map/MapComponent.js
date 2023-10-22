import React, { useEffect, useState } from "react";
import useFetch from "../../hook/useFetch";
import { SERVER_URL } from "../../Common/constants";
import styles from '../../../../css/component/Main/Map/MapComponent.module.css';

import Map from './Map';

function OrgList({ orgs, onOrgClick }) {
    return (
        <div className={styles.orgListContainer}>
            {orgs.map(org => (
                <div
                    key={org.name}
                    className={styles.orgListItem}
                    onClick={() => onOrgClick(org.addr)}
                >
                    <span>{org.name}</span>
                </div>
            ))}
        </div>
    );
}

function MapComponent() {
    const [orgs, setOrgs] = useState([]);
    const { data: fetchedOrgs, loading } = useFetch(`${SERVER_URL}org`);
    const [selectAddress, setSelectAddress] = useState('세종특별자치시 새롬로 14');

    useEffect(() => {
        if (!loading) {
            setOrgs(fetchedOrgs);
        }
    }, [loading, fetchedOrgs]);

    return (
        <div className={styles.MapComponent}>
            <h2><strong>유관기관</strong></h2>
            <div className={styles.mapArea}>
                <Map address={selectAddress} org={orgs.find(org => org.addr === selectAddress)} />
                <div className={styles.sideArea}>
                    <OrgList orgs={orgs} onOrgClick={setSelectAddress} />
                </div>
            </div>
        </div>
    );
}

export default MapComponent;