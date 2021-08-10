import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import { servicesAction } from '../../Reducer/services.reducer';

const Home = (props) => {
    const serviceState = useSelector((state) => state.services);
    const dispatch = useDispatch();
    const hanldeSelectService = (id, name, value) => {
        const item = {
            id: id, name: name,
            option: [{
                ...value
            }]
        }
        dispatch(servicesAction.addService(item));
    }
    useEffect(() => {
        dispatch(servicesAction.resetList());
    }, [])
    return (
        <>
            <div style={{ display: 'flex' }}>
                <div style={{ width: "50%", display: 'flex', justifyContent: 'center', flexWrap: 'wrap', margin: 50, border: "2px solid #000000" }}>
                    {serviceState.listServices && serviceState.listServices.map(item => {
                        return (
                            <div key={item.id} style={{ width: 150, padding: 20, margin: 20, border: "2px solid #000000" }}>
                                <div style={{ textAlign: 'center', paddingBottom: 20 }}>{item.name}</div>
                                {item.items && item.items.map(items => {
                                    return (
                                        <div>
                                            <Checkbox
                                                key={items.id}
                                                color="primary"
                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                onClick={() => hanldeSelectService(item.id, item.name, items)}
                                            />
                                            <a>{items.name}</a>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                <div style={{ margin: 50, width: "35%", height: 500, border: "2px solid #000000", overflowY: 'scroll' }}>
                    <p style={{ textAlign: 'center', paddingBottom: 20 }}>RESPONSE</p>
                    {serviceState.listChekedServices && serviceState.listChekedServices.length > 0 && <div style={{ paddingLeft: 100 }}>
                        <p>{`data : {`}</p>
                        {
                            serviceState.listChekedServices && serviceState.listChekedServices.map(item => {
                                return (
                                    <div style={{ paddingLeft: 50 }}>
                                        <p>{`${item.name} : {`}</p>
                                        {item?.option && item?.option.map(items => {
                                            return (
                                                <p style={{ paddingLeft: 50 }}>{items.name} ,</p>
                                            )
                                        })}
                                        <p>{`}`}</p>
                                    </div>
                                )
                            })
                        }
                        <p>{`}`}</p>
                    </div>}
                </div>
            </div>
        </>
    )
}
export default Home;