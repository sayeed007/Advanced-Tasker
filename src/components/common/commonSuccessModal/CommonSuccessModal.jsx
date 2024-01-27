import React, { useEffect } from 'react'
import './CommonSuccessModalDesign.css';
import OkIcon from '../../../assets/icons/OkIcon.svg';
import { CustomModal, CustomModalBody } from '../modal/CustomModal';
import { useTaskContext } from '../../context/TaskContext';

const CommonSuccessModal = (props) => {
  const { state, dispatch } = useTaskContext();


  useEffect(() => {
    setTimeout(() => {
      props.actionOnSuccessModal();
    }, 2000);
  }, []);


  return (
    <CustomModal
      visible={state?.successModalVisible}
      style={{ marginTop: '20%' }}
    >
      <CustomModalBody>
        <div className="container">
          <div className="row">
            <div className="modalBox success col-sm-12 col-md-12 col-lg-12 center animate" style={{ display: 'block' }}>
              <div className="icon">
                <img src={OkIcon} alt='OKIcon' width='50px' />
              </div>
              <div style={{ fontSize: '16px', fontWeight: '600', lineHeight: '30px' }}>
                Success!
              </div>

              {/* Message */}
              <div style={{ fontSize: '14px', fontWeight: '400', lineHeight: '30px', color: '#333333' }}>
                {state?.message}
              </div>
            </div>

          </div>
        </div>
      </CustomModalBody>
    </CustomModal>
  )
}

export default CommonSuccessModal