import ProductsPageContainer from "@/features/Products/components/productsPageContainer";

function getFirstSearchParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function getPageParam(value: string | string[] | undefined) {
  const rawPage = getFirstSearchParam(value);
  const parsedPage = Number(rawPage);

  if (!Number.isFinite(parsedPage) || parsedPage < 1) {
    return 1;
  }

  return Math.floor(parsedPage);
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const mode = getFirstSearchParam(params.mode);
  const page = getPageParam(params.page);

  return <ProductsPageContainer mode={mode} page={page}></ProductsPageContainer>;
}
