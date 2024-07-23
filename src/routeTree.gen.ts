/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const FeeLazyImport = createFileRoute('/fee')()
const BlocksLazyImport = createFileRoute('/blocks')()
const AddressLazyImport = createFileRoute('/address')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const FeeLazyRoute = FeeLazyImport.update({
  path: '/fee',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/fee.lazy').then((d) => d.Route))

const BlocksLazyRoute = BlocksLazyImport.update({
  path: '/blocks',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/blocks.lazy').then((d) => d.Route))

const AddressLazyRoute = AddressLazyImport.update({
  path: '/address',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/address.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/address': {
      preLoaderRoute: typeof AddressLazyImport
      parentRoute: typeof rootRoute
    }
    '/blocks': {
      preLoaderRoute: typeof BlocksLazyImport
      parentRoute: typeof rootRoute
    }
    '/fee': {
      preLoaderRoute: typeof FeeLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  AddressLazyRoute,
  BlocksLazyRoute,
  FeeLazyRoute,
])

/* prettier-ignore-end */
