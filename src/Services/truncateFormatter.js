export const truncateText = (text, maxLength) => {
    if (typeof text !== 'string') {
      return '';
    }
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  