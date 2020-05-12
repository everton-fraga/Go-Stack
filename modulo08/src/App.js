import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  const [tech, setTech] = useState(['ReactJS', 'React Native']);
  const [newtech, setNewTech] = useState('');

  const handleAdd = useCallback(() => {
    setTech([...tech, newtech]);
    setNewTech('');
  }, [tech, newtech]);

  useEffect(() => {
    const storageTech = localStorage.getItem('tech');

    if (storageTech) {
      setTech(JSON.parse(storageTech));
    }
  }, []); // executará somente 1x

  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech));
  }, [tech]); // executará toda vez que a variavel tech mudar de valor

  const techSize = useMemo(() => tech.length, [tech]);

  return (
    <>
      <ul>
        {tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <p>Você tem {techSize} tecnologia(s)</p>
      <input value={newtech} onChange={(e) => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
