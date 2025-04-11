import React, { useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
import PayModal, { PayInfo } from '@/components/PayModal'
import BaseButton from '@/components/BaseButton'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  const payInfo: PayInfo = {
    nftNum: 26,
    nftPrice: '12.12345678',
    discountCode: '1232456798',
  }

  return (
    <Flex w="100vw" h="100vh" bgColor="black.200">
      <BaseButton w="200px" m="20px" onClick={() => setIsOpen(!isOpen)}>
        点击我
      </BaseButton>
      <PayModal show={isOpen} payInfo={payInfo} onclose={() => setIsOpen(false)} />
    </Flex>
  )
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ['home'])) },
  }
}
export default App
