import React, { useEffect, useState } from 'react'
import { Flex, FlexProps, Text, SimpleGrid, Tooltip, Select } from '@chakra-ui/react'
import { IoCloseSharp } from 'react-icons/io5'
import { AiOutlineMail } from 'react-icons/ai'
import { RiVisaLine } from 'react-icons/ri'
import { LiaBirthdayCakeSolid } from 'react-icons/lia'
import { FaRegCreditCard } from 'react-icons/fa'
import BaseInput from '../BaseInput'
import BigNumber from 'bignumber.js'
import BaseButton from '../BaseButton'

export interface PayInfo {
  nftNum: number // NFT数量
  nftPrice: number | string // NFT单价
  discountCode?: string // 折扣码
}

interface IProps extends FlexProps {
  payInfo: PayInfo
  show: boolean
  onclose?: () => void
}

function Index({ payInfo, show, onclose, ...props }: IProps) {
  const usdtPrice = 7.3 // USDT价格
  const usdPrice = 1.1 // USDT价格
  const discountPriceMock = '8.88888888' // 假设输入折扣码后的折扣价格
  const [discountPrice, setDiscountPrice] = useState('') // 折扣价输入框
  const [totalPrice, setTotalPrice] = useState<BigNumber>(new BigNumber(0)) // 总价
  const [addUpPrice, setAddUpPrice] = useState<BigNumber>(new BigNumber(0)) // 合计
  const [activeTabs, setActiveTabs] = useState(2) // 选中支付方式
  const [email, setEmail] = useState('') // 邮箱
  const [emailErr, setEmailErr] = useState('') // 邮箱
  const [cardNumber, setCardNumber] = useState('') // 卡号
  const [cardNumberErr, setCardNumberErr] = useState('') // 卡号
  const [birthDay, setBirthDay] = useState('') // 生日
  const [birthDayErr, setBirthDayErr] = useState('') // 生日
  const [cvc, setCvc] = useState('') // cvc
  const [cvcErr, setCvcErr] = useState('') // cvc
  const [cardName, setCardName] = useState('') // 卡名
  const [cardNameErr, setCardNameErr] = useState('') // 卡名
  const [country, setCountry] = useState('') // 国家
  const [countryErr, setCountryErr] = useState('') // 国家

  // 自动计算总价
  useEffect(() => {
    if (!payInfo) return
    setTotalPrice(
      new BigNumber(payInfo.nftNum)
        .times(new BigNumber(payInfo.nftPrice))
        .times(new BigNumber(usdtPrice))
    )
  }, [payInfo])

  // 自动计算合计
  useEffect(() => {
    if (!payInfo) return
    setAddUpPrice(
      new BigNumber(payInfo.nftNum)
        .times(new BigNumber(payInfo.nftPrice))
        .times(new BigNumber(usdtPrice))
        .minus(new BigNumber(discountPrice ? discountPriceMock : 0))
    )
  }, [payInfo, discountPrice])

  // 标题板块
  const TitleSection = () => {
    return (
      <Flex
        justifyContent="space-between"
        alignItems="center"
        p="20px"
        borderBottom="1px solid"
        borderColor="black.200"
      >
        <Text fontSize="16px">选择付款方式</Text>
        <IoCloseSharp size="20px" cursor="pointer" onClick={() => onclose && onclose()} />
      </Flex>
    )
  }

  // 价格板块
  const PriceSection = () => {
    return (
      <Flex flexDir="column" mb="20px">
        {/* 购买NFT数量 */}
        <Flex mb="15px">
          <Text>购买NFT数量: </Text>
          <Text ml="5px">{payInfo.nftNum}</Text>
        </Flex>
        {/* 折扣码 */}
        <Flex flexDir="column" alignItems="flex-start" mb="20px">
          <Text mb="10px">请输入折扣码</Text>
          <BaseInput
            placeholder="e.g. XOO888"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
          />
        </Flex>
        {/* 价格板块 */}
        <SimpleGrid gap="10px">
          {/* 总价 */}
          <Flex justifyContent="space-between">
            <Text>总价</Text>
            <Tooltip placement="top" label={totalPrice.toString()}>
              <Text cursor="pointer">
                {totalPrice.toFixed(4)}
                USDT
              </Text>
            </Tooltip>
          </Flex>
          {/* 优惠 */}
          {discountPrice && (
            <Flex justifyContent="space-between">
              <Text>优惠</Text>
              <Tooltip placement="top" label={new BigNumber(discountPriceMock).toString()}>
                <Text cursor="pointer">
                  {new BigNumber(discountPriceMock).toFixed(4)}
                  USDT
                </Text>
              </Tooltip>
            </Flex>
          )}
          {/* 合计 */}
          <Flex justifyContent="space-between">
            <Text>合计</Text>
            <Tooltip placement="top" label={addUpPrice.toString()}>
              <Text cursor="pointer">
                {addUpPrice.toFixed(4)}
                USDT
              </Text>
            </Tooltip>
          </Flex>
        </SimpleGrid>
      </Flex>
    )
  }

  // 虚拟货币支付板块(空的)
  const CryptoPaySection = () => {
    return <Text>敬请期待</Text>
  }

  // 银行卡支付版块
  const CardPaymentSection = () => {
    return (
      <Flex flexDir="column">
        {/* 法币 */}
        <Flex justifyContent="space-between" mb="20px">
          <Text>折合法币</Text>
          <Tooltip
            placement="top"
            label={new BigNumber(addUpPrice).times(new BigNumber(usdPrice)).toString()}
          >
            <Text cursor="pointer">
              ${new BigNumber(addUpPrice).times(new BigNumber(usdPrice)).toFixed(2)}
            </Text>
          </Tooltip>
        </Flex>
        {/* 银行卡信息 */}
        <CardInfo />
        {/* 支付 */}
        <BaseButton
          my="20px"
          bgColor="blue.100"
          h="40px"
          borderRadius="10px"
          onClick={() => payClick()}
        >
          立即支付
        </BaseButton>
      </Flex>
    )
  }

  // 银行卡信息
  const CardInfo = () => {
    return (
      <Flex flexDir="column">
        {/* 邮箱 */}
        <Flex flexDir="column" alignItems="flex-start" mb="20px">
          <Text fontSize="12px" mb="5px">
            邮箱
          </Text>
          <BaseInput
            cardType
            inputLeftElement={<AiOutlineMail />}
            errorText={emailErr}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Flex>
        {/* 银行卡 */}
        <Flex flexDir="column" alignItems="flex-start" mb="20px">
          <Text fontSize="12px" mb="5px">
            银行卡信息
          </Text>
          <BaseInput
            cardType
            justErr
            errorText={cardNumberErr}
            inputLeftElement={<RiVisaLine />}
            placeholder="Card number"
            borderBottomRadius="0"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <Flex>
            <BaseInput
              cardType
              justErr
              errorText={birthDayErr}
              inputLeftElement={<LiaBirthdayCakeSolid />}
              placeholder="MM / YY"
              borderTop="none"
              borderRight="none"
              borderRadius="0"
              borderBottomLeftRadius="5px"
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
            />
            <BaseInput
              cardType
              justErr
              errorText={cvcErr}
              inputLeftElement={<FaRegCreditCard />}
              borderLeftRadius="0"
              borderTopRightRadius="0"
              placeholder="CVC"
              borderTop="none"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
            />
          </Flex>
        </Flex>
        {/* 卡的姓名 */}
        <Flex flexDir="column" alignItems="flex-start" mb="20px">
          <Text fontSize="12px" mb="5px">
            卡的姓名
          </Text>
          <BaseInput
            cardType
            placeholder="Your Name"
            errorText={cardNameErr}
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
        </Flex>
        {/* 国家或地区 */}
        <Flex flexDir="column" alignItems="flex-start" mb="20px">
          <Text fontSize="12px" mb="5px">
            国家或地区
          </Text>
          <Select
            placeholder="请选择"
            bgColor="yellow.100"
            borderColor={countryErr ? 'red.100' : 'black.200'}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="China">中国</option>
            <option value="Japan">日本</option>
          </Select>
          {countryErr && (
            <Text textAlign="left" color="red.100" fontSize="12px" lineHeight="12px" my="4px">
              {countryErr}
            </Text>
          )}
        </Flex>
      </Flex>
    )
  }

  const payClick = () => {
    const obj = {
      email,
      cardNumber,
      birthDay,
      cvc,
      cardName,
      country,
    }
    console.log(obj, 'obj')
    if (email) {
      setEmailErr(!email ? '请输入邮箱' : '')
    }
    if (cardNumber) {
      setCardNumberErr(!cardNumber ? '请输入银行卡号' : '')
    }
    if (birthDay) {
      setBirthDayErr(!birthDay ? '请输入生日' : '')
    }
    if (cvc) {
      setCvcErr(!cvc ? '请输入CVC' : '')
    }
    if (cardName) {
      setCardNameErr(!cardName ? '请输入卡姓名' : '')
    }
    if (country) {
      setCountryErr(!country ? '请选择国家' : '')
    }
  }

  return (
    <Flex
      display={show ? 'flex' : 'none'}
      flexDir="column"
      w="300px"
      minH="500px"
      p="0"
      m="0"
      pos="fixed"
      top="0"
      right="0"
      textAlign="center"
      color="black.100"
      fontSize="14px"
      fontWeight="400"
      borderRadius="10px"
      bgColor="white.100"
      {...props}
    >
      {/* title */}
      <TitleSection />
      {/* content */}
      <Flex flexDir="column" p="20px 15px" boxSizing="border-box">
        {/* price */}
        <PriceSection />
        {/* tabs */}
        <Flex mb="15px">
          <BaseButton
            w="50%"
            h="30px"
            borderRadius="5px"
            borderRightRadius="0"
            bgColor={activeTabs === 1 ? 'green.100' : 'black.200'}
            color={activeTabs === 1 ? 'white.100' : 'black.100'}
            _hover={{
              bgColor: 'green.100',
              color: 'white.100',
            }}
            _active={{
              bgColor: 'green.100',
              color: 'white.100',
            }}
            _focus={{
              bgColor: 'green.100',
              color: 'white.100',
            }}
            _focusVisible={{
              bgColor: 'green.100',
              color: 'white.100',
            }}
            onClick={() => setActiveTabs(1)}
          >
            虚拟币
          </BaseButton>
          <BaseButton
            w="50%"
            h="30px"
            borderRadius="5px"
            borderLeftRadius="0"
            bgColor={activeTabs === 2 ? 'green.100' : 'black.200'}
            color={activeTabs === 2 ? 'white.100' : 'black.100'}
            _hover={{
              bgColor: 'green.100',
              color: 'white.100',
            }}
            _active={{
              bgColor: 'green.100',
              color: 'white.100',
            }}
            _focus={{
              bgColor: 'green.100',
              color: 'white.100',
            }}
            _focusVisible={{
              bgColor: 'green.100',
              color: 'white.100',
            }}
            onClick={() => setActiveTabs(2)}
          >
            银行卡
          </BaseButton>
        </Flex>
        {/* 虚拟卡支付 */}
        {activeTabs === 1 ? <CryptoPaySection /> : <CardPaymentSection />}
      </Flex>
    </Flex>
  )
}

export default React.memo(Index)
