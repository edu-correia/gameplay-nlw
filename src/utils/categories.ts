import RankedSvg from '../assets/ranked.svg';
import DuelSvg from '../assets/duel.svg';
import FunSvg from '../assets/fun.svg';
import TrainingSvg from '../assets/training.svg';
import AddCategorySvg from '../assets/add-category.svg';

export const categories = [
  { id: '1', title: 'Personalizado', icon: AddCategorySvg, enabledCategory: false },
  { id: '2', title: 'Ranqueada', icon: RankedSvg, enabledCategory: true },
  { id: '3', title: 'Duelo 1x1', icon: DuelSvg, enabledCategory: true },
  { id: '4', title: 'Diversão', icon: FunSvg, enabledCategory: true },
  { id: '5', title: 'Treino', icon: TrainingSvg, enabledCategory: true },
];