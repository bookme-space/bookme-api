export interface IPaging<T> {
  pagination: {
    total: number;
    take: number;
    skip: number;
  };
  items: T[];
}
