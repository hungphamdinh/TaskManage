import { useState } from 'react';

export const useVisible = () => {
  const [isVisible, setIsVisible] = useState(false) as any;

  const onChangeVisible = () => setIsVisible(!isVisible);

  return [ isVisible, onChangeVisible ];
};
