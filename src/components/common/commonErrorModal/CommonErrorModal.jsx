import React, { useEffect } from 'react'
import './CommonErrorModalDesign.css';
import ErrorIcon from '../../../assets/icons/ErrorIcon.svg';
import { CustomModal, CustomModalBody } from '../modal/CustomModal';

const CommonErrorModal = (props) => {


  useEffect(() => {
    setTimeout(() => {
      props.actionOnErrorModal();
    }, 3000);
  }, []);



  return (

    <CustomModal
      visible={props?.visible}
      style={{ marginTop: '20%' }}
    >

      <CustomModalBody>
        <div className="container">
          <div className="row">
            <div className="modalBox success col-sm-12 col-md-12 col-lg-12 center animate" style={{ display: 'block' }}>
              <div className="icon" style={{ background: '#Ff0000' }}>
                <img src={ErrorIcon} alt='OKIcon' width='50px' />
              </div>
              <div style={{ fontSize: '16px', fontWeight: '600', lineHeight: '30px' }}>
                Error!
              </div>

              <div style={{ fontSize: '14px', fontWeight: '400', lineHeight: '30px', color: '#333333' }}>
                {props?.message}
              </div>
            </div>

          </div>
        </div>
      </CustomModalBody>

    </CustomModal>
  )
}

export default CommonErrorModal