import { TextField } from '@mui/material';

function SearchBar({ queryFilterIngredient, setQueryFilterIngredient }) {

  const handleQueryChange = (event) => {
    setQueryFilterIngredient(event.target.value);
  };

  return (
    <TextField
      label="Start typing to search"
      name="query"
      type="text"
      value={queryFilterIngredient}
      onChange={handleQueryChange}
      size="small"
      slotProps={{
        inputLabel: {
          sx: { fontSize: '0.75rem' },
        },
        input: {
          sx: { fontSize: '0.75rem' },
        },
      }}
    />
  )
}

export default SearchBar