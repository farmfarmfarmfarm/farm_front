import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userId = atom({
  key: "userId",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const selectedPlace = atom({
  //입력한 검색중심 장소
  key: "selectedPlace",
  default: "서울",
  effects_UNSTABLE: [persistAtom],
});

export const selectedLoc = atom({
  key: "selectedLoc",
  default: { x: 128, y: 37 },
  effects_UNSTABLE: [persistAtom],
});

export const selectedFarm = atom({
  key: "selectedFarm",
  default: "주말농장",
  effects_UNSTABLE: [persistAtom],
});

export const selectedDiease = atom({
  key: "selectedDiease",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const ratingAvg = atom({
  key: "ratingAvg",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const thisloc = atom({
  key: "thisloc",
  default: { x: 1, y: 1 },
  effects_UNSTABLE: [persistAtom],
});
