import * as React from "react";

// TODO: Make this a multi-select that submits string[]
export const LanguageSelector: React.FC = () => (
  <>
  <label htmlFor="languages" className="block">
    Preferred Language
  </label>
  <select id="languages" name="languages" defaultValue={"en"} className="text-black">
    {languages.map(language => (
      <option key={language.code} value={language.code}>
        {language.display}
      </option>
    ))}
  </select>
  </>
)

export const filterValidLanguageCodes = (codes: string[]) : string[] => {
  return codes.filter(code => languages.some(language => language.code === code))
}

const languages = [
  {code: "am", display: "Amharic"},
  {code: "ar", display: "Arabic"},
  {code: "eu", display: "Basque"},
  {code: "bn", display: "Bengali"},
  {code: "en", display: "English"},
  {code: "pt-BR", display: "Portuguese (Brazil)"},
  {code: "bg", display: "Bulgarian"},
  {code: "ca", display: "Catalan"},
  {code: "chr", display: "Cherokee"},
  {code: "hr", display: "Croatian"},
  {code: "cs", display: "Czech"},
  {code: "da", display: "Danish"},
  {code: "nl", display: "Dutch"},
  {code: "et", display: "Estonian"},
  {code: "fil", display: "Filipino"},
  {code: "fi", display: "Finnish"},
  {code: "fr", display: "French"},
  {code: "de", display: "German"},
  {code: "el", display: "Greek"},
  {code: "gu", display: "Gujarati"},
  {code: "iw", display: "Hebrew"},
  {code: "hi", display: "Hindi"},
  {code: "hu", display: "Hungarian"},
  {code: "is", display: "Icelandic"},
  {code: "id", display: "Indonesian"},
  {code: "it", display: "Italian"},
  {code: "ja", display: "Japanese"},
  {code: "kn", display: "Kannada"},
  {code: "ko", display: "Korean"},
  {code: "lv", display: "Latvian"},
  {code: "lt", display: "Lithuanian"},
  {code: "ms", display: "Malay"},
  {code: "ml", display: "Malayalam"},
  {code: "mr", display: "Marathi"},
  {code: "no", display: "Norwegian"},
  {code: "pl", display: "Polish"},
  {code: "pt-PT", display: "Portuguese (Portugal)"},
  {code: "ro", display: "Romanian"},
  {code: "ru", display: "Russian"},
  {code: "sr", display: "Serbian"},
  {code: "zh-CN", display: "Chinese (PRC)"},
  {code: "sk", display: "Slovak"},
  {code: "sl", display: "Slovenian"},
  {code: "es", display: "Spanish"},
  {code: "sw", display: "Swahili"},
  {code: "sv", display: "Swedish"},
  {code: "ta", display: "Tamil"},
  {code: "te", display: "Telugu"},
  {code: "th", display: "Thai"},
  {code: "zh-TW", display: "Chinese (Taiwan)"},
  {code: "tr", display: "Turkish"},
  {code: "ur", display: "Urdu"},
  {code: "uk", display: "Ukrainian"},
  {code: "vi", display: "Vietnamese"},
  {code: "cy", display: "Welsh"},
  {code: "ot", display: "Other"},
]
