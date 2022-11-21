import { Input } from '@mantine/core';
import useNavstore from '@stores/navbar-store';
import { IconSearch } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Search = () => {
  const { toggleSidebar } = useNavstore((state) => ({
    toggleSidebar: state.toggleSidebar,
  }));

  const [inputVal, setInput] = useState('');

  const router = useRouter();

  function setUrl() {
    if (!inputVal || 1 === inputVal.length || /^\s*$/.test(inputVal)) {
      return;
    } else {
      let a = encodeURIComponent(inputVal);
      router.replace('/search/[search]', `/search/${a}`);
    }
    setInput('');
    toggleSidebar(false);
  }

  return (
    <>
      <Input
        icon={<IconSearch color="var(--primary-color)" />}
        placeholder="Search movie, tv, person"
        name="search"
        value={inputVal}
        type="text"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          e.key === 'Enter' ? setUrl(e.target.value) : null;
        }}
      />
    </>
  );
};

export default Search;
