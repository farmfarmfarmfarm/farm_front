import React, { useState, useEffect } from 'react';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

export const textState = atom({
  key: 'cookieState',
  default: []
});