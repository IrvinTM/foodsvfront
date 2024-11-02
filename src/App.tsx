import { PaginatedFoodResponse } from "./types/types";
import { useEffect, useState } from "react";
import { Pagination,PaginationNext ,PaginationEllipsis , PaginationContent, PaginationItem,PaginationPrevious, PaginationLink } from "./components/ui/pagination";
import Bar from "./components/Bar";
import Cards from "./components/Cards";
import SearchWithFilter from "./components/SearchWithFilter";
import Footer from "./components/Footer";




function App() {

  const [page, setPage] = useState<PaginatedFoodResponse>();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("")
  const [searchCategories, setSearchCategories] = useState<string>("")

  const handleSearch = async (searchTerm:string, searchCategories:string, pageNumber:number, pageSize:number ) => {
    setIsSearching(true);
    console.log("estamos buscando"+ isSearching);
    console.log(searchTerm, searchCategories);
    setSearchCategories(searchCategories);
    setSearchTerm(searchTerm);
    const response = await fetch(`http://localhost:8080/api/foods/search?name=${searchTerm}&categories=${searchCategories}&page=${pageNumber}&size=${pageSize}`)
    const jsonData = await response.json();
    console.log(jsonData);
    const foodResponse:PaginatedFoodResponse = jsonData;
    setPage(foodResponse);
  }

  async function fetchData(pageNumber:number = 1, pageSize:number = 5) {
    setIsSearching(false);
    const response = await fetch(`http://localhost:8080/api/foods?page=${pageNumber}&size=${pageSize}`);
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
  function handlePageChange(pageNumber:number=0, pageSize:number=5){
    if(isSearching){
      handleSearch(searchTerm, searchCategories, pageNumber, pageSize);
    }else{
      fetchData(pageNumber, pageSize);
    }
  }


  useEffect(() => {fetchData(1, 5)}, []);
  return (
    <div>
      <Bar />
      <SearchWithFilter handleSearch={handleSearch}  />
      <Cards foods={page ? page.content : []} />
      <Pagination className="pt-4 pb-4">

        <PaginationContent>
          
          <PaginationItem>
            <PaginationPrevious  onClick={() => {if(page?.first){return}else{ console.log(page?.number); handlePageChange((page?.number ?? 0)-1, 5)}}} />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink isActive >{(page?.number ?? 1) + 1}</PaginationLink>
          </PaginationItem>

          <PaginationLink onClick={() => {if(noMorePages(1)){return} handlePageChange((page?.number ?? 0) + 1, 5)}}>{(page?.number ?? 1) + 2}</PaginationLink>

          <PaginationLink  onClick={() => {if(noMorePages(2)){return} handlePageChange((page?.number ?? 0) + 2, 5)}}>
            {(page?.number ?? 1)+3}
          </PaginationLink>
          
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationLink>
            <PaginationNext onClick={() =>{ if(page?.last){return}else{handlePageChange((page?.number ?? 1) + 1)}}} />
          </PaginationLink>

        </PaginationContent>
      </Pagination>
      <Footer />
    </div>
  );
}

export default App;
