"use client";
import Container from "@/lib/components/container";
import CustomDropdown, { DropdownItemProps } from "@/lib/components/controls/customDropdown";
import CustomMultiSelect from "@/lib/components/controls/CustomMultiSelect";
import CustomRating from "@/lib/components/controls/customRating";
import CustomRange from "@/lib/components/customRange";
import ProductCard from "@/lib/components/productCard";
import Section from "@/lib/components/section";
import { ProductProps } from "@/lib/types/product";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { includes, split } from "lodash";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useEffect, useState, useTransition } from "react";
export default function Home() {

  const [pending , startTransation] = useTransition();
  const [filterShow,setFilterShow] = useState(false);
  const [categories,setCategories] = useState<DropdownItemProps[] | []>([]);
  const [filterProducts,setFilterProducts] = useState<DropdownItemProps[] | []>([]);
  const [products,setProducts] = useState<ProductProps[] | []>([]);
  const [fProducts,setFProducts] = useState<ProductProps[] | []>([]);
  const [finalFProducts,setFinalFProducts] = useState<ProductProps[] | []>([]);
  const [filterResult,setFilterResult] = useState<{
    range?:number[],
    rating?:number
  } | undefined>(undefined);
  const [searchOptions,setSearchOptions] = useState<{
    category?:string,
    products?:string
  } | undefined>(undefined);
  //--------------------------------------------------------------------------------

  useEffect(()=>{ 
    fetchData()
  },[]);

  const fetchData = ()=>{
    startTransation( async ()=>{
     await  Promise.all([
        fetch(`https://dummyjson.com/products/category-list`)
        .then(async response=>{
          if(response.ok){
            const categoriesResult = await response.json();
            const categoriesList = categoriesResult as string[];
            setCategories(categoriesList?.map(e=>({text:e,value:e})));
          }
        }),
        fetch(`https://dummyjson.com/products`)
        .then(async response=>{
          if(response.ok){
            const productsResult = await response.json();
            if (productsResult?.products && productsResult?.products?.length > 0){
              const productsList = productsResult?.products as ProductProps[];
              setProducts(productsList);
              setFProducts(productsList);
              setFinalFProducts(productsList);
            }
          }
        })
      ]);
    });
  };


  const handleSearch = ()=>{
    let result = products;
    if(searchOptions && result){
      if(searchOptions?.category){
        result = result?.filter(e=>e.category === searchOptions?.category);
      }
      if(searchOptions?.products &&  searchOptions?.products?.length > 0){
       const productsList =  split(searchOptions?.products,',');
       if(productsList && productsList?.length > 0){
        result = result?.filter(e=> includes(productsList,e.id.toString()));
       }
      }
    }
    setFProducts(result);
    setFinalFProducts(result);
  };


  const handleFilterProducts = (value : string | undefined)=>{
    startTransation(async()=>{
      if(value){
        const response = await fetch(`https://dummyjson.com/products/category/${value}`);
        if(response.ok){
          const result = await response.json();
          const productsList = result?.products as any [];
          setFilterProducts(productsList?.map(e=>({text:e?.title,value:e?.id})));
          setSearchOptions({
            category:value,
            products:undefined
          });
        }
      }
    });
  };

  
  useEffect(()=>{
    handleFilterResult();
  },[filterResult]);


  const handleFilterResult = ()=>{
    let result = fProducts;
    if(result && result?.length > 0){
      if(filterResult?.rating){
        result = result.filter(e=>e.rating <= (filterResult?.rating ?? 0));
      }
      if(filterResult?.range && filterResult?.range?.length > 0){
        const minPrice = filterResult.range?.at(0) as number;
        const maxPrice = filterResult.range?.at(1) as number;
        result = result.filter(e=>e.price >= minPrice && e.price <= maxPrice);
      }
      setFinalFProducts(result);
    }
  };

  return (
    <Container>
      <section className="flex flex-col">
        <Section
          title="Welcome to you in WowShop website"
          subTitle="Here you can find whatever you want with hight quality and less price."
        />
      <div className="mt-10" />
      <div className="bg-white border border-wowLightGray sm:w-[95%] p-5 w-full mx-auto min-h-[5rem] rounded-md gap-5 flex flex-col">
        <div className="flex md:flex-row flex-col gap-4">
          <CustomDropdown
            loading={pending}
            options={categories}
            className="grow order-1"
            name="category"
            title="Category"
            placeholder="Choose category"
            onChange={(e)=>{
              handleFilterProducts(e.value);
            }}
          />
          <CustomMultiSelect
            loading={pending}
            options={filterProducts}
            className="grow order-1"
            name="product"
            title="Products"
            placeholder="Choose products"
            onChange={(e)=>{
              setSearchOptions({...searchOptions,products:e});
            }}
          />

        </div>
        <Button 
         onClick={handleSearch}
         className="flex justify-center">
          Search
        </Button>
      </div>
      <div className="mt-10" />
      <div className="flex flex-col gap-2">

        <div className="relative">
          <Button onClick={()=>{
            setFilterShow(!filterShow);
          }} className="!bg-black  text-white">
            <FontAwesomeIcon icon={faFilter} />
          </Button>
        </div>
        <style jsx>
          {
            `
            .filter-box:before{
              content:'';
              position: absolute;
              width:20px;
              height:20px;
              background-color:var(--wow-light-gray-color);
              transform: rotate(45deg);
              left:1rem;
              top:-.5rem;
              z-index:-1;
            }
            
            `
          }
        </style>
        {filterShow &&  <div className="filter-box mt-1 relative flex sm:flex-row  flex-col  p-5 gap-4 min-h-[5rem] w-full bg-wowLightGray rounded-md">
          <CustomRange
            className="grow"
            name="price"
            title="Price"
            minValue={0}
            maxValue={50000}
            onChange={(e1, e2) => {
              setFilterResult({...filterResult,range:[e1 ?? 0,e2 ?? 0]});
            }}
          />
          <CustomRating 
          title="Rating"
          className="grow"
          onChange={(value)=>{
            setFilterResult({...filterResult,rating:value});
          }}
          />
        </div>}
        <Divider />
      </div>
      <div className="my-5"/>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mx-auto gap-4">
          {
            finalFProducts?.map(e=>(
            <ProductCard 
            id={e.id}
            title={e?.title}
            category={e?.category}
            thumbnail={e?.thumbnail}
            price={e?.price}
            discountPercentage={e?.discountPercentage}
            stock={e?.stock}
            rating={e.rating}
            />
            ))
          }
          </div>   
          
      </section>  
    </Container>
  );
}
