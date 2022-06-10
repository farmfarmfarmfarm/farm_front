import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

export const selectedLoc = atom({
  key: 'selectedLoc',
  default: {x:0, y:0},
}); 

export const selectedFarm = atom({
    key: 'selectedFarm',
    default: [],
  }); 