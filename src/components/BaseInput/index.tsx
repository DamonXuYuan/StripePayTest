import React, { useState } from 'react'
import { Text, Flex, Image, Input, InputProps, useInterval, FlexProps } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import hideIcon from '@/assets/imgs/showNotPassword.png'
import showIcon from '@/assets/imgs/showPassword.png'
import BaseButton from '../BaseButton'

interface IProps extends InputProps {
  captcha?: boolean // 验证码模式
  password?: boolean // 密码模式
  withOutBorder?: boolean // 是否不需要外边框
  errorText?: string // 错误文案
  inputProps?: InputProps
  flexProps?: FlexProps
  captchaClick?: () => void
}

function Index({
  withOutBorder = false,
  captcha = false,
  password = false,
  errorText = '',
  captchaClick,
  flexProps,
  ...props
}: IProps) {
  const { t } = useTranslation(['home'])
  const [showPSD, setShowPSD] = useState(false)
  const [count, setCount] = useState(60)
  const [isCounting, setIsCounting] = useState(false)

  useInterval(
    () => {
      if (count > 0) {
        setCount(count - 1)
      } else {
        setIsCounting(false)
        setCount(60)
      }
    },
    isCounting ? 1000 : null
  )

  return (
    <Flex flexDir="column" w="full" {...flexProps}>
      <Flex
        w="full"
        bgColor="black.400"
        borderRadius="999px"
        border="solid 1px"
        borderColor={errorText ? 'red.100' : withOutBorder ? 'black.300' : 'transparent'}
        p={!withOutBorder ? '6px' : '0'}
      >
        <Flex
          alignItems="center"
          w="full"
          h="42px"
          borderRadius="999px"
          overflow="hidden"
          bgColor={withOutBorder ? 'black.400' : 'black.300'}
        >
          <Input
            border="none"
            outline="none"
            flex="1"
            h="42px"
            fontSize="12px"
            lineHeight="42px"
            p="0"
            m="0"
            px="12px"
            color="white.100"
            bgColor={withOutBorder ? 'black.400' : 'black.300'}
            type={password ? (showPSD ? 'text' : 'password') : 'text'}
            _placeholder={{
              color: 'white.100',
              opacity: '0.5',
            }}
            _hover={{
              bgColor: withOutBorder ? 'black.400' : 'black.300',
              color: 'white.100',
            }}
            _active={{
              bgColor: withOutBorder ? 'black.400' : 'black.300',
              color: 'white.100',
            }}
            _focusVisible={{
              bgColor: withOutBorder ? 'black.400' : 'black.300',
              color: 'white.100',
            }}
            _peerFocusVisible={{
              bgColor: withOutBorder ? 'black.400' : 'black.300',
              color: 'white.100',
            }}
            {...props}
          />
          {captcha && (
            <BaseButton w="130px" h="32px" mr="6px" flexShrink="0">
              <Text
                color="black.300"
                fontSize="12px"
                lineHeight="32px"
                onClick={() => {
                  if (!isCounting) {
                    setIsCounting(true)
                    captchaClick?.()
                  }
                }}
              >
                {!isCounting ? (t('captchaButton') as string) : `${count}s`}
              </Text>
            </BaseButton>
          )}
          {password && (
            <Image
              src={showPSD ? showIcon : hideIcon}
              w="20px"
              h="11px"
              mr="12px"
              onClick={() => setShowPSD(!showPSD)}
            />
          )}
        </Flex>
      </Flex>
      {errorText && (
        <Text textAlign="center" color="red.100" fontSize="12px" lineHeight="12px" my="4px">
          {errorText}
        </Text>
      )}
    </Flex>
  )
}

export default React.memo(Index)
