import { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List, Search } from "lucide-react";
import { CategoryFilter } from "./categoryFilter";
import { debounce } from "@/utils/debounce";
import { WorkPackageEntity } from "@/types/workPackage/workPackage.interface";
import { workpackageService } from "@/services/workPackage/workpackage.service";
import { WorkPackageCard } from "./workPackageCard";
import { SkeletonCard } from "@/components/skeleton/skeletonCard";

const PAGE_SIZE = 9;
const TAB_OPTIONS = ["RFX WPs", "Custom WPs"] as const;

export function WorkPackagesPage() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");
  const [packages, setPackages] = useState<WorkPackageEntity[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPackages = useCallback(
    async (pageNum = 1, append = false) => {
      try {
        setLoading(true);
        const response = await workpackageService.getPagination(
          PAGE_SIZE,
          pageNum,
          {
            categoryId:
              selectedCategoryId === "all" ? undefined : selectedCategoryId,
            title: searchTerm || undefined,
          }
        );

        const newData = response.data;
        if (newData.length <= PAGE_SIZE) setHasMore(false);
        setPackages((prev) => (append ? [...prev, ...newData] : newData));
      } catch (error: any) {
        throw new Error(error?.message);
      } finally {
        setLoading(false);
      }
    },
    [selectedCategoryId, searchTerm]
  );

  const handleSearch = useMemo(
    () => debounce((text: string) => setSearchTerm(text), 500),
    []
  );

  useEffect(() => {
    setPage(1);
    fetchPackages(1, false);
  }, [selectedCategoryId, searchTerm, fetchPackages]);

  useEffect(() => {
    if (page > 1) {
      fetchPackages(page, true);
    }
  }, [page, fetchPackages]);

  return (
    <div className="flex flex-col h-screen w-full p-2">
      {/* Header Section */}
      <div className="flex justify-between items-center py-3 w-full border-b">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/estimator" className="hover:text-primary">
                  Estimator
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Work Packages</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Button variant="default" className="rounded-full gap-2">
          <List size={16} /> View Summary
        </Button>
      </div>

      <h1 className="text-2xl font-semibold my-4">Work Packages (WP)</h1>

      <div className="flex gap-10 w-full h-full px-10">
        {/* Sidebar */}
        <aside className="w-[200px] flex flex-col">
          <Tabs className="w-full" defaultValue={TAB_OPTIONS[0]}>
            <TabsList>
              {TAB_OPTIONS.map((value) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="data-[state=active]:bg-[#E2F5F9] data-[state=active]:text-primary text-[#7C7C7C] text-sm font-normal"
                >
                  {value}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={TAB_OPTIONS[0]} className="mt-10">
              <CategoryFilter
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={setSelectedCategoryId}
              />
            </TabsContent>
          </Tabs>

          <Link
            to="/help/how-to-add-custom-wps"
            className="mt-auto flex items-center gap-3 text-sm font-medium text-primary hover:text-primary/90"
          >
            <List size={16} /> How to add custom WPs
          </Link>
        </aside>

        {/* Main Content */}
        <section className="flex-1 flex flex-col gap-4">
          <div className="relative">
            <Input
              className="pl-10"
              placeholder="Search title..."
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7C7C7C]"
              size={16}
            />
          </div>

          <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 min-h-80">
            {loading ? (
              Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
            ) : packages.length === 0 ? (
              <div className="col-span-full flex items-center justify-center h-full">
                <span className="text-lg font-semibold text-[#7C7C7C]">
                  No data found
                </span>
              </div>
            ) : (
              packages.map((wp, index) => (
                <WorkPackageCard key={index} workPackage={wp} />
              ))
            )}
          </div>

          <div className="flex justify-end mt-auto">
            <Button
              variant="outline"
              size="sm"
              disabled={!hasMore || packages.length === 0}
              onClick={() => setPage((prev) => prev + 1)}
              className="border-primary"
            >
              Next ➜
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
