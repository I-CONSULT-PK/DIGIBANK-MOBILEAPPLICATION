// translationService.js

const translateText = async (text, targetLang = 'en') => {
    const sourceLang = 'en'; // Assuming English as the source language for simplicity
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;
  
    try {
      const response = await fetch(url);
      const result = await response.json();
  
      // Check if the response has the expected structure
      if (result && result.responseData && result.responseData.translatedText) {
        return result.responseData.translatedText;
      } else {
        console.warn("Unexpected API response structure:", result);
        return text; // Fallback to the original text if the response is unexpected
      }
    } catch (error) {
      console.error("Error translating text", error);
      return text; // Fallback to the original text if there's an error
    }
  };
  
  export default translateText;
  