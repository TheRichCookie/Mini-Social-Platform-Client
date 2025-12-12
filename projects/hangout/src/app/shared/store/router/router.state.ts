export interface HangRouterState {
  state: HangRouterObject;
  navigationId: number;
}

export interface HangRouterObject {
  url: string;
  params: Record<string, string>;
  queryParams: Record<string, string>;
}
