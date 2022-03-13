import BEER_COLOR_MAP from 'src/constants/beerColor';
import LOVIBOND_CHART from 'src/constants/lovibondChart';

export const getMCU = (
  maltLovibond: number,
  maltLBWeight: number,
  batchVolume: number
) => {
  return (maltLBWeight * maltLovibond) / batchVolume;
};

export const calculateSRM = (mcu: number) => {
  return 1.4922 * (mcu ^ 0.6859);
};

export const calculateBeerColor = (srm: number): string => {
  if (srm > 40) {
    return '#030403';
  }

  const roundedSRM = Math.round(srm);
  return BEER_COLOR_MAP[roundedSRM] ?? '#FFE699';
};

export const getMaltLovibond = (maltName: string): number => {
  const lovibond = LOVIBOND_CHART[maltName];
  if (lovibond > 0) {
    return lovibond;
  }

  return 0;
};
