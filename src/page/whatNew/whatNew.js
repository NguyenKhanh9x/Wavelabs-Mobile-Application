import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mobileInfoAction } from '../../Reducer/mobile.reducer';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import './whatNew.scss';
import { useFormik } from 'formik';
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiFilledInput-root": {
            background: "rgb(232, 241, 250)"
        }
    }
}));

const WhatNew = (props) => {
    const reviewMobileState = useSelector((state) => state.mobileInfo);
    const dispatch = useDispatch();
    const [reviewInfo, setReviewInfo] = useState();
    const classes = useStyles();
    const hanldeSave = (value) => {
        dispatch(mobileInfoAction.saveReview(value))
    }

    useEffect(() => {
        setReviewInfo(reviewMobileState.mobileInfo)
    }, [reviewMobileState])

    useEffect(() => {
        dispatch(mobileInfoAction.resetReview())
    }, [])

    const validate = async (values) => {
        const errors = {};

        if (values.srcImage) {
            // const tmp = validURL(values.srcImage);
            // if (!tmp) {
            //     errors.srcImage = 'Link image not valid'
            // }
            const tmp2 = await validateImage(values.srcImage);
            if (tmp2 !== 'success') {
                errors.srcImage = 'Link image not valid'
            }
        }

        return errors;
    }

    const formik = useFormik({
        initialValues: {
            srcImage: '',
            name: '',
            heading: '',
            paragraph: '',
            color: '',
        },
        validate: validate,
        onSubmit: (
            values,
            { setSubmitting }
        ) => {
            hanldeSave(values)
        }
    });

    const hanldeChangColor = (e) => {
        formik.setFieldValue('color', e.target.value)
    }

    const validURL = (url) => {
        // var pattern = new RegExp('^(https?:\\/\\/)?' +
        //     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
        //     '((\\d{1,3}\\.){3}\\d{1,3}))' +
        //     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        //     '(\\?[;&a-z\\d%_.~+=-]*)?' +
        //     '(\\#[-a-z\\d_]*)?$', 'i');
        // return !!pattern.test(url);
        // return (url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null);
    }

    const validateImage = (url) => {
        return new Promise((resolve, reject) => {
            var img = new Image();
            img.onerror = () => {
                resolve("error");
            };
            img.onload = () => {
                resolve("success");
            };
            img.src = url;
        });
    }

    return (
        <>
            <div style={{ display: 'flex' }}>
                <form style={{ width: "50%" }} onSubmit={formik.handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'column', margin: 50, padding: "0 50px" }}>
                        <TextField
                            id='srcImage'
                            label="Logo"
                            variant="outlined"
                            value={formik.values.srcImage}
                            onChange={formik.handleChange}
                            style={{
                                marginBottom: 20,
                            }} />
                        {formik.errors.srcImage ? (
                            <div style={{ marginBottom: 20, color: "#FF0000" }}>{formik.errors.srcImage}</div>
                        ) : null}
                        <TextField
                            id='heading'
                            label="Heading"
                            variant="outlined"
                            value={formik.values.heading}
                            style={{
                                marginBottom: 20,
                            }}
                            onChange={formik.handleChange} />
                        <TextField
                            id='name'
                            label="Name"
                            variant="outlined"
                            value={formik.values.name}
                            style={{
                                marginBottom: 20,
                            }}
                            onChange={formik.handleChange} />
                        <TextField
                            id='paragraph'
                            label="Paragraph"
                            variant="outlined"
                            value={formik.values.paragraph}
                            multiline
                            rows={7}
                            style={{
                                marginBottom: 20,
                            }}
                            onChange={formik.handleChange} />
                        <TextField
                            id='color'
                            label='Color'
                            value={formik.values.color}
                            onChange={(e) => hanldeChangColor(e)}
                            select
                        >
                            <MenuItem style={{ backgroundColor: '#FF0000' }} value="#FF0000">Red</MenuItem>
                            <MenuItem style={{ backgroundColor: '#000000' }} value="#000000">Black</MenuItem>
                            <MenuItem style={{ backgroundColor: '#FFFF00' }} value="#FFFF00">Yellow</MenuItem>
                            <MenuItem style={{ backgroundColor: '#008000' }} value="#008000">Green</MenuItem>
                            <MenuItem style={{ backgroundColor: '#0000FF' }} value="#0000FF">Blue</MenuItem>
                            <MenuItem style={{ backgroundColor: '#000080' }} value="#000080">Navy</MenuItem>
                            <MenuItem style={{ backgroundColor: '#800080' }} value="#800080">Purple</MenuItem>
                        </TextField>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20, width: 200, }}>Save & Review</Button>
                        </div>
                    </div>
                </form>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "40%", height: 750, margin: 50, border: "2px solid #000000" }}>
                    <div class="marvel-device iphone8 silver">
                        <div class="top-bar"></div>
                        <div class="sleep"></div>
                        <div class="volume"></div>
                        <div class="camera"></div>
                        <div class="sensor"></div>
                        <div class="speaker"></div>
                        <div class="screen" style={{ backgroundColor: `${reviewInfo?.color ?? "#ffffff"}` }}>
                            <div style={{
                                display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20,
                            }}>
                                {
                                    reviewInfo?.srcImage ?
                                        <img className="imageLogo" alt='logo' src={reviewInfo?.srcImage} />
                                        :
                                        <div className="divLogo">LOGO</div>
                                }
                                < TextField
                                    label="Heading"
                                    variant="filled"
                                    value={reviewInfo?.heading ?? ''}
                                    className={classes.root}
                                    style={{
                                        margin: "20px 0",
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                    }} />
                                <TextField
                                    label="Name"
                                    variant="filled"
                                    value={reviewInfo?.name ?? ''}
                                    className={classes.root}
                                    style={{
                                        marginBottom: 30,
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                    }} />
                                <TextField
                                    label="Paragraph"
                                    variant="filled"
                                    value={reviewInfo?.paragraph ?? ''}
                                    multiline
                                    rows={5}
                                    className={classes.root}
                                    style={{
                                        marginBottom: 30,
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                    }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default WhatNew;