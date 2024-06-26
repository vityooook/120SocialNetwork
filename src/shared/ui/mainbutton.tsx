'use client';

import { useEffect } from 'react';

const MainButton: React.FC<{
  text: string;
  color?: string;
  textColor?: string;
  isActive?: boolean;
  isProgressVisible?: boolean;
  onClick?: () => void;
}> = ({ text, color, textColor, isActive, isProgressVisible, onClick }) => {
  const mainButton = window.Telegram.WebApp.MainButton;

  useEffect(() => {
    mainButton?.setParams({
      text,
      color,
      text_color: textColor,
      is_active: isActive,
      is_visible: true,
    });

    return () => {
      mainButton?.hide();
    };
  }, [mainButton, color, isActive, text, textColor]);

  useEffect(() => {
    if (isProgressVisible) {
      mainButton?.showProgress();
      mainButton?.disable();
    } else {
      mainButton?.hideProgress();
    }
  }, [mainButton, isProgressVisible]);

  useEffect(() => {
    if (!onClick) {
      return;
    }
    mainButton?.onClick(onClick);

    return () => {
      mainButton?.offClick(onClick);
    };
  }, [mainButton, onClick]);

  return <button type="submit" style={{ display: 'none' }} />;
};

export default MainButton;