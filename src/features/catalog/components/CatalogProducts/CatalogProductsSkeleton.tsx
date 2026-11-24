import { Skeleton } from "../../../../shared/components/ui/Skeleton/index.tsx";
export const CatalogProductsSkeleton = () => <>{Array.from({length: 10}, (_, index) => <Skeleton key={index} height="315px" />)}</>;
