import React, { useContext } from 'react'

import { CloseContainer, CompanyDataContainer } from './styled'
import { Icon, ModalContainer, ModalContent, Overlay } from 'ui/styled'

import { CoreContext } from 'context/CoreContext'

export default function Wrapper({ children }) {

  const { setModal } = useContext(CoreContext)

  const close = () => { setModal(null) ;} 

  const handleClose = (e) => {
    const mc = document.getElementById('modal-content');
    // console.log("close", mc.contains(e?.target), e?.target)
    if (!mc?.contains(e?.target) && !(e?.target.tagName === 'LI')) {
      close()
    }
  }
  
  return (
    <>
      <Overlay onClick={handleClose} >
        <ModalContainer>
          <ModalContent id="modal-content">
            <CompanyDataContainer>
              <CloseContainer>
                <Icon icon={'close-big'} pointer={true} onClick={close} />
              </CloseContainer>
              {children}
            </CompanyDataContainer>
          </ModalContent>
        </ModalContainer>
      </Overlay>
    </>
  )
}
