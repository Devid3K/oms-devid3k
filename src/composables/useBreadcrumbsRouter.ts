import type { RouteLocationNormalized } from 'vue-router';

export function useBreadcrumbsRouter() {
    async function createBreadcrumbs(route: RouteLocationNormalized) {
        const matched = route.matched.filter(
          (r: any) => r.meta && r.meta.breadcrumb !== false
        );
      
        const breadcrumbsPromises = matched.map(async (r: any) => {
          let text: any = r.meta && r.meta.title ? r.meta.title : r.name;
      
          // Handle breadcrumb as text, function, or Promise
          if (typeof r.meta.breadcrumb === "function") {
            const result = r.meta.breadcrumb(route);
            text = result instanceof Promise ? await result : result;
          } else if (r.meta && r.meta.breadcrumb) {
            text = r.meta.breadcrumb instanceof Promise ? await r.meta.breadcrumb : r.meta.breadcrumb;
          }
      
          // Build the path by replacing params
          let path = r.path;
          for (const key in route.params) {
            path = path.replace(":" + key, (route as any).params[key]);
          }
      
          return {
            text,
            to: {
              path,
              query: route.query, // Include query parameters
            },
          };
        });
      
        const breadcrumbs = await Promise.all(breadcrumbsPromises);
        return breadcrumbs;
      }
    return {
        createBreadcrumbs,
    };
}