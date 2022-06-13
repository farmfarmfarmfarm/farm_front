import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const selectedPlace = atom({
  key: 'selectedPlace',
  default: '',
  effects_UNSTABLE: [persistAtom],
}); 

export const selectedLoc = atom({
  key: 'selectedLoc',
  default: {x:0, y:0},
  effects_UNSTABLE: [persistAtom],
}); 

export const selectedFarm = atom({
    key: 'selectedFarm',
    default: [],
    effects_UNSTABLE: [persistAtom],
  }); 