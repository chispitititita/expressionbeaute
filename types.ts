export interface Shade {
  id: string;
  name: string;
  line: string;
  hex: string;
  badge: string;
  badgeType: 'stock' | 'bestseller' | 'pigment';
  subtone: 'frio' | 'calido' | 'profundo';
  subtoneLabel: string;
  price: number;
  description: string;
  finish: string;
  idealFor: string;
  swatchGradient: string;
  macroNotes: string;
}

export interface CartItem {
  shade: Shade;
  quantity: number;
}

export interface IngredientInfo {
  name: string;
  inci: string;
  function: string;
  concentration: string;
  origin: string;
  benefits: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  verified: boolean;
  skinTone: string;
  shade: string;
  rating: number;
  date: string;
  comment: string;
}
