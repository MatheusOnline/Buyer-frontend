import { Skeleton } from "@components/UI/Skeleton";
export const CatalogProductsSkeleton = () => <>{Array.from({length: 10}, (_, index) => <Skeleton key={index} height="315px" />)}</>;
