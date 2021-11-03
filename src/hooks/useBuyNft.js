import { ethers } from 'ethers'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { saveTxPending } from '../utils/index'
import useAlertCallback from './useAlertCallback'
import useNtfMarketContract from './useNtfMarketContract'

const useBuyNft = () => {
  const nftMarketContract = useNtfMarketContract()
  const alertMessage = useAlertCallback()
  const { t } = useTranslation()
  return useCallback(
    async (item) => {
      console.log('item', item)
      try {
        if (nftMarketContract) {
          const price = ethers.utils.parseUnits(item.price, 'ether')
          const buyNftTx = await nftMarketContract.buyDirectly(item.id, {
            value: price.toString(),
          })
          saveTxPending(buyNftTx.hash)
          alertMessage(t('Success'), t('Buy NFT token success'), 'success')
        }
      } catch (e) {
        console.error(e)
        return false
      }
    },
    [alertMessage, nftMarketContract, t],
  )
}

export default useBuyNft
