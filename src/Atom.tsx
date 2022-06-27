import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist()

export const selectedPlace = atom({ //입력한 검색중심 장소
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
    default: '',
    effects_UNSTABLE: [persistAtom],
  }); 

export const selectedDiease = atom({
    key: 'selectedDiease',
    default: [],
    effects_UNSTABLE: [persistAtom],
  }); 

export const selectedCrop = atom({
    key: 'selectedCrop',
    default: [],
    effects_UNSTABLE: [persistAtom],
  }); 

export const ratingAvg = atom({
    key: 'ratingAvg',
    default: '',
    effects_UNSTABLE: [persistAtom],
  }); 