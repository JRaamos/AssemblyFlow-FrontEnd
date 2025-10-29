import { CoreContext } from 'context/CoreContext'
import React, { useContext } from 'react'
import { FormText, Title } from 'ui/styled'
import { CompanyButtonContainer } from './styled'
import Wrapper from '../Wrapper';
import Button from 'components/Form/Button';

export default function ModalSample() {

  const { modal, setModal } = useContext(CoreContext)

  const close = () => {
    setModal(null)
  }

  const handleSave = () => {
    // do something
    close()
  }

  return (
    <>
      <Wrapper>
        <Title upper nomargin>Sou um modal</Title>
        <FormText>Preencha algum texto caso precise</FormText>
        <CompanyButtonContainer>
          <Button onClick={close}>Cancelar</Button>
          <Button color="primary" onClick={handleSave} between>Salvar</Button>
        </CompanyButtonContainer>
      </Wrapper>
    </>
  )
}
