import { ChangeEvent, useRef, useContext } from "react";
import { PlacesContext } from "../context";
import { SearchResults } from "./SearchResults";
export const SearchBar = () => {
  const { searchPlacesByTerm } = useContext(PlacesContext);

  /* //debounce: haremos que la funcion se ejecute despues de cierto tiempo luego que el usuario pulse una ultima tecla
  
  asi se tipea los set timeot*/
  const debounceRef = useRef<NodeJS.Timeout>();

  /* recuerda tipar los eventos por su tipo y dentro el html del evento
  
  activar debounce */
  const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    //si ya hay un settimeout lo limpiamos
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      searchPlacesByTerm(event.target.value);
    }, 500);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar lugar..."
        onChange={onQueryChange}
      />

      <SearchResults />
    </div>
  );
};
