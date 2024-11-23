import React, { useState } from 'react';

interface LanguageListProps {
  onSelectLanguage: (language: string) => void; // Explicitly define the type
}

const LanguageList: React.FC<LanguageListProps> = ({ onSelectLanguage }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Java');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const language = event.target.value;
    setSelectedLanguage(language);
    onSelectLanguage(language); // Pass the selected language to the parent
  };

  return (
    <div>
      <label htmlFor="language">Select Language: </label>
      <select id="language" value={selectedLanguage} onChange={handleChange}>
        <option value="Java">Java</option>
        <option value="Python">Python</option>
      </select>
    </div>
  );
};

export default LanguageList;
