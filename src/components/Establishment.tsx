import { useState } from "preact/hooks";

interface Item {
  id: string;
  name: string;
  country: string;
  classification: string;
}

interface Props {
  page: {
    data: Item[];
    start: number;
    end: number;
    size: number;
    total: number;
    currentPage: number;
    lastPage: number;
    url: {
      current: string;
      next?: string;
      prev?: string;
    };
  };
  children?: preact.ComponentChildren;
}

function Table({ page, children }: Props) {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: any) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = (event: any) => {
    event.preventDefault();
    setSearchQuery(searchInput);
  };

  const filteredData = page.data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.classification.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchInput}
          onChange={handleSearchChange}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {children}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Classification</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item: Item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.country}</td>
              <td>{item.classification}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
