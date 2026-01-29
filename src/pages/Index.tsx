import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedListings } from "@/components/FeaturedListings";
import { ListingTile } from "@/components/FeaturedListings";
import { AuthModal } from "@/components/AuthModal";
import { NavBar } from "@/components/NavBar";
import { MobileBottomNavWrapper } from "@/components/MobileBottomNavWrapper";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  listingsService,
  type ListingsListResponse
} from "@/services/listingsService";
import { toListingItem } from "@/lib/listingMapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import {
  Button as MuiButton,
  CircularProgress,
  Box,
  Container,
  Paper,
  Stack,
  Typography
} from "@mui/material";

// Helpers to work with our thin API response without using `any`
const getAdsTotal = (resp?: ListingsListResponse) =>
  resp?.counts?.adsTotal ?? undefined;
const getStandardTotal = (resp?: ListingsListResponse) =>
  resp?.counts?.standardTotal ?? undefined;
const extractArrayFromPage = (p: ListingsListResponse): unknown[] => {
  if (Array.isArray(p.listings)) return p.listings;
  const maybeData = (p as Record<string, unknown>)["data"];
  return Array.isArray(maybeData) ? (maybeData as unknown[]) : [];
};

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  // Location prompting is now handled globally by LocationProvider

  return (
    <Box minHeight="100vh" bgcolor="#fff">
      <MobileBottomNavWrapper>
        <NavBar onLogout={handleLogout} />
      </MobileBottomNavWrapper>
      <Box component="main" pt={10}>
        {/* Hero Section */}
        <Box
          component="section"
          py={12}
          sx={{
            background: "linear-gradient(to bottom, #e3eafe 0%, #fff 100%)"
          }}
        >
          <Container maxWidth="lg">
            <HeroSection />
          </Container>
        </Box>

        {/* Call to Action */}
        <Box component="section" py={12} sx={{ bgcolor: "#f7f8fa" }}>
          <Container maxWidth="sm">
            <Stack spacing={3}>
              <MuiButton
                size="large"
                onClick={() => navigate("/start-selling")}
                fullWidth
                startIcon={<Plus style={{ width: 24, height: 24 }} />}
                sx={{
                  height: 56,
                  background:
                    "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 20,
                  borderRadius: 4,
                  boxShadow: 3,
                  transition: "all 0.2s",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                    filter: "brightness(0.97)",
                    boxShadow: 6,
                    transform: "scale(1.03)"
                  }
                }}
              >
                Start Selling Now
              </MuiButton>

              <MuiButton
                variant="outlined"
                size="large"
                onClick={() => navigate("/browse")}
                fullWidth
                sx={{
                  height: 56,
                  border: "2px solid #667eea",
                  color: "#667eea",
                  fontWeight: 600,
                  fontSize: 20,
                  borderRadius: 4,
                  boxShadow: 1,
                  transition: "all 0.2s",
                  "&:hover": {
                    background: "#667eea",
                    color: "#fff",
                    borderColor: "#764ba2",
                    boxShadow: 4,
                    transform: "scale(1.03)"
                  }
                }}
              >
                Browse Marketplace
              </MuiButton>
            </Stack>
          </Container>
        </Box>

        {/* Featured Listings */}
        <Box component="section" py={12}>
          <Container maxWidth="lg">
            <Typography variant="h3" fontWeight={700} mb={6} align="center">
              Popular picks around Polokwane
            </Typography>
            <HomeFeedBlocks />
          </Container>
        </Box>
      </Box>
    </Box>
  );
};
// Each "block" shows: 8 ads (top) -> 16 standard -> 8 ads (bottom)
type HomeBlock = {
  adsTop: unknown[];
  standard: unknown[];
  adsBottom: unknown[];
  counts?: ListingsListResponse["counts"];
};

const HomeFeedBlocks = () => {
  const navigate = useNavigate();
  const API_PAGE_SIZE = 8;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<HomeBlock>({
    queryKey: ["home", "blocks", { size: API_PAGE_SIZE }],
    initialPageParam: 1, // block index (1-based)
    queryFn: async ({ pageParam }) => {
      const blockIndex = typeof pageParam === "number" ? pageParam : 1;
      // For block n: use pages 2n-1 and 2n for both ads and standard
      const pageA = (blockIndex - 1) * 2 + 1;
      const pageB = pageA + 1;
      const [adsTop, std1, std2, adsBottom] = await Promise.all([
        listingsService.getAds({ page: pageA, limit: API_PAGE_SIZE }),
        listingsService.getStandard({ page: pageA, limit: API_PAGE_SIZE }),
        listingsService.getStandard({ page: pageB, limit: API_PAGE_SIZE }),
        listingsService.getAds({ page: pageB, limit: API_PAGE_SIZE })
      ]);

      const counts =
        adsTop.counts ?? std1.counts ?? std2.counts ?? adsBottom.counts;

      return {
        adsTop: extractArrayFromPage(adsTop),
        standard: [
          ...extractArrayFromPage(std1),
          ...extractArrayFromPage(std2)
        ],
        adsBottom: extractArrayFromPage(adsBottom),
        counts
      } satisfies HomeBlock;
    },
    getNextPageParam: (lastPage, allPages) => {
      // Determine if we have enough remaining pages for BOTH streams
      const adsTotal = getAdsTotal({ counts: lastPage.counts });
      const stdTotal = getStandardTotal({ counts: lastPage.counts });
      if (!adsTotal || !stdTotal) return undefined;
      const totalAdsPages = Math.ceil(adsTotal / API_PAGE_SIZE);
      const totalStdPages = Math.ceil(stdTotal / API_PAGE_SIZE);
      const nextBlockIndex = allPages.length + 1; // next block (1-based)
      const endPageForNextBlock = nextBlockIndex * 2; // uses two pages per block
      return endPageForNextBlock <= totalAdsPages &&
        endPageForNextBlock <= totalStdPages
        ? nextBlockIndex
        : undefined;
    }
  });

  // Render skeleton on very first load
  if (isLoading && !data) {
    return (
      <>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Sponsored suggestions</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`ads-skel-${i}`}
                className="h-64 bg-gray-100 animate-pulse rounded"
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={`std-skel-${i}`}
              className="h-64 bg-gray-100 animate-pulse rounded"
            />
          ))}
        </div>
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Sponsored suggestions</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`ads2-skel-${i}`}
                className="h-64 bg-gray-100 animate-pulse rounded"
              />
            ))}
          </div>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-gray-500 py-8">
        Failed to load listings.
      </div>
    );
  }

  const blocks = data?.pages ?? [];

  return (
    <>
      {blocks.map((block, blockIdx) => {
        const adsTopItems: ReturnType<typeof toListingItem>[] = (
          block.adsTop as unknown[]
        ).map((r) => toListingItem(r as Record<string, unknown>));
        const stdItems: ReturnType<typeof toListingItem>[] = (
          block.standard as unknown[]
        ).map((r) => toListingItem(r as Record<string, unknown>));
        const adsBottomItems: ReturnType<typeof toListingItem>[] = (
          block.adsBottom as unknown[]
        ).map((r) => toListingItem(r as Record<string, unknown>));

        return (
          <div key={`home-block-${blockIdx}`} className="mb-8">
            {/* Top 8 sponsored */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Sponsored suggestions</h3>
              </div>
              <Carousel
                className="w-full"
                opts={{ align: "start", loop: false }}
              >
                <CarouselContent>
                  {adsTopItems.map((it, idx) => (
                    <CarouselItem
                      key={`block-${blockIdx}-ads-top-${it.id ?? idx}`}
                      className="basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                    >
                      <ListingTile
                        listing={
                          it as Parameters<typeof ListingTile>[0]["listing"]
                        }
                        onClick={() => navigate(`/item/${String(it.id)}`)}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4" />
                <CarouselNext className="-right-4" />
              </Carousel>
            </div>

            {/* 16 standard */}
            <FeaturedListings items={stdItems} />

            {/* Bottom 8 sponsored */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Sponsored suggestions</h3>
              </div>
              <Carousel
                className="w-full"
                opts={{ align: "start", loop: false }}
              >
                <CarouselContent>
                  {adsBottomItems.map((it, idx) => (
                    <CarouselItem
                      key={`block-${blockIdx}-ads-bottom-${it.id ?? idx}`}
                      className="basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                    >
                      <ListingTile
                        listing={
                          it as Parameters<typeof ListingTile>[0]["listing"]
                        }
                        onClick={() => navigate(`/item/${String(it.id)}`)}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4" />
                <CarouselNext className="-right-4" />
              </Carousel>
            </div>
          </div>
        );
      })}

      <Box display="flex" justifyContent="center" mt={2}>
        <MuiButton
          variant="outlined"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          sx={{ borderRadius: 0, textTransform: "none", minWidth: 180 }}
        >
          {isFetchingNextPage ? (
            <>
              <CircularProgress size={18} sx={{ mr: 1 }} /> Loading…
            </>
          ) : hasNextPage ? (
            "Load more"
          ) : (
            "No more results"
          )}
        </MuiButton>
      </Box>
    </>
  );
};

export default Index;
