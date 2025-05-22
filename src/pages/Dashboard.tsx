import  { useState } from "react";


import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs/tabs";
import { DataTableDemo } from "../components/tables/data-table";
import { useTableContext } from "../lib/TableContext";

function Dashbord() {
  const [currentTab, setCurrentTab] = useState("Generated");
  const {data} =useTableContext()
  
  // Function to filter data based on the current tab
  const getFilteredData = () => {
    switch (currentTab) {
      case "Generated":
        return data.filter(article => article.status === "generated"); // Assuming 'publish' indicates if it's generated
      case "Published":
        return data.filter(article => article.status === "published") // Assuming 'publish' indicates if it's published
      case "Scheduled":
        return data.filter(article => article.status === "scheduled"); // Adjust based on your data structure
      case "Archived":
        return data.filter(article => article.status === "archived"); // Adjust based on your data structure
      default:
        return data;
    }
  };

  return (
    <div className="p-6 space-y-4  h-screen text-lg ">
    <h1 className="text-3xl font-bold">Articles</h1>
  
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 w-full h-full flex-wrap">
    <Tabs defaultValue="All" className="w-full flex flex-col">
    <TabsList className="flex flex-wrap gap-2 mb-40 sm:mb-4 md:mb-4 text-sm" >

    {/* mb-4 adds spacing below tabs */}
    <TabsTrigger value="All" onClick={() => setCurrentTab("All")}>All Articles</TabsTrigger>
    <TabsTrigger value="Generated" onClick={() => setCurrentTab("Generated")}>Generated Articles</TabsTrigger>
    <TabsTrigger value="Published" onClick={() => setCurrentTab("Published")}>Published Articles</TabsTrigger>
    <TabsTrigger value="Scheduled" onClick={() => setCurrentTab("Scheduled")}>Scheduled Articles</TabsTrigger>
    <TabsTrigger value="Archived" onClick={() => setCurrentTab("Archived")}>Archived Articles</TabsTrigger>
  </TabsList>

  <div className="overflow-x-auto flex-1">
    <TabsContent value="All">
      <DataTableDemo data={data} />
    </TabsContent>
    <TabsContent value="Generated">
      <DataTableDemo data={getFilteredData()} />
    </TabsContent>
    <TabsContent value="Published">
      <DataTableDemo data={getFilteredData()} />
    </TabsContent>
    <TabsContent value="Scheduled">
      <DataTableDemo data={getFilteredData()} />
    </TabsContent>
    <TabsContent value="Archived">
      <DataTableDemo data={getFilteredData()} />
    </TabsContent>
  </div>
</Tabs>


    </div>
  </div>
  
  );
}

export default Dashbord;
