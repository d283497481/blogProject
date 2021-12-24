import { RouteRecordRaw } from 'vue-router';
import { IUserMenu } from '@/service/login/types';
import { IBreadcrumb } from '@/base-ui/breadcrumb';

let firstPath: string | null = null; // 定义初始重定向路由

export function mapMenusToRoutes(userMenu: IUserMenu[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];
  // 1. 先加载所有的 routes
  const allRoutes: RouteRecordRaw[] = [];
  // require.context() 是 webpack 的一个工具函数，可以帮助我们加载文件夹
  // 第一个参数是文件夹路径；第二个参数是布尔值，表示是否要使用递归进行查找；第三个参数是个正则，用于匹配需要查找的文件
  const routeFiles = require.context('../router/main', true, /\.ts/);
  routeFiles.keys().forEach((key) => {
    // 拿到的文件路径是个相对路径，需要处理
    const route = require('../router/main' + key.replace('./', '/'));
    allRoutes.push(route.default);
  });

  // 2.根据菜单获取需要添加的 routes
  const _recurseGetRoute = (menus: IUserMenu[]) => {
    for (const menu of menus) {
      if (menu.level === 2) {
        const route = allRoutes.find((route) => route.path === menu.url);
        if (route) {
          if (!firstPath) firstPath = route.path;
          route.meta = { title: menu.name };
          routes.push(route);
        }
      } else {
        _recurseGetRoute(menu.children);
      }
    }
  };
  _recurseGetRoute(userMenu);

  return routes;
}

// 根据当前路径获取自身与父级路径信息
export function pathMapBreadcrumbs(userMenu: IUserMenu[], currentPath: string): any {
  const breadcrumbs: IBreadcrumb[] = [];
  for (const menu of userMenu) {
    if (menu.level === 1) {
      const findMenu = pathMapBreadcrumbs(menu.children, currentPath);
      if (findMenu) {
        breadcrumbs.push({ name: menu.name });
        breadcrumbs.push({ name: findMenu.name, path: findMenu.url });
        return breadcrumbs;
      }
    } else if (menu.level === 2 && menu.url === currentPath) {
      return menu;
    }
  }
}

export function mapMenusToPermission(userMenu: IUserMenu[]) {
  const permissions: string[] = [];
  // 获取用户具有的权限
  const _recurseGetPermission = (menus: IUserMenu[]) => {
    for (const menu of menus) {
      if (menu.level === 3) {
        if (menu.permission) permissions.push(menu.permission);
      } else {
        _recurseGetPermission(menu.children ?? []);
      }
    }
  };
  _recurseGetPermission(userMenu);
  return permissions;
}

export function getMenuLeafKeys(menuList: IUserMenu[]) {
  const leafKeys: number[] = [];
  const _recurseGetLeaf = (menuList: IUserMenu[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children ?? []);
      } else {
        leafKeys.push(menu.id);
      }
    }
  };
  _recurseGetLeaf(menuList);
  return leafKeys;
}

export { firstPath };
