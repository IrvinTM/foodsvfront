import { PaginatedFoodResponse } from "./types/types";
import { useEffect, useState } from "react";
import { Pagination,PaginationNext ,PaginationEllipsis , PaginationContent, PaginationItem,PaginationPrevious, PaginationLink } from "./components/ui/pagination";
import Bar from "./components/Bar";
import Cards from "./components/Cards";
import SearchWithFilter from "./components/SearchWithFilter";
import Footer from "./components/Footer";




function App() {

  const [page, setPage] = useState<PaginatedFoodResponse>();
  const handleSearch = async (searchTerm:string, searchCategories:string) => {
    console.log(searchTerm, searchCategories);
    const response = await fetch(`http://localhost:8080/api/foods/search?name=${searchTerm}&categories=${searchCategories}`);
    const jsonData = await response.json();
    console.log(jsonData);
    const foodResponse:PaginatedFoodResponse = jsonData;
    setPage(foodResponse);
  }

  async function fetchData(pageNumber:number = 1, pageSize:number = 5) {

    const response = await fetch(`http://localhost:8080/api/foods?page=${pageNumber}&size=${pageSize}`);
    const jsonData = await response.json();
    console.log(jsonData);
    const foodResponse:PaginatedFoodResponse = jsonData;
    setPage(foodResponse);
  }

  function noMorePages(step:number):boolean{
    if(page?.last || (page?.pageable.pageNumber ?? 1)+ step > (page?.totalPages ?? 1)-1){
      return true;
    }
    return false;
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
            <PaginationPrevious  onClick={() => {if(page?.first){return}else{ console.log(page?.pageable.pageNumber); fetchData((page?.pageable?.pageNumber ?? 1)-1, 5)}}} />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink isActive >{(page?.pageable.pageNumber ?? 1) + 1}</PaginationLink>
          </PaginationItem>

          <PaginationLink onClick={() => {if(noMorePages(1)){return} fetchData((page?.pageable.pageNumber ?? 1) + 1, 5)}}>{(page?.pageable.pageNumber ?? 1) + 2}</PaginationLink>

          <PaginationLink  onClick={() => {if(noMorePages(2)){return} fetchData((page?.pageable.pageNumber ?? 1) + 2, 5)}}>
            {(page?.pageable.pageNumber ?? 1)+3}
          </PaginationLink>
          
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationLink>
            <PaginationNext onClick={() =>{ if(page?.last){return}else{fetchData((page?.pageable.pageNumber ?? 1) + 1)}}} />
          </PaginationLink>

        </PaginationContent>
      </Pagination>
      <Footer />
    </div>
  );
}

export default App;
