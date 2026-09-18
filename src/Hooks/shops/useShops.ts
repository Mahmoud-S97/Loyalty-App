import React, { useEffect, useState } from 'react';
import { ShopDto } from '@/types';
import { shopService } from '@/services/firebase/shop.service';
import { logger } from '@/lib/logger';

export const useShops = () => {
  const [shops, setShops] = useState<ShopDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getAllShops();
  }, []);

  const getAllShops = async (): Promise<ShopDto[]> => {
    try {
      setIsLoading(true);
      const availableShops = await shopService.getShops();
      setShops(availableShops);
      return availableShops;
    } catch (error: any) {
      logger.log('Error while fetching the shops: ', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getShopById = async (shopId: string): Promise<ShopDto | null> => {
    try {
      setIsLoading(true);
      const shopData = await shopService.getShopById(shopId.trim());
      return shopData;
    } catch (error: any) {
      logger.log('Error while fetching the shop by its ID: ', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const createShopProfile = async (
    data: Omit<ShopDto, 'id'>
  ): Promise<string | null> => {
    try {
      setIsLoading(true);
      const createdShopId = await shopService.createShop(data);
      return createdShopId;
    } catch (error: any) {
      logger.log('Error while fetching the shops: ', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateShopProfile = async (
    shopId: string,
    data: Omit<ShopDto, 'id' | 'createdAt'>
  ): Promise<string | null> => {
    try {
      setIsLoading(true);
      const updatedShopId = await shopService.updateShop(shopId, data);
      return updatedShopId;
    } catch (error: any) {
      logger.log('Error while fetching the shops: ', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getAllShops,
    getShopById,
    createShopProfile,
    updateShopProfile,
    shops,
    isLoading
  };
};
