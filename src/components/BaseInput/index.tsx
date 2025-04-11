import React from 'react'
import {
  Text,
  Flex,
  Input,
  InputProps,
  FlexProps,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'

interface IProps extends InputProps {
  cardType?: boolean // 银行卡模式
  errorText?: string // 错误文案
  justErr?: boolean // 错误提示只需要红框
  flexProps?: FlexProps
  inputProps?: InputProps
  inputLeftElement?: React.ReactNode
}

function Index({
  cardType,
  errorText = '',
  inputLeftElement,
  flexProps,
  justErr,
  ...props
}: IProps) {
  return (
    <Flex flexDir="column" w="full" {...flexProps}>
      <InputGroup>
        {inputLeftElement && (
          <InputLeftElement pointerEvents="none">{inputLeftElement}</InputLeftElement>
        )}

        <Input
          outline="none"
          flex="1"
          h="30px"
          fontSize="14px"
          lineHeight="30px"
          p="0"
          m="0"
          px="12px"
          border="1px solid"
          borderColor={errorText ? 'red.100' : 'black.200'}
          bgColor={cardType ? 'yellow.100' : 'transparent'}
          _placeholder={{
            opacity: '0.5',
          }}
          _hover={{
            bgColor: cardType ? 'yellow.100' : 'transparent',
          }}
          _active={{
            bgColor: cardType ? 'yellow.100' : 'transparent',
          }}
          _focusVisible={{
            bgColor: cardType ? 'yellow.100' : 'transparent',
          }}
          _peerFocusVisible={{
            bgColor: cardType ? 'yellow.100' : 'transparent',
          }}
          {...props}
        />
      </InputGroup>
      {!justErr && errorText && (
        <Text textAlign="left" color="red.100" fontSize="12px" lineHeight="12px" my="4px">
          {errorText}
        </Text>
      )}
    </Flex>
  )
}

export default React.memo(Index)
