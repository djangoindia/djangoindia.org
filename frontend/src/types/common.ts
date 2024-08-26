export interface PageProps<
  TParams extends object,
  TSearchParams extends object,
> {
  params: TParams
  searchParams: TSearchParams
}
