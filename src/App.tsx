import { PaginatedFoodResponse } from "./types/types";
import { useEffect, useState } from "react";
import { Pagination,PaginationNext ,PaginationEllipsis , PaginationContent, PaginationItem,PaginationPrevious, PaginationLink } from "./components/ui/pagination";
import Bar from "./components/Bar";
import Cards from "./components/Cards";
import SearchWithFilter from "./components/SearchWithFilter";
import Footer from "./components/Footer";
import { AppContext, apiUrl } from "./AppContext";


function App() {

  const [page, setPage] = useState<PaginatedFoodResponse>();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("")
  const [searchCategories, setSearchCategories] = useState<string>("")


  const handleSearch = async (pageNumber:number, pageSize:number) => {
    if(searchTerm === "" && searchCategories === ""){
      return;
    }
    setIsSearching(true);
    console.log(searchTerm, searchCategories);
    const response = await fetch(`${apiUrl}/search?name=${searchTerm}&categories=${searchCategories}&page=${pageNumber}&size=${pageSize}`)
    const jsonData = await response.json();
    console.log(jsonData);
    const foodResponse:PaginatedFoodResponse = jsonData;
    setPage(foodResponse);
  }

  console.log("buscandoo", isSearching);

  async function fetchData(pageNumber:number = 0, pageSize:number = 6) {
    const response = await fetch(`${apiUrl}/api/foods?page=${pageNumber}&size=${pageSize}`);
    const jsonData = await response.json();
    console.log(jsonData);
    const foodResponse:PaginatedFoodResponse = jsonData;
    setPage(foodResponse);
  }

  function noMorePages(step:number):boolean{
    if(page?.last || (page?.number ?? 1)+ step > (page?.totalPages ?? 1)-1){
      return true;
    }
    return false;
  }
  function handlePageChange(pageNumber:number=0, pageSize:number=6){
    if(isSearching){
      handleSearch(pageNumber, pageSize);
    }else{
      fetchData(pageNumber, pageSize);
    }
  }


  useEffect(() => {fetchData(0, 6)}, []);
  return (
    <AppContext.Provider value={{searchTerm: searchTerm, setSearchTerm:setSearchTerm, categories:searchCategories, setCategories: setSearchCategories, handleSearch:handleSearch}}>
      <div>
        <Bar />
        <SearchWithFilter  />
        <Cards foods={page ? page.content : []} />
        <Pagination className="pt-4 pb-4">

          <PaginationContent>
          
            <PaginationItem>
              <PaginationPrevious  onClick={() => {if(page?.first){return}else{ console.log(page?.number); handlePageChange((page?.number ?? 0)-1, 6)}}} />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink isActive >{(page?.number ?? 1) + 1}</PaginationLink>
            </PaginationItem>

            <PaginationLink onClick={() => {if(noMorePages(1)){return} handlePageChange((page?.number ?? 0) + 1, 6)}}>{(page?.number ?? 1) + 2}</PaginationLink>

            <PaginationLink  onClick={() => {if(noMorePages(2)){return} handlePageChange((page?.number ?? 0) + 2, 6)}}>
              {(page?.number ?? 1)+3}
            </PaginationLink>
          
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationNext onClick={() =>{ if(page?.last){return}else{handlePageChange((page?.number ?? 1) + 1)}}} />

          </PaginationContent>
        </Pagination>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
