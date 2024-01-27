
import React from 'react';
import { CustomModal, CustomModalBody } from '../modal/CustomModal';
import './Loader.css';

const Loader = (props) => {
    return (
        <div id="loaderModal">
            <CustomModal
                alignment="center"
                visible={props?.activateLoader}
                closeOnBackdrop={false}
            >
                <CustomModalBody
                    style={{ marginTop: '45%' }}
                >
                    <div >
                        <div className='loaderHolder'>
                            <div id="loaderMother">
                                <div className='loaderText'>
                                    {props?.loaderMessage ? props?.loaderMessage : 'Please Wait'}
                                </div>
                                <div className="loader">
                                    <div className="loader1"></div>&nbsp;&nbsp;
                                    <div className="loader2"></div>&nbsp;&nbsp;
                                    <div className="loader3"></div>&nbsp;&nbsp;
                                    <div className="loader4"></div>&nbsp;&nbsp;
                                    <div className="loader5"></div>&nbsp;&nbsp;
                                    <div className="loader6"></div>&nbsp;&nbsp;
                                    <div className="loader7"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CustomModalBody>
            </CustomModal>
        </div>
    )

}
export default Loader