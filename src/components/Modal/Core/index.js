import React, { useContext } from 'react'
import { CoreContext } from 'context/CoreContext'
import { ThemedComponent } from 'ui/theme'

import ModalSample from '../Sample'

export default function ModalCore() {

  const { modal } = useContext(CoreContext)

  return (
    <>
      <ThemedComponent>
        {modal?.type === 'sample' ? <ModalSample /> : null}
      </ThemedComponent>
    </>
  )
}