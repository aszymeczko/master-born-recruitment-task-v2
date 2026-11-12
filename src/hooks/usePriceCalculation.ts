// usePriceCalculation Hook

import { useState, useEffect, useCallback } from 'react';
import type {
  Configuration,
  Product,
  PriceBreakdown,
  PriceResponse,
} from '../components/ProductConfigurator/types';
import { ERROR_CODES } from '../components/ProductConfigurator/types';
import { calculatePrice } from '../services/api';

interface UsePriceCalculationResult {
  price: PriceBreakdown | null;
  formattedTotal: string;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

interface PriceResult {
  config: Configuration;
  reloadToken: number;
  response: PriceResponse | null;
  error: string | null;
}

const EMPTY_TOTAL = '$0.00';

/**
 * Custom hook for managing price calculation
 */
export function usePriceCalculation(
  config: Configuration | null,
  product: Product,
): UsePriceCalculationResult {
  const [result, setResult] = useState<PriceResult | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    if (!config) return;

    let isStale = false;

    calculatePrice(config, product)
      .then((response) => {
        if (!isStale) setResult({ config, reloadToken, response, error: null });
      })
      .catch(() => {
        if (!isStale) {
          setResult({ config, reloadToken, response: null, error: ERROR_CODES.PRICE_CALC_FAILED });
        }
      });

    return () => {
      isStale = true;
    };
  }, [config, product, reloadToken]);

  const refetch = useCallback(() => setReloadToken((token) => token + 1), []);

  if (!config) {
    return { price: null, formattedTotal: EMPTY_TOTAL, isLoading: false, error: null, refetch };
  }

  return {
    price: result?.response?.breakdown ?? null,
    formattedTotal: result?.response?.formattedTotal ?? EMPTY_TOTAL,
    isLoading: result?.config !== config || result.reloadToken !== reloadToken,
    error: result?.error ?? null,
    refetch,
  };
}
