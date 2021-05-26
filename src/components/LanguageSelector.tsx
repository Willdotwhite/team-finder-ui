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
        {language.flag} {language.display}
      </option>
    ))}
  </select>
  </>
)

export const getFlags = (codes: string[]) : string => {
  let flags = "";
  codes.forEach(code => {
    languages.forEach(language => {
      if (language.code == code) {
        flags += language.flag;
      }
    })
  })

  return flags;
}

export const filterValidLanguageCodes = (codes: string[]) : string[] => {
  return codes.filter(code => languages.some(language => language.code === code))
}

const languages = [
  {code: "am",    flag: "🏴", display: "Amharic"},
  {code: "ar",    flag: "🇦🇪", display: "Arabic"},
  {code: "eu",    flag: "🏴", display: "Basque"},
  {code: "bn",    flag: "🇧🇩", display: "Bengali"},
  {code: "en",    flag: "🇬🇧", display: "English"},
  {code: "pt-BR", flag: "🇧🇷", display: "Portuguese (Brazil)"},
  {code: "bg",    flag: "🇧🇬", display: "Bulgarian"},
  {code: "ca",    flag: "🏴", display: "Catalan"},
  {code: "chr",   flag: "🏴", display: "Cherokee"},
  {code: "hr",    flag: "🇭🇷", display: "Croatian"},
  {code: "cs",    flag: "🇨🇿", display: "Czech"},
  {code: "da",    flag: "🇩🇰", display: "Danish"},
  {code: "nl",    flag: "🇳🇱", display: "Dutch"},
  {code: "et",    flag: "🇪🇪", display: "Estonian"},
  {code: "fil",    flag: "🇵🇭", display: "Filipino"},
  {code: "fi",     flag: "🇫🇮", display: "Finnish"},
  {code: "fr",    flag: "🇫🇷", display: "French"},
  {code: "de",    flag: "🇩🇪", display: "German"},
  {code: "el",    flag: "🇬🇷", display: "Greek"},
  {code: "gu",    flag: "🏴", display: "Gujarati"},
  {code: "iw",    flag: "🇮🇱", display: "Hebrew"},
  {code: "hi",    flag: "🇮🇳", display: "Hindi"},
  {code: "hu",    flag: "🇭🇺", display: "Hungarian"},
  {code: "is",    flag: "🇮🇸", display: "Icelandic"},
  {code: "id",    flag: "🇮🇩", display: "Indonesian"},
  {code: "it",    flag: "🇮🇹", display: "Italian"},
  {code: "ja",    flag: "🇯🇵", display: "Japanese"},
  {code: "kn",    flag: "🏴", display: "Kannada"},
  {code: "ko",    flag: "🇰🇷", display: "Korean"},
  {code: "lv",    flag: "🇱🇻", display: "Latvian"},
  {code: "lt",    flag: "🇱🇹", display: "Lithuanian"},
  {code: "ms",    flag: "🇲🇾", display: "Malay"},
  {code: "ml",    flag: "🏴", display: "Malayalam"},
  {code: "mr",    flag: "🏴", display: "Marathi"},
  {code: "no",    flag: "🇳🇴", display: "Norwegian"},
  {code: "pl",    flag: "🇵🇱", display: "Polish"},
  {code: "pt-PT", flag: "🇵🇹", display: "Portuguese (Portugal)"},
  {code: "ro",    flag: "🇷🇴", display: "Romanian"},
  {code: "ru",    flag: "🇷🇺", display: "Russian"},
  {code: "sr",    flag: "🇷🇸", display: "Serbian"},
  {code: "zh-CN", flag: "🇨🇳", display: "Chinese (PRC)"},
  {code: "sk",    flag: "🇸🇰", display: "Slovak"},
  {code: "sl",    flag: "🇸🇮", display: "Slovenian"},
  {code: "es",    flag: "🇪🇸", display: "Spanish"},
  {code: "sw",    flag: "🇰🇪", display: "Swahili"},
  {code: "sv",    flag: "🇸🇪", display: "Swedish"},
  {code: "ta",    flag: "🏴", display: "Tamil"},
  {code: "te",    flag: "🏴", display: "Telugu"},
  {code: "th",    flag: "🇹🇭", display: "Thai"},
  {code: "zh-TW", flag: "🇹🇼", display: "Chinese (Taiwan)"},
  {code: "tr",    flag: "🇹🇷", display: "Turkish"},
  {code: "ur",    flag: "🇵🇰", display: "Urdu"},
  {code: "uk",    flag: "🇺🇦", display: "Ukrainian"},
  {code: "vi",    flag: "🇻🇳", display: "Vietnamese"},
  {code: "cy",    flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", display: "Welsh"},
  {code: "ot",    flag: "🏳️", display: "Other"},
]
