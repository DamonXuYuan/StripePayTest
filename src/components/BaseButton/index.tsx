import React from 'react'
import { ButtonProps, Button } from '@chakra-ui/react'

interface IProps extends ButtonProps {
  children?: React.ReactNode
}

function Index({ children, ...props }: IProps) {
  return (
    <Button
      w="full"
      h="54px"
      borderRadius="20px"
      bgColor="blue.100"
      p="0"
      m="0"
      textAlign="center"
      color="white.100"
      fontSize="12px"
      fontWeight="400"
      // textDecor="underline"
      _hover={{ bgColor: 'blue.100', color: 'black.100' }}
      _active={{ bgColor: 'blue.100', color: 'black.100' }}
      _focus={{ bgColor: 'blue.100', color: 'black.100' }}
      _focusVisible={{ bgColor: 'blue.100', color: 'black.100' }}
      {...props}
    >
      {children}
    </Button>
  )
}

export default React.memo(Index)
