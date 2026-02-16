
export type SlipperStyle = 'religioso' | 'flores' | 'frases' | 'festas';

export interface GameState {
  step: number;
  userName: string;
  chosenIncome: string | null;
  chosenIncomeReason: string | null;
  chosenStyle: SlipperStyle | null;
  discountAttempt: number;
  unlockedBonus: string | null;
  points: number;
  badges: string[];
}

export enum Step {
  Entry = 0,
  Welcome = 1,
  IncomeRoulette = 2,
  StyleSelection = 3,
  TreasureChest = 4,
  DiscountBox = 5,
  BonusRoulette = 6,
  ScratchCard = 7,
  BadgeCollection = 8,
  Previews = 9,
  FinalOffer = 10,
  PostPurchase = 11
}
