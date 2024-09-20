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
      borderRadius="999px"
      bgColor="green.100"
      p="0"
      m="0"
      textAlign="center"
      color="black.200"
      fontSize="12px"
      fontWeight="400"
      // textDecor="underline"
      _hover={{ bgColor: 'green.200', color: 'black.200' }}
      _active={{ bgColor: 'green.200', color: 'black.200' }}
      _focus={{ bgColor: 'green.200', color: 'black.200' }}
      _focusVisible={{ bgColor: 'green.200', color: 'black.200' }}
      {...props}
    >
      {children}
    </Button>
  )
}

export default React.memo(Index)
