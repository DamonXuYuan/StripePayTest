import React, { useState } from 'react'
import { Center, Image, SimpleGrid } from '@chakra-ui/react'
import { getI18nSSRProps, GetI18nServerSideProps } from '@/utils/i18n'
import logo from '@/assets/imgs/logo.png'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'

function App() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const login = () => {
    console.log(userName, password)
  }

  return (
    <Center w="100vw" h="100vh">
      <SimpleGrid w="30%" spacing="30px">
        <Image src={logo} w="212px" mx="auto" />
        <BaseInput
          w="full"
          placeholder="用户名"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <BaseInput
          w="full"
          placeholder="密码"
          password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <BaseButton onClick={login}>登陆</BaseButton>
      </SimpleGrid>
    </Center>
  )
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ['home'])) },
  }
}
export default App
